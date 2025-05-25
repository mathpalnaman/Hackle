// currently running directly with hackle and later will run with maingame
// import mainGame from "./mainGame/page";
// import GameBoard from "../components/GameBoard";
import Hackle from "./Hackle/page";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <h1 className="font-mono text-6xl font-bold text-center mb-8 text-blue-400">
        Hackle
      </h1>
      <div className="flex-1 flex items-center justify-center">
        <Hackle />
      </div>
    </main>
    // <div>
    //   <Hackle />
    // </div>
  );
}
