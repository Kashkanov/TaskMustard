import {Outlet} from "react-router-dom";
import Navbar from "../components/partials/Navbar.tsx";
import Sidebar from "../components/partials/Sidebar.tsx";

const MainWrapper = () => {
    return (
        <div className="relative min-h-screen max-w-dvw bg-gray-200 pl-50 overflow-x-hidden">
            <Sidebar/>
            <main className="flex flex-col w-[calc(100vw-12.5rem)]">
                <Navbar/>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainWrapper;
