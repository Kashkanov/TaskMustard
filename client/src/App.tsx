import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import AddTask from "./pages/AddTask.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar/>
            <main className="flex-1">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/add" element={<AddTask/>}/>
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    )
}

export default App
