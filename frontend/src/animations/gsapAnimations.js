import { gsap } from "gsap";

export function animateImagePreview(uploadedPhoto, crosshair, addToCartButton) {
    gsap.to(uploadedPhoto, { opacity: 0, scale: 0.95, duration: 0.3 });

    gsap.to(uploadedPhoto, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
    gsap.to(crosshair, { opacity: 0, duration: 0.5, onComplete: () => crosshair.classList.add("hidden") });
    gsap.to(addToCartButton, { opacity: 1, duration: 0.5, onStart: () => { addToCartButton.disabled = false; } });
}


export function setupMaterialSelection() {
    document.querySelectorAll(".material-option").forEach((btn) => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".material-option").forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            gsap.to(this, { scale: 0.95, duration: 0.2, yoyo: true, repeat: 1 });
        });
    });
}

export function homeViewAnimation() {
  window.requestAnimationFrame(() => {
    const rightContainer = document.getElementById("stickerContainer");
    const leftContainer = document.getElementById("leftStickerContainer");
    const rightStickers = document.querySelectorAll(".sticker");
    const leftStickers = document.querySelectorAll(".left-sticker");

    // Animate right-side stickers
    if (rightContainer && rightStickers.length > 0) {
      const containerWidth = rightContainer.clientWidth;
      const containerHeight = rightContainer.clientHeight;

      if (containerWidth > 0 && containerHeight > 0) {
        const occupiedPositions = new Set();

        rightStickers.forEach((sticker) => {
          const stickerWidth = sticker.clientWidth || 50;
          const stickerHeight = sticker.clientHeight || 50;

          let startX, startY, isOverlapping;
          do {
            startX = Math.random() * (containerWidth - stickerWidth);
            startY = Math.random() * (containerHeight - stickerHeight);
            isOverlapping = [...occupiedPositions].some(
              ([x, y]) => Math.abs(x - startX) < stickerWidth && Math.abs(y - startY) < stickerHeight
            );
          } while (isOverlapping);

          occupiedPositions.add([startX, startY]);

          gsap.set(sticker, { x: startX, y: startY, rotation: Math.random() * 20 - 10 });

          gsap.to(sticker, {
            x: `+=${Math.random() > 0.5 ? 50 : -50}`,
            y: `+=${Math.random() > 0.5 ? 30 : -30}`,
            rotation: `+=${Math.random() * 20 - 10}`,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }

    // Animate left-side stickers
    if (leftContainer && leftStickers.length > 0) {
      const containerWidth = leftContainer.clientWidth;
      const containerHeight = leftContainer.clientHeight;

      if (containerWidth > 0 && containerHeight > 0) {
        const occupiedPositions = new Set();

        leftStickers.forEach((sticker) => {
          const stickerWidth = sticker.clientWidth || 50;
          const stickerHeight = sticker.clientHeight || 50;

          let startX, startY, isOverlapping;
          do {
            startX = Math.random() * (containerWidth - stickerWidth);
            startY = Math.random() * (containerHeight - stickerHeight);
            isOverlapping = [...occupiedPositions].some(
              ([x, y]) => Math.abs(x - startX) < stickerWidth && Math.abs(y - startY) < stickerHeight
            );
          } while (isOverlapping);

          occupiedPositions.add([startX, startY]);

          gsap.set(sticker, { x: startX, y: startY, rotation: Math.random() * 20 - 10 });

          gsap.to(sticker, {
            x: `+=${Math.random() > 0.5 ? 20 : -20}`,
            y: `+=${Math.random() > 0.5 ? 20 : -20}`,
            rotation: `+=${Math.random() * 20 - 10}`,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }
  });
}