import type {FC} from "react";
import type {toast} from "../interfaces/toast.ts";
import Toast from "../components/Toasts/Toast.tsx";
import {AnimatePresence} from "motion/react";

type ToastContextProps = {
    toasts: toast[]
}

const ToastsWrapper: FC<ToastContextProps> = ({toasts}) => {
    return (
        <div className="fixed w-full h-full top-0 right-0 flex flex-col justify-end items-end z-50 pointer-events-none">
            <AnimatePresence>
                {toasts &&
                    toasts.map((toast) => (
                        <div key={toast.id}>
                            <Toast {...toast} />
                        </div>
                    ))
                }
            </AnimatePresence>
        </div>
    )
}

export default ToastsWrapper;