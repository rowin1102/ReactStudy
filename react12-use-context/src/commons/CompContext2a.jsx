import { useContext } from "react";
import { SimpleContext } from "../context/SimpleContext";

export default function CompContext2a() {
  const contextData = useContext(SimpleContext);

  return (<>
    <div>
      <h4>Context2a 컴포넌트</h4>
      {contextData}
    </div>
  </>); 
}