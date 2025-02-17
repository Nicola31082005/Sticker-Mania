import { html } from "lite-html";
import { homeViewAnimation } from "../animations/gsapAnimations";

const template = () => html`
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Main Container -->
    <div class="w-11/12 max-w-6xl flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
      <!-- Create Sticker Section -->
      <div class="w-full md:w-1/2 bg-white rounded-xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl">
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
      <div id="stickerContainer" class="w-full md:w-1/2 relative h-[900px] md:h-[800px] lg:h-[800px] overflow-hidden">
        <!-- Floating Stickers -->
        <img src="/public/images/stickers/sticker1.png" class="absolute w-24 h-24 sticker" alt="Sticker 1" />
        <img src="/public/images/stickers/sticker2.png" class="absolute w-36 h-36 sticker" alt="Sticker 2" />
        <img src="/public/images/stickers/sticker3.png" class="absolute w-32 h-32 sticker" alt="Sticker 3" />
        <img src="/public/images/stickers/sticker4.png" class="absolute w-36 h-36 sticker" alt="Sticker 3" />
        <img src="/public/images/stickers/sticker5.png" class="absolute w-42 h-36 sticker" alt="Sticker 3" />
      </div>
    </div>
  </div>
`;

function homeView(ctx) {
  const homeTemplate = template();
  ctx.render(homeTemplate);
  homeViewAnimation()
}

export default homeView;