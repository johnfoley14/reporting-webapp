import DataDashboard from "./Dashboard";
import "./App.css";

function App() {
  return (
    <div
      style={{
        paddingTop: "2%",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "2%",
      }}
    >
      <div
        style={{
          border: "3px solid #2d6bcf",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <DataDashboard />
      </div>
    </div>
  );
}

export default App;
