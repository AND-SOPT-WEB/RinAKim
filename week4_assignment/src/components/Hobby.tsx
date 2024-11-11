import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hobby.css";


export default function Hobby() {

    const navigate = useNavigate();
    const [hobby, setHobby] = useState("");

    function handleHobby(event: React.ChangeEvent<HTMLInputElement>) {
        setHobby(event.target.value);
    }

    function goToLoginPage () {
        navigate("/login");
    }

    async function handleJoinClick(event: any) { Promise<void>
        // localStorage에서 username과 password 가져오기
        const username = localStorage.getItem("username") || "";
        const password = localStorage.getItem("password") || "";
    

        try {
            const response = await axios.post("http://211.188.53.75:8080/user", {
              username,
              password,
              hobby,
            });

            const userNum = response.data.result.no;
            alert(`회원가입에 성공하셨습니다. 회원번호는 ${userNum} 입니다.`);
            navigate("/login"); // 회원가입 후 로그인 페이지로 이동
          } catch (error) {
            console.error("회원가입에 실패했습니다.", error);
            alert("회원가입에 실패했습니다.");
          }
        }
        
        return (
            <main className="Hobby">
                <h2>회원가입</h2>
                <p>취미</p>
                <div className="InputHobby">
                    <input type="text" onChange={handleHobby} placeholder="취미를 입력해주세요" />
                    <button type="submit" onClick={handleJoinClick}>회원가입</button>
                </div>
                <div className="CheckMember">
                    이미 회원이신가요?<span onClick={goToLoginPage}> 로그인</span>
                </div>
            </main>
        );
    
    
    }
      
      