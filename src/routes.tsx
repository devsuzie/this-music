import Home from "./pages/Home";
import AddMusic from "./pages/AddMusic";

export default [
  {
    component: AddMusic,
    exact: true,
    fluid: true,
    name: "AddMusic",
    nav: true,
    path: "/add-music",
    private: true,
  },
  {
    component: Home,
    exact: true,
    fluid: true,
    name: "Home",
    nav: true,
    path: "/",
    private: true,
  },
];
