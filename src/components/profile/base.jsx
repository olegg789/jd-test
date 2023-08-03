import { useEffect } from "react";
import { Group, Title, Avatar, Text, Link, Div } from "@vkontakte/vkui";
import { Icon20HomeOutline, Icon20UserOutline } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

import Flash from "./flash";
import Friends from "./friends";
import { useRecoilState } from "recoil";
import user_info from "../../storage/atoms/user";
import users_placeholder from "../../storage/atoms/users";
import getRandomElements from "../../modules/getRandomElements";
import getInitialsFromNameArray from "../../modules/getInitialsFromNameArray";

const Home = ({}) => {
  const [users, setUsers] = useRecoilState(users_placeholder);
  const [user, setUser] = useRecoilState(user_info);

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (users.all.length <= 2) {
      const fetchData = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        return data.json();
      };

      fetchData().then((data) => {
        let short = getRandomElements(data, 4);
        let initials_short = getInitialsFromNameArray(short);
        console.log(1);

        let initials_all = getInitialsFromNameArray(data);

        let new_users = {
          short: initials_short,
          all: initials_all,
        };

        console.log(new_users);

        setUsers(new_users);
      });
    }
  }, []);

  return (
    <>
      <Group>
        <Div className={"user-info"}>
          <Avatar size={96} src={user.photo_max_orig} />
          <Title className="user-name" level="2" weight="2">
            {user.first_name} {user.last_name}
          </Title>
          {user.id && (
            <Div className="line pb0">
              <Text className="line user-city">
                <Icon20HomeOutline className={"mr5"} /> {user.city.title}
              </Text>
              <Link href={`https://vk.com/id${user.id}`} className={"ml5"}>
                <Icon20UserOutline /> Открыть профиль
              </Link>
            </Div>
          )}
        </Div>
      </Group>

      <Flash />

      <Friends />
    </>
  );
};

export default Home;
