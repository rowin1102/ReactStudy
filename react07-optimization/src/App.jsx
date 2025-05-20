import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [switching, setSwitching] = useState(true);

  const switchMode = switching ? 'On' : 'off';

  useEffect(() => {
    console.log('useEffect() 호출됨');
  }, [switchMode]);

  return (<>
    <h2>정수 카운터</h2>
    <input type="number" value={number}
      onChange={e => setNumber(parseInt(e.target.value))} />

    <hr />

    <h2>토글 스위치</h2>
    <p>스위치상태(Step1) : {switchMode}</p>
    <button onClick={() => {setSwitching(!switching)}}>스위치조작</button>
  </>); 
}

export default App