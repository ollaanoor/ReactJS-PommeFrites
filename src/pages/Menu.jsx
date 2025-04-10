import React from "react";

export default function Menu(props) {
  if (props.loading) {
    return (
      <h1 className="text-xl font-bold text-center mt-50">
        Loading <span className="loading loading-dots loading-xl"></span>
      </h1>
    );
  }

  const pages = Array(props.noOfPages)
    .fill(0)
    .map((item, idx) => idx + 1);
  //   const pages = [];
  //   for (let i = 0; i < props.noOfPages; i++) {
  //     pages.push(i + 1);
  //   }

  return (
    <div className="flex flex-wrap justify-center">
      <ul className="menu menu-horizontal gap-3 bg-base-200 w-full justify-center">
        {props.categories.map((cat) => (
          <li
            key={cat.id}
            className={`text-gray-500 font-bold ${
              cat.id == props.selectedCategory &&
              "text-gray-800 border-b-4 border-blue-400"
            }`}
            onClick={() => props.handleSelectedCat(cat.id)}
          >
            <a>{cat.name}</a>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <label className="input w-100 rounded-xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            onChange={(e) => props.handleSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="w-full">
        <div className="lg:w-200 lg:m-auto mt-10 mx-5">
          <ul className="list bg-base-100 rounded-box shadow-md">
            {props.items.map((item) => (
              <li
                key={item.id}
                className="list-row flex items-center justify-evenly"
              >
                <div>
                  <img className="size-20 rounded-box" src={item.image} />
                </div>
                <div>
                  <div className="w-30 text-center font-medium">
                    {item.name}
                  </div>
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Price: ${item.price}
                </div>
                <button
                  onClick={() => props.handleAddToCart(item.id)}
                  className="cursor-pointer transition-all duration-[0.2] ease-in-out hover:scale-[1.05]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={item.isInCart ? "black" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagination */}
      {props.noOfPages > 1 && (
        <div className="join my-10">
          {pages.map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm ${
                page == props.selectedPage ? "btn-active" : ""
              }`}
              onClick={() => props.handleSelectedPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
