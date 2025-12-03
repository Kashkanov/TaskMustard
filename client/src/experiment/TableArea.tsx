import type {FC} from "react";
import type {stringies} from "../pages/Rendering_experiment.tsx";
import { motion } from "motion/react";
import {stagger, type Variants} from "motion";

type tableAreaProps = {
    listGroup: stringies[]
}

const parent: Variants = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: stagger(0.1)
        }
    },
}

const children: Variants = {
    hidden: {opacity: 0, x: -50},
    show: {opacity: 1, x: 0},
}

const TableArea: FC<tableAreaProps> = ({ listGroup }) => {
    return (
        <motion.div
            variants={parent}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start justify-start w-5/6 h-80 p-5"
        >
            {listGroup?.map((item) => (
                <motion.div
                    variants={children}
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    className="border-1 w-full"
                    key={item.id}
                >
                    {item.name}
                </motion.div>
            ))
            }
        </motion.div>
    )
}

export default TableArea;