import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import * as server from "@/server";

export type Music = {
  id: string;
  music: {
    albumCover: string;
    albumId: string;
    artist: string;
    id: string;
    title: string;
  };
  playlist?: {
    id: string;
    name: string;
  };
  date: string;
  text?: string;
};

enum ACTION_TYPES {
  CREATE = "CREATE",
  FETCH_ALL = "FETCH_ALL",
  FETCH_BY_ID = "FETCH_BY_ID",
  UPDATE = "UPDATE",
}

type Action =
  | { type: ACTION_TYPES.CREATE }
  | { type: ACTION_TYPES.FETCH_ALL; musics: Music[] }
  | { type: ACTION_TYPES.FETCH_BY_ID; musicDetail: any }
  | { type: ACTION_TYPES.UPDATE };

interface State {
  musics: Music[];
  musicDetail: Music;
}

const INITIAL_STATE: State = {
  musics: [],
  musicDetail: {
    id: "",
    music: {
      albumCover: "",
      albumId: "",
      artist: "",
      id: "",
      title: "",
    },
    playlist: {
      id: "",
      name: "",
    },
    date: "",
    text: "",
  },
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.CREATE:
      return {
        ...prevState,
      };
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...prevState,
        musics: action.musics,
      };
    case ACTION_TYPES.FETCH_BY_ID:
      return {
        ...prevState,
        musicDetail: action.musicDetail,
      };
    case ACTION_TYPES.UPDATE:
      return {
        ...prevState,
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

  const create = useCallback((music) => {
    server.create(music);
  }, []);

  const fetchAll = useCallback(
    (playlist) => {
      try {
        const musics = server.fetchAll(playlist);

        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          musics,
        });
      } catch (e) {
        throw e;
      }
    },
    [dispatch]
  );

  const fetchById = useCallback(
    (id) => {
      try {
        const musicDetail = server.fetchById(id);

        dispatch({
          type: ACTION_TYPES.FETCH_BY_ID,
          musicDetail,
        });
      } catch (e) {
        throw e;
      }
    },
    [dispatch]
  );

  const update = useCallback((id, { playlist, date, text }) => {
    server.update(id, { playlist, date, text });
  }, []);

  return {
    state,
    create,
    fetchAll,
    fetchById,
    update,
  };
};
