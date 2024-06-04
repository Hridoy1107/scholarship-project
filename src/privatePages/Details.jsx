import { animate, useMotionTemplate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link, useLoaderData } from "react-router-dom";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Details = () => {

    const scholarships = useLoaderData();
    const { _id, scholarshipName, universityName, country, city, photoURL, subjectCategory, scholarshipCategory, degreeCategory, applicationFees, serviceCharges, deadlineDate, postDate, description } = scholarships


    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    return (
        <>
            <div className="mt-5 lg:mx-40">
                <motion.section
                    style={{
                        backgroundImage,
                    }}
                    className="relative grid rounded-xl place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
                >
                    <div className="flex justify-center items-center mb-2 h-[212px]">
                        <img className="lg:mx-40 h-60 rounded-xl bg-slate-100" src={photoURL} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center mt-2">
                        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-4xl md:leading-tight">
                            {universityName}
                        </h1>
                        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-2xl md:leading-tight">
                        Location: {city}, {country}
                        </h1>
                    </div>
                    <div className="mt-2 justify-between">
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">Category: {scholarshipCategory}
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight mt-2">Scholarship Name: {scholarshipName}
                        </h1>
                    </div>
                    <div className="lg:flex my-2 justify-between">
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight mb-1">
                            Subject: {subjectCategory}
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Degree: {degreeCategory}
                        </h1>
                    </div>
                    <div className="lg:flex mb-2 justify-between">
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight mb-1">
                            Posted: {postDate}
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Deadline: {deadlineDate}
                        </h1>
                    </div>
                    <div className="lg:flex justify-between mb-1">
                        <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight mb-1">
                            Service Charge: ${serviceCharges}
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Application Fees: ${applicationFees}
                        </h1>
                    </div>
                    <div>
                    <p className=" max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="relative mt-3 z-10 flex flex-col items-center">
                        <Link to={`/payment/${_id}`} >
                            <motion.button
                                style={{
                                    border,
                                    boxShadow,
                                }}
                                whileHover={{
                                    scale: 1.015,
                                }}
                                whileTap={{
                                    scale: 0.985,
                                }}
                                className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                            >
                                Apply Now
                                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.section>
            </div>
            <div>
                <h1>Reviews</h1>
            </div>
        </>
    );
};

export default Details;