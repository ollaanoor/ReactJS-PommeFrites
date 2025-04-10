import CartItem from "../components/cartItem";

function Cart(props) {
  const {
    handleIncrement,
    handleDecrement,
    handleCartDelete,
    handleReset,
    items,
  } = props;

  return (
    <>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleCartDelete={handleCartDelete}
        ></CartItem>
      ))}

      <div className="flex justify-center">
        {items.length > 0 && (
          <button
            className="btn p-2 rounded-2xl w-[100px] text-white bg-blue-400 hover:bg-blue-200"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      {items.length == 0 && (
        <h2 className="text-center font-bold mt-50">Cart is empty!</h2>
      )}
    </>
  );
}

export default Cart;
