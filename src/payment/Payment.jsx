import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckForm from "./CheckForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_API);
const Payment = () => {
    const scholarships = useLoaderData();
    const { applicationFees, serviceCharges } = scholarships

    const totalFees = applicationFees + serviceCharges;
    return (
        <>
            <h1 className="my-2 font-semibold text-xl lg:text-3xl">Pay for further process</h1>
            <h1 className="font-semibold text-xl lg:text-3xl">You have to pay ${totalFees}</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <div className="lg:px-10">
                    <CheckForm></CheckForm>
                    </div>
                </Elements>
            </div>
        </>
    );
};

export default Payment;