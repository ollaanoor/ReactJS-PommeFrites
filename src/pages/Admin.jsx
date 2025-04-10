import React from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

export default function Admin(props) {
  const handleDelete = async (id) => {
    try {
      // Call backend
      const { data } = await axios.delete(`http://localhost:3000/items/${id}`);

      // Update state
      props.handleAdminDelete(id);

      toast.success("Item deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to delete item", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="lg:flex mt-0.5">
        <ul className="menu menu-horizontal lg:menu-vertical bg-base-200 rounded-box lg:w-80 w-screen lg:items-start lg:justify-normal items-center justify-between">
          <h2 className="menu-title">Categories</h2>

          {props.categories.map((cat) => (
            <li
              key={cat.id}
              className="text-gray-500 font-bold my-0.5 lg:mx-2 lg:w-72"
              onClick={() => props.handleSelectedCat(cat.id)}
            >
              <a
                className={`${
                  cat.id == props.selectedCategory && "menu-active"
                }`}
              >
                {cat.name}
              </a>
            </li>
          ))}

          <NavLink
            className="btn rounded-2xl lg:w-full lg:mt-5 text-white bg-blue-400 hover:bg-blue-300 lg:mx-auto"
            to="/addItem"
          >
            Add new item
          </NavLink>
        </ul>

        <div className="lg:mx-auto">
          <div className="lg:w-250 m-auto my-10 mx-5">
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
                  <div className="text-xs w-30 text-center font-semibold opacity-60">
                    Price: ${item.price}
                  </div>
                  <div className="text-xs w-30 text-center  font-semibold opacity-60">
                    <span>Category: </span>
                    {props.categories.map((cat) =>
                      item.cat == cat.id ? cat.name : ""
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to="/editItem"
                      state={{
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.cat,
                      }}
                      className="p-2 rounded-xl btn hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="oklch(68.5% 0.169 237.323)"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn p-2 rounded-xl hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="red"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
