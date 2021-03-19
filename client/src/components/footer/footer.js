import React from "react";

import "./footer.css";

function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="footer-row">
          <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12">
            <div className="item">Made with ❤️ for the chess community</div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4  col-xs-12">
            <div className="item">
              <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                GPLv3 License
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4  col-xs-12">
            <div className="item">
              <a href="/contributors">
                Contributors
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4  col-xs-12">
            <div className="item">
              <a href="https://github.com/fave77/pbchess">Support Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
