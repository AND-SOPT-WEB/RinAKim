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

    // 버튼 클릭 시 빈 페이지로 이동하는 함수
    const goToEmptypage = () => {
        if (username.trim() && password.trim()) {
            // 아이디와 비밀번호가 비어있지 않은 경우에만 이동
            navigate("/emptypage"); // "/emptypage"는 빈 페이지 경로입니다.
        } else {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
        }
    };

    const goToHeader = () => {
        navigate("/");
    };

    async function handleLoginClick() {
        try {
            const response = await axios.post("http://211.188.53.75:8080/login", {
                username, // 화면에 입력된 username
                password, // 화면에 입력된 password
            });

            const token = response.data.result?.token || response.data.token;
            console.log(`로그인 성공! ${token}`);
            // 로그인 성공 시 토큰을 저장하는 코드 예시
            localStorage.setItem("token", response.data.result.token);

            // 로그인 성공 시 빈 페이지로 이동
            navigate("/myhobby");
        } catch (error) {
            // 서버에서 반환된 오류 처리 (예: 잘못된 아이디/비밀번호)
            console.error("로그인 요청에 실패했습니다.", error);
            alert("아이디/비밀번호가 올바르지 않습니다.");
        }
    }

    return (
        <main className="Login">
            <h2>로그인</h2>
            <div className="InputLogin">
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="아이디 입력"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호 입력"
                />
                <button type="button" onClick={handleLoginClick}>로그인</button>
            </div>
            <span className="goToHeader" onClick={goToHeader}>회원가입</span>
        </main>
    );
}
