import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import AddTask from "./pages/AddTask.tsx";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";
import MainWrapper from "./wrappers/MainWrapper.tsx";
import {LoadingProvider} from "./components/contexts/LoadingContext.tsx";
// import Rendering_experiment from "./pages/Rendering_experiment.tsx";
import Dead from "./pages/Dead.tsx";
import Plan from "./pages/Plan.tsx";

const client = new ApolloClient({
    link: new HttpLink({uri: import.meta.env.VITE_APOLLO_URI}),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    todoTasks : {
                        merge: false
                    }
                }
            },
            task: {
                keyFields: ["taskid"]
            }
        }
    })
})

function App() {

    return (
        <ApolloProvider client={client}>
            <LoadingProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainWrapper/>}>
                            <Route index path="/" element={<Dashboard/>}/>
                            <Route path="/add" element={<AddTask/>}/>
                            <Route path="/plan" element={<Plan/>}/>
                            {/*<Route path="/experiment" element={<Rendering_experiment/>}/>*/}
                        </Route>
                        <Route path="/dead" element={<Dead/>}/>
                    </Routes>
                </BrowserRouter>
            </LoadingProvider>
        </ApolloProvider>
    )
}

export default App
