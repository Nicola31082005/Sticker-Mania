import { html } from "lite-html";
import page from "page"

const template = () => html`
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Main Container -->
    <div class=" flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
      <!-- Thank You Section -->
      <div class=" bg-white rounded-xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl">
        <h1 class="text-5xl font-bold mb-6 text-gray-800 drop-shadow-lg">
          Thank You for Your Order!
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Your order has been successfully placed. We appreciate your business and hope you enjoy your custom stickers!
        </p>
        <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          <button
            class="px-10 py-5 bg-amber-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-110 active:scale-95"
            @click=${handleHommeButton}
          >
            Return Home
          </button>
        </div>
      </div>


`;

function handleHommeButton() {
  page("/")
}

function thankYouView(ctx) {

  const thankYouTemplate = template();
  ctx.render(thankYouTemplate);
}

export default thankYouView;