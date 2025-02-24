import { html } from "lite-html";
import { animateImagePreview, setupMaterialSelection } from "../animations/gsapAnimations";
import { v4 as uuidv4 } from "uuid";
import cartService from "../services/cartService";
import page from "page";

const template = (picturePreview, handleAddToCart, increaseQtty, decreaseQtty) => html`
  <div class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
    <!-- Cool Heading -->
    <div class="absolute top-35 text-center">
      <h1 class="text-5xl font-bold text-gray-800 mb-2 transform transition-all hover:scale-105">
        <span class="bg-gradient-to-r from-amber-500 to-blue-600 bg-clip-text text-transparent">Custom Sticker Studio</span>
      </h1>
      <p class="text-lg text-gray-600">Design your perfect sticker in seconds!</p>
    </div>

    <!-- Left Side: Sticker Preview -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6 mt-32">
      <div class="relative group">
        <div
          id="sticker-preview"
          class="w-96 h-96 bg-white rounded-lg shadow-2xl transform transition-all duration-300
                 border-4 border-dashed border-gray-300 hover:border-amber-400 hover:shadow-3xl
                 relative overflow-hidden">
          <div id="crosshair" class="absolute inset-0 flex justify-center items-center">
            <div class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div class="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>
          </div>
          <img
            id="uploaded-photo"
            src=""
            alt="Uploaded Photo"
            class="w-full h-full object-cover rounded-lg opacity-0 transform scale-95"
          />
        </div>
      </div>
      <button
        id="add-to-cart"
        class="px-10 py-5 bg-amber-500 text-white font-semibold text-xl rounded-lg shadow-lg
               hover:bg-amber-600 transform transition-all hover:scale-105 active:scale-95
               relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
        @click=${handleAddToCart}
      >
        <span class="relative z-10">Add to Cart ($<span id="price-display">0.00</span>)</span>
        <div class="absolute inset-0 bg-amber-600 opacity-0 transition-opacity hover:opacity-20"></div>
      </button>
    </div>

    <!-- Right Side: Customization Tools -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6 mt-10 md:mt-0 md:ml-10">
      <label
        for="photo-upload"
        class="px-10 py-5 bg-blue-500 text-white font-semibold text-xl rounded-lg shadow-lg
               hover:bg-blue-600 transform transition-all hover:scale-105 active:scale-95
               cursor-pointer relative overflow-hidden"
      >
        <span class="relative z-10">✨ Import Photo</span>
        <div class="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
      </label>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        @change=${picturePreview}
        class="hidden"
      />

      <div class="w-full bg-white p-6 rounded-xl shadow-lg transform transition-all hover:shadow-xl">
        <div class="space-y-4">
          <div class="custom-control">
            <label class="text-gray-700">Size</label>
            <select id="size-select" class="custom-select">
              <option value="small">Small (3"x3")</option>
              <option value="medium">Medium (5"x5")</option>
              <option value="large">Large (8"x8")</option>
            </select>
          </div>

          <div class="custom-control">
            <label class="text-gray-700">Material</label>
            <div class="grid grid-cols-3 gap-4">
              <button class="material-option" data-material="glossy">Glossy</button>
              <button class="material-option" data-material="matte">Matte</button>
              <button class="material-option" data-material="waterproof">Waterproof</button>
            </div>
          </div>

          <div class="custom-control">
            <label class="text-gray-700">Quantity</label>
            <div class="flex items-center space-x-2">
              <button id="decrease-qty" class="quantity-btn" @click=${decreaseQtty}>-</button>
              <input id="quantity-input" type="number" value="5" min="5" class="quantity-input" />
              <button id="increase-qty" class="quantity-btn" @click=${increaseQtty}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function createView(ctx) {
  const picturePreview = (event) => {
    const uploadedPhoto = document.getElementById("uploaded-photo");
    const crosshair = document.getElementById("crosshair");
    const addToCartButton = document.getElementById("add-to-cart");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedPhoto.src = e.target.result;
        animateImagePreview(uploadedPhoto, crosshair, addToCartButton);
      };
      reader.readAsDataURL(file);
    }
  };

  const createTemplate = template(picturePreview, handleAddToCart, increaseQtty, decreaseQtty);
  ctx.render(createTemplate);

  setupMaterialSelection();

  updatePriceDisplay()

  // Quantity button functionality
  function increaseQtty() {
    const input = document.getElementById("quantity-input");
    input.value = Number(input.value) + 1;
    updatePriceDisplay()
  }
  function decreaseQtty() {
    const input = document.getElementById("quantity-input");
    if (input.value > 5) input.value = Number(input.value) - 1;
    updatePriceDisplay()
  }
}

const handleAddToCart = async () => {
  const uploadedPhoto = document.getElementById("uploaded-photo");
  const size = document.getElementById("size-select").value;
  const quantity = document.getElementById("quantity-input").value;
  const materialBtn = document.querySelector(".material-option.active");
  const material = materialBtn ? materialBtn.dataset.material : null;
  const pricePerSticker = 2;

  if (!uploadedPhoto.src || !size || !material) {
    alert("Please complete all customizations before adding to cart.");
    return;
  }

  if (quantity < 5) {
    alert("Please add minimum 5 stickers.")
    return;
  }


  const orderData = {
    _id: uuidv4(),
    previewUrl: uploadedPhoto.src,
    size,
    material,
    quantity: Number(quantity),
    price : pricePerSticker * Number(quantity),
  };

  // Push orderData to the cart items
  cartService.addItem(orderData);
  console.log(orderData);


  page.redirect("/cart")

}


function updatePriceDisplay() {
  const quantityInput = document.getElementById("quantity-input");
  const priceDisplay = document.getElementById("price-display");

  // Price per sticker
  const pricePerSticker = 2;

  // Calculate total price
  const totalPrice = pricePerSticker * Number(quantityInput.value);

  // Update the price display
  priceDisplay.textContent = totalPrice.toFixed(2);
}

export default createView;