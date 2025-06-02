import { useRef } from "react";

export default function StartChat(props) {
  // 대화방의 이름(아이디)
  const refRoom = useRef();
  // 접속자의 아이디
  const refId = useRef();

  const openChatWin = () => {
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500, height=700');
  }

  return (<>
    <div className="card-header p-4">
      <h5 className="mb-3 text-center">Chat</h5>

      <div className="d-flex flex-column">
        <input type="text" className="form-control mb-2" placeholder="Enter Room ID" ref={refRoom} />
        <input type="text" className="form-control mb-3" placeholder="Enter Your User ID" ref={refId} />

        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={openChatWin}>
            Let's Chat App
          </button>
        </div>
      </div>
    </div>
  </>); 
}