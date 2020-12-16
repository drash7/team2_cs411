import React from "react";
import { motion } from "framer-motion";
import { autoType } from "d3";

const containerStyle = {
  position: "relative",
  width: "15rem",
  height: "15rem",
  boxSizing: "border-box",
  margin: "auto"
};

const circleStyle = {
  backgroundColor: "#e9e9e9",
  display: "block",
  width: "5rem",
  height: "5rem",
  border: "0.2rem solid #e9e9e9",
  borderRadius: "50%",
  position: "relative",
  boxSizing: "border-box",
  margin: "auto"
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 2
};

const labelStyle = {
  boxSizing: "border-box",
  padding: "3rem",
  textAlign: "center",
  fontWeight: "bold"
}

export default function CircleLoader() {
  return (
    <div style={containerStyle}>
      <motion.div
        style={circleStyle}
        animate={{
          scale: [1, 1.5, 1.5, 1, 1, 1, 1, 1],
          rotate: [0, 90, 180, 270, 360, 0, 0, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={spinTransition}
      />
      <p style={labelStyle}>Loading Data BeepBeepBoopBoop</p>
    </div>
  );
}