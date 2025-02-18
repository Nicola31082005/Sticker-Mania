import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";
import createView from "./views/createView";
import { cartView } from "./views/checkout/cartView";
import { checkoutView } from "./views/checkout/checkoutView";

page(layoutView);
page("/", homeView);
page("/about", aboutView);
page("/create", createView)
page("/cart", cartView)
page("/checkout", checkoutView)

export default page;
