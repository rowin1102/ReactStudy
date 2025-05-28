import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navi(props) {
  const {info, setInfo} = props;
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setInfo(null);
    localStorage.removeItem("loginInfo");
    alert('로그아웃에 성공했습니다');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const pathPage = info ? '/edit' : '/login';

  return (<>
    {/* Navigation */}
    <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

      <div className="container">
        <a className="navbar-brand" href="/">Furni<span>.</span></a>

        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li><a className="nav-link" href="/freeboard">Free Board</a></li>
            <li><a className="nav-link" href="/qna">Q&A</a></li>
            <li><a className="nav-link" href="/reference">Reference</a></li>
            <li><a className="nav-link" href="">Talking</a></li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li className="nav-item dropdown-wrapper"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}>
              <Link className="nav-link" to={pathPage}
                onClick={() => {
                  const collapse = document.getElementById("navbarsFurni");
                    if (collapse && collapse.classList.contains("show")) {
                      collapse.classList.remove("show");
                    }
                }}><img src="images/user.svg" /></Link>
              {info && showMenu && (
                <div className="dropdown-menu-box">
                  <Link to="/edit" className="dropdown-item">정보수정</Link>
                  <button className="dropdown-item" onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}