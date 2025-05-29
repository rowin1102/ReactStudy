import { Link } from "react-router-dom";
import '../design/fbstyle.css';

export default function FBNav() {
  return (<>
    <div id="fb-nav-container">
      <div id="fb-nav">
        <h2>Free Board</h2>
        <Link to="/fbWrite" id="fb-write-button">글쓰기</Link>
      </div>
    </div>  
  </>); 
}