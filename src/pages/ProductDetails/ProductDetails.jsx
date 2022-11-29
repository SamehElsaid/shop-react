import "./productsDetails.css";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../FireBase/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Products from "../../Component/Products/Products";
import { useRef } from "react";
import Spider from "../../Component/Spider/Spider";
import { useCallback } from "react";
const ProductDetails = memo(() => {
  const [tap, setTap] = useState("des");
  const [mainData, setMainData] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState(false);
  const [load, setLoad] = useState(true);
  const { id } = useParams();
  const allData = useSelector((ele) => ele.prodictsData.allEdit);
  const nameLogin = useSelector((ele) => ele.auth.email);
  const seeMore = useRef();
  let viewProduct;
  var alsoLike;
  let dispatch = useDispatch();
  if (allData.length > 0) {
    viewProduct = allData.find((ele) => ele.id === id);
    if (viewProduct) {
      let x = allData.filter((ele) => ele.id !== id);
      alsoLike = x.filter((ele) => ele.category === viewProduct.category);
    }
  }
  let num = 1;
  const Ss = useCallback(
    ({ data }) => {
      if (viewProduct) {
        if (data % 1 >= 0.5) {
          return Math.round(+data);
        }
        if (data % 1 < 0.5) {
          return Math.floor(+data);
        }
      }
    },
    [viewProduct]
  );
  const handleCart = async (e) => {
    if (!nameLogin) {
      toast.info("You Shoud Login First", {
        theme: "colored",
      });
    } else {
      await addDoc(collection(db, "cart"), {
        ...viewProduct,
        nameLogin,
        timestamp: serverTimestamp(),
      });
      toast.success("Add To Cart", {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    let productFound = allData.find((ele) => ele.id === id);
    if (productFound) {
      if (
        productFound.category === "wireless" ||
        productFound.category === "mobile"
      ) {
        getDoc(doc(db, "mobileAndWireless", id)).then((res) => {
          setMainData(res.data());
        });
      } else {
        getDoc(doc(db, productFound.category, id)).then((res) => {
          setMainData(res.data());
        });
      }
    }
  }, [allData, dispatch, id]);

  const edit = async (e) => {
    e.preventDefault();
    if (mainData.category === "wireless" || mainData.category === "mobile") {
      getDoc(doc(db, "mobileAndWireless", id)).then((res) => {
        setMainData(res.data());
        setLoad(false);
      });
    } else {
      getDoc(doc(db, mainData.category, id)).then((res) => {
        setMainData(res.data());
        setLoad(false);
      });
    }
    if (comment) {
      if (mainData.category === "wireless" || mainData.category === "mobile") {
        await updateDoc(doc(db, "mobileAndWireless", id), {
          ...mainData,
          reviews: [
            ...mainData.reviews,
            {
              rating: rate,
              text: comment,
            },
          ],
        });
      } else {
        await updateDoc(doc(db, mainData.category, id), {
          ...mainData,
          reviews: [
            ...mainData.reviews,
            {
              rating: rate,
              text: comment,
            },
          ],
        });
      }
      toast.success("Comment Add", {
        theme: "colored",
      });
      setRate(0);
      setComment(false);
      e.target.querySelector("textarea").value = "";
      num = 1;
       document.querySelectorAll(".mainDataProd").forEach((ele,i)=> {if(i >= 2){
        ele.style.display = "none"
       }})
    }
  };
  const change = () => {
    if (num) {
      let mainData = document.querySelectorAll(".mainData .mainDataProd");
      let showMore = document.querySelector(".showMore");
      mainData.forEach((ele, i) => {
        if (i >= 2) {
          mainData[i].style.display = "none";
          num = 1;
          showMore.textContent = "See More";
          showMore.style.background = "var(--color-success)";
        }
      });
    }
  };
  return (
    <>
      <section className="productsDetails">
        <div className="container">
          {viewProduct &&
            (mainData ? (
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="img">
                    <img src={mainData.imgUrl} className="proImg" alt="" />
                  </div>
                </div>
                <div className="col-6">
                  <h2>{mainData.productName}</h2>
                  <div className="d-flex align-items-center ">
                    {mainData.avgRating && (
                      <Rate
                        value={Ss({ data: +mainData.avgRating })}
                        allowHalf
                        disabled
                        style={{ color: "coral" }}
                      />
                    )}
                    <p className="m-0 fs-4 align-self-end ms-4">
                      (
                      <span style={{ color: "coral" }}>
                        {<Ss data={mainData.avgRating}></Ss>}
                      </span>
                      rating)
                    </p>
                  </div>
                  <h2 className="mt-5">{viewProduct.price}</h2>
                  <p className="text-black-50 fs-5">{viewProduct.shortDesc}</p>
                  <div className="but">
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      className="btn .btn-info "
                      onClick={handleCart}
                    >
                      Add To Card
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              load && (
                <>
                  <div className="row">
                    <div className="col-3">
                      <Spider />
                    </div>
                    <div className="col-3">
                      <Spider />
                    </div>
                    <div className="col-3">
                      <Spider />
                    </div>
                    <div className="col-3">
                      <Spider />
                    </div>
                  </div>
                </>
              )
            ))}
        </div>
      </section>
      <section className="pt-0 revDes">
        <div className="container">
          <div className="row">
            {mainData ? (
              <div className="col-12 ">
                <div className="d-flex align-items-center gap-5">
                  <h2
                    className="pointer"
                    onClick={(e) => {
                      setTap("des");
                      e.target.parentElement
                        .querySelectorAll("h2")
                        .forEach((ele) => {
                          ele.style.color = "black";
                        });
                      e.target.style.color = "coral";
                    }}
                  >
                    Description
                  </h2>
                  <h2
                    className="pointer"
                    onClick={(e) => {
                      setTap("rev");
                      e.target.parentElement
                        .querySelectorAll("h2")
                        .forEach((ele) => {
                          ele.style.color = "black";
                        });
                      e.target.style.color = "coral";
                    }}
                  >
                    Reviews ({mainData.reviews.length})
                  </h2>
                </div>
                <div className="description py-4">
                  {tap === "des" ? (
                    <span className="text-black-50 fs-4 lh-md">
                      {viewProduct.description}
                    </span>
                  ) : (
                    <>
                      <span className="mainData" ref={seeMore}>
                        {mainData.reviews.map((ele, i) => (
                          <div className="mainDataProd  p-3" key={i}>
                            <h4 style={{ color: "var(--color-success)" }}>
                              Somoene
                            </h4>
                            <div className="ratingShow my-3 d-flex gap-3 align-items-end">
                              <Rate
                                defaultValue={Ss({ data: ele.rating })}
                                allowHalf
                                disabled
                                style={{ color: "coral" }}
                              />
                              <h5>
                                <span style={{ color: "coral" }}>
                                  ({ele.rating})
                                </span>{" "}
                                rating
                              </h5>
                            </div>
                            <h4 style={{ color: "coral" }}>Massage</h4>
                            <p className="fs-5">{ele.text}</p>
                          </div>
                        ))}
                      </span>
                      {mainData.reviews.length > 2 && (
                        <motion.button
                          whileTap={{ scale: 1.1 }}
                          className="showMore"
                          style={{ background: "var(--color-success)" }}
                          onClick={(e) => {
                            let mainHaight =
                              document.querySelectorAll(".mainDataProd");
                            e.target.style.background = "var(--color-success)";
                            if (num !== mainHaight.length - 1) {
                              num++;
                              mainHaight[num].style.display = "block";
                              if (num === mainHaight.length - 1) {
                                e.target.textContent = "See less";
                                e.target.style.background =
                                  "var(--color-danger)";
                              }
                            } else {
                              mainHaight.forEach((ele, i) => {
                                if (i >= 2) {
                                  mainHaight[i].style.display = "none";
                                  e.target.textContent = "See More";
                                  num = 1;
                                }
                              });
                            }
                          }}
                        >
                          See More
                        </motion.button>
                      )}
                      <form action="" onSubmit={edit}>
                        <Rate
                          onChange={(e) => {
                            setRate(e);
                          }}
                          allowHalf
                          value={rate}
                          style={{ color: "coral" }}
                        />
                        <textarea
                          cols={20}
                          rows={5}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          placeholder="Review Massage"
                        ></textarea>
                        <button className="btn btn-info" type="submit">
                          Submit
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>{alsoLike && "You might also like"}</h2>
          <div className="row">
            {alsoLike ? (
              alsoLike.slice(0, 8).map((ele, i) => (
                <div className="col-3" key={i}>
                  <Products change={change} data={ele} />
                </div>
              ))
            ) : (
              <>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
                <div className="col-3">
                  <Spider />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default ProductDetails;
