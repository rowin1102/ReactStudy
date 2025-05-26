import { useRef } from 'react';
import Navi from '../components/Navi';

export default function ChatStart() {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () => {
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500, height=700');
  }

  return (<>
    <Navi />
    <h2>Firebase = Realtime Database App</h2>
    방병 : <input type="text" name='roodId' value='room1' ref={refRoom} /> <br />
    대화명 : <input type="text" name='userId' ref={refId} /> <br />
    <button type="button" onClick={openChatWin}>채팅시작</button> 
  </>); 
}