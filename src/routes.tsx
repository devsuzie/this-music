import Home from "./pages/Home";
import AddMusic from "./pages/AddMusic";
import Playground from "./pages/playground";

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
  {
    component: Playground,
    exact: true,
    fluid: true,
    name: "playground",
    nav: true,
    path: "/playground",
    private: true,
  },
];
