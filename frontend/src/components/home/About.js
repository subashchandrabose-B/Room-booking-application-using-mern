import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h6 className="text-primary text-uppercase">About Us</h6>
          <h1 className="mb-4">
            Welcome to <span className="text-primary text-uppercase">Heavenly</span>
          </h1>
          <p className="mb-4">
            At Heavenly, we believe that finding your perfect property should be an exciting
            and seamless journey with an affordable price.
          </p>
          <p>
          With years of expertise in the real estate market, our dedicated team at Heavenly 
          works tirelessly to match you with the best properties at competitive prices. 
          Whether you're searching for a cozy apartment, a luxurious villa, 
          or a commercial space to expand your business, we have something for everyone.
          </p>
          <a className="btn btn-primary" href="/about">
            More about us
          </a>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-6">
              <img
                className="img-fluid rounded mb-3"
                src="/assets/img/about-1.jpg"
                alt="About 1"
              />
            </div>
            <div className="col-6">
              <img
                className="img-fluid rounded mb-3"
                src="/assets/img/about-2.jpg"
                alt="About 2"
              />
            </div>
            <div className="col-6">
              <img
                className="img-fluid rounded"
                src="/assets/img/about-3.jpg"
                alt="About 3"
              />
            </div>
            <div className="col-6">
              <img
                className="img-fluid rounded"
                src="/assets/img/about-4.jpg"
                alt="About 4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

