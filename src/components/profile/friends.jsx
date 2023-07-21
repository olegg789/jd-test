import { Group, Header, Cell, InitialsAvatar } from "@vkontakte/vkui";

const Friends = ({ users }) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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
            style={{ paddingLeft: 12, paddingRight: 12 }}
            before={
              <InitialsAvatar size={56} gradientColor={getRandomInt(7)}>
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
