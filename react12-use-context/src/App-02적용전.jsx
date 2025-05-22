import { useState } from "react";

// App 컴포넌트가 전달해준 프롭스를 하위 컴포넌트로 전달
const Page = ({isDark, setIsDark}) => {
  return (<>
    <div className="page"> 
      {/* 스테이트 변수 값만 전달 */}
      <Header isDark={isDark} />
      <Content isDark={isDark} />
      {/* 스테이트 변수, 함수를 같이 전달 */}
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  </>);
}

const Header = ({isDark}) => {
  // isDark에 따라 배경색과 글자색을 변경하도록 스타일 지정
  return (<>
    <header className='header'
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black'
      }}>
        <h1>Welcome 형딜동..!!</h1>
    </header>
  </>);
}

const Content = ({isDark}) => {
  return (<>
    <div className="content"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black'
      }}>
        <p>형딜동 반가워</p>
    </div>
  </>);
}

const Footer = ({isDark, setIsDark}) => {
  // 다크모드를 토글시켜주는 함수 정의
  const toggleTheme = () => {
    // 스테이트를 변경하는 세터 함수를 사용
    setIsDark(!isDark);
  }

  return (<>
    {/* isDark 값에 따라 배경색 변경 */}
    <div className="footer"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray'
      }}>
        {/* 버튼을 누를때마다 다크모드가 전체적으로 적용된다. */}
        <input type="button" value="Dark Mode" className="button"
          onClick={toggleTheme} />
    </div>
  </>);
}

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (<>
    {/* 자식 컴포넌트로 스테이트 변수와 세터함수를 전달 */}
    <Page isDark={isDark} setIsDark={setIsDark} />
  </>); 
}