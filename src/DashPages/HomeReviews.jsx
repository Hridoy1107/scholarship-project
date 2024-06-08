import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const HomeReviews = () => {

    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    })

    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const currentItems = reviews.slice(
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
                <h3 className="text-4xl md:text-5xl text-teal-600 font-semibold">
                    All Reviews
                </h3>
                <p className="text-base font-medium lg::text-lg my-4 lg:px-20 lg:my-6">
                    Discover Inspiring Stories and Detailed Testimonials from Our Successful Scholarship Recipients with Comprehensive Student Reviews Highlighting Their Journeys, Achievements, and Experiences
                </p>
            </div>
            <>
                <div className="grid my-6 lg:grid-cols-3 gap-4">
                    {
                        currentItems.map((review) => (
                            <div key={review._id} {...review}>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={review.photoURL} />
                                    </div>
                                    <div className="p-6">
                                        <div className="lg:px-28 px-16">
                                            <Rating
                                                style={{ maxWidth: 180 }}
                                                value={review.rating}
                                                readOnly itemStyles={myStyles}
                                            />
                                        </div>
                                        <div className="lg:h-[60px] h-[52px]">
                                            <h1 className="block mt-1 lg:text-xl text-sm font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">Review given by: {review.userName}</h1>
                                            <h1 className="mx-4 lg:text-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600 mt-1">Comment: {review.comment}</h1>
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
                            <button key={page + 1} className={`join-item btn border-white ${currentPage === page + 1 ? 'btn-accent' : ''}`} onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                        <button className="join-item btn border-white" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            »
                        </button>
                    </div>
                </div>
            </>
        </>
    );
};

export default HomeReviews;