import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Password.css";

export default function Password() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function JoinPassword(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setPassword(inputValue);
    localStorage.setItem("password", inputValue); 
  }

  function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  function goToHobbyPage() {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
      navigate("/hobby"); 
    }
  }

  function goToLogin() {
    navigate("/login");  
  }

  return (
    <main className="SetPW">
      <h2>회원가입</h2>
      <p>비밀번호</p>
      <div className="Password">
        <input type="password" onChange={JoinPassword} placeholder="비밀번호를 입력해주세요" />
        <input type="password" onChange={handleConfirmPassword} placeholder="비밀번호 확인" />
        <button type="submit" onClick={goToHobbyPage}>다음</button>
      </div>
      <div className="CheckMember">
        이미 회원이신가요?<span onClick={goToLogin}> 로그인</span>
      </div>
    </main>
  );
}
