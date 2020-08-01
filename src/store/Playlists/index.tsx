import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import * as server from "@/server";

export type Playlist = {
  id: string;
  name: string;
};

enum ACTION_TYPES {
  CREATE_PLAYLIST = "CREATE_PLAYLIST",
  FETCH_PLAYLISTS = "FETCH_PLAYLISTS",
}

type Action =
  | { type: ACTION_TYPES.CREATE_PLAYLIST }
  | { type: ACTION_TYPES.FETCH_PLAYLISTS; playlists: Playlist[] };

interface State {
  playlists: Playlist[];
}

const INITIAL_STATE: State = {
  playlists: [],
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PLAYLIST:
      return {
        ...prevState,
      };
    case ACTION_TYPES.FETCH_PLAYLISTS:
      return {
        ...prevState,
        playlists: action.playlists,
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

export const usePlaylistsContext = () => {
  const { state, dispatch } = useContext(Context);

  const createPlaylist = useCallback((playlist) => {
    server.createPlaylist(playlist);
  }, []);

  const fetchPlaylists = useCallback(() => {
    try {
      const playlists = server.fetchPlaylists();

      dispatch({
        type: ACTION_TYPES.FETCH_PLAYLISTS,
        playlists,
      });
    } catch (e) {
      throw e;
    }
  }, [dispatch]);

  return {
    state,
    createPlaylist,
    fetchPlaylists,
  };
};
