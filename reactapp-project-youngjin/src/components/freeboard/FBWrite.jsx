import { Navigate, useNavigate } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import '../design/fbstyle.css';

export default function FBWrite({ nowDate, formatDate}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("loginID");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      alert('로그인을 해주세요.');
      navigate('/fbList');
    }
  }, [navigate]);

  if (!user) return null;

  const submitHandle = async e => {
    e.preventDefault();
    
    if(!title || !content) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }
    
    try {
      await addDoc(collection(firestore, 'freeboards'), {
        username: user.username,
        title,
        content,
        date: formatDate(nowDate()),
        createAt: Timestamp.now(),
      });
      alert('글을 성공적으로 등록되었습니다.');
      navigate('/fbList');
    }
    catch (error){
      console.log('글 저장 실패', error);
      alert('글 등록 중 오류 발생');
    }
  }

  return (<>
    <div className="fb-wrapper">
      <div className="fb-write-container">
        <h2 className="fb-write-title">글쓰기</h2>
        <form className="fb-write-form" onSubmit={submitHandle}>
          <table className="fb-write-table">
            <tbody>
              <tr>
                <th><label>작성자</label></th>
                <td>
                  <input type="text" readOnly value={user.username} />
                </td>
              </tr>
              <tr>
                <th><label>제목</label></th>
                <td>
                  <input type="text" placeholder="제목을 입력하세요" value={title}
                    onChange={e => setTitle(e.target.value)} required />
                </td>
              </tr>
              <tr>
                <th><label>내용</label></th>
                <td>
                  <textarea placeholder="내용을 입력하세요" rows={10} required value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="fb-button-group">
            <button type="submit" className="fb-submit-button">등록</button>
            <button type="button" className="fb-cancel-button" onClick={() => navigate('/fbList')}>취소</button>
          </div>
        </form>
      </div>
    </div>
  </>); 
}