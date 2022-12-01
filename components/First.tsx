// First.tsx
import React from "react";
import Link from "next/link";

const First: React.FC = () => {
  return (
    <div id="top">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header page-scroll">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="#top">
              <a className="navbar-brand page-scroll" href="">
                <i className="intro-heading"></i>Daily Apple
              </a>
            </Link>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li className="hidden">
                <Link href="#top">
                  <a href=""></a>
                </Link>
              </li>
              <li>
                <a className="btn btn-xl" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className=" "> </a>
              </li>
              <li>
                <Link href={"/api/auth/signin"}>
                  <a className="btn btn-xl" href="">
                    PHYSICIAN LOG IN
                  </a>
                </Link>
              </li>
              <li>
                <a className=" "> </a>
              </li>
              <li>
                <Link href={"/patient"}>
                  <a className="btn btn-xl" href="">
                    Patient Log In
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header>
        <div className="container">
          <div className="intro-text">
            <div className="intro-heading">Daily Apple</div>
            <div className="intro-lead-in">heatlh made simple.</div>
          </div>
        </div>
      </header>
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">Contact Us</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form name="sentMessage" id="contactForm" noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name *"
                        id="name"
                        required
                        data-validation-required-message="Please enter your name."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email *"
                        id="email"
                        required
                        data-validation-required-message="Please enter your email address."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Your Phone *"
                        id="phone"
                        required
                        data-validation-required-message="Please enter your phone number."
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Your Message *"
                        id="message"
                        required
                        data-validation-required-message="Please enter a message."
                      ></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-lg-12 text-center">
                    <div id="success"></div>
                    <button type="submit" className="btn btn-xl">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <span className="copyright">
                Copyright &copy; Daily Apple 2022
              </span>
            </div>
            <div className="col-md-4">
              <ul className="list-inline social-buttons"></ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default First;
