# Spin & Reveal 🎰

## 🛠️Project setup steps

1. Create a Copy of the code on your local device either by downloading the code in `zip` or by `git clone`
2. open the folder inside **VS Code**
3. Open **Terminal** and Run `npm i` or `npm install` ( it will install all the necessary packages to run the file )

---

## 📔Description of how logic works

### 🎰 Reel Logic Overview

The `ReelLogic` hook controls the core functionality of the slot machine game, including the spinning animation, symbol generation, win/lose logic, and sound management. Here's a breakdown of how it works:

#### 🔄 Spin Mechanism

- When the **Spin** button is pressed, it first checks if a spin is already in progress to prevent overlapping actions.
- A **random final outcome** (3 symbols) is generated at the start of the spin.
- Each of the three reels starts spinning individually by updating to random symbols every 80ms.
- Reels stop one after another with delays:
  - Reel 1 stops after **1 second**,
  - Reel 2 after **1.5 seconds**,
  - Reel 3 after **2 seconds**.

#### 🧠 Game Logic

- Once all reels stop, the game checks if all three symbols match.
- If they match, the result is a **win**. Otherwise, it's a **loss**.
- The appropriate sound effect (win or lose) plays after spinning stops.

#### 🔊 Sound Effects

- Spin sound plays at the start and stops when all reels finish.
- Win/Lose sound plays based on the result.
- Sound is controlled via `useRef()` references to `<audio>` elements.

#### 🔁 Reset Function

- Resets the game to its initial state with placeholder symbols and no result.

#### 🧩 Used Features

- Built using **React Hooks**: `useState` for state management and `useRef` for sound control.

---

## 🪄Command to make this work.

1. To Run the Code locally type `npm run dev` in **Terminal**
2. Open http://localhost:3000/ on any Browser to check the working code

---

## 💻 Technology Used

- React on [Vite](https://vite.dev/)
- [TailwindCss](https://tailwindcss.com/)

---

### 🔗[Live Link](https://spin-reveal-wheat.vercel.app/)
