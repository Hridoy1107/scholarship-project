import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";


const AllApplications = () => {

    const axiosPublic = useAxiosPublic();
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], refetch, isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosPublic.get('/applications');
            return res.data;
        }
    })

    const handleDetails = (application) => {
        setSelectedApplication(application);
        document.getElementById('my_modal_1').showModal();
    };

    const handleFeedback = (application) => {
        setSelectedApplication(application);
        document.getElementById('my_modal_2').showModal();
    };

    const handleFeedbackPost = event => {
        event.preventDefault();
    
        const form = event.target;
        const feedback = form.feedback.value;
        const applicationId = selectedApplication._id;
    
        axiosPublic.patch(`/applications/${applicationId}`, { feedback })
        .then(data => {
            console.log(data.data);
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Feedback Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                form.reset();
                refetch();
            }
        })
    }

    const handleApprove = application => {
    
        const applicationId = application._id;
    
        axiosPublic.patch(`/applications/${applicationId}`, { status: 'processing' })
        .then(data => {
            console.log(data.data);
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Approved Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                refetch();
            }
        })
    }

    const handleReject = application => {
    
        const applicationId = application._id;
    
        

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/applications/${applicationId}`, { status: 'rejected' })
                .then(data => {
                    console.log(data.data);
                    if (data.data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Rejected Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        });
                        refetch();
                    }
                })
            }})
    }


    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">All applications to manage</h1>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Total Applications: {applications.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Applicant Name</th>
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
                                    <td><span className="font-semibold">{application.userName}</span></td>
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
                                            <button className="btn btn-info" onClick={() => handleDetails(application)}>Details</button>
                                            <button onClick={() => handleFeedback(application)} className="btn btn-warning">Feedback</button>
                                            <button onClick={() => handleReject(application)} className="btn btn-error">Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {selectedApplication && (
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Details</h3>
                        <div>
                            <img className="my-4 w-20 h-20 avatar" src={selectedApplication.photoURL} />
                            <p className="lg:text-xl"><strong>Name:</strong> {selectedApplication.userName}</p>
                            <p className="lg:text-xl"><strong>University:</strong> {selectedApplication.universityName}</p>
                            <p className="lg:text-xl"><strong>Subject:</strong> {selectedApplication.subjectCategory}</p>
                            <p className="lg:text-xl"><strong>Degree:</strong> {selectedApplication.degreeCategory}</p>
                            <p className="lg:text-xl"><strong>Address:</strong> {selectedApplication.applicantAddress}</p>
                            <p className="lg:text-xl"><strong>Contact:</strong> {selectedApplication.contactNumber}</p>
                            <p className="lg:text-xl"><strong>Email:</strong> {selectedApplication.email}</p>
                            <p className="lg:text-xl"><strong>Application Fees:</strong> {selectedApplication.applicationFees}</p>
                            <p className="lg:text-xl"><strong>Service Charges:</strong> {selectedApplication.serviceCharges}</p>
                            <p className="lg:text-xl"><strong>SSC Result:</strong> {selectedApplication.sscResult}</p>
                            <p className="lg:text-xl"><strong>HSC Result:</strong> {selectedApplication.hscResult}</p>
                            <p className="lg:text-xl"><strong>Scholarship Category:</strong> {selectedApplication.scholarshipCategory}</p>
                            <p className="lg:text-xl"><strong>Applied Date:</strong> {selectedApplication.currentDate}</p>
                            <button onClick={() => handleApprove(selectedApplication)} className="btn btn-primary my-1">Approve</button>
                        </div>
                    </div>
                </dialog>
            )}

            {selectedApplication && (
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Feedback</h3>
                        <div>
                            <form onSubmit={handleFeedbackPost}>
                                <textarea
                                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                                    type="text" name="feedback" placeholder="Give Feedback"
                                ></textarea>
                                <input type="submit" value="Add Feedback" className="btn btn-primary btn-block mt-4" />
                            </form>

                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default AllApplications;