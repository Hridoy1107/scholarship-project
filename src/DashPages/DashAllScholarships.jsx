import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const DashAllScholarships = () => {

    const axiosPublic = useAxiosPublic();
    const { data: scholarships = [], refetch} = useQuery({
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

    return (
        <>

            <div className="grid my-6 lg:grid-cols-3 gap-4">
                {
                    scholarships.map((scholarship) => (
                        <>
                            <div>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 h-[490px]">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={scholarship.photoURL} />
                                    </div>
                                    <div className="p-6">
                                        <div className="h-[120px]">
                                            <h1 className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">{scholarship.universityName}</h1>
                                            <h1 className="mx-4 text-xl font-semibold text-gray-700 dark:text-gray-200 mt-2">{scholarship.scholarshipName}</h1>
                                        </div>
                                        <div className="mt-4">
                                            <div className="lg:flex lg:justify-around">
                                                <Link to={`/edit/${scholarship._id}`} className="bg-yellow-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-yellow-600 active:scale-95">Edit</Link>
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
        </>
    );
};

export default DashAllScholarships;