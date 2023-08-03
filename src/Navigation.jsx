import { PanelHeader, SplitCol, SplitLayout } from "@vkontakte/vkui";
import { Epic, View, useRouterPopout } from "@kokateam/router-vkminiapps";

import { PageConstructor } from "/src/components/__global";
import { DesktopNavigation, MobileNavigation } from "./components/__navigation";

import Home from "./components/home/base";
import Profile from "./components/profile/base";
import MainStack from "./components/__modals/MainStack";
import { Icon28MoonOutline, Icon28SunOutline } from "@vkontakte/icons";
import Header from "./components/__global/Header";
import FriendsPanel from "./components/profile/friends_panel";

const Navigation = ({ isDesktop, theme, setTheme }) => {
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
            <PageConstructor id={"home"} name={<Header />}>
              <Home />
            </PageConstructor>
          </View>

          <View id="profile">
            <PageConstructor
              id={"profile"}
              name={<Header />}
              before="button"
              buttonIcon={
                theme === "light" ? <Icon28MoonOutline /> : <Icon28SunOutline />
              }
              action={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Profile />
            </PageConstructor>

            <PageConstructor id={"friends"} name={"Друзья"} before={"toBack"}>
              <FriendsPanel />
            </PageConstructor>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default Navigation;
