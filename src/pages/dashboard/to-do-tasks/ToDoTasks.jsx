
import PropTypes from 'prop-types';
import toDo from '../../../assets/to-do.png';
import TaskCard from '../task-card/TaskCard';
import { Droppable } from 'react-beautiful-dnd';
const ToDoTasks = ({ allToDo, refetch }) => {
    // console.log(allToDo);

    return (
        <Droppable droppableId="todo-list">
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="mt-20 bg-deep-orange-100 p-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-semibold">To do tasks</h3>
                            <img className="h-8 w-8" src={toDo} alt="" />
                        </div>
                        <hr className="mt-1 border border-black" />
                        {
                            allToDo.length > 0
                                ?
                                // task cards container 
                                <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        allToDo.map((todo, index) => <TaskCard
                                            key={todo._id}
                                            taskData={todo}
                                            refetch={refetch}
                                            index={index}
                                        />)
                                    }
                                </div>
                                :
                                <p className='mt-9 text-center text-xl'>You have no to-do task.</p>
                        }
                        {provided.placeholder}
                    </div>
                )
            }

        </Droppable>
    );
};
ToDoTasks.propTypes = {
    allToDo: PropTypes.array.isRequired,
    refetch: PropTypes.func.isRequired
};
export default ToDoTasks;