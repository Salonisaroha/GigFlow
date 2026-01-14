import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGig } from "../features/gigs/gigSlice";
import { createBid, getBids } from "../features/bids/bidSlice";
import HireButton from "../components/HireButton";
import { toast } from "react-toastify";

const GigDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { gig } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);
  const { bids } = useSelector((state) => state.bids);

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getGig(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (gig && user && gig.ownerId._id === user._id) {
      dispatch(getBids(id));
      // Stop polling to avoid flicker
    }
  }, [gig, dispatch, id, user]);

  const submitBidHandler = (e) => {
    e.preventDefault();
    if (!user) return; // Should not happen due to conditional rendering below

    dispatch(createBid({ gigId: id, message, price }))
      .unwrap()
      .then(() => {
        toast.success("Proposal sent successfully!");
        setMessage("");
        setPrice("");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to send proposal");
      });
  };

  if (!gig) return <p>Loading...</p>;

  const isOwner = user && gig.ownerId._id === user._id;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Job Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{gig.title}</h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-4">Posted by {gig.ownerId.name}</span>
                  <span>• {new Date(gig.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${gig.status === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
                  }`}
              >
                {gig.status.toUpperCase()}
              </span>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
              <div className="text-gray-600 prose max-w-none whitespace-pre-wrap">
                {gig.description}
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center">
              <div>
                <span className="block text-sm font-medium text-gray-500 uppercase tracking-wide">Budget</span>
                <span className="block text-2xl font-bold text-gray-900 mt-1">₹{gig.budget.toLocaleString()}</span>
              </div>
       
            </div>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {isOwner ? `Proposals (${bids.length})` : "Place a Bid"}
            </h3>
          </div>

          <div className="p-6">
            {!user && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You must be logged in to apply for this job.</p>
                <a href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Log in to Apply
                </a>
              </div>
            )}

            {user && !isOwner && gig.status === "open" && !gig.hasApplied && (
              <form onSubmit={submitBidHandler} className="space-y-6">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Cover Letter</label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="Explain why you are the best fit for this role..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Bid Amount (₹)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Proposal
                  </button>
                </div>
              </form>
            )}

            {user && gig.hasApplied && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Application Submitted
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        You have already applied for this position.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isOwner && gig.status !== "open" && (
              <div className="text-center py-6">
                <p className="text-gray-500">This job is closed for new bids.</p>
              </div>
            )}

            {isOwner && (
              <div className="space-y-6">
                {bids.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No bids yet.</p>
                ) : (
                  bids.map((bid) => (
                    <div key={bid._id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{bid.freelancerId.name}</h4>
                          <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xl font-bold text-indigo-600">₹{bid.price}</span>
                          {bid.status !== "pending" && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${bid.status === 'hired' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {bid.status.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 bg-white border border-gray-100 rounded p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{bid.message}</p>
                      </div>

                      {gig.status === "open" && bid.status === "pending" && (
                        <div className="mt-4 flex justify-end">
                          <HireButton bidId={bid._id} gigId={gig._id} />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
