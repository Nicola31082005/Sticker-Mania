import { html } from "lite-html";
import { gsap } from "gsap";

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
      <div id="stickerContainer" class="w-full md:w-1/2 relative h-[500px] md:h-[800px] lg:h-[800px] overflow-hidden">
        <!-- Floating Stickers -->
        <img src="/public/images/stickers/sticker1.png" class="absolute w-24 h-24 sticker" alt="Sticker 1" />
        <img src="/public/images/stickers/sticker2.png" class="absolute w-36 h-36 sticker" alt="Sticker 2" />
        <img src="/public/images/stickers/sticker3.png" class="absolute w-32 h-32 sticker" alt="Sticker 3" />
        <img src="/public/images/stickers/sticker4.png" class="absolute w-32 h-32 sticker" alt="Sticker 3" />
      </div>
    </div>
  </div>
`;

function homeView(ctx) {
  const homeTemplate = template();
  ctx.render(homeTemplate);

  setTimeout(() => {
    const container = document.getElementById("stickerContainer");
    const stickers = document.querySelectorAll(".sticker");

    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const occupiedPositions = [];

    stickers.forEach((sticker) => {
      const stickerWidth = sticker.clientWidth;
      const stickerHeight = sticker.clientHeight;
      let startX, startY, isOverlapping;

      do {
        startX = Math.random() * (containerWidth - stickerWidth); // Spread horizontally
        startY = Math.random() * (containerHeight - stickerHeight); // Spread vertically
        isOverlapping = occupiedPositions.some(
          ([x, y]) => Math.abs(x - startX) < stickerWidth && Math.abs(y - startY) < stickerHeight
        ); // Prevent overlapping
      } while (isOverlapping);

      occupiedPositions.push([startX, startY]);

      const moveX = 30 + Math.random() * 50; // More spread out movement
      const moveY = 30 + Math.random() * 50;
      const duration = 3 + Math.random() * 2; // 3-5 sec
      const rotation = Math.random() * 20 - 10; // Slight tilt (-10 to 10 degrees)

      gsap.set(sticker, { x: startX, y: startY, rotation: rotation });

      gsap.to(sticker, {
        x: `+=${Math.random() > 0.5 ? moveX : -moveX}`,
        y: `+=${Math.random() > 0.5 ? moveY : -moveY}`,
        rotation: `+=${Math.random() * 20 - 10}`, // Add slight rotation during animation
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, 100);
}

export default homeView;