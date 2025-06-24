import { useEffect } from "react";
import { ReelLogic } from "../hooks/reelLogic";
import confetti from "canvas-confetti";

export default function reelUI() {
  const {
    reels,
    isSpinning,
    result,
    playableSymbol,
    spinSoundRef,
    winSoundRef,
    loseSoundRef,
    handleSpin,
    resetGame,
  } = ReelLogic();
  const handlePop = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    if (result === "win") {
      handlePop();
    }
  }, [result]);

  return (
    <div className="background min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4 font-Inter ">
      <audio ref={spinSoundRef} src="/sounds/spin.wav" loop />
      <audio ref={winSoundRef} src="/sounds/win.wav" />
      <audio ref={loseSoundRef} src="/sounds/lose.wav" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-purple-800 mb-2 font-Sancreek">
            Spin & Reveal
          </h1>
          <p className=" text-4xl py-2">{playableSymbol}</p>
          <p className="text-purple-600">Match all three symbols to win!</p>
        </div>
        <div
          className={`relative rounded-3xl p-2  ${
            result === "win"
              ? "bg-gradient-to-r  from-pink-500 via-orange-500 to-green-500 animate-border-spin"
              : ""
          }`}
        >
          <div
            className={`bg-white rounded-2xl p-8 shadow-xl border-4 ${
              result === "win" ? "border-transparent" : "border-purple-400"
            } relative z-10`}
          >
            {/* Reels */}
            <div className="flex justify-center space-x-4 mb-8">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className="w-24 h-32 bg-purple-200 border-4 border-purple-400 rounded-xl overflow-hidden shadow-inner flex items-center justify-center text-6xl transition-transform duration-300"
                >
                  {symbol}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-3">
              {result === "win" ? (
                <>
                  <div
                    onClick={handlePop}
                    className="w-full text-center py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 active:scale-95 mt-4 cursor-pointer"
                  >
                    🎉 Congratulations! 🎉 <br /> You won!
                  </div>
                </>
              ) : (
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all transform active:scale-95 ${
                    isSpinning
                      ? "bg-gray-400 text-gray-200"
                      : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 hover:scale-105"
                  }`}
                >
                  {isSpinning ? "🔁 Evaluating..." : "🎰 SPIN NOW"}
                </button>
              )}
              {result === "win" && (
                <button
                  onClick={resetGame}
                  className="w-full py-2 font-bold text-purple-700 text-lg hover:text-purple-900"
                >
                  Reset Game
                </button>
              )}
              {result === "lose" && (
                <div
                  onClick={resetGame}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white rounded-xl cursor-pointer transition-all duration-300 hover:bg-black/90 overflow-hidden"
                >
                  <div className="text-5xl mb-3 ">❌</div>

                  <div className="text-3xl font-extrabold mb-2 text-center tracking-wide">
                    Better luck next time!
                  </div>

                  <div className="text-lg text-center text-gray-300">
                    Tap anywhere to spin again
                  </div>

                  <div className="mt-6 px-6 py-2 border border-white/20 rounded-full bg-white/10 hover:bg-white/20 transition">
                    Try Again
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
