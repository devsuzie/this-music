import { Music } from "@/store/Musics";

export const create = (music: Music) => {
  const response = localStorage.getItem("musics");
  const musics = response ? JSON.parse(response) : [];
  musics.push(music);

  return localStorage.setItem("musics", JSON.stringify(musics));
};

export const fetchAll = (playlist: string) => {
  const response = localStorage.getItem("musics");
  const musics = response && JSON.parse(response);
  const selectedPlaylistMusics: Music[] = [];

  if (playlist === "") {
    return musics;
  } else {
    musics.filter((m: Music) => {
      if (m.playlist === playlist) {
        selectedPlaylistMusics.push(m);
      }
    });

    return selectedPlaylistMusics;
  }
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

  return localStorage.setItem("musics", JSON.stringify(musics));
};
