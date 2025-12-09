# Dating Roulette 💘

> **Swipe. Gamble. Win the One.**

A fun, mobile-first dating simulation game based on the famous "Secretary Problem" from probability theory. Can you find the best match out of 100 profiles?

## 🎮 Play Now

**[Play Dating Roulette](https://musfique-ahmed.github.io/FunProjects/dating-roulette/)**

## 📖 How to Play

1. **Select your gender** (Male or Female)
2. **Choose difficulty level**
3. **Swipe through 100 profiles** - each has a hidden rank (1-50)
4. **Swipe Left (✕)** = Reject and move to next
5. **Swipe Right (♥)** = Choose this person!
6. **Win** if you pick someone with the **best rank** in the deck

⚠️ Once you reject someone, you can't go back!

## 🎯 Difficulty Levels

| Level | Rank Shown | Hint Shown | Timer |
|-------|------------|------------|-------|
| **Easy** | ✅ Yes | ✅ Yes | ❌ No |
| **Normal** | ❌ No | ✅ Yes | ❌ No |
| **Hard** | ❌ No | ❌ No | ⏱️ 5 seconds |

**Hints:** Top 30% ⭐ | Mid Tier 👍 | Lower Tier 😬

## 🏆 Season System

- Play **5 rounds** to complete a season
- Earn medals based on wins:

| Medal | Requirement |
|-------|-------------|
| 💎 Diamond | 5/5 wins |
| 🥇 Gold | 4/5 wins |
| 🥈 Silver | 3/5 wins |
| 🥉 Bronze | 1-2/5 wins |
| ⬜ Gray | 0/5 wins |

## 📊 Stats Tracked

- Total rounds played
- Wins / Losses / Win rate
- Best win streak
- Average chosen rank
- Fastest win (timer mode)
- Medal collection

## 🧠 The Strategy

This game is based on the **optimal stopping theory**:

1. **Reject the first ~37 profiles** (just observe)
2. **Accept the next profile** that's better than all you've seen
3. This gives you a **~37% chance** of finding the best match!

But remember - ranks can repeat and you never know the actual numbers in hard mode!

## 🛠️ Tech Stack

- Pure HTML, CSS, JavaScript
- No frameworks or dependencies
- Mobile-first responsive design
- LocalStorage for stats persistence
- Web Audio API for sound effects

## 📁 Project Structure

```
dating-roulette/
├── index.html    # Main game file
├── styles.css    # All styling
├── script.js     # Game logic
└── README.md     # This file
```

## 🚀 Run Locally

Just open `index.html` in any browser. No server needed!

## 📄 License

MIT - Feel free to fork and modify!

---

Made with ❤️ by [Musfique Ahmed](https://github.com/Musfique-Ahmed)
