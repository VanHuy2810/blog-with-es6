import userTemplate from "../views/user_template.html?raw";
import blogpage from "../views/blog.html?raw";

export function BuildBlog() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = blogpage;
}
