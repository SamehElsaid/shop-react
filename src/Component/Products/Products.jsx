import React, { memo } from "react";
import { motion } from "framer-motion";
import "./Products.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../FireBase/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImgLoad from "../ImgLoad/ImgLoad";
const Products = memo(({ data, change }) => {
  const nameLogin = useSelector((ele) => ele.auth.email);
  console.log();
  const handleCart = async (e) => {
    if (!nameLogin) {
      toast.info("You Shoud Login First", {
        theme: "colored",
      });
    } else {
      await addDoc(collection(db, "cart"), {
        ...data,
        nameLogin,
        timestamp: serverTimestamp(),
      });
      toast.success("Add To Cart", {
        theme: "colored",
      });
    }
  };
  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="product position-relative"
      >
        {data.new === "new" && <span className="new">New</span>}
        <Link onClick={change} to={`/shop/${data.id}`}>
          <div className="img position-relative">
            <ImgLoad />
            <motion.img
              whileHover={{ scale: 0.9 }}
              className=""
              src={data.imgUrl}
              alt=""
              onLoad={(e) => {
                e.target.parentElement
                  .querySelector(".ImgLoadControl")
                  .remove();
              }}
            />
          </div>
          <h2 className="my-3">{data.productName}</h2>

          <h3 className="my-3">{data.category}</h3>
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-3 text-black">{data.price}</span>
          <span>
            <motion.div
              whileTap={{ scale: 1.1 }}
              className="iconSpan"
              onClick={handleCart}
            >
              <i className="fa-solid fa-plus fs-4"></i>
            </motion.div>
          </span>
        </div>
      </motion.div>
    </>
  );
});

export default Products;
