import React, { useState, useEffect } from "react";
import Heading from "../../components/common/Heading";
import CommonHeading from "../../components/common/CommonHeading";
import { contact } from "../../components/data/Data";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact() {
  const [query, setQuery] = useState({
    userId: "",
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setQuery(prevQuery => ({
        ...prevQuery,
        userId: storedUser._id || "",
        name: storedUser.name || "",
        email: storedUser.userEmail || ""
      }));
    }
  }, []);

  const [responseMessage, setResponseMessage] = useState(null);

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevQuery => ({
      ...prevQuery,
      [name]: value
    }));
  };

  const sendQuery = async (e) => {
    e.preventDefault();
    if (!query.userId || !query.name || !query.email) {
      toast("Please login to make a query", {
        position: "top-right",
        autoClose: 5000,  // 5 seconds
      });
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/queryHandle/sendQuery", {
        name: query.name,
        email: query.email,
        subject: query.subject,
        message: query.message,
        userId: query.userId
      });
      if (result.status === 200) {
        setResponseMessage("Query sent successfully!");
        // Clear the subject and message fields after successful submission
        setQuery(prevQuery => ({
          ...prevQuery,
          subject: "",
          message: ""
        }));
      }
    } catch (error) {
      setResponseMessage("Failed to send query. Please try again later.");
      console.error("Error sending query:", error);
    }
  };

  return (
    <>
      <Heading heading="Contact" title="Home" subtitle="Contact" />

      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Contact Us"
            subtitle="Contact"
            title="For Any Query"
          />
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                {contact.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <h6 className="section-title text-start text-primary text-uppercase">
                      {item.title}
                    </h6>
                    <p>
                      {item.icon}
                      {item.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-md-5">
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <form onSubmit={sendQuery}>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={query.subject}
                            onChange={handleQueryChange}
                            required
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            name="message"
                            style={{ height: "150px" }}
                            value={query.message}
                            onChange={handleQueryChange}
                            required
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                  {responseMessage && (
                    <div className="mt-3">
                      <p>{responseMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



