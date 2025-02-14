import { html, render } from "lite-html";

const main = document.querySelector("#root");

const layoutTemplate = (bodyTemplate) => html`
  <!-- Navbar -->
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between">
      <a href="/" class="text-xl font-bold">Finance Tracker</a>
      <div class="space-x-4">
        <a href="/" class="hover:underline">Home</a>
        <a href="/about" class="hover:underline">About</a>
        <a href="/dashboard" class="hover:underline">Dashboard</a>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  ${bodyTemplate}
`;

export function layoutView(ctx, next) {
  ctx.render = (bodyTemplate) => {
    render(layoutTemplate(bodyTemplate), main);
  };

  next();
}
