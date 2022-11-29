import React, { memo } from "react";
import "./service.css";
import { motion } from "framer-motion";
const Service = memo(({data}) => {
  return (
    <motion.div whileHover={{scale:1.1}} className="service" style={{ background: data.bg }}>
      <div className="icons">
        <i className={data.icon}></i>
      </div>
      <div className="serText">
        <h4>{data.title}</h4>
        <p>{data.subtitle}</p>
      </div>
    </motion.div>
  );
});

export default Service;
