import { Music } from "@/store/Musics";

export const create = (music: Music) => {
  const response = localStorage.getItem("musics");
  const musics = response ? JSON.parse(response) : [];
  musics.push(music);

  return localStorage.setItem("musics", JSON.stringify(musics));
};

export const fetchAll = () => {
  const response = localStorage.getItem("musics");
  const musics = response && JSON.parse(response);

  return musics;
};
