import { Icon28LightbulbOutline } from "@vkontakte/icons";
import {
  Cell,
  Group,
  Switch,
  Tooltip,
  TooltipContainer,
} from "@vkontakte/vkui";
import { useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { TextTooltip } from "@vkontakte/vkui/dist/unstable";

const Flash = ({ flash, setFlash }) => {
  async function changeFlashLevel() {
    if (flash.level === 0) {
      await bridge.send("VKWebAppFlashSetLevel", { level: 1 });
      let new_flash = flash;
      new_flash.level = 1;
      setFlash(new_flash);
    } else {
      await bridge.send("VKWebAppFlashSetLevel", { level: 0 });
      let new_flash = flash;
      new_flash.level = 0;
      setFlash(new_flash);
    }
  }

  return (
    <Group>
      <Cell
        style={{ paddingLeft: 12, paddingRight: 12 }}
        disabled
        before={<Icon28LightbulbOutline />}
        subtitle={
          flash.is_available
            ? "На телефоне включится фонарик"
            : "Функция не поддерживается"
        }
        after={
          <Switch
            onClick={() => changeFlashLevel()}
            disabled={!flash.is_available}
          />
        }
      >
        Больше света!
      </Cell>
    </Group>
  );
};

export default Flash;
