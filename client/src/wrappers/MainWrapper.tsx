import {Outlet} from "react-router-dom";
import Navbar from "../components/partials/Navbar.tsx";
import Sidebar from "../components/partials/Sidebar.tsx";

const MainWrapper = () => {
    return (
        <div className="min-h-screen w-screen bg-gray-200 pl-50">
            <Sidebar/>
            <main className="flex flex-col w-[calc(100vw-12.5rem)] ">
                <Navbar/>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainWrapper;
