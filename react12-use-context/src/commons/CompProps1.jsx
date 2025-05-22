import CompState2 from "./CompProps2"; 

export default function CompProps1({propData, myNumber}) {
  return (<>
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData}
      <CompState2 propData2={propData} myNumber={myNumber} />
    </div>
  </>); 
}