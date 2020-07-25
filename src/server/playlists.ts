import { Playlists } from "@/store/Playlists";

export const createPlaylist = (playlist: Playlists) => {
  const response = localStorage.getItem("playlist");
  const playlists = response ? JSON.parse(response) : [];
  playlists.push(playlist);

  return localStorage.setItem("playlist", JSON.stringify(playlists));
};

export const fetchPlaylists = () => {
  const response = localStorage.getItem("playlist");
  const playlists = response && JSON.parse(response);

  return playlists;
};
