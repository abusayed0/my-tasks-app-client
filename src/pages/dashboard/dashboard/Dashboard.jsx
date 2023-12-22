import { useQuery } from "@tanstack/react-query";
import AddTask from "../add-task/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import axios from "axios";
import ToDoTasks from "../to-do-tasks/ToDoTasks";
import OnGoingTasks from "../on-going-tasks/OnGoingTasks";
import CompletedTasks from "../completed-tasks/CompletedTasks";
import ProflieCard from "../proflie-card/ProflieCard";

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const {data:tasks=[], refetch} = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async() => {
            const res = await axios.get(`http://localhost:5000/tasks?user=${user.email}`);
            return res.data;
        }
    });
    console.log(tasks);
    const allToDo = tasks.filter(task => task.status === "todo");
    // 
    const allOnGoing = tasks.filter(task => task.status === "ongoing");
    const allCompleted = tasks.filter(task => task.status === "completed");
    return (
        <div className="mt-20">
            <ProflieCard/>
            <AddTask refetch={refetch}/>
            <ToDoTasks refetch={refetch} allToDo={allToDo}/>
            <OnGoingTasks refetch={refetch} allOnGoing={allOnGoing}/>
            <CompletedTasks refetch={refetch} allCompleted={allCompleted}/>
        </div>
    );
};

export default Dashboard;