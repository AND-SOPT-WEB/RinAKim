import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Emptypage from "./Emptypage";
import "./EditInfo.css";

interface EditInfoResponse {
  result: {
    hobby: string;
    password: string;
  };
}

export default function EditInfo() {
  const [hobby, setHobby] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("회원 정보가 없습니다. 다시 입력해 주세요.");
          return;
        }

        const response = await axios.get<EditInfoResponse>("http://211.188.53.75:8080/user", {
          headers: {
            token: token,
          },
        });

        // 서버 응답으로부터 취미와 비밀번호를 상태에 설정
        setHobby(response.data.result.hobby);
        setPassword(response.data.result.password);
      } catch (error) {
        setError("정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  // 정보 수정 요청 함수
  async function editMyInfo() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("회원 정보가 없습니다. 다시 입력해 주세요.");
        return;
      }

      await axios.put(
        "http://211.188.53.75:8080/user",
        { hobby, password }, // 수정할 정보 전송
        {
          headers: {
            token: token, // token 헤더 설정
          },
        }
      );

      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 요청에 실패했습니다.", error);
      setError("정보 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <>
      <header>
        <Emptypage />
      </header>
      <div className="editInfo">
        <h2>내 정보 수정하기</h2> 
        {error && <p className="error">{error}</p>}
        <div className="newPassword">
          <h3>새 비밀번호</h3><input type="text" value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="newHobby">
          <h3>새 취미</h3>
          <input type="text" value={hobby || ""} onChange={(e) => setHobby(e.target.value)}/>
          <button onClick={editMyInfo}>수정하기</button>
        </div>
      </div>
    </>
  );
}
