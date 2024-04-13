function ChildComponent(props) {
  const { name, age } = props;
  return (
    <div>
      <p>나는 자식 컴퍼넌트입니다.</p>
      <p>{name}의 나이는 {age}살 입니다.</p>
    </div>)
};

export default ChildComponent;