import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Errors from "./pages/Errors";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Admin from "./pages/Admin";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  // States
  const [items, setItems] = useState([]);
  const [menuCat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 5;

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCat([{ id: 0, name: "All" }, ...data]));

    setLoading(true);
    fetch("http://localhost:3000/items?_delay=2000")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  // Handlers
  const handleIncrement = (id) => {
    // Clone
    const newItems = [...items];
    // Edit
    const idx = newItems.findIndex((item) => item.id === id);
    newItems[idx] = { ...newItems[idx] };
    newItems[idx].count += 1;
    // SetState
    setItems(newItems);
  };

  const handleDecrement = (id) => {
    // Clone
    const newItems = [...items];
    // Edit
    const idx = newItems.findIndex((item) => item.id === id);
    newItems[idx] = { ...newItems[idx] };
    if (newItems[idx].count > 0) {
      newItems[idx].count -= 1;
      // SetState
      setItems(newItems);
    }
  };

  const handleCartDelete = (id) => {
    try {
      // Clone
      // Edit
      const newItems = items.map((item) => ({
        ...item,
        count: id === item.id ? 0 : item.count,
        isInCart: id === item.id ? false : item.isInCart,
      }));
      // SetState
      setItems(newItems);

      toast.success("Item removed from cart successfully", {
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
      toast.error("Failed to remove item from cart", {
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

  const handleReset = () => {
    try {
      // Clone
      // Edit
      const newItems = items.map((item) => ({
        ...item,
        count: 0,
        isInCart: false,
      }));
      // SetState
      setItems(newItems);
      toast.success("Cart reset successfully", {
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
      toast.error("Failed to reset cart", {
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

  const handleAddToCart = (id) => {
    try {
      // Clone
      // Edit
      const newItems = items.map((item) => ({
        ...item,
        count: id === item.id ? (item.isInCart ? 0 : 1) : item.count,
        isInCart: id === item.id ? !item.isInCart : item.isInCart,
      }));
      // SetState
      setItems(newItems);
      toast.success("Added to cart successfully", {
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
      toast.error("Failed to add to cart", {
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

  const handleSelectedCat = (catId) => {
    setSelectedCategory(catId);
    setSelectedPage(1);
  };

  const handleSelectedPage = (selectedPage) => {
    setSelectedPage(selectedPage);
  };

  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);
  };

  const handleAddNewItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
  };

  const handleEditItem = (item) => {
    let editedItem = items.find((itm) => itm.id == item.id);
    editedItem = { ...item };
  };

  const handleAdminDelete = (id) => {
    // Update state
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  // Filter
  let filteredItems =
    selectedCategory == 0
      ? items
      : items.filter((item) => item.cat == selectedCategory);

  const allItems = filteredItems;

  // Search
  filteredItems =
    searchInput.length == 0
      ? filteredItems
      : filteredItems.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  // Pagination
  const noOfPages = Math.ceil(filteredItems.length / pageSize);
  const start = (selectedPage - 1) * pageSize;
  const end = start + pageSize;
  filteredItems = filteredItems.slice(start, end);

  // UI
  return (
    <div className="w-screen">
      <ToastContainer />
      <Navbar noOfItems={items.reduce((sum, item) => item.count + sum, 0)} />
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              categories={menuCat}
              items={filteredItems}
              handleAddToCart={handleAddToCart}
              loading={loading}
              selectedCategory={selectedCategory}
              handleSelectedCat={handleSelectedCat}
              noOfPages={noOfPages}
              selectedPage={selectedPage}
              handleSelectedPage={handleSelectedPage}
              handleSearch={handleSearch}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <Admin
              items={allItems}
              categories={menuCat}
              selectedCategory={selectedCategory}
              handleSelectedCat={handleSelectedCat}
              handleAdminDelete={handleAdminDelete}
            />
          }
        />
        <Route
          path="/addItem"
          element={
            <AddItem categories={menuCat} handleAddNewItem={handleAddNewItem} />
          }
        />

        <Route
          path="/editItem"
          element={
            <EditItem categories={menuCat} handleEditItem={handleEditItem} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              items={items.filter((item) => item.isInCart == true)}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleCartDelete={handleCartDelete}
              handleReset={handleReset}
            />
          }
        />

        <Route path="/about" element={<About />}>
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<Errors />} />
      </Routes>
    </div>
  );
}
