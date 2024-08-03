import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoShieldCheck } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import CustomersReviews from "./CustomersReviews";
import toast from "react-hot-toast";

const ViewDetailComponent = () => {
  const { id } = useParams();
  const localdata = JSON.parse(localStorage.getItem("data"));
  // console.log(localdata)
  const product = localdata?.find((item) => item.id == id);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === product.id)) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else if (prevFavorites.length < 5) {
        return [...prevFavorites, product];
      } else {
        toast.error("Only 5 Products can Added");
        return prevFavorites;
      }
    });
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/">
        <IoArrowBackCircle size={30} />
      </Link>
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.images[0]}
                  alt={product.title}
                />
              </div>
              <div className="flex -mx-2 mb-4 justify-center mt-5">
                <div className="w-1/2 px-2">
                  <button
                    className={`w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold ${
                      favorites.find((item) => item.id === product.id)
                        ? "text-white bg-red-600"
                        : "text-gray-600"
                    }`}
                    onClick={toggleFavorite}
                  >
                    {favorites.find((item) => item.id === product.id)
                      ? "Remove Favorite"
                      : "Mark Favorite"}
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600  text-sm mb-4"></p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Brand Name:</span>
                  <span className="text-red-600 font-bold">
                    {" "}
                    {product.brand}
                  </span>
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-green-600 font-bold">
                    {" "}
                    ${product.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">
                    Availability:{" "}
                  </span>
                  <span className="text-gray-500 font-bold">
                    {product.availabilityStatus}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">
                  Product Description
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
              </div>
              <div className="flex space-x-16 justify-center">
                <div className="flex items-center space-x-2">
                  <GoShieldCheck className="text-xl text-gray-700" />
                  <span className="font-bold text-gray-700">
                    {product.warrantyInformation}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <LiaShippingFastSolid className="text-xl text-gray-700" />
                  <span className="font-bold text-gray-700">
                  {product.shippingInformation}
                  </span>
                </div>
              </div>
              <CustomersReviews product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailComponent;

/* <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/3">
          <img
            src={product.images[0]}
            alt={product.title}
            className="rounded-lg shadow-lg mb-4"
          />
          <button
            onClick={toggleFavorite}
            className={`mt-2 text-sm ${
              favorites.find((item) => item.id === product.id)
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {favorites.find((item) => item.id === product.id)
              ? "Unmark Favorite"
              : "Mark Favorite"}
          </button>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="text-gray-800 space-y-2">
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Availability Status:</strong> {product.availabilityStatus}
            </p>
            <p>
              <strong>Discount:</strong> {product.discountPercentage}%
            </p>
            <p>
              <strong>Minimum Order Quantity:</strong>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
            <p>
              <strong>Shipping Information:</strong>{" "}
              {product.shippingInformation}
            </p>
            <p>
              <strong>Warranty Information:</strong>{" "}
              {product.warrantyInformation}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Tags:</strong> {product.tags.join(", ")}
            </p>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Dimensions:</h2>
              <p>Width: {product.dimensions.width} cm</p>
              <p>Height: {product.dimensions.height} cm</p>
              <p>Depth: {product.dimensions.depth} cm</p>
              <p>Weight: {product.weight} kg</p>
            </div>
          </div>
        </div>
      </div> */