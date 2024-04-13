import React from 'react';

function TimerComponent() {
  const [time, setTime] = React.useState(0);
  console.log('컨포넌트 업데이트');

  // 두번째 case
  React.useEffect(function () {
    setTime(time + 1);
  }, []);

  return (
    <div>
      <h3>{time}초</h3>
      <button>1씩 올려주세요</button>
    </div>
  );

  ////첫번째 case
  // function updateTime() {
  //   setTime(time + 1);
  // }
  // return (
  //   <div>
  //     <h3>{time}초</h3>
  //     <button onClick={updateTime}>1씩 올려주세요</button>
  //   </div>
  // );
}


export default TimerComponent;
