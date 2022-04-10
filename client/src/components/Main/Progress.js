import "./Progress.css";

function Progress({ length, handleChangeDate }) {
  const coloredDays = [];
  const restDays = [];
  for (let i = 0; i <= length; i++) {
    coloredDays.push(i + 1);
  }
  for (let i = length + 2; i < 100; i++) {
    restDays.push(i);
  }
  return (
    <div className="progress">
      {coloredDays.map((day, i) => (
        <div
          key={i}
          className="colored_day"
          id={day}
          onClick={handleChangeDate}
        ></div>
      ))}
      {restDays.map((day, i) => (
        <div
          key={i}
          className="rest_day"
          id={day}
          onClick={handleChangeDate}
        ></div>
      ))}
    </div>
  );
}

export default Progress;
