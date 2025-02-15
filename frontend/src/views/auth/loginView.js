import { html } from "lite-html";

const template = (loginHandler) => html`
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form id="login-form" class="mt-6" @submit=${loginHandler}>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input type="email" id="email" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700">Password</label>
            <input type="password" id="password" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit"  class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Login</button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" class="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  `;

const LoginView = (ctx) => {

    const loginTemplate = template(loginHandler)
    ctx.render(loginTemplate);


    async function loginHandler(e) {
        e.preventDefault();


        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log(email, password);

};
}

export default LoginView;
