import { Link, useNavigate } from 'react-router-dom';
import { firestore } from "../../firestoreConfig";

import '../design/login.css';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const Login = (props) => {
  const {id, setId} = props;

  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const getCollection = async username => {
    const docRef = doc(firestore, 'members', username);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
  
  const submitHandle = async e => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    setUsernameError('');
    setPasswordError('');

    if(!username) {
      setUsernameError('아이디를 입력하세요.');
      usernameRef.current.focus();
      return;
    }
    
    const docSnap = await getCollection(username);

    if(!docSnap.exists()) {
      setUsernameError('존재하지 않는 아이디입니다.');
      usernameRef.current.focus();
      return;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력하세요.');
      passwordRef.current.focus();
      return;
    }

    const data = docSnap.data();
    if(data.password === password) {
      console.log('로그인 성공', data);
      setId({username});
      localStorage.setItem("loginID", JSON.stringify({username}));
      alert(`${username}님 환영합니다.`);
      navigate('/');
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      passwordRef.current.focus();
    }
  }

  useEffect(() => {
    console.log("로그인된 사용자:", id);
  }, [id]);

  return (
    <div id="login-page-container">
      <form id="login-form" onSubmit={submitHandle}>
        <h2 id="login-form-title">로그인</h2>
        <table id="login-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="login-username">아이디</label></td>
              <td>
                <input type="text" id="login-username" name="username" ref={usernameRef} />
                <div style={{ height: '20px' }}>
                  {usernameError && <p style={{ color: 'red', margin: 0 }}>{usernameError}</p>}
                </div>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="login-password">비밀번호</label></td>
              <td>
                <input type="password" id="login-password" name="password" ref={passwordRef} />
                <div style={{ height: '20px' }}>
                  {passwordError && <p style={{ color: 'red', margin: 0 }}>{passwordError}</p>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="login-submit-button">로그인</button>
        <p id="login-signup-link">계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
      </form>
    </div>
  );
};

export default Login;