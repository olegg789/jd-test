import { Group, Header, Cell, InitialsAvatar, Button } from "@vkontakte/vkui";
import { useRecoilState } from "recoil";
import users_placeholder from "../../storage/atoms/users";
import { Icon28AddOutline } from "@vkontakte/icons";
import { useRouterPanel } from "@kokateam/router-vkminiapps";

const Friends = ({}) => {
  const { toPanel } = useRouterPanel();

  const [users] = useRecoilState(users_placeholder);

  return (
    <Group
      header={
        <Header mode="primary" indicator={7}>
          Друзья
        </Header>
      }
    >
      {users.short.map((user) => {
        return (
          <Cell
            disabled
            style={{ paddingLeft: 12, paddingRight: 12 }}
            before={
              <InitialsAvatar size={56} gradientColor={user.color}>
                {user.initials}
              </InitialsAvatar>
            }
            subtitle={
              <>
                {user.phone} <br /> {user.email}
              </>
            }
          >
            {user.name}
          </Cell>
        );
      })}
      {users.all.length > 1 && (
        <Button
          mode="tertiary"
          stretched
          before={<Icon28AddOutline />}
          onClick={() => toPanel("friends")}
          className={"mt5"}
        >
          Показать всех друзей
        </Button>
      )}
    </Group>
  );
};

export default Friends;
