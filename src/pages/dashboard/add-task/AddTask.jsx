import { FaPlus, FaXmark } from "react-icons/fa6";
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
import {
    Dialog,
    Card,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import toast from "react-hot-toast";

const AddTask = ({refetch}) => {
    const {user} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleOpen = () => setOpen((cur) => !cur);
    const handleCloseModal = () => {
        handleOpen();
        reset();
    }
    const onSubmit = (data) => {
        const taskInfo = {
            user: user.email,
            status: "todo",
            ...data
        }
        axios.post("http://localhost:5000/tasks", taskInfo)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                reset();
                handleCloseModal();
                toast.success("Tasks added to todos successfully!")
                refetch();
            }
        })
    };

    return (
        <div>
            <div onClick={handleOpen} className="flex gap-2 items-center hover:text-[#A93159] cursor-pointer max-w-max">
                <h3  className="font-medium text-3xl">Add a new task</h3>
                <FaPlus className="text-2xl"/>
            </div>
            <hr className="mt-1 border border-black"/>
            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="w-full overflow-y-auto max-h-[calc(100vh_-_32px)]">


                    <form className="flex flex-col gap-4 p-6 relative " onSubmit={handleSubmit(onSubmit)}>
                        <FaXmark onClick={handleCloseModal} className="text-2xl absolute right-6 cursor-pointer text-red-600" />
                        <h4 className="text-3xl  font-semibold">
                            Please add your task
                        </h4>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="title">Title</label>
                            <input className="border border-gray-600 rounded-md p-3" placeholder="Task title" type="text" id="title"  {...register("title", { required: true })} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="description">Description</label>
                            <textarea className="border border-gray-600 rounded-md p-3 h-[80px]" placeholder="Task description" type="text" id="description"  {...register("description", { required: true })} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="priority">Priority</label>
                            <select className="border border-gray-600 rounded-md p-3" id="priority"  {...register("priority", { required: true })}>
                                <option value="high">High</option>
                                <option value="moderate">Moderate</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="deadline">Deadline</label>
                            <input className="border border-gray-600 rounded-md p-3" placeholder="Task deadline" type="date" id="deadline" {...register("deadline", { required: true })} />
                        </div>

                        <button className="w-full py-2 font-medium text-xl text-white bg-[#A93159] rounded-md" type="submit">Add</button>
                    </form>


                </Card>
            </Dialog>

        </div>
    );
};
AddTask.propTypes = {
    refetch: PropTypes.func.isRequired
};
export default AddTask;