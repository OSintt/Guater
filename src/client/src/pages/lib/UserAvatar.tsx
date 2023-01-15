import { UserInterface } from "../../interfaces/@types.users";
import def_pfp from "../assets/def_pfp.png";

const UserAvatar = ({ user }: { user: UserInterface }) => {
  return (
    <img src={user.avatarURL ? `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatarURL}` : String(def_pfp)} alt={String(user.username)} />
  );
};

export default UserAvatar;
