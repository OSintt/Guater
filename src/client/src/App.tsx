import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Profile, Shop, Home, Navbar, Auth } from "./pages";
import "./pages/styles/css/index.css";
import { useEffect } from "react";
import { config } from "./config";

function App() {
  const Login = () => {
    useEffect(() => {
      window.location.href = config.DOMAIN + "/auth/login";
    }, []);
    return <></>;
  };
  return (
    <Router>
      <Navbar />
      <Auth />
      <div className="app-wrapper">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/@me" />
          <Route element={<Shop />} path="/shop" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
