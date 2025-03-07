import { html } from "lite-html";
import {
  animateImagePreview,
  setupMaterialSelection,
} from "../animations/gsapAnimations";
import { v4 as uuidv4 } from "uuid";
import cartService from "../services/cartService";
import page from "page";

// Function to optimize image before adding to cart
function optimizeImage(file, maxWidth = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate image size in MB (approximate)
        const imageSizeMB = event.target.result.length / (1024 * 1024);

        // Adjust quality and size based on image size
        let quality = 0.75; // Default quality
        let finalMaxWidth = maxWidth;

        // For very large images, use more aggressive optimization
        if (imageSizeMB > 5) {
          quality = 0.5;
          finalMaxWidth = 600;
        } else if (imageSizeMB > 2) {
          quality = 0.6;
          finalMaxWidth = 700;
        }

        // Only scale down, not up
        if (width > finalMaxWidth) {
          height = (height * finalMaxWidth) / width;
          width = finalMaxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Use adjusted quality for preview
        const optimizedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(optimizedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const template = (picturePreview, handleAddToCart) => html`
  <div
    class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6"
  >
    <!-- Cool Heading -->
    <div class="absolute top-35 text-center">
      <h1
        class="text-5xl font-bold text-gray-800 mb-2 transform transition-all hover:scale-105"
      >
        <span
          class="bg-gradient-to-r from-amber-500 to-blue-600 bg-clip-text text-transparent"
          >Custom Sticker Studio</span
        >
      </h1>
      <p class="text-lg text-gray-600">
        Design your perfect sticker in seconds!
      </p>
    </div>

    <!-- Left Side: Sticker Preview -->
    <div
      class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6 mt-32"
    >
      <div class="relative group">
        <div
          id="sticker-preview"
          class="w-96 h-96 bg-white rounded-lg shadow-2xl transform transition-all duration-300
                 border-4 border-dashed border-gray-300 hover:border-amber-400 hover:shadow-3xl
                 relative overflow-hidden"
        >
          <div
            id="crosshair"
            class="absolute inset-0 flex justify-center items-center"
          >
            <div
              class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            ></div>
            <div
              class="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-amber-400 to-transparent"
            ></div>
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
        <span class="relative z-10"
          >Add to Cart ($<span id="price-display">0.00</span>)</span
        >
        <div
          class="absolute inset-0 bg-amber-600 opacity-0 transition-opacity hover:opacity-20"
        ></div>
      </button>
    </div>

    <!-- Right Side: Customization Tools -->
    <div
      class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6 mt-10 md:mt-0 md:ml-10"
    >
      <label
        for="photo-upload"
        class="px-10 py-5 bg-blue-500 text-white font-semibold text-xl rounded-lg shadow-lg
               hover:bg-blue-600 transform transition-all hover:scale-105 active:scale-95
               cursor-pointer relative overflow-hidden"
      >
        <span class="relative z-10">Import Photo</span>
        <div
          class="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"
        ></div>
      </label>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        @change=${picturePreview}
        class="hidden"
      />

      <div
        class="w-full bg-white p-6 rounded-xl shadow-lg transform transition-all hover:shadow-xl"
      >
        <div class="space-y-4">
          <div class="custom-control">
            <label class="text-gray-700">Size</label>
            <select id="size-select" class="custom-select">
              <option value="1inch">1 inch / 2.54 cm</option>
              <option value="1.5inch">1.5 inch / 3.8 cm</option>
              <option value="2inch">2 inch / 5.1 cm</option>
              <option value="2.5inch">2.5 inch / 6.35 cm</option>
            </select>
          </div>

          <div class="custom-control">
            <label class="text-gray-700">Material</label>
            <div class="grid grid-cols-3 gap-4">
              <button class="material-option" data-material="paper">
                Paper
              </button>
              <button class="material-option" data-material="pvc">PVC</button>
              <button class="material-option" data-material="waterproof">
                Waterproof
              </button>
            </div>
          </div>

          <div class="custom-control">
            <label class="text-gray-700">Quantity</label>
            <select
              id="quantity-select"
              class="custom-select"
              @change=${updatePriceDisplay}
            >
              <option value="50">50 pcs</option>
              <option value="100">100 pcs</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function createView(ctx) {
  const picturePreview = async (event) => {
    const uploadedPhoto = document.getElementById("uploaded-photo");
    const crosshair = document.getElementById("crosshair");
    const addToCartButton = document.getElementById("add-to-cart");
    const fileInput = document.getElementById("photo-upload");

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      try {
        // Optimize the image before displaying
        const optimizedImageUrl = await optimizeImage(file);
        // Set the optimized image to the preview
        uploadedPhoto.src = optimizedImageUrl;
        uploadedPhoto.classList.remove("opacity-0");
        uploadedPhoto.classList.add("opacity-100");

        // Enable add to cart button
        addToCartButton.disabled = false;

        // Animate the preview if animation function exists
        if (typeof animateImagePreview === "function") {
          animateImagePreview();
        }
      } catch (error) {
        console.error("Error optimizing image:", error);
        alert(
          "There was an error processing your image. Please try a different one."
        );
      }
    }
  };

  const createTemplate = template(picturePreview, handleAddToCart);
  ctx.render(createTemplate);
  setupMaterialSelection();
  updatePriceDisplay();
}

const handleAddToCart = async () => {
  const uploadedPhoto = document.getElementById("uploaded-photo");
  const size = document.getElementById("size-select").value;
  const quantity = document.getElementById("quantity-select").value;
  const materialBtn = document.querySelector(".material-option.active");
  const material = materialBtn ? materialBtn.dataset.material : null;
  const pricePerSticker = 0.5;

  if (!uploadedPhoto.src || !size || !material) {
    alert("Please complete all customizations before adding to cart.");
    return;
  }

  const orderData = {
    _id: uuidv4(),
    previewUrl: uploadedPhoto.src,
    size,
    material,
    quantity: Number(quantity),
    price: pricePerSticker * Number(quantity),
  };

  try {
    await cartService.addItem(orderData);
    page.redirect("/cart");
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    alert(
      "There was an error adding item to cart. Please try again with a smaller image."
    );
  }
};

function updatePriceDisplay() {
  const quantity = document.getElementById("quantity-select").value;
  const priceDisplay = document.getElementById("price-display");
  priceDisplay.textContent = (0.5 * Number(quantity)).toFixed(2);
}

export default createView;
