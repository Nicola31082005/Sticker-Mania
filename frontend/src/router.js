import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";
import createView from "./views/createView";
import { cartView } from "./views/checkout/cartView";
import { checkoutView } from "./views/checkout/checkoutView";
import thankView from "./views/thankView";
import notFoundView from "./views/404View";

// Set middleware
page(layoutView);

page("/", homeView);
page("/about", aboutView);
page("/create", createView)
page("/cart", cartView)
page("/checkout", checkoutView)
page("/thank-you", thankView)

// Catch all wrong requests
page('*', notFoundView)

export default page;
