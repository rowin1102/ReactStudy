import { Link, useNavigate } from 'react-router-dom';
import { firestore } from "../../firestoreConfig";

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';

import '../design/login.css'

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [userCheck, setUserCheck] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const firstPhoneRef = useRef();
  const middlePhoneRef = useRef();
  const lastPhoneRef = useRef();
  const passwordRef = useRef();
  const zipRef = useRef(null);
  const addrRef = useRef(null);
  const detailRef = useRef(null);
  
  const handlePhoneInput = (e, maxLength, nextRef) => {
    if(e.target.value.length >= maxLength) {
      nextRef?.current?.focus();
    }
  }

  const handleEmailSelect = (e) => {
    const selected = e.target.value;
    const emailDomainInput = document.getElementById("signup-email-domain");
    
    if (selected === "custom") {
      emailDomainInput.value = "";
      emailDomainInput.readOnly = false;
      emailDomainInput.focus();
    } else {
      emailDomainInput.value = selected;
      emailDomainInput.readOnly = true;
    }
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (zipRef.current) zipRef.current.value = data.zonecode;
        if (addrRef.current) addrRef.current.value = addr;
        if (detailRef.current) detailRef.current.focus();
      },
    }).open();
  };

  const checkUsername = async () => {
    if(!username.trim()){
      alert('아이디를 입력하세요');
      return;
    }

    const docRef = doc(firestore, 'members', username);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      setUserCheck('duplicate');
    } else {
      setUserCheck('available');
      passwordRef.current?.focus();
    }
  }

  const membersWrite = async (p_collection, p_username, p_password, p_name, 
    p_email, p_phone, p_zipcode, p_address) => {
    
    await setDoc(doc(firestore, p_collection, p_username), {
      username: p_username,
      password: p_password,
      name: p_name,
      email: p_email,
      phone: p_phone,
      zipcode: p_zipcode,
      address: p_address,
    });
    console.log('입력성공');
  }

  const submitHandle =  async (e) => {
    e.preventDefault();
    const form = e.target;
    
    setPasswordError('');
    setPhoneError('');
    
    if (userCheck === 'duplicate') {
      alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력하세요.');
      form.username.focus();
      return;
    }

    const requiredFields = [
      { name: "username", label: "아이디" },
      { name: "password", label: "비밀번호" },
      { name: "passwordConfirm", label: "비밀번호 확인" },
      { name: "name", label: "이름" },
      { name: "emailId", label: "이메일 아이디" },
      { name: "emailDomain", label: "이메일 도메인" },
      { name: "firstPhone", label: "휴대전화 앞자리" },
      { name: "middlePhone", label: "휴대전화 중간자리" },
      { name: "lastPhone", label: "휴대전화 뒷자리" },
      { name: "zipcode", label: "우편번호" },
      { name: "address", label: "기본주소" },
      { name: "detailAddress", label: "상세주소" },
    ];
    
    for (let field of requiredFields) {
      const input = form[field.name];
      if (!input.value.trim()) {
        alert(`${field.label}를 입력하세요.`);
        input.focus();
        return;
      }
    }
  
    if(form.password.value !== form.passwordConfirm.value) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      form.password.focus();
      return;
    }

    if (form.password.value.length < 6 || form.password.value.length > 12) {
      setPasswordError('6~12자리 사이로 입력해 주세요');
      form.password.focus();
      return;
    }
    
    const collection = form.collection.value;
    const username = form.username.value;
    const password = form.password.value;
    const name = form.name.value;
    const email = `${form.emailId.value}@${form.emailDomain.value}`;
    const phone = `${form.firstPhone.value}-${form.middlePhone.value}-${form.lastPhone.value}`;
    const zipcode = form.zipcode.value;
    const address = form.address.value;
    const detailAddress = form.detailAddress.value;
    const totalAddress = `${address} (${detailAddress})`;
    
    if (!/^\d+$/.test(phone.replace(/-/g, ''))) {
      setPhoneError('숫자만 입력이 가능합니다');
      lastPhoneRef.current.focus();
      return;
    }

    if(!form.emailDomain.value.includes('.')) {
      alert('이메일 형식이 아닙니다.');
      form.emailDomain.focus();
      return;
    }
    
    if(userCheck === 'available') {
      await membersWrite(collection, username, password, name, email, phone, zipcode, totalAddress);
      alert('회원가입이 완료되었습니다!');
      form.reset();
      navigate('/login');
    } else {
      alert('중복확인을 해주세요');
      return;
    }
  }
  
  return (
    <div id="signup-page-container">
      <form id="signup-form" onSubmit={submitHandle}>
        <input type="hidden" name="collection" value='members' />
        <h2 id="signup-form-title">회원가입</h2>
        <table id="signup-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="signup-username">아이디</label></td>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="text" id="signup-username" name="username" value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    setUserCheck(null);
                  }} />
                <button type="button" id="signup-id-check-button" onClick={checkUsername}>중복확인</button>
                {userCheck === 'available' && (<p style={{ color: 'green', marginBottom: '1px'}}>
                  사용 가능한 아이디입니다.</p>)}
                {userCheck === 'duplicate' && (<p style={{ color: 'red', marginBottom: '1px'}}>
                  이미 사용 중인 아이디입니다.</p>)}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password">비밀번호</label></td>
              <td style={{ position: 'relative' }}>
                <input type="password" id="signup-password" name="password" ref={passwordRef} />
                {passwordError && (
                  <span style={{ color: 'red', marginLeft: '10px', fontSize: '0.9rem' }}>
                    {passwordError}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password-confirm">비밀번호 확인</label></td>
              <td><input type="password" id="signup-password-confirm" name="passwordConfirm" /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-name">이름</label></td>
              <td><input type="text" id="signup-name" name="name" /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-email-id">이메일</label></td>
              <td>
                <input type="text" id="signup-email-id" name="emailId" />@ &nbsp;
                <input type="text" id="signup-email-domain" name="emailDomain" />
                <select id="signup-email-select" onChange={handleEmailSelect}>
                  <option value="custom">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="daum.net">daum.net</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-phone">휴대전화</label></td>
              <td style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="text" id="signup-phone-first" name="firstPhone" maxLength="3"
                ref={firstPhoneRef} onChange={e => handlePhoneInput(e, 3, middlePhoneRef)} />-
              <input type="text" id="signup-phone-middle" name="middlePhone" maxLength="4"
                ref={middlePhoneRef} onChange={e => handlePhoneInput(e, 4, lastPhoneRef)} />-
              <input type="text" id="signup-phone-last" name="lastPhone" maxLength="4" 
                ref={lastPhoneRef} />
              {phoneError && (
                  <span style={{ color: 'red', marginLeft: '10px', fontSize: '0.9rem' }}>
                    {phoneError}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-zipcode">우편번호</label></td>
              <td>
                <input type="text" id="signup-zipcode" name="zipcode" ref={zipRef} />
                <button type="button" id="signup-zipcode-search-button" 
                  onClick={handlePostcodeSearch}>우편번호 찾기</button>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-address">기본주소</label></td>
              <td><input type="text" id="signup-address" name="address" ref={addrRef} /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-detail-address">상세주소</label></td>
              <td><input type="text" id="signup-detail-address" name="detailAddress" ref={detailRef} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="signup-submit-button">회원가입</button>
        <p id="signup-login-link">이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      </form>
    </div>
  );
};

export default Signup;