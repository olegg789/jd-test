import { useRouterModal, useRouterPanel } from "@kokateam/router-vkminiapps";

import {
  Group,
  SizeType,
  Title,
  useAdaptivity,
  Avatar,
  Text,
  Link,
  Cell,
  Div,
  Switch,
  Header,
  Tooltip,
} from "@vkontakte/vkui";
import toast from "react-hot-toast";
import {
  Icon20HomeOutline,
  Icon20UserOutline,
  Icon28LightbulbOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { useState } from "react";
import Flash from "./flash";
import Friends from "./friends";

const Home = ({ user, flash, setFlash, users }) => {
  const { toModal } = useRouterModal();
  const { toPanel } = useRouterPanel();
  const { sizeX } = useAdaptivity();

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

  const styles = {
    margin: sizeX === SizeType.REGULAR ? "-7px -7px 0 -7px" : 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 15,
    paddingBottom: 0,
  };

  return (
    <>
      <Group>
        <Div style={styles}>
          <Avatar size={96} src={user.photo_max_orig} />
          <Title
            style={{ marginBottom: 8, marginTop: 20 }}
            level="2"
            weight="2"
          >
            {user.first_name} {user.last_name}
          </Title>
          <Div className="line" style={{ paddingBottom: 0 }}>
            <Text
              style={{
                marginBottom: 24,
                color: "var(--vkui--color_text_secondary)",
              }}
              className="line"
            >
              <Icon20HomeOutline style={{ marginRight: 5 }} /> {user.city.title}
            </Text>
            <Link
              href={`https://vk.com/id${user.id}`}
              style={{ marginLeft: 5 }}
            >
              <Icon20UserOutline /> Открыть профиль
            </Link>
          </Div>
        </Div>
      </Group>

      <Flash flash={flash} setFlash={(data) => setFlash(data)} />

      <Friends users={users} />
    </>
  );
};

export default Home;
