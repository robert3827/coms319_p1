import { Outlet, Link } from "react-router-dom";
import Menubar from "../components/menubar";


function Layout(props) {
    

    return (
        <>
        
            <Menubar numCoins={props.numCoins}/>

            <Outlet />
        </>

    )
} export default Layout;