import { Link } from "react-router-dom";
import { UserInterface } from "../../interfaces/@types.users";
import UserAvatar from "../lib/UserAvatar";
const NavItems = ({ user }: { user: UserInterface | null }) => {
    return (
        <div className="nav-items-container flex">
            <div className="nav-items">
                <Link to="/shop">Shop</Link>
            </div>
            <div className="nav-items">
                <Link to="/add-funds">Add Funds</Link>
            </div>
            <div className="nav-items">
                {
                    user ? <Link to="/@me">
                        <div className="nav-profile flex">
                            <span>{user.username}#{user.discriminator}</span>
                            <UserAvatar user={user} />
                        </div>
                    </Link> : <Link to="/login">Login</Link> 
                }
            </div>
        </div>
    )
};

export default NavItems;