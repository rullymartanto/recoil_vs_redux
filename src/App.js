import RecoilDemo from "./RecoilDemo";
import ReduxDemo from "./ReduxDemo";
import RecoilTodoDemo from "./RecoilTodoDemo";
export default function App() {
  return (
    <div className="App">
      <h2>Using Recoil</h2>
      <RecoilTodoDemo />
      <h2>Using Recoil</h2>
      <RecoilDemo />
      <hr />
      <h2>Using Redux</h2>
      <ReduxDemo />
    </div>
  );
}
