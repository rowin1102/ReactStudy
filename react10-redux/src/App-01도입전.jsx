import { useState } from "react";

/* 부모 컴포넌트인 App에서 내려받은 프롭스의 함수를 다시 자식 컴포넌트로 전달한다.
  이렇게 순차적으로 전달하는 것을 '프롬스 드릴링'이라고 표현한다. */
const Right1 = (props) => {
  return (<>
    <div>
      <h2>Right1</h2>
      <Right2 onMyPlus2={() => {
        props.onMyPlus1();
      }} />
    </div>
  </>);
}

const Right2 = (props) => {
  return (<>
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={() => {
        props.onMyPlus2();
      }} />
    </div>
  </>);
}

const Right3 = (props) => {
  return (<>
    <div>
      <h2>Right3</h2>
      {/* Right의 최하위 컴포넌트에서는 Click 이벤트를 통해 부모쪽으로 전달된 함수를 호출한다.
        그러면 Right3 > Right2 > .. > App과 같은 순서대로 호출된다. */}
      <input type="button" value="+" onClick={() => {
        props.onMyPlus3();
      }} />  
    </div>
  </>);
}

const Left1 = (props) => {
  return (<>
    <div>
      <h2>Left1 : {props.number1}</h2>
      <Left2 number2={props.number1} />
    </div>
  </>);
}

const Left2 = (props) => {
  return (<>
    <div>
      <h2>Left2 : {props.number2}</h2>
      <Left3 number3={props.number2} />
    </div>
  </>);
}

// Left의 최하위 컴포넌트에서는 프롭스로 전달받은 값을 출력한다.
const Left3 = (props) => {
  return (<>
    <div>
      <h2>Left3 : {props.number3}</h2>
    </div>
  </>);
}

export default function App() {
  // 최상위 컴포넌트에서 스테이트 생성
  const [number, setNumber] = useState(1);

  return (<>
    <div className="root">
      {/* 스테이트 값 출력 */}
      <h2>React - Reduce : {number}</h2>
      <div id="grid">
        {/* Left 컴포넌트 하위로는 number 값을 전달 */}
        <Left1 number1={number} />
        {/* Right 컴포넌트 하위로는 스테이트 변경을 위한 함수를 전달 */}
        <Right1 onMyPlus1={() => {
          setNumber(number + 1);
        }} />
      </div>
    </div>
  </>); 
}
