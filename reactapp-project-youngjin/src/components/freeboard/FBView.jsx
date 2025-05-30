import { Link, useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

import '../design/fbstyle.css';

export default function FBView({formatDate}) {
  const { no } = useParams();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'freeboards', no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');

        const creat = data.createAt;
        setDate(formatDate(creat));
      }
    };
    fetch();
  }, [no]);

  const deleteFB = async e => {
    e.preventDefault();
    await deleteDoc(doc(firestore, 'freeboards', no));
  }

  const loginUserId = JSON.parse(localStorage.getItem("loginID"));

  return (
    <div className="fb-wrapper">
    <table className="fb-detail">
      <tbody>
        <tr>
          <th colSpan="2" className="fb-title">{title}</th>
        </tr>
        <tr className="fb-meta">
          <td>
            작성자: {username} <br />
            작성일: {date}
          </td>
          <td style={{ textAlign: 'right' }}>
            {loginUserId === username ? (<button style={{backgroundColor: '#0d6efd', color: 'white', border: 'none',
              padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}
              onClick={() => navigate(`/fbEdit/${no}`)}>수정하기</button>) : ''} &nbsp;
            {loginUserId === username ? (<button style={{backgroundColor: '#0d6efd', color: 'white', border: 'none',
              padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}
              onClick={(e) => {
                if(window.confirm('삭제하시겠습니까?')) {
                  deleteFB(e);
                  console.log('삭제성공');
                  navigate(`/fbList`);
                }
              }}>삭제하기</button>) : ''}
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="fb-content" style={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </td>
        </tr>
      </tbody>
    </table>

    <div className="fb-back">
      <Link to="/fbList" className="fb-back-link">목록으로</Link>
    </div>
  </div>
  );
}
