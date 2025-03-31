const SUPABASE_URL = "https://mggnfffsjizsxhnvvmfw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZ25mZmZzaml6c3hobnZ2bWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MzcwNzcsImV4cCI6MjA1OTAxMzA3N30.6QWNeS0aeIcODwW6UsIxhwvqzVPchk9rgBJWJO2-vc4";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  checkLoginStatus();
});

function displayProducts(productsList) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";
  productsList.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-card");
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}" onclick="enlargeImage('${product.image}')">
          <h2>${product.name}</h2>
          <p>Price: ₹${product.price}</p>
          <button class="buy-btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      `;
      productContainer.appendChild(productElement);
  });
}

const users = [
  { username: "admin", password: "1234" },
  { username: "user", password: "password" }
];

function toggleLoginModal() {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session && session.user) {
            alert("You are already logged in!");
        } else {
            window.location.href = "login.html"; // Redirect to login page
        }
    });
}

function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let user = users.find(user => user.username === username && user.password === password);

  if (user) {
      localStorage.setItem("loggedInUser", username);
      toggleLoginModal();
      checkLoginStatus();
      alert("Login successful!");
  } else {
      alert("Invalid username or password!");
  }
}

async function logout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        alert(error.message);
    } else {
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    }
}

function checkLoginStatus() {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");

        if (session && session.user) {
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    });
}

function addToCart(productName, productPrice) {
  let cartItem = cart.find(item => item.name === productName);

  if (cartItem) {
      cartItem.quantity += 1; 
  } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  let cartList = document.getElementById("cart-list");
  let cartTotal = document.getElementById("cart-total");
  let cartCount = document.getElementById("cart-count");
  
  cartList.innerHTML = ""; 
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
      let li = document.createElement("li");
      li.innerHTML = `${item.name} (₹${item.price}) x ${item.quantity} 
          <button onclick="removeFromCart('${item.name}')">Remove</button>`;
      cartList.appendChild(li);

      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
  });

  cartTotal.innerText = totalPrice;
  cartCount.innerText = totalItems;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCartUI();
}

function filterProducts(category) {
  let filtered = category === 'all' ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

let cart = [];
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 79999, image: "/images/laptop1.jpg" },
    { id: 2, name: "Smartphone", category: "Electronics", price: 45999, image: "/images/Smartphone.jpg" },
    { id: 3, name: "Tshirt", category: "Clothing", price: 499, image: "/images/tshirt.jpg" },
    { id: 4, name: "Belt", category: "Clothing", price: 799, image: "/images/Belt.jpg" },
    { id: 4, name: "Boot", category: "Clothing", price: 999, image: "/images/Boot.webp" },
    { id: 6, name: "Sofa", category: "Home", price: 39999, image: "/images/Sofa.jpg" },
    { id: 7, name: "Jeans", category: "Clothing", price: 1499, image: "/images/jeans.jpeg" },
     { id: 8, name: "Shoes", category: "Clothing", price: 1999, image: "/images/shoe.jpg" },
    { id: 9, name: "Blender", category: "Home", price: 3499, image: "/images/blender.jpg" },
    { id: 10, name: "Jacket", category: "Clothing", price: 2999, image: "/images/leatherjackets.jpg" },
    { id: 11, name: "Oven", category: "Home", price: 15999, image: "/images/Oven.jpg" },
    { id: 12, name: "Air Conditionar", category: "Electronics", price: 30000, image: "/images/Ac.webp" },
];