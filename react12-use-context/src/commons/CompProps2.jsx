// 매개변수 props를 통해 객체 형식으로 받은 후 사용
export default function CompProps2(props) {
  return (<>
    <div>
      <h4>Props2 컴포넌트</h4>
      {props.propData2} <br />
      myNuber : {props.myNumber}
    </div>
  </>); 
}