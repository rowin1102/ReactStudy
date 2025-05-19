import { Link } from "react-router-dom";

const NotFound = () => {
  return (<>
    <h2>Not Found</h2>
    <p>
      페이지를 찾을 수 없습니다. <br />
    </p>
    <Link to='/'>Home</Link>
  </>);
}

export default NotFound