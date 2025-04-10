import React from "react";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditItem(props) {
  const navigate = useNavigate();

  const handleFormSubmit = async (form) => {
    try {
      // call backend
      const { data } = await axios.put(
        `http://localhost:3000/items/${form.id}`,
        {
          ...form,
          isInCart: false,
          count: 0,
        }
      );
      // update items state by updating items in frontend
      props.handleEditItem(data);
      // redirect to admin page
      navigate("/admin");

      toast.success("Item edited successfully", {
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
      toast.error("Failed to edit item", {
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
          <h1 className="text-2xl font-bold">Edit menu item</h1>

          <ProductForm
            categories={props.categories}
            handleFormSubmit={handleFormSubmit}
          ></ProductForm>
        </div>
      </div>
    </>
  );
}
