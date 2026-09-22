//التعريفات الاساسية
let userInfo = document.getElementById("userInfo");
let userInfoName = document.getElementById("userInfoName");
let user = JSON.parse(localStorage.getItem("user"));
let linksHome = document.getElementById("linksHome")
let logoutButton = document.getElementById("logoutButton");
let showCart = document.getElementById("showCart");
let cartShowMena = document.getElementById("cartShowMena");
let nameOfProducts = document.getElementById("nameOfProducts");
let proudctsContainer = document.getElementById("productsContainer");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let faveProducts = JSON.parse(localStorage.getItem("faveProducts")) || [];
let mineCart = []
let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let productDetailsModal = document.getElementById("productDetailsModal");
let closeDetailsButton = document.getElementById("closeDetailsButton");
let detailsProductImage = document.getElementById("detailsProductImage");
let detailsProductName = document.getElementById("detailsProductName");
let detailsProductTitle = document.getElementById("detailsProductTitle");
let detailsProductPrice = document.getElementById("detailsProductPrice");

searchButton.addEventListener("click", () => {
    searchBox.classList.toggle("is-open");
    if (searchBox.classList.contains("is-open")) {
        searchInput.focus();
    } else {
        searchInput.value = "";
    }
});

searchInput.addEventListener("input", renderProducts);

function showProductDetails(id) {
    let product = products.find(item => item.id === id);
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

let products = [
    {id:1, title:"Slim wireless keyboard and mouse set with compact design", qyn:0, name:"Wireless Keyboard and Mouse Combo", price:100, image:"img/1.jpg"},
    {id:2, title:"Full-size wireless keyboard and mouse with numeric keypad", qyn:0, name:"Wireless Keyboard and Mouse Set", price:200, image:"img/2.jpg"},
    {id:3, title:"Full-size keyboard and wireless mouse for home and office", qyn:0, name:"Office Keyboard and Mouse Combo", price:300, image:"img/3.jpg"},
    {id:4, title:"RGB mechanical gaming keyboard with wired gaming mouse", qyn:0, name:"RGB Mechanical Gaming Combo", price:400, image:"img/4.jpg"},
    {id:5, title:"Compact wireless keyboard and mouse for tablet and desktop", qyn:0, name:"Compact Wireless Keyboard Set", price:500, image:"img/5.jpg"},
    {id:6, title:"RGB gaming keyboard and mouse combo with programmable keys", qyn:0, name:"RGB Gaming Keyboard and Mouse", price:600, image:"img/6.jpg"},
    {id:7, title:"Mechanical gaming keyboard and ergonomic RGB mouse", qyn:0, name:"Mechanical RGB Gaming Combo", price:700, image:"img/7.jpg"},
    {id:8, title:"RGB backlit gaming keyboard and mouse with wrist rest", qyn:0, name:"RGB Gaming Keyboard with Mouse", price:800, image:"img/8.jpg"},
    {id:9, title:"Wireless office keyboard and mouse with comfortable layout", qyn:0, name:"Wireless Office Keyboard Combo", price:900, image:"img/9.jpg"},
    {id:10, title:"Full-size wireless keyboard and mouse for everyday use", qyn:0, name:"Full-Size Wireless Keyboard Set", price:1000, image:"img/10.jpg"},
    {id:11, title:"White RGB gaming keyboard and mouse with modern design", qyn:0, name:"White RGB Gaming Combo", price:1100, image:"img/11.jpg"},
    {id:12, title:"RGB backlit gaming keyboard and lightweight gaming mouse", qyn:0, name:"RGB Backlit Gaming Keyboard", price:1200, image:"img/12.jpg"},
    {id:13, title:"Quiet full-size keyboard and mouse for office computers", qyn:0, name:"Quiet Office Keyboard and Mouse", price:1300, image:"img/13.jpg"},
    {id:14, title:"RGB gaming keyboard, mouse and extended mouse pad set", qyn:0, name:"RGB Gaming Set with Mouse Pad", price:1400, image:"img/14.jpg"},
    {id:15, title:"Wired full-size keyboard and mouse for desktop computers", qyn:0, name:"Wired Keyboard and Mouse Combo", price:1500, image:"img/15.jpg"},
    {id:16, title:"High-performance desktop PC with Intel Core processor", qyn:0, name:"Gaming Desktop Computer", price:1600, image:"img/16.jpg"},
    {id:17, title:"Ergonomic racing-style chair with padded armrests", qyn:0, name:"Gaming Chair", price:1700, image:"img/17.jpg"},
    {id:18, title:"Predator gaming laptop with RGB keyboard and high-performance hardware", qyn:0, name:"Predator Gaming Laptop", price:1800, image:"img/18.jpg"},
    {id:19, title:"Over-ear gaming headset with boom microphone and green accents", qyn:0, name:"Wired Gaming Headset", price:1900, image:"img/19.jpg"},
    {id:20, title:"Gaming PC case with tempered glass and RGB cooling fans", qyn:0, name:"RGB Gaming PC Case", price:2000, image:"img/20.jpg"}
]
//function الخاصه باضافة العناصر المختاره الى السلة
function renderCartProducts() {
            y = cartProducts.map((item) => {
            return `<div class="flex items-center justify-between m-2 text-md text-center  text-black font-bold capitalize">${item.name} <div class="w-16 h-8  grid grid-cols-3 ">
            <button class="flex items-center justify-center text-xl font-bold active:text-blue-600 cursor-pointer hover:text-green-500 addOne" onclick="addOneMore(${item.id})">+</button>
            <div class="flex items-center justify-center text-xl font-bold text-green-500" >${item.qyn}</div>
            <button class="flex items-center justify-center text-xl font-bold active:text-blue-600 cursor-pointer hover:text-green-500 removeOne" onclick="removeOneMore(${item.id})">-</button>
            </div></div>
            
            
            `;
        }).join("");
        c =()=>{
            return `<p class="text-lg font-bold text-green-500">Total: $${calculateTotalPrice().toFixed(2)}</p>`
        }
        nameOfProducts.innerHTML = y + c();
    }
//رسالة التفريغ
const showEmptyCartMessage = () => {
    nameOfProducts.textContent = "your cart is empty";
};
//اضافة وازالة العناصر من السلة
function addOneMore (id){
    let choose = cartProducts.find(item => item.id === id)
    choose.qyn += 1 ; 
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderCartProducts();
    calculateTotalPrice();
    if(cartProducts.length > 0) {
        renderCartProducts();
    } else {
        showEmptyCartMessage();
}
}
function removeOneMore(id){
    let choose = cartProducts.find(item => item.id === id)
    choose.qyn -= 1 ; 
    if(choose.qyn === 0){
        let productIndex = cartProducts.findIndex(item => item.id === id);
        cartProducts.splice(productIndex, 1);
    }
    renderProducts();
    calculateTotalPrice();
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderCartProducts()
    if(cartProducts.length > 0) {
        renderCartProducts();
    } else {
        showEmptyCartMessage();
}
}
//حساب السعر الاجمالي
function calculateTotalPrice() {
    let totalPrice =  cartProducts.reduce((total, item) => {
        return total + (item.price * item.qyn);
    }, 0);
    return totalPrice;
}
//تفعيل الاحساب عن طريق التاكد من الذاكره المحلية

if(user){
    userInfo.classList.remove("hidden");
    linksHome.classList.add("hidden");
    userInfoName.textContent = user.userName;
}
//رندرت العناصر والمنتجات للصفحه الرائيسية
function renderProducts(){
    let searchValue = searchInput.value.trim().toLowerCase();
    let filteredProducts = products.filter((item) => {
        return item.name.toLowerCase().includes(searchValue) ||
            item.title.toLowerCase().includes(searchValue);
    });
    let x = filteredProducts.map((item) => {
        // هل المنتج موجود في السلة؟
        let inCart = cartProducts.some(
            cartItem => cartItem.id === item.id
        );
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
                <div class="btns flex justify-evenly items-center py-4">
                    <button class="details-button" type="button" onclick="showProductDetails(${item.id})">Details</button>
                    <button
                        class="w-16 h-10 text-white font-bold rounded-3xl ItemCartBtn
                        ${inCart ? "bg-red-500 w-20" : "bg-blue-500"}"
                        onclick="toggleCart(${item.id}, this)">
                        ${inCart ? "Remove" : "cart"}
                    </button>
                    <i class="fa-regular fa-heart text-xl cursor-pointer my-5" onclick="toggleFavorite(${item.id}, this)"></i>
                </div>
            </div>
        `;
    }).join("");
    proudctsContainer.innerHTML = x || `<p class="no-results col-span-full text-center text-xl font-bold text-white p-8">No products found for "${searchValue}"</p>`;
}
renderProducts();

//اظهار قائمة سلة المشتريات عند الضغط على ايقونة السلة
cartShowMena.addEventListener("click", function(){
    showCart.classList.toggle("hidden")
    renderCartProducts();
    if(cartProducts.length > 0) {
    renderCartProducts();
} else {
    showEmptyCartMessage();
}
})
//زر اضافة لسلة المشتريات
function toggleCart(id, btn) {
    if (!user) {
        setTimeout(() => {
            window.location = "login.html";
        }, 200);
        return;
    }
    // هل المنتج موجود بالفعل في السلة؟
    let productIndex = cartProducts.findIndex(item => item.id === id);
    // لو مش موجود → أضفه
    if (productIndex === -1) {
        let choosenItem = products.find(item => item.id === id);
        cartProducts.push(choosenItem);
        choosenItem.qyn = 1; // تعيين الكمية إلى 1 عند الإضافة لأول مرة
        btn.textContent = "Remove";
        btn.classList.remove("bg-blue-500");
        btn.classList.add("bg-red-500");
        btn.classList.add("w-20");
        renderCartProducts();
        if(cartProducts.length > 0) {
    renderCartProducts();
} else {
    showEmptyCartMessage();
}
    }
    // لو موجود → احذفه
    else {
        cartProducts.splice(productIndex, 1);
        btn.textContent = "cart";
        btn.classList.remove("bg-red-500");
        btn.classList.add("bg-blue-500");
        btn.classList.remove("w-20");
        renderCartProducts();
        if(cartProducts.length > 0) {
    renderCartProducts();
} else {
    showEmptyCartMessage();
}
    }
    // تحديث localStorage
    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );
}
//سله المفضلة وعناصرها
function toggleFavorite(id, icon) {
    if (!user) {
        setTimeout(() => {
            window.location = "login.html";
        }, 200);
        return;
    }
    // هل المنتج موجود بالفعل في المفضلة؟
    let productIndex = faveProducts.findIndex(item => item.id === id);
    // لو مش موجود → أضفه
    if (productIndex === -1) {
        let choosenItem = products.find(item => item.id === id);
        faveProducts.push(choosenItem);
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.classList.add("text-red-500");
    }
    // لو موجود → احذفه
    else {
        faveProducts.splice(productIndex, 1);
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.classList.remove("text-red-500");
    }
    // تحديث localStorage
    localStorage.setItem(
        "faveProducts",
        JSON.stringify(faveProducts)
    );
}
// عملية تسجيل الخروح

logoutButton.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(()=>{window.location = "index.html"},200)
})