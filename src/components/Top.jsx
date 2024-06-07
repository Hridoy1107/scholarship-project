import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Top = () => {
    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships?top=true');
            return res.data;
        }
    })

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(scholarships.length / itemsPerPage);

    const currentItems = scholarships.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
        <div>
            <h3 className="text-4xl md:text-5xl text-emerald-500 font-semibold">
            Top Scholarships
            </h3>
            <p className="text-base font-medium lg::text-lg my-4 lg:px-20 lg:my-6">
            Explore our comprehensive and meticulously curated list of top scholarships, complete with detailed eligibility criteria, insider application tips, and critical deadlines to ensure you maximize your chances of success and secure the funding you need.
        </p>
        </div>
        <div>
        <div className="grid my-6 lg:grid-cols-3 gap-4">
                {
                    currentItems.map((scholarship) => (
                            <div key={scholarship._id}>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={scholarship.photoURL} />
                                    </div>
                                    <div className="p-6">
                                        <div className="lg:h-[60px] h-[52px]">
                                            <h1 className="block mt-1 lg:text-xl text-sm font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">{scholarship.universityName}</h1>
                                            <h1 className="mx-4 lg:text-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600 mt-1">{scholarship.scholarshipName}</h1>
                                        </div>
                                        <div>
                                        <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600">University Rank: {scholarship.rank}</h1>
                                        <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 mt-1 dark:text-gray-200 hover:text-gray-600">Degree: {scholarship.degreeCategory}</h1> 
                                        </div>
                                        <div className="flex justify-around mt-1">
                                            <h1 className="block text-sm font-medium text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">Category: {scholarship.scholarshipCategory}</h1>
                                            <h1 className="block text-sm font-medium text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">Subject: {scholarship.subjectCategory}</h1>
                                        </div>
                                        <div>
                                            <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600 mt-1">Location: {scholarship.city}, {scholarship.country}</h1>
                                        </div>
                                        <div>
                                            <h1 className="block lg:text-xl text-sm font-medium text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">Application Fees: ${scholarship.applicationFees}</h1>
                                        </div>
                                        <div className="mt-4">
                                            <div className="lg:flex lg:justify-around">
                                                <Link to={`/details/${scholarship._id}`} className="bg-yellow-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-yellow-600 active:scale-95">Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
            <div className="my-4">
                <div className="join">
                    <button className="join-item btn border-white" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        «
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button key={page + 1} className={`join-item btn border-white ${currentPage === page + 1 ? 'btn-info' : ''}`} onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </button>
                    ))}
                    <button className="join-item btn border-white" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        »
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Top;