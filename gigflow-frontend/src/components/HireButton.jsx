import { useDispatch } from "react-redux";
import { hireFreelancer, getBids } from "../features/bids/bidSlice";
import { getGig } from "../features/gigs/gigSlice";

const HireButton = ({ bidId, gigId }) => {
  const dispatch = useDispatch();

  const hireHandler = async () => {
    await dispatch(hireFreelancer(bidId));
   
    dispatch(getGig(gigId));
    dispatch(getBids(gigId));
  };

  return (
    <button
      onClick={hireHandler}
      className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
    >
      Hire
    </button>
  );
};

export default HireButton;
