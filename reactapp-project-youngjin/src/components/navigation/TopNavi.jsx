import { Link, useNavigate } from "react-router-dom";

export default function Navi(props) {
  const {id, setId} = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    setId(null);
    localStorage.removeItem("loginID");
    alert('로그아웃에 성공했습니다');
    navigate('/');
  };

  return (<>
    {/* Navigation */}
    <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

      <div className="container">
        <a className="navbar-brand" href="/">Furni<span>.</span></a>

        <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li><a className="nav-link" href="/fbList">Free Board</a></li>
            <li><a className="nav-link" href="/qnaList">Q&A</a></li>
            <li><a className="nav-link" href="/rList">Reference</a></li>
            <li><a className="nav-link" href="">Talking</a></li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            {id ? (
                <>
                  <li className="nav-item me-2">
                    <Link to="/edit" className="nav-link d-flex align-items-center">
                      <img src="images/user.svg" alt="User Icon" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={handleLogout}>로그아웃</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link d-flex align-items-center">
                    <img src="images/user.svg" alt="User Icon"/>
                  </Link>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  </>);
}