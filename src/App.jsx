import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  AppearanceProvider,
  AppRoot,
  ConfigProvider,
  usePlatform,
  withAdaptivity,
} from "@vkontakte/vkui";

import { SnackbarProvider } from "/src/components/__global";
import Navigation from "/src/Navigation";

import bridge from "@vkontakte/vk-bridge";
import main from "/src/storage/atoms/main";

const App = withAdaptivity(
  ({ viewWidth }) => {
    const [theme, setTheme] = useState("light");
    const [mainCoil, updateMainCoil] = useRecoilState(main);
    const [user, setUser] = useState({
      id: 1,
      photo_max_orig: "https://pngicon.ru/file/uploads/cat_hungry.png",
      first_name: "Котик",
      last_name: "",
      city: {
        title: "Санкт-Петербург",
      },
    });
    const [flash, setFlash] = useState({ is_available: false });
    const [users, setUsers] = useState([]);

    const platform = usePlatform();

    const isDesktop =
      viewWidth > 3 ||
      new URLSearchParams(window.location.search).get("vk_platform") ===
        "desktop_web";

    function getInitialsFromNameArray(peopleArray) {
      for (let person of peopleArray) {
        const nameParts = person.name.split(" ");

        const initials = nameParts.map((namePart) =>
          namePart.charAt(0).toUpperCase()
        );

        person.initials = initials.join("");
      }
      return peopleArray;
    }

    function getRandomElements(arr, numElements) {
      if (numElements >= arr.length) {
        return arr.slice();
      } else {
        let randomIndexes = [];
        while (randomIndexes.length < numElements) {
          const randomIndex = Math.floor(Math.random() * arr.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        return randomIndexes.map((index) => arr[index]);
      }
    }

    useEffect(() => {
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === "VKWebAppUpdateConfig")
          setTheme(data?.scheme.includes("light") ? "light" : "dark");
      });
    }, []);

    useEffect(() => {
      bridge.send("VKWebAppGetUserInfo").then((res) => setUser(res));
    }, []);

    useEffect(() => {
      bridge.send("VKWebAppFlashGetInfo").then((res) => setFlash(res));
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        return data.json();
      };

      fetchData().then((data) => {
        let res = getRandomElements(data, 4);
        let initials = getInitialsFromNameArray(res);

        setUsers(initials);
      });
    }, []);

    useEffect(() => {
      bridge.send("VKWebAppInit").then(() => console.log("VKWebAppInit"));

      updateMainCoil({
        ...mainCoil,
        isDesktop,
        platform,
      });
    }, []);

    return (
      <ConfigProvider
        locale={"ru"}
        isWebView={false}
        appearance={theme || "light"}
        platform={"ios"}
      >
        <AppearanceProvider appearance={theme || "light"}>
          <AppRoot mode="full" className={isDesktop ? "desktop" : "mobile"}>
            <SnackbarProvider>
              <Navigation
                user={user}
                isDesktop={isDesktop}
                theme={theme}
                setTheme={(theme) => setTheme(theme)}
                flash={flash}
                setFlash={(data) => setFlash(data)}
                users={users}
              />
            </SnackbarProvider>
          </AppRoot>
        </AppearanceProvider>
      </ConfigProvider>
    );
  },
  {
    viewWidth: true,
  }
);

export default App;
