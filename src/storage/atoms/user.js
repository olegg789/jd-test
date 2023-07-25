import { atom } from "recoil";

const user_info = atom({
  key: "user",
  default: {
    id: 1,
    photo_max_orig: "https://pngicon.ru/file/uploads/cat_hungry.png",
    first_name: "Котик",
    last_name: "",
    city: {
      title: "Санкт-Петербург",
    },
  },
});

export default user_info;
