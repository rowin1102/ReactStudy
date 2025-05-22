import { useContext } from "react";
import { SimpleContext } from "../context/SimpleContext";

export default function CompContext2b() {
  const contextData = useContext(SimpleContext);
  return (<>
    <div>
      <h4>Context2b 컴포넌트</h4>
      {contextData.src} <br />
      myNumber : {contextData.num}  
    </div>    
  </>); 
}