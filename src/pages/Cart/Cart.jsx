import React, { memo } from "react";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./Cart.css";
const Cart = memo(() => {
  const cartData = useSelector((ele) => ele.cartSlice.allData);
  const toatal = useSelector((ele) => ele.cartSlice.total);
  const deletItem = async (e) => {
    await deleteDoc(doc(db, "cart", e));
    toast.success("Remove Product", {
      theme: "colored",
    });
  };
  return (
    <div className="cart">
      <div className="mainProducts">
        <h2>Cart</h2>
      </div>
      <section>
        <div className="container">
          <div className="row flex-nowrap">
            <div className="col-12 overflow-x-scroll">
              <table className="w-100 ">
                <thead style={{ color: "coral" }}>
                  <tr className="row flex-nowrap border-bottom">
                    <th className="col">Image</th>
                    <th className="col-4">Title</th>
                    <th className="col">Price</th>
                    <th className="col">Qty</th>
                    <th className="col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData &&
                    cartData.map((ele) => (
                      <tr
                        className="row flex-nowrap border-bottom align-items-center"
                        key={Math.random()}
                      >
                        <td className="col">
                          <img src={ele.imgUrl} alt="" />
                        </td>
                        <td className="col-4">{ele.productName}</td>
                        <td className="col">{ele.price}</td>
                        <td className="col">{ele.num}</td>
                        <td className="col-1">
                          <span
                            className="w-100 d-block fs-3 py-4 pointer"
                            onClick={() => {
                              deletItem(ele.idMain);
                            }}
                          >
                            <MdDeleteOutline />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-12 subtotal">
              <h3 className="mb-4">
                Subtotal: {"$"}
                {toatal}{" "}
              </h3>
              <Link to="/shop" className="btn btn-info">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Cart;
