import "./Emptypage.css";
import { useNavigate } from "react-router-dom";

export default function Emptypage() {
  const navigate = useNavigate(); // useNavigate 훅을 통해 navigate 함수 가져오기

  function goToMyhobby() {
    navigate("/myhobby"); 
  }
  function goToMyinfo() {
    navigate("/myinfo"); 
  }
  function Logout() { {
        localStorage.removeItem("token");
        alert("로그아웃되었습니다.");
        navigate("/login");
      }
  }

  return (
    <>
      <header>
        <h3 className="myPage">마이페이지</h3>
        <h3 className="myhobby" onClick={goToMyhobby}>취미</h3>
        <h3 className="myInfo" onClick={goToMyinfo}>내 정보</h3>
        <div className="LogOut">
          <h3 onClick={Logout}>로그아웃</h3>
        </div>
      </header>
    </>
  );
}
