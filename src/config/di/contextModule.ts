import { createContext } from "react";
import User from "../../domain/user/user";

const UserContext = createContext<User | undefined>(undefined)

export const useUserContextProvider = ()=> UserContext.Provider;
export const useUserContextConsumer = ()=> UserContext.Consumer;