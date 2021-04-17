
var productNameInput = document.getElementById("productNameInput");  //hold the whole input
var productPriceInput = document.getElementById("productPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var mainBtn = document.getElementById("mainBtn");
var allProducts;

if (localStorage.getItem("myProducts") == null) {
    allProducts = [];  //first time
}
else {
    allProducts = JSON.parse(localStorage.getItem("myProducts"));
    display();
}


function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        cate: ProductCategoryInput.value,
        desc: productDescInput.value
    };

    allProducts.push(product);
    localStorage.setItem("myProducts", JSON.stringify(allProducts));
    clearForm();
    display();
    clearForm();
};

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    ProductCategoryInput.value = "";
    productDescInput.value = "";
};

function display() {
    var cartona = "";
    for (var i = 0; i < allProducts.length; i++) {
        cartona += `<tr>
        <td>${i}</td>
        <td>${allProducts[i].name}</td>
        <td>${ allProducts[i].price} </td>
        <td> ${allProducts[i].cate} </td>
        <td> ${allProducts[i].desc} </td>
        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="  btn btn-danger">Delete</button></td>
    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
};

function deleteProduct(index) {
    allProducts.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(allProducts));
    display();
};

function searchProduct(term) {
    var container = ``;
    var cartona = ``;
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase()) == true
            || allProducts[i].cate.toLowerCase().includes(term.toLowerCase()) == true) {
            container += `<tr>
        <td>${i}</td>
        <td>${allProducts[i].name}</td>
        <td>${ allProducts[i].price}</td>
        <td> ${allProducts[i].cate}</td>
        <td>${allProducts[i].desc}</td>
        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="  btn btn-danger">delete</button></td>
    </tr>`;
        }
        else {
            cartona = `  <div>
           <p> Not found </p>
       </div>`;
        }
    }
    document.getElementById("tableBody").innerHTML = container;
    document.getElementById("notfound").innerHTML = cartona;

}

function update(index) {

    productNameInput.value = allProducts[index].name;
    productPriceInput.value = allProducts[index].price;
    ProductCategoryInput.value = allProducts[index].cate;
    productDescInput.value = allProducts[index].desc;

    mainBtn.innerHTML = "update product";

    mainBtn.setAttribute('onclick','up('+ index + ')');

 
}
function up(index) {
    
    allProducts[index].name = productNameInput.value;
    allProducts[index].price = productPriceInput.value;
    allProducts[index].cate = ProductCategoryInput.value;
    allProducts[index].desc = productDescInput.value;

    localStorage.setItem("myProducts", JSON.stringify(allProducts));
    display();
    mainBtn.innerHTML = "add product";
    mainBtn.setAttribute('onclick','addProduct()');
    clearForm();

}

    



