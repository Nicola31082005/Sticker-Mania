import page from "page";
import homeView from "./views/homeView";
import aboutView from "./views/aboutView";
import { layoutView } from "./middleware/layoutMiddleware";

page(layoutView);
page("/", homeView);
page("/about", aboutView);

export default page;
