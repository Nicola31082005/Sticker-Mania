import { html } from "lite-html";

const template = () => html`
  <div class="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
    <!-- Header Section -->
    <div class="text-center max-w-4xl px-6">
      <h1 class="text-5xl font-bold text-gray-800 mb-6">About Sticker Mania</h1>
      <p class="text-xl text-gray-600 mb-8">
        Welcome to Sticker Mania, your go-to platform for designing and ordering custom stickers.
        Whether you're looking to create personalized stickers for your business, events, or just for fun,
        we've got you covered!
      </p>
    </div>

    <!-- Mission Section -->
    <div class="bg-white rounded-xl shadow-2xl p-10 max-w-4xl mx-6 mt-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
      <p class="text-lg text-gray-600 mb-6">
        At Sticker Mania, our mission is to make sticker design and ordering simple, fun, and accessible
        for everyone. We believe that everyone should have the tools to bring their creative ideas to life,
        and we're here to help you do just that.
      </p>
      <p class="text-lg text-gray-600">
        With our easy-to-use design tools and fast delivery options, you can create unique stickers that
        reflect your style and personality. Start designing today and let your creativity shine!
      </p>
    </div>

    <!-- Team Section -->
    <div class="bg-white rounded-xl shadow-2xl p-10 max-w-4xl mx-6 mt-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Meet the Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Team Member 1 -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-800">Nicola Dimitrov</h3>
          <p class="text-gray-600">Founder & CEO</p>
        </div>

        <!-- Team Member 2 -->
        <div class="text-center">

          <h3 class="text-xl font-semibold text-gray-800">Nicola Dimitrov</h3>
          <p class="text-gray-600">Lead Designer</p>
        </div>

        <!-- Team Member 3 -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-800">Nicola Dimitrov</h3>
          <p class="text-gray-600">Developer</p>
        </div>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="text-center mt-12">
      <a
        href="/create"
        class="px-10 py-5 bg-amber-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-110 active:scale-95"
      >
        Create Sticker Now
      </a>
    </div>
  </div>
`;

function aboutView(ctx) {
  const aboutTemplate = template();
  ctx.render(aboutTemplate);
}

export default aboutView;