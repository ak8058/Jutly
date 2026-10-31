import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Ratings({ rating = 0, size = 15 }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <span className="inline-flex items-center" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) =>
        index < Math.round(value) ? (
          <AiFillStar key={index} size={size} className="text-accent-400" />
        ) : (
          <AiOutlineStar key={index} size={size} className="text-ink-300" />
        ),
      )}
    </span>
  );
}

export default Ratings;
