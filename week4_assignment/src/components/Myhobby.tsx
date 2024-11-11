import axios from "axios";
import { useState, useEffect } from "react";
import "./Myhobby.css";
import Emptypage from "./Emptypage";

interface HobbyResponse {
  result: {
    hobby: string;
  };
}

export default function MyHobby() {
  const [hobby, setHobby] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otherHobby, setOtherHobby] = useState<string | null>(null);
  const [memberNo, setMemberNo] = useState<string>("");

  useEffect(() => {
    const fetchHobby = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("로그인 정보가 없습니다. 로그인 후 다시 시도해 주세요.");
          return;
        }

        const response = await axios.get<HobbyResponse>("http://211.188.53.75:8080/user/my-hobby", {
          headers: {
            token: token,
          },
        });

        setHobby(response.data.result.hobby);
      } catch (err) {
        console.error("취미 정보를 불러오는 데 실패했습니다.", err);
        setError("취미 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchHobby();
  }, []);

  async function checkOthersHobby() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("회원 정보가 없습니다. 다시 입력해 주세요.");
        return;
      }

      const response = await axios.get(`http://211.188.53.75:8080/user/${memberNo}/hobby`, {
        headers: {
          token: token,
        },
      });

      setOtherHobby(response.data.result.hobby);
    } catch (error) {
      console.error("회원 확인 요청에 실패했습니다.", error);
      alert("회원번호가 올바르지 않습니다.");
      setOtherHobby(null);
    }
  }

  return (
    <>
      <header>
        <Emptypage />
      </header>
      <main className="showHobby">
        <h2>취미</h2>
        <div className="myHobby">
          <h3>나의 취미</h3>
          {error ? <p style={{ color: "red" }}>{error}</p> : <p>{hobby}</p>}
          <h3>다른 사람들의 취미</h3>
        </div>

        <div className="othersHobby">
          <input
            type="text"
            value={memberNo}
            onChange={(e) => setMemberNo(e.target.value)}
            placeholder="회원번호 입력"
          />
          <button onClick={checkOthersHobby}>조회</button>
        </div>
        <div className="showOthersHobby">
          {otherHobby && <p>회원 {memberNo}의 취미: {otherHobby}</p>}
        </div>
      </main>
    </>
  );
}
