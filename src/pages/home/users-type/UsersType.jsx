import { Chart } from "react-google-charts";

export const data = [
    ["Task", "Hours per Day"],
    ["Developers", 11],
    ["Bankers", 2],
    ["Corporate professionals", 2],
    ["Students", 7],
    ["Others", 2],
];

const options = {
    title: "Types of user using My Tasks",
    is3D: true,
};

const UsersType = () => {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
            className="mt-20"
        />
    );
};

export default UsersType;