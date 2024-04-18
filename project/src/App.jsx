import Nav from "./components/Nav";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import FavouritePosts from "./pages/FavouritePosts";
import UserPosts from "./pages/UserPosts";
import Page404 from "./pages/Page404";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { registered } = useContext(Context);
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
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
