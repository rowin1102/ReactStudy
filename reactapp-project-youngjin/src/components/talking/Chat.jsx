import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { child, onValue, push, ref, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { realtime } from "../../realtimeConfig";
import { storage } from "../../firestoreConfig"; 
import '../design/chat.css';

export default function Chat() {
  // URL 파라미터에서 roomId, userId, userName 추출
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const userName = searchParams.get('userName');

  const chatWindow = useRef();
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [chatData, setChatData] = useState([]);

  // 메시지 전송 함수
  const messageWrite = (chatRoom, chatId, ChatMessage) => {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;

    set(ref(realtime, `${chatRoom}/${newPostKey}`), {
      id: chatId,
      name: userName || chatId,
      message: ChatMessage,
      timestamp: Date.now(),
    });
    console.log('입력성공');
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      // Firebase Storage에 이미지 업로드
      const storageReference = storageRef(storage, `chatImages/${roomId}/${userId}/${file.name}_${Date.now()}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      messageWrite(roomId, userId, downloadURL);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }

    e.target.value = null;
  };

  useEffect(() => {
    if (!roomId || !userId) return;

    const dbRef = ref(realtime, roomId);

    const unsubscribe = onValue(dbRef, snapshot => {
      let showDiv = [];
      let lastDateStr = null;

      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        if (!childData.timestamp) return;

        const msgDate = new Date(childData.timestamp);
        const dateStr = msgDate.toISOString().slice(0, 10);
        const todayStr = new Date().toISOString().slice(0, 10);

        // 날짜가 바뀌면 구분선 추가
        if (dateStr !== lastDateStr) {
          lastDateStr = dateStr;
          let displayDate = '';
          if (dateStr === todayStr) {
            displayDate = 'Today';
          } else {
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = weekdays[msgDate.getDay()];
            displayDate = `${dateStr} ${dayName}`;
          }

          showDiv.push(
            <div className="divider d-flex align-items-center mb-4" key={'divider-' + dateStr}>
              <p className="text-center mx-3 mb-0" style={{ color: '#a2aab7' }}>{displayDate}</p>
            </div>
          );
        }

        const timeString = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const name = childData.name || '알 수 없음';

        const isImageUrl = typeof childData.message === 'string' &&
          childData.message.includes("firebasestorage.googleapis.com");

        const chatBubble = (
          <div className={`d-flex flex-column ${childData.id === userId ? 
            'align-items-end' : 'align-items-start'} mb-3`} key={childSnapshot.key}>
            <div style={{ fontWeight: 'bold', fontSize: '0.8em', color: '#555', marginBottom: '2px' }}>{name}</div>

            {isImageUrl ? (
              <div style={{ padding: '5px' }}>
                <img src={childData.message} alt="uploaded" style={{ maxWidth: '200px', borderRadius: '10px' }} />
              </div>
            ) : (
              <div className={childData.id === userId ? "bg-primary text-white p-2 rounded-3" : "bg-light p-2 rounded-3"}>
                <span>{childData.message}</span>
              </div>
            )}

            <div style={{ fontSize: '0.7em', color: '#000', marginTop: '4px' }}>{timeString}</div>
          </div>
        );

        showDiv.push(chatBubble);
      });

      setChatData(showDiv);

      setTimeout(() => {
        if (chatWindow.current) {
          chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
        }, 100);
      });

    return () => unsubscribe();
  }, [roomId, userId]);

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fs-5 fw-bold">userId : {userId}</div>
              <button className="btn btn-outline-danger btn-sm"
                onClick={() => window.opener ? window.close() : navigate('/startChat')}>
                나가기
              </button>
            </div>
            <div className="card" id="chat2">
              <div className="card-body"
                style={{ position: 'relative', height: '600px', overflowY: 'auto' }} ref={chatWindow}>
                {chatData.length > 0 ? chatData : (
                  <p style={{ textAlign: 'center', color: '#888' }}>채팅 내역이 없습니다.</p>
                )}
              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <input type="text" className="form-control form-control-lg"
                  id="exampleFormControlInput1" placeholder="Type message"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value.trim() !== '') {
                      messageWrite(roomId, userId, e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />

                <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef}
                  onChange={handleImageUpload} />

                <a className="ms-1 text-muted" href="#!"
                  onClick={e => {
                    e.preventDefault();
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}>
                  <i className="fas fa-paperclip"></i>
                </a>

                <a className="ms-3" href="#!" onClick={e => {
                  e.preventDefault();
                  const input = document.getElementById('exampleFormControlInput1');
                  if (input.value.trim() !== '') {
                    messageWrite(roomId, userId, input.value.trim());
                    input.value = '';
                  }
                }}>
                  <i className="fas fa-paper-plane"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}