/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Text } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// eslint-disable-next-line react/prop-types
const CustomTick = ({ x, y, payload }) => {
    return (
        <Text x={x} y={y + 15} fill="green" fontWeight="600" textAnchor="middle">
            {payload.value}
        </Text>
    );
};

const Charts = () => {

    const axiosPublic = useAxiosPublic();
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    })

    const calculateTotalPrice = (payments) => {
        return payments.reduce((total, payment) => total + payment.price, 0);
    };

    const totalPrice = calculateTotalPrice(payments);

    const data = payments.map((payment) => ({
        name: payment.email,
        uv: payment.price, 
      }));

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">
                Chart to watch user and payment
            </h1>
            <div className="lg:flex justify-center items-center gap-3">
            <div className="bg-green-300 p-4 mt-3 rounded-xl">
                    <h1 className="font-medium text-xl text-black">Total Revenue: ${totalPrice}</h1>
                    </div>
                    <div className="bg-yellow-300 p-4 mt-3 rounded-xl">
                    <h1 className="font-medium text-xl text-black">Total Payer: {payments.length}</h1>
                    </div>
            </div>
            <div className="mt-6">
            <BarChart
                width={1120}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={<CustomTick />}/>
                <YAxis />
                <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>
            </div>
        </>
    );
};

export default Charts;