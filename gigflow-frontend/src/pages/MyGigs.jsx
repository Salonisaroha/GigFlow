import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyGigs } from "../features/gigs/gigSlice";
import GigCard from "../components/GigCard";
import { Link } from "react-router-dom";

const MyGigs = () => {
    const dispatch = useDispatch();
    const { gigs, loading } = useSelector((state) => state.gigs);

    useEffect(() => {
        dispatch(getMyGigs());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Posted Jobs</h1>
                    <Link
                        to="/create-gig"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        + Post New Job
                    </Link>
                </div>

                {loading ? (
                    <div className="min-h-[200px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : gigs.length === 0 ? (
                    <div className="text-center py-12 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-medium text-gray-900">No jobs posted yet</h3>
                        <p className="mt-2 text-gray-500">You haven't posted any gigs yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <GigCard key={gig._id} gig={gig} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyGigs;
