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
  playlist?: string;
  date: string;
  text?: string;
};

enum ACTION_TYPES {
  CREATE = "CREATE",
  FETCH_ALL = "FETCH_ALL",
}

type Action =
  | { type: ACTION_TYPES.CREATE }
  | { type: ACTION_TYPES.FETCH_ALL; musics: Music[] };

interface State {
  musics: Music[];
}

const INITIAL_STATE: State = {
  musics: [],
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

  const fetchAll = useCallback(() => {
    try {
      const musics = server.fetchAll();

      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        musics,
      });
    } catch (e) {
      throw e;
    }
  }, [dispatch]);

  const fetchById = useCallback((id) => {
    return server.fetchById(id);
  }, []);

  return {
    state,
    create,
    fetchAll,
    fetchById,
  };
};
