import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import AddTask from "./pages/AddTask.tsx";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";
import MainWrapper from "./wrappers/MainWrapper.tsx";

const client = new ApolloClient({
    link: new HttpLink({uri: import.meta.env.VITE_APOLLO_URI}),
    cache: new InMemoryCache()
})

function App() {

    return (
        <ApolloProvider client={client}>

            <BrowserRouter>
                <Routes>
                    <Route element={<MainWrapper/>}>
                        <Route index path="/" element={<Dashboard/>}/>
                        <Route path="/add" element={<AddTask/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
