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

export const fetchById = (id: string) => {
  const response = localStorage.getItem("musics");
  const musics = response && JSON.parse(response);

  musics.forEach((m: any) => {
    if (m.id === id) {
      console.log(m);
      return m;
    }
  });
};
