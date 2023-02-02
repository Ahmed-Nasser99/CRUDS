// var for inputs

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sub = document.getElementById("sub");
let mood = "create";
let aIndex;
// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#1b8a52";
  } else {
    total.innerHTML = "";
    total.style.background = "#bd271c";
  }
}

// create prodct

let arrPro = [];

if (localStorage.getItem("product") != null) {
  arrPro = JSON.parse(localStorage.getItem("product"));
  readproduct();
} else {
  arrPro = [];
}
sub.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          arrPro.push(newPro);
        }
      } else {
        arrPro.push(newPro);
      }
    } else {
      arrPro[aIndex] = newPro;
      mood = "create";
      count.style.display = "block";
      sub.innerText = "Create";
    }
  }

  localStorage.setItem("product", JSON.stringify(arrPro));

  cleardata();
  readproduct();
};
// clear inputs
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// show data
function readproduct() {
  getTotal();
  var saveProduct = ``;
  for (let i = 0; i < arrPro.length; i++) {
    saveProduct += `
    <tr>
    <td>${i + 1}</td>
    <td>${arrPro[i].title}</td>
    <td>${arrPro[i].price}</td>
    <td>${arrPro[i].taxes}</td>
    <td>${arrPro[i].ads}</td>
    <td>${arrPro[i].discount}</td>
    <td>${arrPro[i].total}</td>
    <td>${arrPro[i].category}</td>
    <td><Button id="update" onclick= "updatproduct(${i})">Udate</Button></td>
    <td><Button onclick ='deleteProduct(${i})' id="delete">Delete</Button></td>
    </tr>
    `;
  }
  document.getElementById("demo").innerHTML = saveProduct;
  if (arrPro.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
    <Button onclick = 'deleteAll()'>Delete All (${arrPro.length})</Button
    `;
  } else {
    document.getElementById("deleteAll").innerHTML = ``;
  }
}
// delete
function deleteProduct(index) {
  arrPro.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(arrPro));
  readproduct();
}

function deleteAll() {
  localStorage.clear();
  arrPro.splice(0);
  readproduct();
}
// udate
function updatproduct(index) {
  title.value = arrPro[index].title;
  price.value = arrPro[index].price;
  taxes.value = arrPro[index].taxes;
  ads.value = arrPro[index].ads;
  discount.value = arrPro[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = arrPro[index].category;
  sub.innerHTML = "Update";
  mood = "update";
  aIndex = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id === "search-by-title") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  readproduct();
}

function searcData(value) {
  let saveProduct = ``;
  if (searchMood == "title") {
    for (let i = 0; i < arrPro.length; i++) {
      if (arrPro[i].title.includes(value.toLowerCase())) {
        saveProduct += `
          <tr>
          <td>${i + 1}</td>
          <td>${arrPro[i].title}</td>
          <td>${arrPro[i].price}</td>
          <td>${arrPro[i].taxes}</td>
          <td>${arrPro[i].ads}</td>
          <td>${arrPro[i].discount}</td>
          <td>${arrPro[i].total}</td>
          <td>${arrPro[i].category}</td>
          <td><Button id="update" onclick= "updatproduct(${i})">Udate</Button></td>
          <td><Button onclick ='deleteProduct(${i})' id="delete">Delete</Button></td>
          </tr>
          `;
      }
    }
  } else {
    for (let i = 0; i < arrPro.length; i++) {
      if (arrPro[i].category.includes(value.toLowerCase())) {
        saveProduct += `
        <tr>
        <td>${i + 1}</td>
        <td>${arrPro[i].title}</td>
        <td>${arrPro[i].price}</td>
        <td>${arrPro[i].taxes}</td>
        <td>${arrPro[i].ads}</td>
        <td>${arrPro[i].discount}</td>
        <td>${arrPro[i].total}</td>
        <td>${arrPro[i].category}</td>
        <td><Button id="update" onclick= "updatproduct(${i})">Udate</Button></td>
        <td><Button onclick ='deleteProduct(${i})' id="delete">Delete</Button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("demo").innerHTML = saveProduct;
}
