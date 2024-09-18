import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductLoading from "./ProductLoading";
import ProductError from "./ProductError";
import ProductFavoriteButton from "./ProductFavoriteButton";
import SearchComponent from "./SearchComponent";
import useProductList from "../services/productsAPI";
import toast from "react-hot-toast";

const ListComponent = () => {
  
  const [input, setInput] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  
  const [limit] = useState(15);  
  const [skip, setSkip] = useState(0); 
  const { data, isPending, isError } = useProductList(limit, skip);
// It Add's data to local Storage so we can Access it from there 
  useEffect(() => {
    if (data) {
      setFilterdata(data.products);
      const myJSON = JSON.stringify(data.products);
      localStorage.setItem("data", myJSON);
    }
  }, [data]);
// It filters a data based on inputs
  useEffect(() => {
    if (input) {
      const newFilterArray = data?.products.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilterdata(newFilterArray);
    } else if (data) {
      setFilterdata(data.products);
    }
  }, [input, data]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // It addes Favorite product in the list And Conditional Chack
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === product.id)) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else if (prevFavorites.length < 5) {
        return [...prevFavorites, product];
      } else {
        toast.error("Only 5 Products Can be Added");
        return prevFavorites;
      }
    });
  };

//Buttons to go to previse Page and next  page
  const handleNextPage = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const handlePreviousPage = () => {
    if (skip > 0) {
      setSkip((prevSkip) => prevSkip - limit);
    }
  };

  if (isPending) return <ProductLoading />;
  if (isError) return <ProductError />;

  return (
    <section>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
        Products List
      </h1>
      <SearchComponent setInput={setInput} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {filterdata && filterdata.length > 0 ? (
          filterdata.map((product) => (
            <div
              key={product?.id}
              className="bg-white hover:bg-gray-50 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 flex flex-col transition-transform transform hover:scale-105"
            >
              <img
                className="object-contain w-full h-40"
                src={product?.thumbnail}
                alt="Product Image"
              />
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 border-t-2 border-purple-600 py-4">
                  {product?.title}
                </h1>
                <div className="flex items-center justify-between mb-4">
                  <ProductFavoriteButton
                    product={product}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                  <h2 className="text-xl font-bold text-green-500">
                    ${product?.price}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <Link to={`/view/${product?.id}`}>
                  <button className="w-full py-2 text-xs font-semibold text-white uppercase transition-colors duration-300 bg-gray-900 hover:bg-slate-800 focus:outline-none rounded-md">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={skip === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={filterdata?.length < limit}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListComponent;
