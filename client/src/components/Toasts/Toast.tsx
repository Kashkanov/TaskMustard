import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {motion} from "motion/react";
import {useToast} from "../contexts/ToastContext.tsx";

type ToastProps = {
    id: string,
    message: string,
    status: string,
}

const Toast: FC<ToastProps> = ({id, message, status}) => {

    const {removeToast} = useToast()

    return (
        <motion.div
            key={id}
            className={`relative flex justify-start items-center w-70 h-23 mb-5 mr-5  bg-white text-black shadow-lg pointer-events-auto logo-font`}
            initial={{opacity: 0, x: 500}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 500}}
            transition={{duration: 1}}
        >
            <div className={`flex w-1/12 h-full ${status === 'Success' ? 'bg-green-700' : 'bg-red-700'}`}>

            </div>
            <div className="flex flex-col justify-start items-center w-11/12 h-full pb-3 p-3">
                <div className="flex justify-between h-1/5 w-full">
                    <div className="flex items-center justify-start w-1/2 h-full">
                        <h4 className="text-2xl font-gotham-bold">{status}&nbsp;</h4>
                        {status === "Success" ?
                            (<FontAwesomeIcon icon={faCircleCheck}/>)
                            :
                            (<FontAwesomeIcon icon={faCircleXmark}/>)
                        }
                    </div>
                    <div className="flex justify-end items-center w-1/2 h-full">
                        <button
                            className="w-1/6 h-full"
                            onClick={() => removeToast(id)}
                        >
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-4/5">

                    <p className="text-start text-base font-gotham w-full">{message}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Toast;