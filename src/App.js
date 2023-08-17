import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [checked, setChecked] = useState(false);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const logsFromStorage = localStorage.getItem("log");
    if (!logsFromStorage) {
      console.log("no logs in log");
    } else {
      setLogs(JSON.parse(logsFromStorage));
    }
  }, [logs]);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const log = Object.fromEntries(data);
    const existingLogs = JSON.parse(localStorage.getItem("log")) || [];
    const newLog = [log, ...existingLogs];
    localStorage.setItem("log", JSON.stringify(newLog));
  };
  return (
    <>
      <h1>The Log Log</h1>
      <form onSubmit={onSubmit}>
        <div className="flex">
          <div className="item">
            <label htmlFor="date">Date and time</label>
            <input name="date" type="datetime-local" />
          </div>

          <div className="item">
            <label htmlFor="size">Size</label>
            <input type="range" name="size" />
          </div>

          <div className="item">
            <label htmlFor="color">Color</label>
            <input name="color" type="color" />
          </div>

          <div className="item">
            <label htmlFor="corn">{checked ? "No corn" : "Corn"}</label>
            <input
              type="checkbox"
              name="corn"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
        </div>
        <input type="submit" value="Log your log" />
      </form>
      <h1>Past logs</h1>
      {logs.map((log) => (
        <>
          <p>Log dated: {new Date(log.date).toDateString()}</p>
          <ul>
            <li>Size: {(log.size / 100) * 100}% of toilet bowl</li>
            <li>
              Corn status: {log.corn ? "Corn present" : "No corn present"}
            </li>
            <li>Color: {log.color}</li>
          </ul>
        </>
      ))}
    </>
  );
};

export default App;
