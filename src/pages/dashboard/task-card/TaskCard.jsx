import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';

const TaskCard = ({ taskData }) => {
    const { title, description, deadline, priority } = taskData;
    return (
        <Card className="">
            <CardBody className="relative !p-3 md:!p-6">
                <Typography variant="h5" color="blue-gray" className="mb-2 capitalize">
                    {title}
                </Typography>
                <Typography className="absolute top-3 md:top-6 right-3 md:right-6 bg-[#ea6793] text-white  p-1 rounded capitalize">
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
                <Button>Edit</Button>
            </CardFooter>
        </Card>
    );
};
TaskCard.propTypes = {
    taskData: PropTypes.object.isRequired
}
export default TaskCard;