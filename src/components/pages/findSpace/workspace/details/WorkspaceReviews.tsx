interface Review {
  id: string;
  userName: string;
  userInitials: string;
  date: string;
  comment: string;
}

interface WorkspaceReviewsProps {
  reviews: Review[];
  totalReviews: number;
}

export default function WorkspaceReviews({ reviews, totalReviews }: WorkspaceReviewsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reviews
        </h2>
        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          View all {totalReviews} reviews
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {review.userInitials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {review.userName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.date}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}