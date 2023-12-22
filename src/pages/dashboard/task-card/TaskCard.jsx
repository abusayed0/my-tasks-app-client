import {
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPencil, FaTrashCan, FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const TaskCard = ({ taskData, refetch }) => {
    const { _id, title, description, status, deadline, priority } = taskData;
    const handleDeleteTask = () => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/tasks/${_id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch();
                            toast.success("Task deleted successfully!")
                        }
                    })
            }
        });

    };

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const [open, setOpen] = useState(false);

    const handleOpen = () => { setOpen((cur) => !cur) };

    const handleCloseModal = () => {
        handleOpen();
        reset();
    };


    const handleUpdateTask = data => {
        console.log(_id);
        console.log(data);
        axios.patch(`http://localhost:5000/tasks/${_id}`, data)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    handleCloseModal();
                    refetch();
                    toast.success("Tasks updated successfully!")
                }
            })
    };


    return (
        <div>
            <Card>
                <CardBody className="relative !p-3 md:!p-6">
                    <Typography variant="h5" color="blue-gray" className="mb-2 capitalize">
                        {title}
                    </Typography>
                    <Typography variant="small" className="absolute top-3 md:top-6 right-3 md:right-6 border border-[#A93159]  p-1 rounded capitalize">
                        {priority}
                    </Typography>
                    <Typography className="capitalize">
                        {description}
                    </Typography>

                    <Typography className="capitalize">
                        deadline : {deadline}
                    </Typography>
                </CardBody>
                <CardFooter className=" !p-3 !pt-0 md:!p-6">

                    <button onClick={handleDeleteTask} className=" bg-red-700 p-2 rounded-md">
                        <FaTrashCan className="text-xl text-white" />
                    </button>
                    <button onClick={handleOpen} className="ml-4 bg-[#A93159] p-2 rounded-md">
                        <FaPencil className="text-xl text-white" />
                    </button>
                </CardFooter>
            </Card>
            <Dialog
                size="lg"
                open={open}
                // handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="w-full overflow-y-auto max-h-[calc(100vh_-_32px)]">


                    <form className="flex flex-col gap-4 p-6 relative " onSubmit={handleSubmit(handleUpdateTask)}>
                        <FaXmark onClick={handleCloseModal} className="text-2xl absolute right-6 cursor-pointer text-red-600" />
                        <h4 className="text-3xl  font-semibold">
                            Please update your task
                        </h4>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="title">Title</label>
                            <input defaultValue={title} className="border border-gray-600 rounded-md p-3" placeholder="Task title" type="text" id="title"  {...register("title", { required: true })} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="description">Description</label>
                            <textarea defaultValue={description} className="border border-gray-600 rounded-md p-3 h-[80px]" placeholder="Task description" type="text" id="description"  {...register("description", { required: true })} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="status">Status</label>
                            <select defaultValue={status} className="border border-gray-600 rounded-md p-3" id="status"  {...register("status", { required: true })}>
                                <option value="todo">To-do</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="priority">Priority</label>
                            <select defaultValue={priority} className="border border-gray-600 rounded-md p-3" id="priority"  {...register("priority", { required: true })}>
                                <option value="high">High</option>
                                <option value="moderate">Moderate</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="deadline">Deadline</label>
                            <input defaultValue={deadline} className="border border-gray-600 rounded-md p-3" placeholder="Task deadline" type="date" id="deadline" {...register("deadline", { required: true })} />
                        </div>

                        <button className="w-full py-2 font-medium text-xl text-white bg-[#A93159] rounded-md" type="submit">Update</button>
                    </form>


                </Card>
            </Dialog>
        </div>
    );
};
TaskCard.propTypes = {
    taskData: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
}
export default TaskCard;