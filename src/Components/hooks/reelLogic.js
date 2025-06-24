import { useState, useRef } from "react";

const playableSymbol = ["🍒", "🍊", "🍉"];
const initialValue = ["➖", "➖", "➖"];

export const ReelLogic = () => {
  const [reels, setReels] = useState(initialValue);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTurbo, setIsTurbo] = useState(false);
  const [result, setResult] = useState(null);

  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);

  const getRandomSymbol = () =>
    playableSymbol[Math.floor(Math.random() * playableSymbol.length)];

  const generateOutcome = () =>
    Array(3)
      .fill()
      .map(() => getRandomSymbol());

  const checkWin = (symbols) => symbols.every((s) => s === symbols[0]);

  const resetGame = () => {
    setReels(initialValue);
    setResult(null);
  };

  const toggleTurbo = () => {
    setIsTurbo((prev) => !prev);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const finalOutcome = generateOutcome();

    //  Turbo Mode
    if (isTurbo) {
      setReels(finalOutcome);
      const isWin = checkWin(finalOutcome);
      setTimeout(() => {
        setResult(isWin ? "win" : "lose");
        setIsSpinning(false);
      }, 600);

      if (isWin && winSoundRef.current) winSoundRef.current.play();
      else if (!isWin && loseSoundRef.current) loseSoundRef.current.play();
      return;
    }

    const intervals = [];

    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play();
    }

    for (let i = 0; i < 3; i++) {
      intervals[i] = setInterval(() => {
        setReels((prev) => {
          const updated = [...prev];
          updated[i] = getRandomSymbol();
          return updated;
        });
      }, 80);
    }

    setTimeout(() => {
      clearInterval(intervals[0]);
      setReels((prev) => {
        const updated = [...prev];
        updated[0] = finalOutcome[0];
        return updated;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(intervals[1]);
      setReels((prev) => {
        const updated = [...prev];
        updated[1] = finalOutcome[1];
        return updated;
      });
    }, 1500);

    setTimeout(() => {
      clearInterval(intervals[2]);
      setReels((prev) => {
        const updated = [...prev];
        updated[2] = finalOutcome[2];
        return updated;
      });

      setTimeout(() => {
        const isWin = checkWin(finalOutcome);
        setResult(isWin ? "win" : "lose");
        setIsSpinning(false);

        if (spinSoundRef.current) spinSoundRef.current.pause();
        if (isWin && winSoundRef.current) winSoundRef.current.play();
        if (!isWin && loseSoundRef.current) loseSoundRef.current.play();
      }, 800);
    }, 2000);
  };

  return {
    reels,
    isSpinning,
    result,
    isTurbo,
    toggleTurbo,
    playableSymbol,
    spinSoundRef,
    winSoundRef,
    loseSoundRef,
    handleSpin,
    resetGame,
  };
};
