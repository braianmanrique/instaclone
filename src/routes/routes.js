import Home from "../pages/Home/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404/Error404";

// Layouts
import LayoutBasic from "../layouts/LayoutBasic";

const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        element: Home,
        exact : true
    },
    {
        path: "/:username",
        layout: LayoutBasic,
        element: User,
        exact: true
    },
    {   
        layout: LayoutBasic,
        element: Error404
    }
];

export default routes;
