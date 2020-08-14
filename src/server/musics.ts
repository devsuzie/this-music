import { Music } from "@/store/Musics";
import { Playlist } from "@/store/Playlists";

export const create = (music: Music) => {
  const response = localStorage.getItem("musics");
  const musics = response ? JSON.parse(response) : [];
  musics.push(music);

  return localStorage.setItem("musics", JSON.stringify(musics));
};

export const fetchAll = (playlist: Playlist) => {
  const response = localStorage.getItem("musics");
  const musics = response && JSON.parse(response);

  if (playlist.id === "0") {
    return musics;
  } else {
    return musics.filter((m: Music) => m.playlist?.id === playlist.id);
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
  { playlist, date, text }: { playlist: Playlist; date: string; text: string }
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
