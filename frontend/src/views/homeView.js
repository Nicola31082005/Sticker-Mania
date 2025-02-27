import { html } from "lite-html";
import { homeViewAnimation } from "../animations/gsapAnimations";
import page from "page"

const template = (handleCreateButton) => html`
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
          @click=${handleCreateButton}
        >
          Create Sticker
        </button>
      </div>

      <!-- Stickers Display Section (Right Side) -->
      <div id="stickerContainer" class="w-full md:w-1/2 relative h-[900px] md:h-[800px] lg:h-[800px] overflow-hidden">
        <!-- Floating Stickers on the Right Side -->
        <img src="/images/stickers/sticker1.png" class="absolute w-24 h-24 sticker" alt="Sticker 1" />
        <img src="/images/stickers/sticker2.png" class="absolute w-36 h-36 sticker" alt="Sticker 2" />
        <img src="/images/stickers/sticker3.png" class="absolute w-32 h-32 sticker" alt="Sticker 3" />
        <img src="/images/stickers/sticker4.png" class="absolute w-36 h-36 sticker" alt="Sticker 4" />
        <img src="/images/stickers/sticker5.png" class="absolute w-40 h-36 sticker" alt="Sticker 5" />
      </div>
    </div>

    <!-- Stickers Display Section (Left Side) -->
    <div id="leftStickerContainer" class="absolute top-0 left-0 w-1/2 h-[250px] overflow-hidden mt-30">
      <!-- Floating Stickers on the Upper Left Side -->
      <img src="/images/stickers/sticker6.png" class="absolute w-34 h-34 left-sticker" alt="Sticker 6" />
      <img src="/images/stickers/sticker7.png" class="absolute w-38 h-36 left-sticker" alt="Sticker 7" />
      <img src="/images/stickers/sticker8.png" class="absolute w-28 h-28 left-sticker" alt="Sticker 8" />
    </div>
  </div>
`;

function homeView(ctx) {

  const handleCreateButton = () => {
    page("/create")
  }

  const homeTemplate = template(handleCreateButton);
  ctx.render(homeTemplate);
  setTimeout(() => homeViewAnimation(), 0);


}

export default homeView;