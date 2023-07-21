import { useRouterModal, useRouterPanel } from "@kokateam/router-vkminiapps";

import { Button, Placeholder, Text } from "@vkontakte/vkui";
import Icon from "./icon";

const Home = ({ user, flash, setFlash, users }) => {
  const { toModal } = useRouterModal();
  const { toPanel } = useRouterPanel();

  return (
    <>
      <Placeholder
        icon={<Icon />}
        header="Немного лирики"
        className="base-placeholder"
        action={
          <Button size="m" onClick={() => toModal("modal")}>
            Нажми на меня
          </Button>
        }
      >
        <Text
          style={{
            marginBottom: 24,
            color: "var(--vkui--color_text_secondary)",
          }}
        >
          Прежде чем описание станет хорошим, его необходимо написать. Не правда
          ли?
        </Text>
      </Placeholder>
    </>
  );
};

export default Home;
