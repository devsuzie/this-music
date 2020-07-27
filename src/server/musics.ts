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

  for (const m of musics) {
    if (m.id === id) {
      return m;
    }
  }
};

export const update = (
  id: string,
  { playlist, date, text }: { playlist: string; date: string; text: string }
) => {
  const response = localStorage.getItem("musics");
  const musics = response ? JSON.parse(response) : [];

  for (const m of musics) {
    if (m.id === id) {
      m.playlist = playlist;
      m.date = date;
      m.text = text;
    }
  }

  console.log(musics);

  return localStorage.setItem("musics", JSON.stringify(musics));
};
