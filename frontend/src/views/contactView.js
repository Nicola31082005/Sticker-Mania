import { html } from 'lite-html';

const template = () => html`
  <section class="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center px-4">
    <div class="max-w-3xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 text-center">
      <h2 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Have a question or need support? Feel free to reach out to us anytime!
      </p>

      <!-- Contact Card -->
      <div class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
        <p class="text-lg text-gray-900 dark:text-white font-semibold">Email us at:</p>
        <a href="mailto:stickermarket9@gmail.com" class="text-xl text-blue-600 dark:text-blue-400 font-bold hover:underline">
          stickermarket9@gmail.com
        </a>
      </div>
    </div>
  </section>
`;

export function contactView(ctx) {
  const contactTemplate = template();
  ctx.render(contactTemplate);
}
