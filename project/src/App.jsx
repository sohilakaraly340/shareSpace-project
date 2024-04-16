import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import FavouritePosts from "./components/FavouritePosts";
import UserPosts from "./components/UserPosts";
function App() {
  const NavWrapper = () => {
    const location = useLocation();

    if (location.pathname !== "/register" && location.pathname !== "/login") {
      return <Nav />;
    } else {
      return null;
    }
  };

  return (
    <>
      <BrowserRouter>
        <NavWrapper />
        <Toaster />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<UserPosts />} />
            <Route path="posts" element={<UserPosts />} />
            <Route path="favourite" element={<FavouritePosts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
