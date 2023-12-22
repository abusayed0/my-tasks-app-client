
import PropTypes from 'prop-types';
import target from '../../../assets/target.png';
import TaskCard from '../task-card/TaskCard';
import { Droppable } from 'react-beautiful-dnd';

const CompletedTasks = ({ allCompleted, refetch }) => {
    // console.log(allCompleted);
    return (
        <Droppable droppableId="completed-list">
            {
                (provided) => (

                    <div ref={provided.innerRef} {...provided.droppableProps} className="mt-20 bg-lime-100 p-3">
                        <div className="flex gap-2 items-center">
                            <h3 className="text-2xl font-semibold">Completed tasks</h3>
                            <img className="h-8 w-8" src={target} alt="" />
                        </div>
                        <hr className="mt-1 border border-black" />
                        {
                            allCompleted.length > 0
                                ?
                                // task cards container 

                                <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        allCompleted.map((todo, index) => <TaskCard
                                            key={todo._id}
                                            taskData={todo}
                                            refetch={refetch}
                                            index={index}
                                        />)
                                    }
                                </div>
                                :
                                <p className='mt-9 text-center text-xl'>You have no completed task.</p>
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    );
};
CompletedTasks.propTypes = {
    allCompleted: PropTypes.array.isRequired,
    refetch: PropTypes.func.isRequired
};
export default CompletedTasks;