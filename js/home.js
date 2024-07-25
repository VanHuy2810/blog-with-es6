import userTemplate from "../views/user_template.html?raw";
import homepage from "../views/home.html?raw";
import axios from "axios";

function buildProduct({ name, detail, price, image }) {
  return `<div class="col-lg-3 col-md-6" style=" margin-bottom : 10px;  padding: 20px; border-radius: 5px;">
  <div class="coffee_img"><img src="images/img-${image}.png"></div>
  <h1 class="types_text">${name}</h1>
  <h3>Price : ${price}</h3>
  <p class="looking_text">${detail}</p>
  <div class="read_bt"><a href="#">Read More</a></div>
</div>`;
}

async function getDataProducts() {
  let respone = await axios.get(
    "https://fir-25551-default-rtdb.firebaseio.com/products.json"
  );
  // console.log(respone);
  let stringHtml = "";
  for (const key in respone.data) {
    if (Object.hasOwnProperty.call(respone.data, key)) {
      const element = respone.data[key];
      stringHtml += buildProduct(element);
    }
  }
  // respone.data.forEach((element) => {
  //   stringHtml += buildProduct(element);
  // });
  return stringHtml;
}

export function BuildHome() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = homepage;
  getDataProducts().then(function (data) {
    // console.log(data);
    document.getElementById("buildpr").innerHTML = data;
  });
  displayUsers();
}

function displayUsers() {
  fetch("https://fir-25551-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((users) => {
      let userTableBody = "";
      for (const key in users) {
        if (users.hasOwnProperty(key)) {
          const userData = users[key];
          userTableBody += buildUs(userData, key);
        }
      }
      document.getElementById("buildcus").innerHTML = userTableBody;

      // Add event listeners for edit and delete buttons after rendering the user table
      // handleDeleteUser();
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again later.");
    });
}

function buildUs({ id, username, user, email }) {
  return `<div class="client_taital_main">
  <div class="client_left">
      <div class="client_img"><img src="images/client-img${
        Math.floor(Math.random() * 3) + 1
      }.png"></div>
  </div>
  <div class="client_right">
      <h3 class="moark_text">${username}(${id})</h3>
      <p class="client_text">${user} </p>
  </div>
</div>`;
}
