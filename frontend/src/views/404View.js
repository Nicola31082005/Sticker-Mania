import { html } from "lite-html";

const template = () => html`
  <div class="container mx-auto text-center p-10">
    <h1 class="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
    <p class="text-lg text-gray-700 mt-4">
      Sorry, the page you are looking for does not exist.
    </p>
    <a href="/" class="mt-6 inline-block px-6 py-2 text-white bg-blue-500 rounded-lg">
      Go to Homepage
    </a>
  </div>
`;

export default function notFoundView(ctx) {
  ctx.render(template());
}