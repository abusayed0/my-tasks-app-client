import { useQuery } from "@tanstack/react-query";
import AddTask from "../add-task/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import axios from "axios";
import ToDoTasks from "../to-do-tasks/ToDoTasks";
import OnGoingTasks from "../on-going-tasks/OnGoingTasks";
import CompletedTasks from "../completed-tasks/CompletedTasks";
import ProflieCard from "../proflie-card/ProflieCard";
import { DragDropContext } from "react-beautiful-dnd";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/tasks?user=${user.email}`);
            return res.data;
        }
    });
    // console.log(tasks);
    const allToDo = tasks.filter(task => task.status === "todo");
    const allOnGoing = tasks.filter(task => task.status === "ongoing");
    const allCompleted = tasks.filter(task => task.status === "completed");

    const handleDragEnd = result => {
        console.log(result);
        // console.log(result.draggableId);
        // console.log(result.source.droppableId, result.source.index);
        // console.log(result.destination.droppableId, result.destination.index);
        // console.log(result.source.droppableId === result.destination.droppableId);
        if (!result.destination || result.destination.droppableId === result.source.droppableId) {
            return;
        }
        
        const data = {}
        if (result.destination.droppableId === "todo-list") {
            data.status = "todo";
        }
        else if (result.destination.droppableId === "ongoing-list") {
            data.status = "ongoing";
        }
        else {
            data.status = "completed";
        }
        axios.patch(`http://localhost:5000/tasks/${result.draggableId}`, data)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                }

            })

    };

    return (
        <div className="mt-20">
            <ProflieCard />
            <AddTask refetch={refetch} />
            {/* 3 type of task component  */}
            <DragDropContext onDragEnd={handleDragEnd}>

                <ToDoTasks refetch={refetch} allToDo={allToDo} />
                <OnGoingTasks refetch={refetch} allOnGoing={allOnGoing} />
                <CompletedTasks refetch={refetch} allCompleted={allCompleted} />

            </DragDropContext>
        </div>
    );
};

export default Dashboard;