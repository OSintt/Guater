import NavBrand from "./NavBrand";
import NavItems from "./NavItems";
import '../styles/css/navbar.css';
import { UserInterface } from "../../interfaces/@types.users";

export const Navbar = ({ user }: { user: UserInterface | null }) => {
    
    return (
        <div className="nav-container flex">
            <NavBrand />
            <NavItems user={user} />
        </div>
    )
};