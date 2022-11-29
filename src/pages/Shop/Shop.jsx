import "./Shop.css";
import React, { memo, useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import Products from "../../Component/Products/Products";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../FireBase/firebase";
import Pagenation from "../../Component/Pagenation/Pagenation";
import Spider from "../../Component/Spider/Spider";
const Shop = memo(() => {
  const [chair, setChair] = useState(false);
  const [mobileAndWireless, setMobileAndWireless] = useState(false);
  const [softData, setSoftData] = useState(false);
  const [watchData, setWatchData] = useState(false);
  const [prodictsData, setProdictsData] = useState(false);
  const [startPagnation, setStartPagnation] = useState(0);
  const [endPagnation, setEndPagnation] = useState(12);
  const productShow = useRef();
  const view = useRef();
  let allData = [];
  let allDatati = [];
  const char = () => {
    let sub = onSnapshot(
      query(collection(db, "chair"), orderBy("timestamp", "desc")),
      (snapshot) => {
        let fetch = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        fetch.forEach((ele) => (ele.timestamp = ""));
        fetch.forEach((ele) => (ele.date = ""));
        setChair(fetch);
      }
    );
    return sub;
  };
  const modile = () => {
    let sub = onSnapshot(
      query(collection(db, "mobileAndWireless"), orderBy("timestamp", "asc")),
      (snapshot) => {
        let fetch = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        fetch.forEach((ele) => (ele.timestamp = ""));
        fetch.forEach((ele) => (ele.date = ""));

        setMobileAndWireless(fetch);
      }
    );
    return sub;
  };
  const soft = () => {
    let sub = onSnapshot(
      query(collection(db, "sofa"), orderBy("timestamp", "asc")),
      (snapshot) => {
        let fetch = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        fetch.forEach((ele) => (ele.timestamp = ""));
        fetch.forEach((ele) => (ele.date = ""));
        setSoftData(fetch);
      }
    );
    return sub;
  };
  const watch = () => {
    let sub = onSnapshot(
      query(collection(db, "watch"), orderBy("timestamp", "asc")),
      (snapshot) => {
        let fetch = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        fetch.forEach((ele) => (ele.timestamp = ""));
        fetch.forEach((ele) => (ele.date = ""));

        setWatchData(fetch);
      }
    );
    return sub;
  };
  if (chair) {
    chair.forEach((ele) => {
      allData.push(ele);
      allDatati.push(ele);
    });
    mobileAndWireless.forEach((ele) => {
      allData.push(ele);
      allDatati.push(ele);
    });
    softData.forEach((ele) => {
      allData.push(ele);
      allDatati.push(ele);
    });
    watchData.forEach((ele) => {
      allData.push(ele);
      allDatati.push(ele);
    });
  }
  useEffect(() => {
    char();
    modile();
    soft();
    watch();
    if (allData.length > 0) {
      setProdictsData(allData);
    }
    if (view.current.value === "descend") {
      if (productShow.current.value === "Filter By Category") {
        let x = [...allData].reverse();
        setProdictsData(x);
      } else {
        let x = allData.filter(
          (ele) => ele.category === productShow.current.value
        );
        let xs = [...x].reverse();
        setProdictsData(xs);
      }
    } else if (view.current.value === "ascending") {
      if (productShow.current.value === "Filter By Category") {
        setProdictsData(allData);
      } else {
        let x = allData.filter(
          (ele) => ele.category === productShow.current.value
        );
        setProdictsData(x);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.length]);
  const hadleView = (e) => {
    view.current.value = "ascending";
    setStartPagnation(0);
    setEndPagnation(12);
    if (e.target.value === "Filter By Category") {
      setProdictsData(allData);
    } else {
      let x = allData.filter((ele) => ele.category === e.target.value);
      setProdictsData(x);
    }
  };
  const hadlenNumbrt = (e) => {
    if (e.target.value === "descend") {
      if (productShow.current.value === "Filter By Category") {
        let x = [...allData].reverse();
        setProdictsData(x);
      } else {
        let x = allData.filter(
          (ele) => ele.category === productShow.current.value
        );
        let xs = [...x].reverse();
        setProdictsData(xs);
      }
    } else if (e.target.value === "ascending") {
      if (productShow.current.value === "Filter By Category") {
        setProdictsData(allData);
      } else {
        let x = allData.filter(
          (ele) => ele.category === productShow.current.value
        );
        setProdictsData(x);
      }
    }
  };
  const searchProd = (e) => {
    if (productShow.current.value === "Filter By Category") {
      const searchProduct = allData.filter((ele) =>
        ele.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProdictsData(searchProduct);
    } else {
      let x = allData.filter(
        (ele) => ele.category === productShow.current.value
      );
      const searchProduct = x.filter((ele) =>
        ele.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProdictsData(searchProduct);
    }
  };
  const pagenationFunction = (e) => {
    setStartPagnation(e * 12);
    setEndPagnation(e * 12 + 12);
  };
  return (
    <div className="shop">
      <div className="mainProducts">
        <h2>Products</h2>
      </div>
      <section className="container">
        <div className="row gap-4 gap-md-4 gap-lg-0">
          <div className="col-sm-12 col-md-6 col-lg-3 text-center text-lg-start">
            <select onChange={hadleView} ref={productShow}>
              <option>Filter By Category</option>
              <option value="chair">Chair</option>
              <option value="sofa">Sofa</option>
              <option value="mobile">Mobile</option>
              <option value="wireless">Wireless</option>
              <option value="watch">Watch</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 text-center text-lg-start">
            <select
              onChange={hadlenNumbrt}
              ref={view}
              defaultChecked={"ascending"}
            >
              <option disabled>Sort By</option>
              <option value="ascending">Ascending</option>
              <option value="descend">Descend</option>
            </select>
          </div>
          <div className="col-lg-6 col-12">
            <form
              className="searchInput"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Search....."
                defaultValue=""
                onChange={searchProd}
              />
              <CiSearch />
            </form>
          </div>
        </div>
      </section>
      <section className="container pt-0">
        <motion.div layout transition={{ duration: 0.1 }} className="row ">
          <AnimatePresence>
            {allData.length > 0 ? (
              prodictsData.length > 0 &&
              prodictsData.slice(startPagnation, endPagnation).map((ele) => (
                <div key={ele.id} className="col-sm-12 col-md-6 col-lg-3">
                  <Products data={ele} />
                </div>
              ))
            ) : (
              <>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mt-5">
                  <Spider />
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
        {prodictsData.length > 0 && (
          <Pagenation
            length={prodictsData.length}
            pagenationFunction={pagenationFunction}
          />
        )}
      </section>
    </div>
  );
});

export default Shop;
