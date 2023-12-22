import { useQuery } from "@tanstack/react-query";
import AddTask from "../add-task/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import axios from "axios";
import ToDoTasks from "../to-do-tasks/ToDoTasks";
import OnGoingTasks from "../on-going-tasks/OnGoingTasks";
import CompletedTasks from "../completed-tasks/CompletedTasks";

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const {data:tasks=[]} = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async() => {
            const res = await axios.get(`http://localhost:5000/tasks?user=${user.email}`);
            return res.data;
        }
    });
    console.log(tasks);
    return (
        <div className="mt-20">
            <AddTask/>
            <ToDoTasks/>
            <OnGoingTasks/>
            <CompletedTasks/>
        </div>
    );
};

export default Dashboard;