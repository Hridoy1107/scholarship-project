import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const AllScholarships = () => {

    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [], isLoading} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships');
            return res.data;
        }
    })

    if (isLoading) {
        return (
            <span className="loading loading-spinner loading-lg"></span>
        );
    }

    return (
        <>
            <div className="grid my-6 lg:grid-cols-3 gap-4">
                {
                    scholarships.map((scholarship) => (
                        <>
                            <div>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 h-[450px]">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={scholarship.photoURL} />
                                    </div>
                                    <div className="p-6">
                                        <div className="h-[80px]">
                                            <h1 className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">{scholarship.universityName}</h1>
                                            <h1 className="mx-4 text-xl font-semibold text-gray-700 dark:text-gray-200 mt-2">{scholarship.scholarshipName}</h1>
                                        </div>
                                        <div className="mt-4">
                                            <div className="lg:flex lg:justify-around">
                                                <Link to={`/details/${scholarship._id}`}className="bg-yellow-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-yellow-600 active:scale-95">Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    );
};

export default AllScholarships;