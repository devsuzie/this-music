import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  Reducer,
} from "react";

type Action =
  | { type: ACTION_TYPES.FINISH; loading: boolean }
  | { type: ACTION_TYPES.START; loading: boolean };

enum ACTION_TYPES {
  FINISH = "FINISH",
  START = "START",
}

interface State {
  loading: boolean;
}

const INITIAL_STATE: State = {
  loading: false,
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.FINISH:
      return {
        ...prevState,
        loading: action.loading,
      };
    case ACTION_TYPES.START:
      return {
        ...prevState,
        loading: action.loading,
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

export const useLoadingStore = () => {
  const { state, dispatch } = useContext(Context);

  const finishLoading = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.FINISH,
      loading: false,
    });
  }, [dispatch]);

  const startLoading = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.START,
      loading: true,
    });
  }, [dispatch]);

  return {
    state,
    finishLoading,
    startLoading,
  };
};
