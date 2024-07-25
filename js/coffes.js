import userTemplate from "../views/user_template.html?raw";
import coffespage from "../views/coffes.html?raw";

export function BuildCf() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = coffespage;
}
