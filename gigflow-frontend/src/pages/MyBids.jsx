import { useEffect, useState } from "react";
import axios from "../utils/axios";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get("/bids/my-bids", {
          withCredentials: true,
        });
        setBids(res.data);
      } catch (err) {
        console.error("Failed to load bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-bids">
      <h2>My Bids</h2>

      {bids.length === 0 ? (
        <p>You haven’t placed any bids yet.</p>
      ) : (
        bids.map((bid) => (
          <div key={bid._id} className="bid-card">
            <h3>{bid.gig.title}</h3>
            <p>{bid.message}</p>
            <p>
              <strong>Price:</strong> ₹{bid.price}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBids;
