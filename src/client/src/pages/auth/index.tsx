import { useEffect, useContext } from "react";
import axios from "axios";
import { config } from "../../config";
import { UserContext, UserContextType } from "../../context/UserContext";

export function Auth() {
  const { login } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(config.DOMAIN + "/auth/@me", {
          withCredentials: true,
        });
        login(data.user);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  return <></>;
}
