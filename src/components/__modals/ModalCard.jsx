import { Text, List, Cell } from "@vkontakte/vkui";
import {
  Icon28BillSeparatedOutline,
  Icon28IncognitoOutline,
  Icon28TagOutline,
} from "@vkontakte/icons";

const MyModalCard = ({}) => {
  return (
    <>
      <Text
        style={{
          marginBottom: 24,
          color: "var(--vkui--color_text_secondary)",
          textAlign: "center",
        }}
      >
        Короткое описание, а может и не короткое
      </Text>
      <List>
        <Cell
          before={<Icon28TagOutline />}
          subtitle="Короткое описание"
          disabled
          className="p0"
        >
          Number one
        </Cell>
        <Cell
          before={<Icon28BillSeparatedOutline />}
          subtitle="Короткое описание"
          disabled
          style={{ padding: 0 }}
        >
          Number two
        </Cell>
        <Cell
          before={<Icon28IncognitoOutline />}
          subtitle="Елочка гори"
          disabled
          style={{ padding: 0 }}
        >
          Number three
        </Cell>
      </List>
    </>
  );
};

export default MyModalCard;
