import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductFavoriteButton = ({ product, favorites, toggleFavorite }) => {
  const isFavorite = favorites.find((item) => item.id === product.id);

  return (
    <button
      onClick={() => toggleFavorite(product)}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isFavorite
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-red-600"
      }`}
    >
      {isFavorite ? <AiFillHeart className="text-white" /> : <AiOutlineHeart className="text-red-600" />}
    </button>
  );
};

export default ProductFavoriteButton;
