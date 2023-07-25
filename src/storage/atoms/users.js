import { atom } from "recoil";

const users_placeholder = atom({
  key: "users_placeholder",
  default: [],
});

export default users_placeholder;
