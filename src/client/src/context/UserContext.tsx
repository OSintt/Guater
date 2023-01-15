import { createContext, useState } from "react"
import { UserInterface, Nullable, Props } from "../interfaces/@types.users"

export type UserContextType = {
    user: Nullable<UserInterface>;
    login: (user: UserInterface) => void;
    logout: () => void;

}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const login = (user: UserInterface) => {
        setUser(user);
    }
    const logout = () => {
        setUser(null);
    };
    return <UserContext.Provider value={{user, login, logout}}>
        {children}
    </UserContext.Provider>
}