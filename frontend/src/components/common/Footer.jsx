import { Link } from "react-router-dom";
import { footerContact, socialIcons } from "../data/Data";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row justify-content-center text-center">
          {/* Brand and Description */}
          <div className="col-md-8 col-lg-6 mb-4">
            <div className="bg-primary rounded p-4">
              <Link to="/" className="text-white text-decoration-none">
                <h1 className="text-white text-uppercase mb-3">Booking Software</h1>
              </Link>
              <p className="mb-0">
                Build a professional website for your hotel business and grab
                the attention of new visitors upon your site’s launch.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-md-8 col-lg-6 mb-4">
            <h6 className="text-primary text-uppercase mb-3">Contact</h6>
            {footerContact.map((val, index) => (
              <p key={index} className="mb-2">
                {val.icon} {val.name}
              </p>
            ))}
            <div className="d-flex justify-content-center">
              {socialIcons.slice(0, 4).map((val, index) => (
                <a key={index} href={val.link} className="btn btn-outline-light btn-social me-2">
                  {val.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="text-center text-primary mt-4">
          <p className="mb-1">All Rights Reserved &copy; Subash - 2024</p>
          <p className="mb-0">Developed by - Subash</p>
        </div>
      </div>
    </footer>
  );
}

