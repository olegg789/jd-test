import { atom } from "recoil";

const users_placeholder = atom({
  key: "users_placeholder",
  default: {
    short: [],
    all: [],
  },
});

export default users_placeholder;
