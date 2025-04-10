import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddItem(props) {
  const navigate = useNavigate();

  const handleFormSubmit = async (form) => {
    try {
      // call backend
      const { data } = await axios.post("http://localhost:3000/items", {
        ...form,
        isInCart: false,
        count: 0,
      });
      // update items state by adding items in frontend
      props.handleAddNewItem(data);
      // redirect to admin page
      navigate("/admin");

      toast.success("Item added successfully", {
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
      toast.error("Failed to add item", {
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
      <div className="flex items-center justify-center mt-5">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold">Add a new menu item</h1>

          <ProductForm
            categories={props.categories}
            handleFormSubmit={handleFormSubmit}
          ></ProductForm>
        </div>
      </div>
    </>
  );
}
