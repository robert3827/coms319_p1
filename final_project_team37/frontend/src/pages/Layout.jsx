import { Outlet, Link } from "react-router-dom";
import Menubar from "../components/menubar";


function Layout() {

    return (
        <>
            <Menubar />

            <Outlet />
        </>

    )
} export default Layout;