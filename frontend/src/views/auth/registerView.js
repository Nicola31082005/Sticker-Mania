import { html } from "lite-html";

const template = (registerHandler) => html`
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
        <form id="register-form" class="mt-6" @submit=${registerHandler}>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input type="email" id="email" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input type="password" id="password" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700">Confirm Password</label>
            <input type="password" id="confirm-password" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">Register</button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" class="text-green-500 hover:underline">Login</a>
        </p>
      </div>
  `;

const registerView = (ctx) => {

    const registerTemplate = template(registerHandler)
    ctx.render(registerTemplate);


    async function registerHandler(e) {
        e.preventDefault();


        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        console.log(email, password, confirmPassword);

};
}

export default registerView;
