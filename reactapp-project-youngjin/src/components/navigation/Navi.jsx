import { Link } from "react-router-dom";

export default function Navi() {
  return (<>
    {/* Navigation */}
    <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

      <div className="container">
        <a className="navbar-brand" href="/">Furni<span>.</span></a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li><a className="nav-link" href="">Free Board</a></li>
            <li><a className="nav-link" href="">Q&A</a></li>
            <li><a className="nav-link" href="">Photo</a></li>
            <li><a className="nav-link" href="">Talking</a></li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li><Link className="nav-link" to='/login'><img src="images/user.svg" /></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}