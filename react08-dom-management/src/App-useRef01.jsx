import { useRef } from "react";
import { useState } from "react";

/* useRef : 컴포넌트의 생명주기 안에서 값을 유지하는 훅으로, 새롭게 렌더링이 되더라도 값이
    변하지 않고 유지된다. useState와 같이 값은 마음대로 변경할 수 있지만, 값이 변경될때
    리렌더링은 되지 않는다. 또한 JS의 getElementByID()와 같이 DOM요소에 접근할때 사용한다. */
function App() {
  console.log('렌더링 됨');

  // State 변수와 함수 생성
  const [count, setCount] = useState(0);
  // Ref 변수 생성(값 변경시 리렌더링이 되지 않으므로 함수는 지원하지 않음)
  const countRef = useRef(0);
  console.log('countRef', countRef); // {current : 0}과 같이 출력됨

  const increaseCountState = () => {
    setCount(count + 1);
  }

  const increaseCountRef = () => {
    /* useRef를 통해 생성된 변수는 current라는 Key를 가진 객체를 반환하므로 접근시에는
      아래와 같이 '변수명.current' 형태로 기술해야 한다. */
    countRef.current = countRef.current + 1;
    console.log('Ref', countRef.current);
  }

  return (<>
    <p>State : {count}</p>
    <p>Ref : {countRef.current}</p>
    {/* 버튼을 누를때마다 State가 변경되므로 리렌더링이 된다. */}
    <button onClick={increaseCountState}>State증가</button>
    {/* Ref의 값이 변경은 되지만 리렌더링은 되지 않는다. */}
    <button onClick={increaseCountRef}>Ref증가</button>
  </>); 
}

export default App