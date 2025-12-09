import {createContext, type FC, type ReactNode, useCallback, useContext, useState} from "react";
import type {toast} from "../../interfaces/toast.tsx";
import {v4 as uuid} from "uuid";
import ToastsWrapper from "../../wrappers/ToastsWrapper.tsx";

type ToastProviderProps = {
    children: ReactNode
}

type ToastContextType = {
    addToast: (message: string, status: string, duration: number) => void,
    removeToast: (id: string) => void,
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {

    const [toasts, setToasts] = useState<toast[]>([])

    const addToast = useCallback((message: string, status = "Success", duration: number)=> {
        const id = uuid()
        const newToast: toast = {
            id: id,
            message: message,
            status: status
        }

        setToasts((prevToasts)=>[...prevToasts, newToast])

        setTimeout(()=>{
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, duration)

    },[])

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, [])


    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastsWrapper toasts={toasts}/>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)

    if(!context){
        throw new Error("useToast must be used to useToast()")
    }

    return context
}