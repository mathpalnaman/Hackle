// currently running directly with hackle and later will run with maingame
// import mainGame from "./mainGame/page";
// import GameBoard from "../components/GameBoard";
import Hackle from "./Hackle/page";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-extrabold text-5xl font-mono tracking-widest text-center">
        Hackle
        <Hackle/>
      </h1>
    </div>
    // <div>
    //   <Hackle />
    // </div>
  );
}
