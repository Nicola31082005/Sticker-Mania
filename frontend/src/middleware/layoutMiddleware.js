import { html, render } from "lite-html";

const main = document.querySelector("#root");

const layoutTemplate = (bodyTemplate, errorMessage) => html`
  <!-- Navbar -->
  <nav class="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Left Side: Logo -->
      <a href="/" class="text-xl font-bold flex items-center space-x-2 hover:text-amber-500 transition-colors">
        <img id="logo" src="/images/logo/logo-transparent.png" alt="Logo" class="" />
      </a>

      <!-- Center Navigation -->
      <div class="flex justify-center gap-4 items-center">
        <a href="/" class="hover:text-amber-500 transition-colors">Home</a>
        <span class="text-gray-500">|</span>
        <a href="/create" class="hover:text-amber-500 transition-colors">Create</a>
        <span class="text-gray-500">|</span>
        <a href="/about" class="hover:text-amber-500 transition-colors">About</a>
        <span class="text-gray-500">|</span>
        <a href="/cart" class="hover:text-amber-500 transition-colors">Cart</a>
      </div>
    </div>
  </nav>

  <!-- Error Message -->
  ${errorMessage ? html`
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 sticky top-16 z-40" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">${errorMessage}</span>
    </div>
  ` : ''}

  <!-- Main Content -->
  <main class="flex-grow bg-gradient-to-b from-gray-50 to-gray-100">
    ${bodyTemplate}
  </main>

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
  ctx.render = (bodyTemplate, errorMessage) => {
    render(layoutTemplate(bodyTemplate, errorMessage), main);
  };
  next();
}