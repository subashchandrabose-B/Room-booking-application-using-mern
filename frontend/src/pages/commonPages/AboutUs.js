import React from "react";
import Heading from "../../components/common/Heading";
import About from "../../components/home/About";
import Services from "../../components/home/Service";

export default function AboutUs() {
  return (
    <>
      <Heading heading="About" title="Home" subtitle="About" />
      <About/>
      <Services/>
    </>
  );
}
