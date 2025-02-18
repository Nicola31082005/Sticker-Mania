import { html } from "lite-html";
import cartService from "../../services/cartService";
import page from "page";

  const template = (cartItems, totalPrice) => html`
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Your Cart</h1>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        ${cartItems.map(
          (item) => html`
            <div class="flex items-center border-b border-gray-200 py-4">
              <!-- Sticker Image -->
              <img src=${item.image} alt="Sticker" class="w-16 h-16 object-cover rounded-lg" />
              <!-- Sticker Details -->
              <div class="ml-4 flex-grow">
                <p class="text-lg font-semibold">Custom Sticker</p>
                <p class="text-gray-600">Size: ${item.size} | Material: ${item.material}</p>
                <p class="text-gray-600">Quantity: ${item.quantity}</p>
                <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
              </div>
              <!-- Remove Button -->
              <button @click=${() => removeFromCart(item._id)} class="text-red-500 hover:text-red-700">Remove</button>
            </div>
          `
        )}
        <!-- Total Price -->
        <div class="mt-6 text-right">
          <p class="text-xl font-semibold">Total: $${totalPrice.toFixed(2)}</p>
        </div>
        <!-- Checkout Button -->
        <div class="mt-6 text-right">
          <a href="/checkout" class="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  `;


export function cartView(ctx) {

  // Get the cart items through te service
  const cartItems = cartService.getAll()
  // Get the cart items total price
  const totalPrice = cartService.getCartTotalPrice()


  // Render the cart template
  const cartTemplate = template(cartItems, totalPrice)
  ctx.render(cartTemplate);
}

function removeFromCart(id) {
  // Remove item from the cart
  cartService.removeItem(id)
  page.redirect("/cart")
}

