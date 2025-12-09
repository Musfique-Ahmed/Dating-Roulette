# Dating Roulette 💘

**Swipe. Gamble. Win the One.**

A mobile-first web game inspired by the "secretary problem" - can you pick the best partner out of 100 random profiles?

![Dating Roulette](https://img.shields.io/badge/Version-1.0-FF3366)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎮 How to Play

1. **Choose your gender** - This determines whether you see male or female profiles
2. **Select difficulty**:
   - **Easy**: Shows tier hints (Top 30%, Mid Tier, Lower Tier)
   - **Normal**: No hints
   - **Hard**: 5-second timer per profile + no hints
3. **Swipe through profiles**:
   - **Swipe Left / Press X**: Reject the profile (can't go back!)
   - **Swipe Right / Press ♥**: Choose this person and end the round
4. **Win by choosing** the profile with the **best rank** (lowest number)

## 🏆 Scoring System

- Each profile has a hidden rank (1-50, where 1 is best)
- Ranks can repeat; not all ranks appear
- You **WIN** if you choose someone with the best available rank
- You **LOSE** if you choose someone with a higher rank, or reject everyone

## 📊 Stats & Seasons

- **Seasons**: Every 5 rounds = 1 season
- **Medals**:
  - 💎 Diamond: 5/5 wins
  - 🥇 Gold: 4/5 wins
  - 🥈 Silver: 3/5 wins
  - 🥉 Bronze: 1-2/5 wins
  - ⬜ Gray: 0/5 wins

Stats tracked:
- Total rounds played
- Wins / Losses / Win rate
- Best streak
- Average chosen rank
- Fastest win (in timer mode)
- Highest difficulty win

## 🎨 Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Romantic Red | `#FF3366` | Primary, buttons |
| Gold | `#FFD166` | Highlights, badges |
| Off-white | `#FFF7F0` | Background |
| Charcoal | `#1C1C1E` | Text |
| Soft Pink | `#FF6B8A` | Accents |

## 📁 File Structure

```
Dating Roulette/
├── claude.html      # Main HTML file
├── styles.css       # All styling
├── script.js        # Game logic
├── README.md        # This file
└── assets/
    └── sounds/      # Sound effects folder
```

## 🚀 Deployment

### Option 1: Local Testing
Simply open `claude.html` in a web browser. That's it!

### Option 2: Netlify
1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Drag and drop the entire `Dating Roulette` folder
3. Done! You'll get a URL like `your-site.netlify.app`

### Option 3: Vercel
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project folder
4. Follow the prompts

### Option 4: GitHub Pages
1. Push to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (main)
4. Your site will be at `username.github.io/repo-name`

## ✨ Customization

### Modify Name Lists
In `script.js`, find the `FEMALE_NAMES` and `MALE_NAMES` arrays:

```javascript
const FEMALE_NAMES = [
    "Ava", "Emma", ...
];

const MALE_NAMES = [
    "Liam", "Noah", ...
];
```

### Add More Bios
Find the `BIOS` array in `script.js`:

```javascript
const BIOS = [
    "Loves music and concerts 🎵",
    "Gym enthusiast 💪",
    ...
];
```

### Change Theme Colors
In `styles.css`, modify the CSS variables:

```css
:root {
    --primary: #FF3366;
    --gold: #FFD166;
    --off-white: #FFF7F0;
    --charcoal: #1C1C1E;
    --soft-pink: #FF6B8A;
}
```

### Adjust Difficulty Settings
In `script.js`, modify these values:
- Timer duration: Search for `gameState.timerRemaining = 5`
- Rank range: Search for `getRandomInt(1, 50)`
- Profile count: Search for `i < 100`

## 🔧 Technical Details

- **No frameworks** - Pure HTML, CSS, JavaScript
- **Mobile-first** responsive design
- **Touch gestures** for swiping
- **Web Audio API** for sound effects
- **localStorage** for persistent stats
- **CSS animations** for smooth transitions

## 💡 Strategy Tips

The game is based on the mathematical "secretary problem":
1. The optimal strategy is to **reject the first ~37%** of profiles
2. Then **accept the next profile** that's better than all previous ones
3. This gives you a ~37% chance of finding the best match

But remember - ranks are hidden, and there can be ties!

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📄 License

MIT License - feel free to modify and share!

---

Made with ❤️ for fun and probability theory!
