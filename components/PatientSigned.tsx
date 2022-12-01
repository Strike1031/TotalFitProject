import React, { useEffect } from "react";
import Image from "next/image";
import DailyAppleLogo from "../styles/css/img/DailyAppleLogo.png";
import Link from "next/link";


const PatientSigned: React.FC = () => {  
  
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
            </button>
            <Link href="#top">
              <a className="navbar-brand page-scroll" href="">
                <i className="intro-heading"></i>Daily Apple
              </a>
            </Link>

            <div className="col-lg-12 text-center">
              <div id="success"></div>
            </div>
          </div>
        </div>
      </nav>

      <header>
        <div className="container">
          <div className="intro-text">
            <div className="intro-heading">Congratulations!</div>
            <div className="col-lg-12 text-center">
              <Image src={DailyAppleLogo} height="220" width="170" />
            </div>    
          </div>
        </div>
      </header>

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

export default PatientSigned;
