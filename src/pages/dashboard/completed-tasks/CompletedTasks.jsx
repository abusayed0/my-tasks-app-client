
import PropTypes from 'prop-types';
import target from '../../../assets/target.png';
import TaskCard from '../task-card/TaskCard';

const CompletedTasks = ({ allCompleted }) => {
    console.log(allCompleted);
    return (
        <div className="mt-20">
            <div className="flex gap-2 items-center">
                <h3 className="text-2xl font-semibold">Completed tasks</h3>
                <img className="h-8 w-8" src={target} alt="" />
            </div>
            <hr className="mt-1 border border-black" />
            {
                allCompleted.length > 0
                    ?
                    <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            allCompleted.map(todo => <TaskCard
                                key={todo._id}
                                taskData={todo}
                            />)
                        }
                    </div>
                    :
                    <p className='mt-9 text-center text-xl'>You have no completed task.</p>
            }
        </div>
    );
};
CompletedTasks.propTypes = {
    allCompleted: PropTypes.array.isRequired
};
export default CompletedTasks;