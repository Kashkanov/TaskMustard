import { useState} from "react";
import TableArea from "../experiment/TableArea.tsx";

export interface stringies {
    id: number;
    name: string;
}

const Rendering_experiment = () => {

    const [name, setName] = useState("");
    const [myList] = useState<stringies[]>([
        {
            id: 0,
            name: "wdawdnad"
        },
        {
            id: 1,
            name: "the"
        }
    ])

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newItem = {
            id: myList.length,
            name: name,
        }

        console.log(newItem)
        myList.push(newItem)
        setName("");
    }

    return (
        <div className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 py-5 h-full">
            <TableArea listGroup={myList}/>
            <form
            className="flex flex-col items-center justify-center w-5/6 h-80 gap-y-5"
                onSubmit={onAdd}
            >
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onHandleChange}
                    className="bg-white h-10 w-50 border-1 px-1"
                />
                <button
                    className="bg-blue-600 h-7 w-15 border-white border text-white"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default Rendering_experiment;