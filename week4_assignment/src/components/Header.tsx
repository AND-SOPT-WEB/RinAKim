import "./Header.css";
import {useNavigate} from "react-router-dom";
import { useState } from "react";


export default function Header() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");

    function JoinUsername(event: React.ChangeEvent<HTMLInputElement>) {
      const inputValue = event.target.value;
      setUsername(inputValue);
      localStorage.setItem("username", inputValue); // 로컬 스토리지에 username 저장
    }  

    function goToPasswordPage() {
        navigate("/password");  
    }

    function goToLogin() {
        navigate("/login");  
    }

      return (
        <main className="SignUp">
          <h2>회원가입</h2>
          <p>이름</p>
          <div className="input">
          <input type="text" onChange={JoinUsername} placeholder="이름을 입력해주세요" />
            <button type="submit" onClick={goToPasswordPage}>다음</button>
          </div>
          <div className="CheckMember">
            이미 회원이신가요?<span onClick={goToLogin}> 로그인</span>
          </div>
        </main>
      );
    }