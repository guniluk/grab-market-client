// import logo from './logo.svg';
import './App.css';
import ChildComponent from './child.js';
import Test from './test2.js';
import TimerComponent from './timer.js';

function App() {
  let name = ["name1", "name2"];
  const num = [100, 200];

  return (
    <div>
      <ChildComponent name={name[0]} age={num[0]} />
      <ChildComponent name={name[1]} age={num[1]} />
      <Test />
      <TimerComponent />
    </div>
  );
}



export default App;
