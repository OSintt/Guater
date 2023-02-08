import { UserInterface } from "../../interfaces/@types.users";
import UserAvatar from "../lib/UserAvatar";
import { Login } from "../../App";
import dayjs from "dayjs";
import '../styles/css/profile.css';

export const Profile = ({ user }: { user: UserInterface | null }) => {
  if (!user) return <Login />;
  return (
    <div className="profile-container">
      <div className="profile-basic-info flex">
        <div className="profile-avatar">
          <UserAvatar user={user} />
        </div>
        <div className="profile-data">
          <h1>{user.mc_nick}OSintMC</h1>
          <h2>
            {user.username}#{user.discriminator}
          </h2>
        </div>
      </div>
      <div className="profile-stats">
        <h2>Rango {user.rango ? user.rango.title : "Iniciante"}</h2>
        <p>
          <b>Miembro desde:</b> {dayjs(user.date).format("DD/MM/YYYY")}
        </p>
        <p>
          <b>Fondos actuales:</b> {String(user.funds)}
        </p>
        <p>
          <b>Rango:</b> 
        </p>
      </div>
    </div>
  );
};
