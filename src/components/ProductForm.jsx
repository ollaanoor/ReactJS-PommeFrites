import React, { useState } from "react";
import { useLocation } from "react-router";

export default function ProductForm(props) {
  const location = useLocation();

  const [form, setForm] = useState(() => {
    if (location.state != null) {
      return {
        id: location.state.id,
        name: location.state.name,
        price: location.state.price,
        image: location.state.image,
        cat: location.state.category,
      };
    } else {
      return {
        name: "",
        price: "",
        image: "",
        cat: 1,
      };
    }
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
    } else {
      props.handleFormSubmit(form);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="floating-label my-5 font-semibold">
          Item name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="ex: item name"
            value={form.name}
            onChange={handleChange}
            className="input validator input-md my-2 w-lg"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </label>

        <label className="floating-label my-5 font-semibold">
          Item price
          <input
            type="text"
            name="price"
            id="price"
            placeholder="$0.00"
            value={form.price}
            onChange={handleChange}
            className="input validator input-md my-2 w-lg"
            pattern="^\d+(\.\d{2})?$"
            required
          />
          <p className="validator-hint hidden">Must be number</p>
        </label>

        <label className="floating-label my-5 font-semibold">
          Item image URL
          <input
            type="url"
            name="image"
            id="image"
            value={form.image}
            onChange={handleChange}
            className="input validator input-md my-2 w-lg"
            required
          />
          <p className="validator-hint hidden">Invalid URL</p>
        </label>
        <label className="floating-label my-5 font-semibold">
          Category<br></br>
          <select
            name="cat"
            id="category"
            value={form.cat}
            onChange={handleChange}
            className="select my-2 w-lg"
          >
            <option disabled={true}>Pick a category</option>
            {props.categories.slice(1).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn rounded-2xl w-full mt-5 text-white bg-blue-400 hover:bg-blue-300"
          >
            {location.state ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>
    </>
  );
}
