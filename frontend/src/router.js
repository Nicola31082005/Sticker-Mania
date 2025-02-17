import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";
import createView from "./views/createView";
import LoginView from "./views/auth/loginView";
import registerView from "./views/auth/registerView";
import { cartView } from "./views/checkout/cartView";

page(layoutView);
page("/", homeView);
page("/about", aboutView);
page("/create", createView)
page("/login", LoginView)
page("/register", registerView)
page("/cart", cartView)

export default page;
