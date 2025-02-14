import { html } from "lite-html";

const template = () => html`
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Main Container -->
    <div class="w-11/12 max-w-6xl flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
      <!-- Create Sticker Section -->
      <div
        class="w-full md:w-1/2 bg-white rounded-xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl"
      >
        <h1 class="text-5xl font-bold mb-6 text-gray-800 drop-shadow-lg">
          Design Your Sticker
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Upload your image and start customizing your unique sticker!
        </p>
        <button
          class="px-10 py-5 bg-amber-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-110 active:scale-95"
          onclick="window.location.href='/create'"
        >
          Create Sticker
        </button>
      </div>

      <!-- Stickers Display Section -->
      <div class="w-full md:w-1/2 relative h-96">
        <!-- Sticker 1 -->
        <div
          class="absolute w-24 h-24 bg-teal-400 rounded-full top-0 left-0 transform transition-all hover:rotate-12 hover:scale-110 cursor-pointer"
        >
          <span class="text-2xl font-bold text-white drop-shadow-lg">😊</span>
        </div>

        <!-- Sticker 2 -->
        <div
          class="absolute w-32 h-32 bg-amber-400 rounded-full bottom-10 right-5 transform transition-all hover:-rotate-12 hover:scale-110 cursor-pointer"
        >
          <span class="text-2xl font-bold text-white drop-shadow-lg">🌟</span>
        </div>

        <!-- Sticker 3 -->
        <div
          class="absolute w-16 h-16 bg-pink-400 rounded-full top-20 right-20 transform transition-all hover:rotate-6 hover:scale-110 cursor-pointer"
        >
          <span class="text-2xl font-bold text-white drop-shadow-lg">🎉</span>
        </div>

        <!-- Sticker 4 -->
        <div
          class="absolute w-20 h-20 bg-purple-400 rounded-full bottom-0 left-0 transform transition-all hover:-rotate-6 hover:scale-110 cursor-pointer"
        >
          <span class="text-2xl font-bold text-white drop-shadow-lg">🦄</span>
        </div>
      </div>
    </div>
  </div>
`;

function homeView(ctx) {
  const homeTemplate = template();
  ctx.render(homeTemplate);
}

export default homeView;