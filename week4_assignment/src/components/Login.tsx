import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 아이디 입력값을 저장하는 함수
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    // 비밀번호 입력값을 저장하는 함수
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const goToHeader = () => {
        navigate("/");
    };

    async function handleLoginClick() {
        try {
            const response = await axios.post("http://211.188.53.75:8080/login", {
                username, 
                password, 
            });

            const token = response.data.result?.token || response.data.token;
            console.log(`로그인 성공! ${token}`);
            localStorage.setItem("token", response.data.result.token);

            // 로그인 성공 취미 페이지로 이동
            navigate("/myhobby");
        } catch (error) {
            console.error("로그인 요청에 실패했습니다.", error);
            alert("아이디/비밀번호가 올바르지 않습니다.");
        }
    }

    return (
        <main className="Login">
            <h2>로그인</h2>
            <div className="InputLogin">
                <input type="text" value={username} onChange={handleUsernameChange}/>
                <input type="password" value={password} onChange={handlePasswordChange}/>
                <button type="button" onClick={handleLoginClick}>로그인</button>
            </div>
            <span className="goToHeader" onClick={goToHeader}>회원가입</span>
        </main>
    );
}
