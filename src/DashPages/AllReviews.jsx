import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const AllReviews = () => {
    const [selectedReview, setSelectedReview] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
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

    const handleDetails = (review) => {
        setSelectedReview(review);
        document.getElementById('my_modal_1').showModal();
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
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">All Reviews to manage</h1>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Total Reviews: {reviews.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Reviewer Name</th>
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
                                    <td><span className="font-semibold">{review.userName}</span></td>
                                    <td><span className="font-semibold">{review.universityName}</span></td>
                                    <td><span className="font-semibold">{review.reviewDate}</span></td>
                                    <td><span className="font-semibold">{review.comment}</span></td>
                                    <td>
                                        <div className="gap-x-4 flex ">
                                        <button onClick={() => handleDetails(review)} className="btn btn-info">Details</button>
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

export default AllReviews;