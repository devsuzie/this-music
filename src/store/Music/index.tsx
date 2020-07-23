import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import ky from "ky";

export type MusicsResponse = {
  albumId: string;
  artist: string;
  id: string;
  title: string;
  albumCover: string;
};

export type Playlists = {
  id: string;
  playlist: string;
};

enum ACTION_TYPES {
  CLEAR = "CLEAR",
  CREATE_PLAYLIST = "CREATE_PLAYLIST",
  FETCH_MUSIC = "FETCH_MUSIC",
  FETCH_PLAYLISTS = "FETCH_PLAYLISTS",
  SET_QUERY = "SET_QUERY",
}

type Action =
  | { type: ACTION_TYPES.CLEAR }
  | { type: ACTION_TYPES.CREATE_PLAYLIST }
  | { type: ACTION_TYPES.FETCH_MUSIC; musics: MusicsResponse[] }
  | { type: ACTION_TYPES.FETCH_PLAYLISTS; playlists: Playlists[] }
  | { type: ACTION_TYPES.SET_QUERY; query: Query };

type Query = {
  music: string;
};

interface State {
  musics: MusicsResponse[];
  playlists: Playlists[];
  query: Query;
}

const INITIAL_STATE: State = {
  musics: [],
  playlists: [],
  query: {
    music: "",
  },
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.CLEAR:
      return INITIAL_STATE;
    case ACTION_TYPES.CREATE_PLAYLIST:
      return {
        ...prevState,
      };
    case ACTION_TYPES.FETCH_MUSIC:
      return {
        ...prevState,
        musics: action.musics,
      };
    case ACTION_TYPES.FETCH_PLAYLISTS:
      return {
        ...prevState,
        playlists: action.playlists,
      };
    case ACTION_TYPES.SET_QUERY:
      return {
        ...prevState,
        query: {
          ...action.query,
        },
      };
    default:
      return INITIAL_STATE;
  }
};

export const Context = createContext<{
  state: typeof INITIAL_STATE;
  dispatch: (action: Action) => void;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={{ dispatch, state }}>{children}</Context.Provider>
  );
};

export const useMusicsContext = () => {
  const { state, dispatch } = useContext(Context);

  const clear = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.CLEAR,
    });
  }, [dispatch]);

  const createPlaylist = useCallback((playlist) => {
    const response = localStorage.getItem("playlist");
    const playlists = response ? JSON.parse(response) : [];
    playlists.push(playlist);

    return localStorage.setItem("playlist", JSON.stringify(playlists));
  }, []);

  const fetchPlaylists = useCallback(() => {
    try {
      const response = localStorage.getItem("playlist");
      const playlists = response && JSON.parse(response);

      dispatch({
        type: ACTION_TYPES.FETCH_PLAYLISTS,
        playlists,
      });
    } catch (e) {
      throw e;
    }
  }, [dispatch]);

  const fetchMusic = useCallback(
    async ({ query }) => {
      try {
        const response = await ky.get("http://3.34.97.67:3000/search", {
          searchParams: {
            query,
          },
          credentials: "omit",
        });
        const musics = await response.json();

        dispatch({
          type: ACTION_TYPES.FETCH_MUSIC,
          musics,
        });
      } catch (e) {
        throw await e.response.json();
      }
    },
    [dispatch]
  );

  const setQuery = useCallback(
    (query: { query?: string }) => {
      try {
        dispatch({
          type: ACTION_TYPES.SET_QUERY,
          query: {
            ...state.query,
            ...query,
          },
        });
      } catch (e) {
        throw e;
      }
    },
    [dispatch, state.query]
  );

  return {
    state,
    clear,
    createPlaylist,
    fetchMusic,
    fetchPlaylists,
    setQuery,
  };
};
