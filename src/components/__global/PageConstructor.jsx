import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { useRouterBack } from "@kokateam/router-vkminiapps";

import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import { getIsDesktop } from "/src/storage/selectors/main";

const Page = ({
  children,
  id,
  className = "",
  centered = false,
  before = "",
  name = "",
  buttonIcon = undefined,
  action = () => {},
}) => {
  const isDesktop = useRecoilValue(getIsDesktop);
  const toBack = useRouterBack();

  return (
    <Panel
      id={id}
      centered={centered}
      className={`${!isDesktop ? "DivFix" : undefined} ${className}`}
    >
      <PanelHeader
        before={
          before === "toBack" ? (
            <PanelHeaderBack onClick={() => toBack(-1)} />
          ) : before === "button" ? (
            <PanelHeaderButton
              onClick={action}
              style={{ background: "transparent" }}
            >
              {buttonIcon}
            </PanelHeaderButton>
          ) : undefined
        }
        separator={isDesktop}
      >
        {name}
      </PanelHeader>
      <div className={isDesktop ? "" : "p5"}>
        <Suspense fallback={""}>{children}</Suspense>
      </div>
    </Panel>
  );
};

export default Page;
