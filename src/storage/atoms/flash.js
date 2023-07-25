import { atom } from "recoil";

const flash_info = atom({
  key: "flash",
  default: [
    {
      is_available: false,
      level: 0,
    },
  ],
});

export default flash_info;
