import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";
import createView from "./views/createView";

page(layoutView);
page("/", homeView);
page("/about", aboutView);
page("/create", createView)

export default page;
