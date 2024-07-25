import adminTemplate from "../../views/admin_template.html?raw";
import products from "../../views/admin_products.html?raw";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
export function AdminHome() {
  document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = products;
  getDataProducts().then(function (data) {
    // console.log(data);
    document.getElementById("tbody-products").innerHTML = data;
  });
  Adduser();
}

function setvalue() {
  document.getElementById("newName").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newDetail").value = "";
  document.getElementById("newImg").value = "";
  document.getElementById("newId").value = "";
}

let buildTr = ({ name, detail, price, image, id }, key) => {
  return ` <tr>
        <th scope="row">${name}(${id})</th>
        <td>${detail}</td>
        <td>${price}</td>
        <td>${image}</td>
        <td>
        <button id="edit_${key}" type="button" class="btn btn-outline-primary btn-edit-pr">Edit</button>
        <button id="delete_${key}" type="button" class="btn btn-outline-danger btn-delete-pr">Delete</button>
        </td>
      </tr>`;
};

async function getDataProducts() {
  let respone = await axios.get(
    "https://fir-25551-default-rtdb.firebaseio.com/products.json"
  );
  let stringHtml = "";
  for (const key in respone.data) {
    if (Object.hasOwnProperty.call(respone.data, key)) {
      const element = respone.data[key];
      stringHtml += buildTr(element, key);
    }
  }
  // respone.data.forEach((element) => {
  //   stringHtml += buildTr(element);
  // });
  return stringHtml;
}

function handleAddUser(newPr) {
  fetch("https://fir-25551-default-rtdb.firebaseio.com/products.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPr),
  })
    .then((response) => {
      if (response.ok) {
        alert("Pr added successfully!");
        // You may want to refresh the user list or perform other actions after adding
        // getDataProducts();
        location.reload();
        setvalue();
      } else {
        alert("Failed to add Pr.");
      }
    })
    .catch((error) => {
      console.error("Error adding Pr:", error);
      alert("Failed to add Pr. Please try again later.");
    });
}

// Function to handle editing a user
function handleEditUser(userId, updatedUserData) {
  fetch(
    `https://fir-25551-default-rtdb.firebaseio.com/products/${userId}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("User updated successfully!");
        // You may want to refresh the user list or perform other actions after updating
        // getDataProducts();
        location.reload();
        setvalue();
      } else {
        alert("Failed to update user.");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again later.");
    });
}

// Function to handle deleting a user
function handleDeleteUser(userId) {
  // console.log(userId);
  fetch(
    `https://fir-25551-default-rtdb.firebaseio.com/products/${userId}.json`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("User deleted successfully!");
        // getDataProducts();
        location.reload();
        setvalue();
      } else {
        alert("Failed to delete user.");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again later.");
    });
}

// Event listener for adding a new user
function Adduser() {
  document
    .getElementById("addUserButton")
    .addEventListener("click", function () {
      const newPr = {
        name: document.getElementById("newName").value,
        price: document.getElementById("newPrice").value,
        detail: document.getElementById("newDetail").value,
        image: document.getElementById("newImg").value,
        cate_id: document.getElementById("newIdct").value,
        id: document.getElementById("newId").value,
      };
      handleAddUser(newPr);
    });
}

// Event listener for editing a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-edit-pr")) {
    const userId = event.target.id.split("_")[1];
    const updatedUserData = {
      name: prompt("Enter new name"),
      price: prompt("Enter new Price"),
      detail: prompt("Enter new Detail"),
      image: prompt("Enter New image"),
      id: prompt("enter new ID"),
    };
    handleEditUser(userId, updatedUserData);
  }
});

// Event listener for deleting a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete-pr")) {
    console.log(event.target);
    const userId = event.target.id.split("_")[1];
    handleDeleteUser(userId);
  }
});
