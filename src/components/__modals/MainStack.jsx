import { ModalRoot, useRouterModal } from "@kokateam/router-vkminiapps";

import { Button } from "@vkontakte/vkui";
import { Icon56Stars3Outline } from "@vkontakte/icons";
import {
  ModalCardConstructor,
  ModalConstructor,
} from "/src/components/__global";

import MyModalCard from "./ModalCard";

const MainStack = () => {
  const { toModal } = useRouterModal();

  return (
    <ModalRoot>
      <ModalCardConstructor
        close={() => toModal(-1)}
        title={"Это модальное окно"}
        id={"modal"}
        icon={<Icon56Stars3Outline />}
        actions={
          <Button size="l" stretched onClick={() => toModal(-1)}>
            Понятно
          </Button>
        }
      >
        <MyModalCard />
      </ModalCardConstructor>
    </ModalRoot>
  );
};

export default MainStack;
