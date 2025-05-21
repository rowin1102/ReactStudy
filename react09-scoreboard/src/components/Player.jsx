import Counter from '../components/Counter';

export default function Player(props) {
  let row = props.playerData;
  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={(e) => {
          e.preventDefault();
          props.deletePlayerProcess(row.idx);
        }}> x </button>
        {row.name}
      </span>
      {/* App 컴포넌트에서 전달받은 함수를 자식컴포넌트로 재전달한다. React는 Top-down 방식으로
        데이터를 전달하는 구조를 가지고 있어 컴포넌트의 구조가 복잡해질수록 상태관리가 어려워진다는
        단점이 있다. */}
      <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore} />
    </div>
  </>);
}