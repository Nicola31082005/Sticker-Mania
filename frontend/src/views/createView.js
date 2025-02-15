import { html } from "lite-html";

const template = (picturePreview) => html`
  <div class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
    <!-- Left Side: Sticker Preview -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6">
      <!-- Sticker Square -->
      <div
        id="sticker-preview"
        class="w-96 h-96 bg-white border-4 border-dashed border-gray-300 rounded-lg flex justify-center items-center relative"
      >
        <!-- Crosshair (Displayed when no photo is uploaded) -->
        <div id="crosshair" class="absolute inset-0 flex justify-center items-center">
          <div class="w-full h-0.5 bg-gray-300"></div>
          <div class="h-full w-0.5 bg-gray-300 absolute"></div>
        </div>

        <!-- Uploaded Photo (Hidden by default) -->
        <img
          id="uploaded-photo"
          src=""
          alt="Uploaded Photo"
          class="w-full h-full object-cover rounded-lg hidden"
        />
      </div>

      <!-- Add to Cart Button -->
      <button
        id="add-to-cart"
        class="px-10 py-5 bg-amber-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105 active:scale-95"
        disabled
      >
        Add to Cart
      </button>
    </div>

    <!-- Right Side: Import Photo Button -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center space-y-6 mt-10 md:mt-0">
      <!-- Import Photo Button -->
      <label
        for="photo-upload"
        class="px-10 py-5 bg-blue-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        Import Photo
      </label>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        @change=${picturePreview}
        class="hidden"
      />
    </div>
  </div>
`;

function createView(ctx) {

    const picturePreview = (event) => {
        // Add event listeners after rendering
        const uploadedPhoto = document.getElementById("uploaded-photo");
        const crosshair = document.getElementById("crosshair");
        const addToCartButton = document.getElementById("add-to-cart");
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedPhoto.src = e.target.result;
            uploadedPhoto.classList.remove("hidden");
            crosshair.classList.add("hidden");
            addToCartButton.disabled = false;
          };
          reader.readAsDataURL(file);
        }
    }


    const createTemplate = template(picturePreview);
    ctx.render(createTemplate);


}

export default createView;