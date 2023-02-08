import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Profile, Shop, Home, Navbar, Auth } from "./pages";
import "./pages/styles/css/index.css";
import { useEffect } from "react";
import { config } from "./config";
import { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { UserContext, UserContextType } from "./context/UserContext";

export const Login = () => {
  useEffect(() => {
    window.location.href = config.DOMAIN + "/auth/login";
  }, []);
  return <></>;
};

function App() {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    <Router>
      <Navbar user={user}/>
      <Auth />
      <div className="app-wrapper">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile user={user} />} path="/@me" />
          <Route element={<Shop />} path="/shop" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
