// import "./style.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import "./css/responsive.css";
import Navigo from "navigo"; // When using ES modules.
const router = new Navigo("/");
import { BuildHome } from "./js/home";
import { BuildConTact } from "./js/contact";
import { BuildAbout } from "./js/about";
import { BuildBlog } from "./js/blog";
import { BuildCf } from "./js/coffes";
import { AdminHome } from "./js/admin/home";
import { Adminuser } from "./js/admin/user";

router
  .on("/", function () {
    BuildHome();
  })
  .on("/home", function () {
    BuildHome();
  })
  .on("/contact", function () {
    BuildConTact();
  })
  .on("/blog", function () {
    BuildBlog();
  })
  .on("/coffes", function () {
    BuildCf();
  })
  .on("/about", function () {
    BuildAbout();
  })
  .on("/admin", function () {
    AdminHome();
  })
  .on("/admin/userpage", function () {
    Adminuser();
  });

router.resolve();
