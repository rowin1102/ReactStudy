import { NavLink } from "react-router-dom";

export default function TopNavi(props) {

  return (<>
    <nav>
      <NavLink to='/'>Home</NavLink> &nbsp;&nbsp;
      <NavLink to='/regist'>Regist</NavLink>
    </nav>
  </>); 
}