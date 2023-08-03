import { atom } from "recoil";

const user_info = atom({
  key: "user",
  default: {
    id: null,
    photo_max_orig: "https://vk.com/images/camera_200.png",
    first_name: "Загрузка...",
    last_name: "",
    city: {
      title: null,
    },
  },
});

export default user_info;
