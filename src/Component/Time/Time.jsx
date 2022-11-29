import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Time = memo(() => {
  const [days, setDays] = useState(false);
  const [hours, setHours] = useState(false);
  const [min, setMin] = useState(false);
  const [sec, setSec] = useState(false);
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      const now = new Date("Dec 20,2023").getTime();
      const now2 = new Date().getTime();
      const timedays = now - now2;
      const daysnow = Math.floor(timedays / (60 * 60 * 24 * 1000));
      const hoursnow = Math.floor(
        (timedays % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)
      );
      const minnow = Math.floor((timedays % (60 * 60 * 1000)) / (60 * 1000));
      const secnow = Math.floor((timedays % (60 * 1000)) / 1000);
      if (now < 0) {
        clearInterval(interval);
      } else {
        setDays(daysnow);
        setHours(hoursnow);
        setMin(minnow);
        setSec(secnow);
      }
    }, 1000);
  }, []);
  return (
    <section className="timeOffer">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h3 className="fs-4 text-white">Limited Offers</h3>
            <h4 className="fs-2 my-3 text-white">Quaility Armchair</h4>
            <div className="time text-white fs-3">
              <div className="boxTime">
                <span>{days}</span>
                <span>Days</span>
              </div>
              <span>:</span>
              <div className="boxTime">
                <span>{hours}</span>
                <span>Hours</span>
              </div>
              <span>:</span>
              <div className="boxTime">
                <span>{min}</span>
                <span>Minutes</span>
              </div>
              <span>:</span>
              <div className="boxTime">
                <span>{sec}</span>
                <span>Seconds</span>
              </div>
            </div>
            <div className="btnTime mt-3 mb-0">
              <Link to="/shop">
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="btn btn-link"
                >
                  Visite Store
                </motion.button>
              </Link>
            </div>
          </div>
          <div className=" col-4 d-lg-block d-none ">
            <div className="img ">
              <img src="./img/counter-timer-img.png" className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Time;
