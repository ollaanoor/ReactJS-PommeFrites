import React from "react";

export default function CartItem(props) {
  return (
    <>
      <div className="card bg-base-100 lg:w-175 lg:m-auto shadow-sm lg:my-5 m-5">
        <div className="card-body">
          <div className="p-2 flex items-center justify-around">
            <div>
              <img className="size-20 rounded-box" src={props.item.image} />
            </div>
            <div className="text-lg text-center w-40">{props.item.name}</div>
            <div className="flex gap-3 justify-center items-center">
              <button
                onClick={() => props.handleIncrement(props.item.id)}
                className="btn btn-xs text-white bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-200"
              >
                <span className="font-black"> + </span>
              </button>
              <div className="text-center font-semibold border-2 border-gray-500 w-15 h-8 rounded-lg pt-1">
                <span>{props.item.count}</span>
              </div>
              <button
                onClick={() => props.handleDecrement(props.item.id)}
                className="btn btn-xs text-white bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-200"
              >
                <span className="font-black"> - </span>
              </button>
            </div>

            <div className="text-lg text-center w-30">
              Price: ${props.item.count * props.item.price}
            </div>

            <button
              onClick={() => props.handleCartDelete(props.item.id)}
              className="p-2 rounded-xl transition-all hover:scale-[1.10]"
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
        </div>
      </div>
    </>
  );
}
