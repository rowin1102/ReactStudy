import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../firestoreConfig";

import '../design/fbstyle.css';
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export default function FBEdit() {
  const { no } = useParams();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const freeboardEdit = async (collection, p_username, p_title, p_content) => {
    await setDoc(doc(firestore, collection, no), {
      username: p_username,
      title: p_title,
      content: p_content,
      createAt: Timestamp.now(),
    });
    console.log('수정성공');
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    await freeboardEdit('freeboards', username, title, content);
    alert('수정되었습니다.');
    navigate(`/fbView/${no}`);
  }

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'freeboards', no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');

        console.log('data', data);
      }
    };
    fetch();
  }, [no]);

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
                  <input type="text" value={username} readOnly/>
                </td>
              </tr>
              <tr>
                <th><label>제목</label></th>
                <td>
                  <input type="text" placeholder="제목을 입력하세요" value={title} required
                    onChange={e => setTitle(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th><label>내용</label></th>
                <td>
                  <textarea placeholder="내용을 입력하세요" rows={10} value={content} required
                    onChange={e => setContent(e.target.value)}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="fb-button-group">
            <button type="submit" className="fb-submit-button">등록</button>
            <button type="button" className="fb-cancel-button">취소</button>
          </div>
        </form>
      </div>
    </div>
  </>); 
}