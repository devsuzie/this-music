import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import ky from "ky";

export type SearchedMusic = {
  albumId: string;
  artist: string;
  id: string;
  title: string;
  albumCover: string;
};

enum ACTION_TYPES {
  CLEAR = "CLEAR",
  FETCH_MUSIC = "FETCH_MUSIC",
  SET_QUERY = "SET_QUERY",
}

type Action =
  | { type: ACTION_TYPES.CLEAR }
  | { type: ACTION_TYPES.FETCH_MUSIC; musics: SearchedMusic[] }
  | { type: ACTION_TYPES.SET_QUERY; query: Query };

type Query = {
  music: string;
};

interface State {
  musics: SearchedMusic[];
  query: Query;
}

const INITIAL_STATE: State = {
  musics: [],
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
    case ACTION_TYPES.FETCH_MUSIC:
      return {
        ...prevState,
        musics: action.musics,
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

export const useSearchMusicContext = () => {
  const { state, dispatch } = useContext(Context);

  const clear = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.CLEAR,
    });
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
    fetchMusic,
    setQuery,
  };
};