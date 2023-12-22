
import PropTypes from 'prop-types';
import toDo from '../../../assets/to-do.png';
import TaskCard from '../task-card/TaskCard';
const ToDoTasks = ({ allToDo }) => {
    console.log(allToDo);
    
    return (
        <div className="mt-20">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">To do tasks</h3>
                <img className="h-8 w-8" src={toDo} alt="" />
            </div>
            <hr className="mt-1 border border-black" />
            {
                allToDo.length > 0
                    ?
                    <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            allToDo.map(todo => <TaskCard
                                key={todo._id}
                                taskData={todo}
                            />)
                        }
                    </div>
                    :
                    <p className='mt-9 text-center text-xl'>You have no to-do task.</p>
            }
        </div>
    );
};
ToDoTasks.propTypes = {
    allToDo: PropTypes.array.isRequired
};
export default ToDoTasks;