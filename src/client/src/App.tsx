import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Profile, Shop, Home, Navbar } from './pages';
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/@me" />
          <Route element={<Shop />} path="/shop" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
