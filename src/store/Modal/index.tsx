import React, { createContext, ReactNode, Reducer, useReducer } from "react";
import { useContext } from "react";

enum ACTION_TYPES {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

type Action =
  | { type: ACTION_TYPES.OPEN_MODAL; component: any[] }
  | { type: ACTION_TYPES.CLOSE_MODAL };

interface State {
  modals: any[];
}

const INITIAL_STATE: State = {
  modals: [],
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_MODAL:
      return {
        ...prevState,
        modals: [...prevState.modals, action.component],
      };
    case ACTION_TYPES.CLOSE_MODAL:
      return {
        ...prevState,
        modals: [...prevState.modals.slice(0, -1)],
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

export const useModalStore = () => {
  const { state, dispatch } = useContext(Context);

  const openModal = (component: any) => {
    dispatch({ type: ACTION_TYPES.OPEN_MODAL, component });
  };

  const closeModal = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_MODAL });
  };

  return {
    state,
    openModal,
    closeModal,
  };
};
