import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register";
import Login from "../views/Login";
import Country from "../views/Country";
import Play from "../views/Play";
import submitQuestion from "../views/submitQuestion";
import Profile from "../views/Profile";
import Ranking from "../views/Ranking";
import Administrate from "../views/Administrate";
import reviewQuestions from "../components/reviewQuestions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin/countries",
    name: "AdministrateCountries",
    component: Country
  },
  {
    path: "/admin/questions",
    name: "AdministrateQuestions",
    component: reviewQuestions
  },
  {
    path: "/play",
    name: "Play",
    component: Play
  },
  {
    path: "/submit-question",
    name: "Submitquestion",
    component: submitQuestion
  },
  {
    path: "/profile",
    name:"Profile",
    component: Profile
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking
  },
  {
    path: "/administrate",
    name: "Administrate",
    component: Administrate
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
