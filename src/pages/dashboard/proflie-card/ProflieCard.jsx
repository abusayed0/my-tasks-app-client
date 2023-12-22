import {
    Card,
    CardHeader,
    CardBody,
   
    Typography,
   
} from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
const ProflieCard = () => {
    const {user} = useContext(AuthContext);
    return (
        <Card className="w-full md:w-96 mx-auto">
            <CardHeader floated={false} className="h-[250px]">
                <img className="h-full w-full" src={user.photoURL}/>
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                   {user.displayName}
                </Typography>

            </CardBody>

        </Card>
    )
};

export default ProflieCard;