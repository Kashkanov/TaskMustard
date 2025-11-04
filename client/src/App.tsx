import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import AddTask from "./pages/AddTask.tsx";
import Navbar from "./components/Navbar.tsx";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";

const client = new ApolloClient({
    link: new HttpLink({uri: import.meta.env.VITE_APOLLO_URI}),
    cache: new InMemoryCache()
})

function App() {

    return (
        <ApolloProvider client={client}>
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
        </ApolloProvider>
    )
}

export default App
