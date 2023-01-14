import { createContext, useState } from "react"
import { UserInterface, Nullable, Props } from "../interfaces/@types.users"

interface UserStateInterface {
    user: Nullable<UserInterface>;
    auth: Boolean;
}

type UserContextType = {
    user: UserStateInterface;
    login: (user: UserInterface | null) => void;
    logout: () => void;

}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserStateInterface>({ user: null, auth: false });
    const login = (user: UserInterface | null) => {
        setUser({
            user,
            auth: true
        });
    }
    const logout = () => {
        setUser({
            user: null,
            auth: false
        });
    };
    return <UserContext.Provider value={{user, login, logout}}>
        {children}
    </UserContext.Provider>
}