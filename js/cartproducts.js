//التعريفات الاساسية
let userInfo = document.getElementById("userInfo");
let userInfoName = document.getElementById("userInfoName");
let user = JSON.parse(localStorage.getItem("user"));
let linksHome = document.getElementById("linksHome")
let logoutButton = document.getElementById("logoutButton");
let productsCartContainer= document.getElementById("productsCartContainer");
let faveProductsContainer= document.getElementById("productsFaveContainer");
let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let productDetailsModal = document.getElementById("productDetailsModal");
let closeDetailsButton = document.getElementById("closeDetailsButton");
let detailsProductImage = document.getElementById("detailsProductImage");
let detailsProductName = document.getElementById("detailsProductName");
let detailsProductTitle = document.getElementById("detailsProductTitle");
let detailsProductPrice = document.getElementById("detailsProductPrice");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let faveProducts = JSON.parse(localStorage.getItem("faveProducts")) || [];

searchButton.addEventListener("click", () => {
    searchBox.classList.toggle("is-open");
    if (searchBox.classList.contains("is-open")) {
        searchInput.focus();
    } else {
        searchInput.value = "";
        renderProducts();
        renderFaveProducts();
    }
});

searchInput.addEventListener("input", () => {
    renderProducts();
    renderFaveProducts();
});

function matchesSearch(item) {
    let searchValue = searchInput.value.trim().toLowerCase();
    return item.name.toLowerCase().includes(searchValue) ||
        item.title.toLowerCase().includes(searchValue);
}

function showProductDetails(id) {
    let product = [...cartProducts, ...faveProducts].find(item => item.id === id);
    if (!product) return;
    detailsProductImage.src = product.image;
    detailsProductImage.alt = product.name;
    detailsProductName.textContent = product.name;
    detailsProductTitle.textContent = product.title;
    detailsProductPrice.textContent = `${product.price}$`;
    productDetailsModal.classList.add("is-visible");
    productDetailsModal.setAttribute("aria-hidden", "false");
}

function closeProductDetails() {
    productDetailsModal.classList.remove("is-visible");
    productDetailsModal.setAttribute("aria-hidden", "true");
}

closeDetailsButton.addEventListener("click", closeProductDetails);
productDetailsModal.addEventListener("click", event => {
    if (event.target === productDetailsModal) closeProductDetails();
});
//تفعيل الاحساب عن طريق التاكد من الذاكره المحلية


if(user){
    userInfo.classList.remove("hidden");
    linksHome.classList.add("hidden");
    userInfoName.textContent = user.userName;
}
//رسالة الفراغ
const showEmptyCartMessage = () => {
    return `<p class="text-3xl p-5 font-bold text-red-500">your cart is empty</p>`;
}
const showEmptyFaveMessage = () => {
    return `<p class="text-3xl p-5 font-bold text-red-500">your favorite products are empty</p>`;
}
const showNoSearchResults = () => {
    let searchValue = searchInput.value.trim();
    return `<p class="no-results col-span-full text-center text-xl font-bold text-white p-8">No products found for "${searchValue}"</p>`;
}
//رندرت العناصر والمنتجات للصفحه الرائيسية
function renderProducts(){
    let filteredCartProducts = cartProducts.filter(matchesSearch);
    let x = filteredCartProducts.map((item) => {
        return`
            <div class="product-item min-w-72 min-h-72 flex flex-col justify-between p-2 hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-lg shadow-lg bg-white">
                <div class="imge-item min-w-1/2 min-h-1/4 m-auto">
                    <img src="${item.image}" alt="" class="object-cover h-full w-full">
                </div>
                <div class="decl-item px-3 py-2">
                    <h2 class="text-black text-xl font-bold ">
                        ${item.name}
                    </h2>
                    <p class="text-cyan-800 font-medium text-lg">
                        ${item.title}
                    </p>
                    <span class="text-2xl italic text-emerald-500 font-bold my-2">
                        ${item.price}$
                    </span>
                </div>
                <div class ="flex flex-col justify-center items-center gap-2">
                <button class="details-button" type="button" onclick="showProductDetails(${item.id})">Details</button>
                <div class="w-16 h-8 rounded-xl px-2 py-1 flex justify-between items-center ">
                <button class="flex items-center justify-center text-xl font-bold active:text-blue-600 cursor-pointer hover:text-green-500 addOne" onclick="addOneMore(${item.id})">+</button>
                <div class="flex items-center justify-center text-xl font-bold text-green-500" >${item.qyn}</div>
                <button class="flex items-center justify-center text-xl font-bold active:text-blue-600 cursor-pointer hover:text-green-500 removeOne" onclick="removeOneMore(${item.id})">-</button>
                </div>
                <button class="w-16 h-8 text-white bg-red-500  font-bold rounded-2xl ItemCartBtn" onclick="deleteTheItem(${item.id})">Remove</button>
                </div>
                    
            </div>
        `;
    }).join("");
    productsCartContainer.innerHTML = x;
    if(cartProducts.length <= 0) {
        productsCartContainer.innerHTML = showEmptyCartMessage();
    } else if(filteredCartProducts.length <= 0) {
        productsCartContainer.innerHTML = showNoSearchResults();
    }
}
renderProducts();
//حذف عنصر واحد من السلة
function deleteTheItem(id){
    let productIndex = cartProducts.findIndex(item => item.id === id);
    if(productIndex !== -1) {
        cartProducts.splice(productIndex, 1);
    }
    // تحديث localStorage
    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );
    renderProducts();
}
//اضافة وازالة العناصر من السلة
function addOneMore (id){
    let choose = cartProducts.find(item => item.id === id)
    choose.qyn += 1 ; 
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderProducts()
}
function removeOneMore(id){
    let choose = cartProducts.find(item => item.id === id)
    choose.qyn -= 1 ; 
    if(choose.qyn === 0){
        let productIndex = cartProducts.findIndex(item => item.id === id);
        cartProducts.splice(productIndex, 1);
    }
    renderProducts();
    
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    
}
//عناصر المفضله رندرتها
function renderFaveProducts(){
    let filteredFaveProducts = faveProducts.filter(matchesSearch);
    let x = filteredFaveProducts.map((item) => {
        return`
            <div class="product-item min-w-72 min-h-72 flex flex-col justify-between p-2 hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-lg shadow-lg bg-white">
                <div class="imge-item min-w-1/2 min-h-1/4 m-auto">
                    <img src="${item.image}" alt="" class="object-cover h-full w-full">
                </div>
                <div class="decl-item px-3 py-2">
                    <h2 class="text-black text-xl font-bold ">
                        ${item.name}
                    </h2>
                    <p class="text-cyan-800 font-medium text-lg">
                        ${item.title}
                    </p>
                    <span class="text-2xl italic text-emerald-500 font-bold my-2">
                        ${item.price}$
                    </span>
                </div>

                <div class ="flex flex-col justify-center items-center gap-2">
                <button class="details-button" type="button" onclick="showProductDetails(${item.id})">Details</button>
                <button class="w-16 h-8 text-white bg-red-500  font-bold rounded-2xl ItemCartBtn" onclick="deleteTheItemFave(${item.id})">Remove</button>
                </div>
                    
            </div>
        `;
    }).join("");
    faveProductsContainer.innerHTML = x;
    if(faveProducts.length <= 0) {
        faveProductsContainer.innerHTML = showEmptyFaveMessage();
    } else if(filteredFaveProducts.length <= 0) {
        faveProductsContainer.innerHTML = showNoSearchResults();
    }
}
renderFaveProducts();
//حذف عنصر واحد من المفضل
function deleteTheItemFave(id){
    let productIndex = faveProducts.findIndex(item => item.id === id);
    if(productIndex !== -1) {
        faveProducts.splice(productIndex, 1);
    }
    // تحديث localStorage
    localStorage.setItem(
        "faveProducts",
        JSON.stringify(faveProducts)
    );
    renderFaveProducts();
}
// عملية تسجيل الخروح

logoutButton.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(()=>{window.location = "index.html"},200)
})