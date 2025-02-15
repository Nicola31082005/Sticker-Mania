import { html, render } from "lite-html";

const main = document.querySelector("#root");

const layoutTemplate = (bodyTemplate) => html`
  <!-- Navbar -->
  <nav class="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left Side: Logo -->
      <a href="/" class="text-xl font-bold flex items-center space-x-2 hover:text-amber-500 transition-colors">
        <img src="/public/images/logo.png" alt="Logo" class="w-8 h-8" />
        <span>Sticker Creator</span>
      </a>

      <!-- Center Navigation -->
      <div class="flex space-x-6 items-center">
        <a href="/" class="hover:text-amber-500 transition-colors">Home</a>
        <span class="text-gray-500">|</span>
        <a href="/create" class="hover:text-amber-500 transition-colors">Create</a>
        <span class="text-gray-500">|</span>
        <a href="/about" class="hover:text-amber-500 transition-colors">About</a>
      </div>

      <!-- Right Side: Auth Links -->
      <div class="flex space-x-4">
        <a href="/login" class="hover:text-amber-500 transition-colors">Login</a>
        <span class="text-gray-500">|</span>
        <a href="/register" class="hover:text-amber-500 transition-colors">Register</a>
        <span class="text-gray-500">|</span>
        <a href="/logout" class="hover:text-amber-500 transition-colors">Logout</a>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="flex-grow bg-gradient-to-b from-gray-50 to-gray-100">${bodyTemplate}</main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white text-center py-8">
    <div class="container mx-auto space-y-4">
      <p class="text-lg">&copy; 2025 Sticker Creator. All rights reserved.</p>
      <div class="flex justify-center space-x-6">
        <a href="/about" class="hover:text-amber-500 transition-colors">About</a>
        <span class="text-gray-500">|</span>
        <a href="/contact" class="hover:text-amber-500 transition-colors">Contact</a>
        <span class="text-gray-500">|</span>
        <a href="/faq" class="hover:text-amber-500 transition-colors">FAQ</a>
      </div>
    </div>
  </footer>
`;

export function layoutView(ctx, next) {
  ctx.render = (bodyTemplate) => {
    render(layoutTemplate(bodyTemplate), main);
  };
  next();
}