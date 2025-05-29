import { useEffect, useRef, useState } from "react";
import { firestore } from "../../firestoreConfig";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Edit(props) {
  const {id} = props;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [firstPhone, setFirstPhone] = useState('');
  const [middlePhone, setMiddlePhone] = useState('');
  const [lastPhone, setLastPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [selectedDomain, setSelectedDomain] = useState('custom');
  const [isCustomDomain, setIsCustomDomain] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const zipRef = useRef(null);
  const addrRef = useRef(null);
  const detailRef = useRef(null);
  const firstPhoneRef = useRef();
  const middlePhoneRef = useRef();
  const lastPhoneRef = useRef();

  const navigate = useNavigate();

  const membersEdit = async (p_collection, p_username, p_password, p_name, 
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
    console.log('수정성공');
  }

  const getCollection = async username => {
    const docRef = doc(firestore, 'members', username);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
  
  useEffect(() => {
    const fetch = async () => {
      if(id?.username) {
        const docSnap = await getCollection(id.username);
        const data = docSnap.data();
        setPassword(data.password);
        setPasswordConfirm(data.password);
        setName(data.name);
        setZipcode(data.zipcode);

        if(data?.email) {
          const [emailId = '', emailDomain = ''] = data.email.split('@');
          setEmailId(emailId);
          setEmailDomain(emailDomain);
          const commonDomains = ['naver.com', 'gmail.com', 'hanmail.net', 'daum.net'];
          if(commonDomains.includes(emailDomain)) {
            setSelectedDomain(emailDomain);
            setIsCustomDomain(false);
          } else {
            setSelectedDomain('custom');
            setIsCustomDomain(true);
          }
        }

        if(data?.phone) {
          const [first = "", middle = "", last = ""] = data.phone.split("-");
          setFirstPhone(first);
          setMiddlePhone(middle);
          setLastPhone(last);
        }

        if(data?.address) {
          const parts = data.address.split('(');
          const detail = parts[1] ? parts[1].replace(')', '').trim() : '';
          setAddress(parts[0].trim());
          setDetailAddress(detail);
        }
      }
    }
    fetch();
  }, [id]);
  
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
    setDetailAddress('');
  };

  const handleEmailSelect = (e) => {
    const selected = e.target.value;
    setSelectedDomain(selected);

    if (selected === 'custom') {
      setEmailDomain('');
      setIsCustomDomain(true);
    } else {
      setEmailDomain(selected);
      setIsCustomDomain(false);
    }
  };

  const handlePhoneInput = (e, maxLength, nextRef) => {
    if(e.target.value.length >= maxLength) {
      nextRef?.current?.focus();
    }
  }

  const submitEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const collection = form.collection.value;

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

    const email = `${emailId}@${emailDomain}`;
    const phone = `${firstPhone}-${middlePhone}-${lastPhone}`;
    const totalAddress = `${address} (${detailAddress})`;
    
    for (let field of requiredFields) {
      const input = form[field.name];
      if (!input.value.trim()) {
        alert(`${field.label}를 입력하세요.`);
        input.focus();
        return;
      }
    }
    
    if(password !== passwordConfirm) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      form.password.focus();
      return;
    }

    if (password.length < 6 || password.length > 12) {
      setPasswordError('6~12자리 사이로 입력해 주세요');
      form.password.focus();
      return;
    }
    
    if(!form.emailDomain.value.includes('.')) {
      alert('이메일 형식이 아닙니다.');
      form.emailDomain.focus();
      return;
    }
    
    if (!/^\d+$/.test(phone.replace(/-/g, ''))) {
      setPhoneError('숫자만 입력이 가능합니다');
      lastPhoneRef.current.focus();
      return;
    }

    await membersEdit(collection, id.username, password, name, email, phone, zipcode, totalAddress)
    alert('회원정보가 수정되엇습니다.');
    navigate('/');
  }
  
  return (<>
    <div id="signup-page-container">
      <form id="signup-form" onSubmit={submitEdit}>
        <input type="hidden" name="collection" value='members' />
        <h2 id="signup-form-title">회원정보 수정</h2>
        <table id="signup-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="signup-username">아이디</label></td>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="text" id="signup-username" name="username" value={props.id?.username || ""} readOnly />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password">비밀번호</label></td>
              <td style={{ position: 'relative' }}>
                <input type="password" id="signup-password" name="password" value={password}
                onChange={e => setPassword(e.target.value)}/>
                {passwordError && (
                  <span style={{ color: 'red', marginLeft: '10px', fontSize: '0.9rem' }}>
                    {passwordError}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-password-confirm">비밀번호 확인</label></td>
              <td><input type="password" id="signup-password-confirm" name="passwordConfirm"
                value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-name">이름</label></td>
              <td><input type="text" id="signup-name" name="name" value={name}
                onChange={e => setName(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-email-id">이메일</label></td>
              <td>
                <input type="text" id="signup-email-id" name="emailId" value={emailId}
                  onChange={e => setEmailId(e.target.value)} />@ &nbsp;
                <input type="text" id="signup-email-domain" name="emailDomain" value={emailDomain}
                  readOnly={!isCustomDomain} onChange={e => setEmailDomain(e.target.value)}/>
                <select id="signup-email-select" value={selectedDomain} onChange={handleEmailSelect}>
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
                <input type="text" id="signup-phone-first" name="firstPhone" maxLength="3" value={firstPhone}
                  ref={firstPhoneRef} onChange={e => {
                    setFirstPhone(e.target.value);
                    setPhoneError('');
                    handlePhoneInput(e, 3, middlePhoneRef);}} />-
                <input type="text" id="signup-phone-middle" name="middlePhone" maxLength="4" value={middlePhone}
                  ref={middlePhoneRef} onChange={e => {
                    setMiddlePhone(e.target.value);
                    setPhoneError('');
                    handlePhoneInput(e, 4, lastPhoneRef);}} />-
                <input type="text" id="signup-phone-last" name="lastPhone" maxLength="4" value={lastPhone}
                  ref={lastPhoneRef} onChange={e => {
                    setLastPhone(e.target.value);
                    setPhoneError('');
                  }} />
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
                <input type="text" id="signup-zipcode" name="zipcode" value={zipcode}  ref={zipRef}
                  onChange={e => setZipcode(e.target.value)} />
                <button type="button" id="signup-zipcode-search-button"
                  onClick={handlePostcodeSearch}>우편번호 찾기</button>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="signup-address">기본주소</label></td>
              <td><input type="text" id="signup-address" name="address" ref={addrRef}
                value={address} onChange={e => setAddress(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label htmlFor="signup-detail-address">상세주소</label></td>
              <td><input type="text" id="signup-detail-address" name="detailAddress" ref={detailRef}
                value={detailAddress} onChange={e => setDetailAddress(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="signup-submit-button">수정하기</button>
        <p id="signup-login-link" style={{fontSize: '18px'}}><Link to="/">취소</Link></p>
      </form>
    </div>
  </>); 
}