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
import flash_info from "./storage/atoms/flash";

const App = withAdaptivity(
  ({ viewWidth }) => {
    const [theme, setTheme] = useState("light");
    const [mainCoil, updateMainCoil] = useRecoilState(main);
    const [flash, setFlash] = useRecoilState(flash_info);

    const platform = usePlatform();

    const isDesktop =
      viewWidth > 3 ||
      new URLSearchParams(window.location.search).get("vk_platform") ===
        "desktop_web";

    useEffect(() => {
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === "VKWebAppUpdateConfig")
          setTheme(data?.scheme.includes("light") ? "light" : "dark");
      });
    }, []);

    useEffect(() => {
      bridge.send("VKWebAppFlashGetInfo").then((res) => setFlash(res));
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
                isDesktop={isDesktop}
                theme={theme}
                setTheme={(theme) => setTheme(theme)}
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
