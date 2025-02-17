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
    });
}