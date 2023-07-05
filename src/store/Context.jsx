import { createContext, useReducer } from "react";
import reducer from "./reducer";
export const User = createContext();

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {
    },
  });
  return <User.Provider value={{ state, dispatch }}>{children}</User.Provider>;
};
export default UserContext;
