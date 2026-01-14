import { Link } from "react-router-dom";

const GigCard = ({ gig }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {gig.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${gig.status === "open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          {gig.status === "open" ? "Active" : "Closed"}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
        {gig.description}
      </p>

      <div className="mt-auto border-t border-gray-50 pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Budget</p>
          <p className="text-lg font-bold text-gray-900">₹{gig.budget.toLocaleString()}</p>
        </div>

        <Link
          to={`/gigs/${gig._id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GigCard;
