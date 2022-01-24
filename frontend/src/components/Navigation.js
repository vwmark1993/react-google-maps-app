import { Link, withRouter } from "react-router-dom";
import atlasLogoWhite24px from '../images/atlas-logo-white-24px.png';
import atlasLogoWhite32px from '../images/atlas-logo-white-32px.png';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-md navbar-dark sticky-top">
        <button className="navbar-toggler border-0 w-100" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <img src={atlasLogoWhite32px} alt="Atlas Logo" style={{ transform: `rotate(${-15}deg)` }} />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-desktop navbar-nav d-flex justify-content-center text-center">
            <li className={`nav-item ${props.location.pathname === "/" || props.location.pathname === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className={`nav-item ${props.location.pathname === "/atlas" ? "active" : ""}`}>
              <Link className="nav-link h5 mb-0 font-weight-normal d-flex justify-content-center align-items-center" to="/atlas">
                <img src={atlasLogoWhite24px} height={24} width={24} alt="Atlas Logo" className="mr-2" style={{ transform: `rotate(${-15}deg)` }} />
                Atlas
              </Link>
            </li>
            <li className={`nav-item ${props.location.pathname === "/docs" ? "active" : ""}`}>
              <Link className="nav-link" to="/docs">Documentation</Link>
            </li>
          </ul>
          {/* <!-- The menu item order is switched in the mobile display, for aesthetic urposes. --> */}
          <ul className="navbar-mobile navbar-nav text-center">
            <li className={`nav-item ${props.location.pathname === "/" || props.location.pathname === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className={`nav-item ${props.location.pathname === "/docs" ? "active" : ""}`}>
              <Link className="nav-link h5 mb-0 font-weight-normal" to="/docs">Documentation</Link>
            </li>
            <li className={`nav-item ${props.location.pathname === "/atlas" ? "active" : ""}`}>
            <Link className="nav-link" to="/atlas">Atlas</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);