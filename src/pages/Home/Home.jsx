import React, { memo } from "react";
import { motion } from "framer-motion";
import "./Home.css";
import Service from "../../Component/Service/Service";
import serviceData from "../../data/serviceData";
import Products from "../../Component/Products/Products";
import Time from "../../Component/Time/Time";
import { useSelector } from "react-redux";
import Spider from "../../Component/Spider/Spider";
import { Link } from "react-router-dom";
const Home = memo(() => {
  const dataToRedux = useSelector((ele) => ele.prodictsData.chair);
  const dataToReduxSoft = useSelector((ele) => ele.prodictsData.soft);
  const dataToReduxmodile = useSelector((ele) => ele.prodictsData.modile);
  const dataToReduxwatch = useSelector((ele) => ele.prodictsData.watch);
  document.title = " Home | Shop ";
  return (
    <>
      <section className="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <h2>Trending product in 2022</h2>
              <h1 className="my-5">
                Make Your Interior more minimalistic & modern
              </h1>
              <p className="fs-4 my-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore at pariatur ipsa consectetur dicta quod, provident
                tempora sed tenetur dolore?
              </p>
              <div className="btnHome">
                <Link to="/shop">
                  <motion.button
                    to="/shop"
                    whileTap={{ scale: 1.1 }}
                    className="btn btn-dark"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>
            <div className="col-6 d-lg-block d-none p-5 ">
              <img className="w-100" src="./img/hero-img.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            {serviceData.map((ele) => (
              <div key={Math.random()} className="col-sm-12 col-md-6 col-lg-3 p-2">
                <Service data={ele} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <section className="container pt-0">
          <h2 className="text-center">Trending Products</h2>
          <div className="row position-relative ">
            {dataToRedux.length > 0 ? (
              dataToRedux.slice(0, 4).map((ele) => (
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
              </>
            )}
          </div>
        </section>
        <section className="container pt-0">
          <h2 className="text-center">Best Sales</h2>
          <div className="row">
            {dataToReduxSoft.length > 0 ? (
              dataToReduxSoft.slice(0, 8).map((ele) => (
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
          </div>
        </section>
      </div>
      <Time />
      <section className="container  ">
        <h2 className="text-center">New Arrivals</h2>
        <div className="row">
          {dataToReduxmodile.length > 0 ? (
            dataToReduxmodile.slice(0, 8).map((ele) => (
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
        </div>
      </section>
      <section className="container pt-0 ">
        <h2 className="text-center">Popular in Category</h2>
        <div className="row">
          {dataToReduxwatch.length > 0 ? (
            dataToReduxwatch.slice(0, 4).map((ele) => (
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
            </>
          )}
        </div>
      </section>
    </>
  );
});

export default Home;
