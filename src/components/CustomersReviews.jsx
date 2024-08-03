import { Rate } from "antd";
import React from "react";
import formatDate from "../services/formatDate";

const CustomersReviews = ({product}) => {

  return (
    <div className="mt-6">
      <h3 className="flex items-center w-full pb-2">
        <span className="flex-grow bg-gray-200 rounded h-1"></span>
        <span className="mx-3 text-lg font-medium">Our Customers Reviews</span>
        <span className="flex-grow bg-gray-200 rounded h-1"></span>
      </h3>
      {product?.reviews.length > 0 ? (
        product?.reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow">
            <p className="text-md font-bold">{review?.reviewerName}</p>
            <p>
              <Rate disabled defaultValue={review?.rating} />
            </p>
            <p>"{review.comment}"</p>

            <p>{formatDate(review?.date)}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default CustomersReviews;
