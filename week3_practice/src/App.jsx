import './App.css'
import Card from './components/Card'
import {members} from "./data";

function App() {
  const member = {
    name: "강민하",
    englishname: "MinHaKang",
    github: "m2na7"
  };

  return (
    <>
    <Card member ={member}/>
    </>
  );
}

export default App;
