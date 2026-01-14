import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBids } from "../features/bids/bidSlice";
import { Link } from "react-router-dom";

const MyApplications = () => {
    const dispatch = useDispatch();
    const { myBids, loading } = useSelector((state) => state.bids);

    useEffect(() => {
        dispatch(getMyBids());
    }, [dispatch]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "hired":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

                {loading ? (
                    <div className="min-h-[200px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : myBids.length === 0 ? (
                    <div className="text-center py-12 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-medium text-gray-900">No applications yet</h3>
                        <p className="mt-2 text-gray-500">You haven't bid on any gigs yet.</p>
                        <div className="mt-6">
                            <Link
                                to="/"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Browse Gigs
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {myBids.map((bid) => (
                                <li key={bid._id}>
                                    <Link
                                        to={`/gigs/${bid.gigId?._id}`}
                                        className="block hover:bg-gray-50 transition duration-150 ease-in-out"
                                    >
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                    {bid.gigId ? bid.gigId.title : "Gig Removed"}
                                                </p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                                                            bid.status
                                                        )}`}
                                                    >
                                                        {bid.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        Bid Amount: <span className="font-bold ml-1 text-gray-900">₹{bid.price}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <p>
                                                        Applied on {new Date(bid.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Message Preview */}
                                            <p className="mt-2 text-sm text-gray-500 line-clamp-1">
                                                {bid.message}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
