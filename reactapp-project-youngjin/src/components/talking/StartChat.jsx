import { useRef } from "react";

export default function StartChat(props) {
  // 대화방의 이름(아이디)
  const refRoom = useRef();
  // 접속자의 아이디
  const refId = useRef();

  
  const openChatWin = () => {
    if(refId.current.value
       === '') {
      alert('사용자를 입력해 주세요');
      refId.current.focus();
      return;
    }

    window.open(`/chat?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=700, height=900');
  }


  return (<>
    <div className="card-header p-4">
      <h5 className="mb-3 text-center">Chat</h5>

      <div className="d-flex flex-column">
        <input type="text" className="form-control mb-2" placeholder="Enter Room ID" value='room' readOnly ref={refRoom} />
        <input type="text" className="form-control mb-3" placeholder="Enter Your User ID" ref={refId} />

        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={openChatWin}>
            채팅 시작하기
          </button>
        </div>
      </div>
    </div>
  </>); 
}