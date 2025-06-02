import { Link, useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";

import '../design/fbstyle.css';
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default function RView(props) {
  const {formatDate} = props;
  const { no } = useParams();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [fileName, setFileNameURL] = useState('');
  const navigate = useNavigate();
  const btnStyle = {backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '6px 12px',
    borderRadius: '4px', cursor: 'pointer', fontSize: '14px',};

  const loginUserId = JSON.parse(localStorage.getItem("loginID") || 'null');

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'reference', no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');

        const creat = data.createAt;
        setDate(formatDate(creat));
        setFileURL(data.fileURL);
        setFileNameURL(data.fileName);
      }
    };
    fetch();
  }, [no]);
  
  const deleteFB = async e => {
    e.preventDefault();
    await deleteDoc(doc(firestore, 'reference', no));
  }
  
  return (<>
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
            {loginUserId?.username === username && (
              <>
                <button style={btnStyle} onClick={() => navigate(`/rEdit/${no}`)}>수정하기</button>&nbsp;
                <button
                  style={btnStyle}
                  onClick={(e) => {
                    if (window.confirm('삭제하시겠습니까?')) {
                      deleteFB(e);
                      navigate(`/rList`);
                    }
                  }}
                >삭제하기</button>
              </>
            )}
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="fb-content" style={{ whiteSpace: 'pre-wrap' }}>
              {fileURL && fileURL.match(/\.(jpeg|jpg|png|gif|bmp|webp)(\?.*)?$/i) ? (
                <img
                  src={fileURL}
                  alt={fileName}
                  style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                />
              ) : fileURL ? (
                <p>
                  첨부파일: <a href={fileURL} target="_blank" rel="noopener noreferrer">{fileName}</a>
                </p>
              ) : null}
              <div>{content}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="fb-back">
        <Link to="/rList" className="fb-back-link">목록으로</Link>
      </div>
    </div>
  </>); 
}