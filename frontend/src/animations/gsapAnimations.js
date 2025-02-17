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
