import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../firestoreConfig";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import '../design/fbstyle.css';

export default function REdit(props) {
  const { no } = useParams();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(firestore, 'reference', no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        setUsername(data.username || '');
        setTitle(data.title || '');
        setContent(data.content || '');
        setFileName(data.fileName || '');
        setFileURL(data.fileURL || '');
      }
    };
    fetch();
  }, [no]);

  const uploadFile = async () => {
    if (!file) return null;

    const fileRef = ref(storage, `reference_uploads/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };
  
  const submitHandle = async e => {
    e.preventDefault();
    
    if(!title || !content) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }
    
    try {
      setIsUploading(true);
      
      let newFileURL = fileURL;
      let newFileName = fileName;

      if(file) {
        const uploadedURL = await uploadFile();
        if (uploadedURL) {
          newFileURL = uploadedURL;
          newFileName = file.name;
        }
      }

      await setDoc(doc(firestore, 'reference', no), {
        username,
        title,
        content,
        fileURL: newFileURL,
        fileName: newFileName,
        createAt: Timestamp.now(),
      });

      alert('글을 성공적으로 수정했습니다.');
      navigate(`/rView/${no}`);
    }
    catch (error){
      console.log('글 저장 실패', error);
      alert('글 등록 중 오류 발생');
    }
    finally {
      setIsUploading(false);
    }
  }

  return (<>
    {isUploading && (
      <div className="upload-overlay">
        <div className="spinner" />
        <p>파일 업로드 중입니다. 잠시만 기다려주세요...</p>
      </div>
    )}

    <div className="fb-wrapper">
      <div className="fb-write-container">
        <h2 className="fb-write-title">글쓰기</h2>
        <form className="fb-write-form" onSubmit={submitHandle}>
          <table className="fb-write-table">
            <tbody>
              <tr>
                <th><label>작성자</label></th>
                <td>
                  <input type="text" readOnly value={username} />
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
                <th><label>첨부파일</label></th>
                <td>
                  <input
                    type="file"
                    accept="image/*,video/*,.pdf,.doc,.docx,.hwp"
                    onChange={e => setFile(e.target.files[0])}
                  />
                  {fileName && !file && (
                    <div style={{ marginTop: '6px', color: '#555' }}>
                      현재 업로드된 파일: <strong>{fileName}</strong>
                    </div>
                  )}
                  {fileURL && (
                    <img src={fileURL} alt={fileName} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}/>
                  )}
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
            <button type="submit" className="fb-submit-button">수정</button>
            <button type="button" className="fb-cancel-button" onClick={() => navigate('/rList')}>취소</button>
          </div>
        </form>
      </div>
    </div>
  </>); 
}