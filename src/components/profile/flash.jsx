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
import { useRecoilState } from "recoil";
import flash_info from "../../storage/atoms/flash";

const Flash = ({}) => {
  const [flash, setFlash] = useRecoilState(flash_info);

  async function changeFlashLevel() {
    await bridge.send("VKWebAppFlashSetLevel", { level: Number(!flash.level) });
    setFlash({ ...flash, level: Number(!flash.level) });
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
            defaultChecked={flash.level}
          />
        }
      >
        Больше света!
      </Cell>
    </Group>
  );
};

export default Flash;
