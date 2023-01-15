import NavBrand from "./NavBrand";
import NavItems from "./NavItems";
import '../styles/css/navbar.css';
import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";

export const Navbar = () => {
    const { user } = useContext(UserContext) as UserContextType;
    return (
        <div className="nav-container flex">
            <NavBrand />
            <NavItems user={user} />
        </div>
    )
};