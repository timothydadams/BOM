import { Outlet } from "react-router-dom"
import Banner from "./Banner";
import { NavBar } from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import useData from "../Hooks/useData";

const Layout = () => {
    const {auth} = useData();
    //const roles = user?.roles != null ? user.roles : [];

    return (
        <div>
            <NavBar user={auth}/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SideNav user={auth}/> 
                </div>

                <div id="layoutSidenav_content">
                    <main>
                        {auth && <Banner/> }
                        <Outlet/> 
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
        
    )
}

export default Layout;