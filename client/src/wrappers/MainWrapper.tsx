import {Outlet} from "react-router-dom";
import Navbar from "../components/partials/Navbar.tsx";
import Sidebar from "../components/partials/Sidebar.tsx";

const MainWrapper = () => {
    return (
        <div className="min-h-screen bg-gray-200 pt-20">
            <Navbar/>
            <main className="flex min-h-[calc(100vh-5rem)]  w-full">
                <Sidebar/>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainWrapper;
