import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const AllScholarships = () => {

    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/scholarships?searchTerm=${searchTerm}`);
            return res.data;
        }
    })

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews/');
            return res.data;
        }
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const itemsPerPage = 3;

    const handleSortBy = (criteria) => {
        if (criteria === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortDirection('asc');
        }
    };

    const sortedScholarships = () => {
        let sortedItems = [...scholarships];
        if (sortBy) {
            sortedItems.sort((a, b) => {
                if (sortBy === 'postDate') {
                    const dateA = new Date(a[sortBy]);
                    const dateB = new Date(b[sortBy]);
                    if (sortDirection === 'desc') {
                        return dateA - dateB;
                    } else {
                        return dateB - dateA;
                    }
                } else {
                    if (sortDirection === 'asc') {
                        return a[sortBy] - b[sortBy];
                    } else {
                        return b[sortBy] - a[sortBy];
                    }
                }
            });
        }
        return sortedItems;
    };

    const totalPages = Math.ceil(sortedScholarships().length / itemsPerPage);

    const currentItems = sortedScholarships().slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('search');
        setSearchTerm(searchValue);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSortBy(null);
        setCurrentPage(1);
    };

    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    }

    const groupedReviews = reviews.reduce((accumulator, review) => {
        const { scholarshipId, rating } = review;
        if (!accumulator[scholarshipId]) {
            accumulator[scholarshipId] = { totalRating: 0, count: 0 };
        }
        accumulator[scholarshipId].totalRating += rating;
        accumulator[scholarshipId].count += 1;
        return accumulator;
    }, {});

    const averageRatings = {};
    Object.keys(groupedReviews).forEach(scholarshipId => {
        averageRatings[scholarshipId] = groupedReviews[scholarshipId].totalRating / groupedReviews[scholarshipId].count;
    });

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">All scholarship options we have for you</h1>
            <div className="my-4 lg:px-20">
                <form onSubmit={handleSearch}>
                    <label className="lg:mx-80 mx-4 input input-bordered flex items-center gap-2">
                        <input type="text" className="grow"
                            name="search" placeholder="Search your university/scholarship/degree" />
                    </label>
                    <input type="submit" className="btn my-2 btn-info h-12 w-28" value="Search" />
                </form>
                <div className="mb-2">
                    <button onClick={handleReset} className="btn btn-error h-12 w-28">Reset</button>
                </div>
                <div className="flex justify-center items-center tem my-3">
            <button className="btn btn-warning h-12" onClick={() => handleSortBy('applicationFees')}>Lowest Fees</button>
                <button className="btn btn-accent ml-4 h-12" onClick={() => handleSortBy('postDate')}>Recently Posted</button>
            </div>
            </div>
            <div className="grid my-6 lg:grid-cols-3 gap-4">
                {
                    currentItems.map((scholarship) => {
                        const averageRating = averageRatings[scholarship._id] || 0;
                        return (
                            <div key={scholarship._id}>
                                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex justify-center items-center mt-2 h-[212px]">
                                        <img className="object-cover h-[212px]" src={scholarship.photoURL} />
                                    </div>
                                    <div className="p-6">
                                    <div className="px-20 lg:px-28">
                                                <Rating
                                                    style={{ maxWidth: 180 }}
                                                    value={averageRating}
                                                    readOnly itemStyles={myStyles}
                                                />
                                            </div>
                                        <div className="lg:h-[60px] h-[52px]">
                                            <h1 className="block mt-1 lg:text-xl text-sm font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 px-2">{scholarship.universityName}</h1>
                                            <h1 className="mx-4 lg:text-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600 mt-1">{scholarship.scholarshipName}</h1>
                                        </div>
                                        <div>
                                            <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-600">University Rank: {scholarship.rank}</h1>
                                            <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 mt-1 dark:text-gray-200 hover:text-gray-600">Degree: {scholarship.degreeCategory}</h1>
                                            <h1 className="mx-4 lg:text-base text-sm font-semibold text-gray-700 mt-1 dark:text-gray-200 hover:text-gray-600">Posted on: {scholarship.postDate}</h1>
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
                        )
                    })
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
        </>
    );
};

export default AllScholarships;