import { Link } from "react-router-dom";


export default function Navi() {
  return (<>
    <div className="naviWrap">
      <Link to='/crud'>RealtimeCRUD</Link>&nbsp;&nbsp;
      <Link to='/listener'>RealtimeListener</Link>&nbsp;&nbsp;
      <Link to='/chat'>RealtimeChat</Link>&nbsp;&nbsp;
    </div>
  </>); 
}