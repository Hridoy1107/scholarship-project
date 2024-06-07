import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";
import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [selectedReview, setSelectedReview] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews', user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews?email=${user.email}`);
            return res.data;
        }
    })

    const handleDelete = review => {
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
                axiosPublic.delete(`/reviews/${review._id}`)
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

    const handleEdit = (review) => {
        setSelectedReview(review);
        document.getElementById('my_modal_1').showModal();
    };

    const handleEditReview = async (event) => {
        event.preventDefault();

        const form = event.target;

        const rating = parseFloat(form.rating.value);
        const photoFile = event.target.elements.photo.files[0];

        const comment = form.comment.value;

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

        const editedReview = { rating, photoURL, comment }


        axiosPublic.put(`/reviews/${selectedReview._id}`, editedReview)
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Review Edited Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                    refetch();
                }
            })
    }
    const handleDetails = (review) => {
        setSelectedReview(review);
        document.getElementById('my_modal_2').showModal();
    };

    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
      }

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">My Reviews to manage</h1>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Total Reviews: {reviews.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>University Name</th>
                            <th>Review date</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => (
                                <tr key={review._id}>
                                    <th>{index + 1}</th>
                                    <td><span className="font-semibold">{review.universityName}</span></td>
                                    <td><span className="font-semibold">{review.reviewDate}</span></td>
                                    <td><span className="font-semibold">{review.comment}</span></td>
                                    <td>
                                        <div className="gap-x-4 flex ">
                                        <button onClick={() => handleDetails(review)} className="btn btn-info">Details</button>
                                            <button onClick={() => handleEdit(review)} className="btn btn-warning">Edit</button>
                                            <button onClick={() => handleDelete(review)} className="btn btn-error">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            

            {selectedReview && (
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Review</h3>
                        <div>
                            <form onSubmit={handleEditReview}>
                                <div className="lg:flex mb-2">
                                    <div className="form-control lg:w-1/2 lg:ml-4">
                                        <label className="label">
                                            <span className="label-text font-medium text-black">Rating</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="rating" placeholder="Rate out of 5"
                                                defaultValue={selectedReview.rating} className="input input-bordered w-full" />
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
                                            <input type="text" name="userName" defaultValue={selectedReview.userName}
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
                                    defaultValue={selectedReview.comment}
                                ></textarea>
                                <input type="submit" value="Edit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </dialog>
            )}

{selectedReview && (
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Details</h3>
                        <div>
                            <img className="my-4 w-20 h-20 avatar" src={selectedReview.photoURL} />
                            <div className="lg:px-36 px-20">
                                            <Rating
                                                style={{ maxWidth: 180 }}
                                                value={selectedReview.rating}
                                                readOnly itemStyles={myStyles}
                                            />
                                            </div>
                            <p className="lg:text-xl"><strong>Reviewer:</strong> {selectedReview.userName}</p>
                            <p className="lg:text-xl"><strong>Review date:</strong> {selectedReview.reviewDate}</p>
                            <p className="lg:text-xl"><strong>University:</strong> {selectedReview.universityName}</p>
                        </div>
                    </div>
                </dialog>
            )}

        </>
    );
};

export default MyReviews;