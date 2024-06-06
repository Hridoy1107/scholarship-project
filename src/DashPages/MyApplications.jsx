import { useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyApplications = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications', user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/applications?email=${user.email}`);
            return res.data;
        }
    })

    const handleEdit = (application) => {
        if (application?.status === 'processing' ||
            application?.status === 'completed' ||
            application?.status === 'rejected'
        ) {
            Swal.fire({
                title: 'Warning!',
                text: 'You can not edit in this status',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else {
            window.location.href = `edit/${application.scholarshipId}`;
        }
    };


    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">My applications to manage</h1>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Total Applications: {applications.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>University Name</th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => (
                                <tr key={application._id}>
                                    <th>{index + 1}</th>
                                    <td><span className="font-semibold">{application.universityName}</span></td>
                                    <td><span className="font-semibold">{application.subjectCategory}</span></td>
                                    <td><span className="font-semibold">{application.degreeCategory}</span></td>
                                    <td className="font-medium">{application?.feedback ? application.feedback : "No feedback given"}</td>
                                    <td className="font-medium">
                                        {application.status === 'processing' ? 'Processing' : application.status === 'completed' ? 'Completed' :
                                            application.status === 'rejected' ? 'Rejected' : 'Pending'}
                                    </td>
                                    <td>
                                        <div className="gap-x-4 flex ">
                                            <Link to={`/details/${application.scholarshipId}`} className="btn btn-info">Details</Link>
                                            <button onClick={() => handleEdit(application)} className="btn btn-warning">Edit</button>
                                            <button onClick={() => handleCancel(application)} className="btn btn-error">Cancel</button>
                                            <button onClick className="btn btn-primary text-black">Review</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyApplications;