import { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyApplications = () => {

    const { user } = useContext(AuthContext);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: applications = [], refetch, isLoading } = useQuery({
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
            window.location.href = `my-applications/edit-application/${application._id}`;
        }
    };

    const handleCancel = application => {
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
                axiosPublic.delete(`/applications/${application._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Application has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }

    const handleDetails = (application) => {
        setSelectedApplication(application);
        document.getElementById('my_modal_2').showModal();
    };

    const handleReview = (application) => {
        setSelectedApplication(application);
        document.getElementById('my_modal_1').showModal();
    };

    const handleAddReview = async (event) => {
        event.preventDefault();

        const form = event.target;

        const rating = parseFloat(form.rating.value);
        const photoFile = event.target.elements.photo.files[0];
        const reviewDate = form.reviewDate.value;

        const userName = form.userName.value;
        const comment = form.comment.value;

        const scholarshipId = selectedApplication.scholarshipId;
        const universityName = selectedApplication.universityName;

        const email = user.email;

        let photoURL = '';

        if (photoFile) {
            const formData = new FormData();
            formData.append('image', photoFile);

            try {
                const uploadRes = await axios.post(image_hosting_api, formData);
                photoURL = uploadRes.data.data.display_url;
            } catch (error) {
                console.error("Error uploading image to imgBB:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload image',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
        }

        const newReview = { rating, photoURL, reviewDate, userName, comment, scholarshipId, email, universityName }


        axiosPublic.post('/reviews', newReview)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Review Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                }
            })
    }

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
                                    <td className="font-medium">{application?.feedback ? <><span className="text-emerald-500">{application.feedback}</span></> : <><h1 className="text-yellow-500">No feedback given</h1></>}</td>
                                    <td className="font-medium">
                                        {application.status === 'processing' ? <><h1 className="text-blue-700">Processing</h1></> : application.status === 'completed' ? <><h1 className="text-green-500">Completed</h1></> :
                                            application.status === 'rejected' ? <><h1 className="text-red-600">Rejected</h1></> : <><h1 className="text-yellow-400">Pending</h1></>}
                                    </td>
                                    <td>
                                        <div className="gap-x-4 flex ">
                                            <button onClick={() => handleDetails(application)} className="btn btn-info">Details</button>
                                            <button onClick={() => handleEdit(application)} className="btn btn-warning">Edit</button>
                                            <button onClick={() => handleCancel(application)} className="btn btn-error">Cancel</button>
                                            <button onClick={() => handleReview(application)} className="btn btn-primary text-black">Review</button>
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
                        <h3 className="font-bold text-lg">Review</h3>
                        <div>
                            <form onSubmit={handleAddReview}>
                                <div className="lg:flex mb-2">
                                    <div className="form-control lg:w-1/2 lg:ml-4">
                                        <label className="label">
                                            <span className="label-text font-medium text-black">Rating</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="rating" placeholder="Rate out of 5" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control lg:w-1/2 lg:ml-4">
                                        <label className="label">
                                            <span className="label-text font-medium text-black">Review Date</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="reviewDate" defaultValue={new Date().toLocaleDateString('en-GB')} readOnly={true} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                                <div className="lg:flex mb-2">
                                    <div className="form-control lg:w-1/2">
                                        <label className="label">
                                            <span className="label-text font-medium text-black">Reviewer Image</span>
                                        </label>
                                        <input className="mb-4 text-black w-full rounded-xl py-2 px-4" type="file" name="photo" />
                                    </div>
                                    <div className="form-control lg:w-1/2 lg:ml-4">
                                        <label className="label">
                                            <span className="label-text font-medium text-black">Reviewer Name</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="userName" defaultValue={selectedApplication.userName}
                                                readOnly={true} className="input input-bordered w-full " />
                                        </label>
                                    </div>
                                </div>
                                <label className="font-medium text-black">
                                    Review Comment
                                </label>
                                <textarea
                                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                                    type="text" name="comment" placeholder="Comment"
                                ></textarea>
                                <input type="submit" value="Add Feedback" className="btn btn-primary btn-block mt-4" />
                            </form>
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
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default MyApplications;