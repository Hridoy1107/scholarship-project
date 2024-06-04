import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";


const DashAllScholarships = () => {

    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [], refetch, isLoading} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarships');
            return res.data;
        }
    })

    const handleDelete = scholarship => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/scholarships/${scholarship._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Scholarship has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        })
    }

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
        <h1 className="mt-2 font-semibold text-xl lg:text-3xl">All Scholarships to manage</h1>
            <div className="grid my-6 lg:grid-cols-3 gap-4">
                {
                    currentItems.map((scholarship) => (
                        <>
                            <div>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={scholarship.photoURL} />
                                    </div>
                                    <div className="p-6">
                                    <div className="lg:h-[60px] h-[52px]">
                                            <h1 className="block mt-1 lg:text-xl text-sm font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">{scholarship.universityName}</h1>
                                            <h1 className="mx-4 lg:text-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600 mt-1">{scholarship.scholarshipName}</h1>
                                        </div>
                                        <div className="flex justify-around mt-1">
                                            <h1 className="block text-sm font-medium text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">Category: {scholarship.scholarshipCategory}</h1>
                                            <h1 className="block text-sm font-medium text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">Subject: {scholarship.subjectCategory}</h1>
                                        </div>
                                        <div className="mt-4">
                                            <div className="lg:flex lg:justify-around">
                                                <Link to={`edit-scholarships/${scholarship._id}`}className="bg-yellow-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-yellow-600 active:scale-95">Edit</Link>
                                                <a onClick={() => handleDelete(scholarship)} className="bg-red-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-red-600 active:scale-95">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
            <div className="my-4">
                <div className="join">
                    <button className="join-item btn bg-neutral-100 hover:bg-neutral-100" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        «
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button key={page + 1} className={`join-item btn bg-neutral-100 hover:bg-neutral-100 text-black ${currentPage === page + 1 ? 'btn-active bg-emerald-500 hover:bg-emerald-400' : ''}`} onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </button>
                    ))}
                    <button className="join-item btn hover:bg-neutral-100 bg-neutral-100" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        »
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashAllScholarships;