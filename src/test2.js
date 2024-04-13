// import logo from './logo.svg';
import './App.css';

function Test() {
  let text = "힘내자 다왔다. 아자아자아자!!";
  let a = 30;
  let b = 30 - a;
  const sayGoodby = function () {
    return <h4>그동안 수고하셨습니다.</h4>
  };
  const sayHello = function () {
    alert('say goodby to me!!');
  };
  return (
    <div>
      <h1>안녕하세요 백영하입니다.</h1>
      <h3>{text}</h3>
      <h4>b의 값은 {b}입니다.</h4>
      {sayGoodby()}
      <div onClick={sayHello}>클릭해 주세요</div>
    </div>
  );
}



export default Test;
