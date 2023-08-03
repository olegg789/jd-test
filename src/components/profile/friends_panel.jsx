import { useRecoilState } from "recoil";
import users_placeholder from "../../storage/atoms/users";
import { Cell, InitialsAvatar } from "@vkontakte/vkui";

const FriendsPanel = ({}) => {
  const [users] = useRecoilState(users_placeholder);

  return (
    <>
      {users.all.map((user) => {
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
    </>
  );
};

export default FriendsPanel;
