import type {taskType} from "../types/taskType.ts";

const api_url = import.meta.env.VITE_API_URL;

// export async function createTask(newTask: taskType) {
//     console.log(api_url);
//     return fetch(api_url + "tasks/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newTask)
//     }).then(response => response.json())
// }