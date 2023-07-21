import { PanelHeader, SplitCol, SplitLayout } from "@vkontakte/vkui";
import { Epic, View, useRouterPopout } from "@kokateam/router-vkminiapps";

import { PageConstructor } from "/src/components/__global";
import { DesktopNavigation, MobileNavigation } from "./components/__navigation";

import Home from "./components/home/base";
import Profile from "./components/profile/base";
import MainStack from "./components/__modals/MainStack";
import {
  Icon28LogoVk,
  Icon28LogoVkColor,
  Icon28MoonOutline,
  Icon28SunOutline,
} from "@vkontakte/icons";

const Navigation = ({
  isDesktop,
  theme,
  setTheme,
  user,
  flash,
  setFlash,
  users,
}) => {
  const { popout } = useRouterPopout();

  return (
    <SplitLayout
      header={<PanelHeader separator={false} />}
      className={"jcc"}
      modal={<MainStack />}
      popout={popout}
    >
      {isDesktop ? <DesktopNavigation /> : null}

      <SplitCol
        animate={!isDesktop}
        spaced={isDesktop}
        width={isDesktop ? "650px" : "100%"}
        maxWidth={isDesktop ? "650px" : "100%"}
      >
        <Epic tabbar={!isDesktop ? <MobileNavigation /> : null}>
          <View id="home">
            <PageConstructor
              id={"home"}
              name={
                <div className="line">
                  <Icon28LogoVkColor />
                  <span style={{ fontWeight: 500 }}>ui</span>
                </div>
              }
            >
              <Home
                user={user}
                flash={flash}
                setFlash={(data) => setFlash(data)}
                users={users}
              />
            </PageConstructor>

            <PageConstructor id={"home2"} name={"Главная 2"}>
              <Home />
            </PageConstructor>
          </View>

          <View id="profile">
            <PageConstructor
              id={"profile"}
              name={
                <div className="line">
                  <Icon28LogoVkColor />
                  <span style={{ fontWeight: 500 }}>ui</span>
                </div>
              }
              before="button"
              buttonIcon={
                theme === "light" ? <Icon28MoonOutline /> : <Icon28SunOutline />
              }
              action={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Profile
                user={user}
                flash={flash}
                setFlash={(data) => setFlash(data)}
                users={users}
              />
            </PageConstructor>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default Navigation;
