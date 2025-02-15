import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";
import createView from "./views/createView";
import LoginView from "./views/auth/loginView";
import registerView from "./views/auth/registerView";

page(layoutView);
page("/", homeView);
page("/about", aboutView);
page("/create", createView)
page("/login", LoginView)
page("/register", registerView)

export default page;
