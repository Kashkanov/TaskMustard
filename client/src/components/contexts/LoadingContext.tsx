import {createContext, type Dispatch, type FC, type ReactNode, type SetStateAction, useContext, useState} from "react";
import LoadingPage from "../partials/LoadingPage.tsx";

type LoadingContextProps = {
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

type LoadingProviderProps = {
    children: ReactNode;
}

const LoadingContext  = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    return(
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            { isLoading &&
                <LoadingPage/>
            }
            {children}
        </LoadingContext.Provider>
    )

}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be defined");
    }
    return context;
}