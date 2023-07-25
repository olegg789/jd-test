import { Group, Header, Cell, InitialsAvatar } from "@vkontakte/vkui";
import { useRecoilState } from "recoil";
import users_placeholder from "../../storage/atoms/users";

const Friends = ({}) => {
  const [users] = useRecoilState(users_placeholder);

  return (
    <Group
      header={
        <Header mode="primary" indicator={7}>
          Друзья
        </Header>
      }
    >
      {users.map((user) => {
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
    </Group>
  );
};

export default Friends;
