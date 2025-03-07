import { html } from "lite-html";
import cartService from "../../services/cartService";
import {
  convertBase64ToFile,
  storageImage,
} from "../../services/storageService";
import { submitOrder } from "../../services/ordersApi";
import page from "page";

const template = (cartItems, totalPrice, handleOrderSubmit) => html`
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <!-- Cart Items Summary -->
      <h2 class="text-xl font-semibold mb-4">Your Cart</h2>
      ${cartItems.map(
        (item) => html`
          <div class="flex items-center border-b border-gray-200 py-4">
            <img
              src=${item.previewUrl}
              alt="Sticker"
              class="w-16 h-16 object-cover rounded-lg"
            />
            <div class="ml-4 flex-grow">
              <p class="text-lg font-semibold">Custom Sticker</p>
              <p class="text-gray-600">
                Size: ${item.size} | Material: ${item.material}
              </p>
              <p class="text-gray-600">Quantity: ${item.quantity}</p>
              <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
            </div>
          </div>
        `
      )}

      <!-- Total Price -->
      <div class="mt-6 text-right">
        <p class="text-xl font-semibold">Total: $${totalPrice.toFixed(2)}</p>
      </div>

      <!-- Shipping Details Form -->
      <h2 class="text-xl font-semibold mt-8 mb-4">Shipping Information</h2>
      <form @submit=${handleOrderSubmit} method="POST">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Email</label>
          <input
            type="text"
            id="name"
            name="email"
            class="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            class="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="city" class="block text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            class="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-700"
            >Shipping Address</label
          >
          <input
            type="text"
            id="address"
            name="address"
            class="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            class="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <!-- Confirm Order Button -->
        <div class="mt-6 text-right">
          <button
            type="submit"
            class="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  </div>
`;

export function checkoutView(ctx) {
  // Get the cart items through the service.
  const cartItems = cartService.getAll();
  // Get the cart total price through the service.
  const totalPrice = cartService.getCartTotalPrice();
  // Render the checkout template
  const checkoutTemplate = template(cartItems, totalPrice, handleOrderSubmit);
  ctx.render(checkoutTemplate);

  async function handleOrderSubmit(e) {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Get cart items and total price
    const cartItems = cartService.getAll();
    const totalPrice = cartService.getCartTotalPrice();

    // Show loading indicator
    document.querySelector('button[type="submit"]').disabled = true;
    document.querySelector('button[type="submit"]').innerHTML = "Processing...";

    try {
      // Convert Base64 preview URLs to Image Files
      const imageFiles = await Promise.all(
        cartItems.map((cartItem) => {
          // Use originalImageUrl if available, fall back to previewUrl
          const imageSource = cartItem.originalImageUrl || cartItem.previewUrl;
          return convertBase64ToFile(imageSource);
        })
      );

      // Upload images files to storage and get URLs
      const imageUrls = await Promise.all(
        imageFiles.map((file) => storageImage(file))
      );

      // Update cart items with image URLs and remove large data fields
      const cleanedCartItems = cartItems.map((item, index) => {
        // Create a clean version of the item without the large image data
        const { originalImageUrl, ...cleanItem } = item;
        return {
          ...cleanItem,
          previewUrl: imageUrls[index],
        };
      });

      // Prepare order data with cleaned cart items
      const orderData = {
        cartItems: cleanedCartItems, // Use the cleaned version
        customerInfo: { ...data }, // Separate customer data
        totalPrice,
      };

      // Submit order to the backend
      const response = await submitOrder(orderData);

      if (response && response.order) {
        // Clear the cart after successful submission
        cartService.clearCart();
        // Redirect to a thank you page
        page("/thank-you");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      // Re-enable the submit button
      document.querySelector('button[type="submit"]').disabled = false;
      document.querySelector('button[type="submit"]').innerHTML =
        "Confirm Order";

      // Show error message to user
      ctx.render(
        template(cartItems, totalPrice, handleOrderSubmit),
        error.message || "Failed to process order"
      );
    }
  }
}
