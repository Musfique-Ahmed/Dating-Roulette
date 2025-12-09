/* ============================================
   DATING ROULETTE - GAME LOGIC
   ============================================ */

// ============================================
// CONSTANTS & DATA
// ============================================

const FEMALE_NAMES = [
    "Ava", "Emma", "Olivia", "Sophia", "Mia", "Amelia", "Harper", "Ella", "Abigail", "Emily",
    "Lily", "Grace", "Chloe", "Madison", "Aria", "Scarlett", "Evelyn", "Sofia", "Camila", "Zoe",
    "Hannah", "Nora", "Mila", "Lucy", "Zoey", "Stella", "Natalie", "Leah", "Audrey", "Claire",
    "Eleanor", "Bella", "Savannah", "Penelope", "Hazel", "Victoria", "Riley", "Aurora", "Isla", "Addison",
    "Brooklyn", "Alice", "Lillian", "Caroline", "Elena", "Sarah", "Maya", "Gabriella", "Hailey", "Anna",
    "Kennedy", "Allison", "Violet", "Sadie", "Skylar", "Julia", "Sophie", "Ariana", "Genesis", "Naomi",
    "Taylor", "Peyton", "Quinn", "Lydia", "Madeline", "Eva", "Ruby", "Kylie", "Clara", "Faith",
    "Cora", "Jade", "Maria", "Elise", "Brielle", "Valerie", "Rylee", "Athena", "Adeline", "Josephine",
    "Eliana", "Liliana", "Autumn", "Melody", "Isabelle", "Daisy", "Reese", "London", "Willow", "Eden",
    "Willa", "Hope", "Alina", "Mckenzie", "Michelle", "Katherine", "Phoebe", "Rose", "Ivy", "Layla"
];

const MALE_NAMES = [
    "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Alexander",
    "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan", "Jackson", "Levi", "Sebastian", "Mateo",
    "Jack", "Owen", "Theodore", "Aiden", "Samuel", "Joseph", "John", "David", "Wyatt", "Matthew",
    "Luke", "Asher", "Carter", "Julian", "Grayson", "Leo", "Jayden", "Gabriel", "Isaac", "Lincoln",
    "Anthony", "Hudson", "Dylan", "Ezra", "Thomas", "Charles", "Christopher", "Jaxon", "Maverick", "Josiah",
    "Isaiah", "Andrew", "Elias", "Joshua", "Nathan", "Caleb", "Ryan", "Adrian", "Miles", "Eli",
    "Nolan", "Christian", "Aaron", "Cameron", "Ezekiel", "Colton", "Luca", "Landon", "Hunter", "Jonathan",
    "Santiago", "Axel", "Easton", "Cooper", "Jeremiah", "Angel", "Roman", "Connor", "Jameson", "Robert",
    "Greyson", "Jordan", "Ian", "Carson", "Jaxson", "Adam", "Nicholas", "Dominic", "Austin", "Everett",
    "Brooks", "Xavier", "Kai", "Parker", "Brantley", "Ryder", "Luis", "Max", "Cole", "Blake"
];

const BIOS = [
    "Loves music and concerts 🎵",
    "Gym enthusiast 💪",
    "Tech lover & gamer 🎮",
    "Foodie exploring new cuisines 🍕",
    "Travel addict ✈️",
    "Coffee connoisseur ☕",
    "Dog person 🐕",
    "Cat lover 🐱",
    "Netflix binge-watcher 📺",
    "Bookworm 📚",
    "Adventure seeker 🏔️",
    "Photography enthusiast 📸",
    "Art & creativity lover 🎨",
    "Fitness freak 🏃",
    "Nature lover 🌿",
    "Movie buff 🎬",
    "Sports fan ⚽",
    "Dancing through life 💃",
    "Cooking experiments 👨‍🍳",
    "Wine & dine 🍷",
    "Beach vibes only 🏖️",
    "Hiking on weekends 🥾",
    "Yoga & meditation 🧘",
    "Startup founder 🚀",
    "Creative writer ✍️",
    "Music producer 🎹",
    "Fashionista 👗",
    "Car enthusiast 🚗",
    "Board game night fan 🎲",
    "Karaoke star 🎤",
    "Plant parent 🌱",
    "DIY projects lover 🔧",
    "History buff 🏛️",
    "Astronomy geek 🔭",
    "Podcast addict 🎧",
    "Volunteering on weekends ❤️",
    "Stand-up comedy fan 😂",
    "Sushi lover 🍣",
    "Marathon runner 🏅",
    "Guitar player 🎸"
];

const AVATAR_COLORS = [
    "#FF6B8A", "#FF3366", "#E91E63", "#9C27B0", "#673AB7",
    "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688",
    "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
    "#FF9800", "#FF5722", "#795548", "#607D8B", "#F44336"
];

const MEDALS = {
    diamond: { emoji: "💎", name: "Diamond", wins: 5 },
    gold: { emoji: "🥇", name: "Gold", wins: 4 },
    silver: { emoji: "🥈", name: "Silver", wins: 3 },
    bronze: { emoji: "🥉", name: "Bronze", wins: 1 },
    gray: { emoji: "⬜", name: "No Medal", wins: 0 }
};

// ============================================
// GAME STATE
// ============================================

let gameState = {
    playerGender: null,
    difficulty: 'normal',
    timerMode: false,
    soundEnabled: true,
    profiles: [],
    currentIndex: 0,
    bestRank: null,
    bestProfile: null,
    chosenProfile: null,
    gameStartTime: null,
    roundTime: null,
    timerInterval: null,
    timerRemaining: 5,
    isGameActive: false
};

let stats = {
    totalRounds: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalChosenRanks: 0,
    gamesWithChoice: 0,
    fastestWin: null,
    highestWinDifficulty: null,
    seasonRounds: [],
    medals: {
        diamond: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
        gray: 0
    }
};

// ============================================
// AUDIO SYSTEM
// ============================================

const AudioSystem = {
    context: null,
    
    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    },
    
    play(type) {
        if (!gameState.soundEnabled || !this.context) return;
        
        // Resume context if suspended (browser policy)
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        switch (type) {
            case 'swipeLeft':
                oscillator.frequency.setValueAtTime(200, this.context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + 0.1);
                break;
                
            case 'swipeRight':
                oscillator.frequency.setValueAtTime(400, this.context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 0.15);
                gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + 0.15);
                break;
                
            case 'click':
                oscillator.frequency.setValueAtTime(800, this.context.currentTime);
                gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + 0.05);
                break;
                
            case 'win':
                // Play a cheerful arpeggio
                const winNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                winNotes.forEach((freq, i) => {
                    const osc = this.context.createOscillator();
                    const gain = this.context.createGain();
                    osc.connect(gain);
                    gain.connect(this.context.destination);
                    osc.frequency.setValueAtTime(freq, this.context.currentTime + i * 0.15);
                    gain.gain.setValueAtTime(0.2, this.context.currentTime + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + i * 0.15 + 0.3);
                    osc.start(this.context.currentTime + i * 0.15);
                    osc.stop(this.context.currentTime + i * 0.15 + 0.3);
                });
                break;
                
            case 'lose':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(300, this.context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + 0.5);
                break;
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getInitials(name) {
    return name.charAt(0).toUpperCase();
}

function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)}s`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
}

// ============================================
// PROFILE GENERATION
// ============================================

function generateProfiles() {
    const names = gameState.playerGender === 'male' ? FEMALE_NAMES : MALE_NAMES;
    const shuffledNames = shuffleArray(names);
    const profiles = [];
    
    for (let i = 0; i < 100; i++) {
        const name = shuffledNames[i % shuffledNames.length];
        const rank = getRandomInt(1, 50); // Random rank between 1-50
        const profile = {
            id: i,
            name: name,
            age: getRandomInt(18, 40),
            bio: getRandomElement(BIOS),
            color: getRandomElement(AVATAR_COLORS),
            rank: rank
        };
        profiles.push(profile);
    }
    
    // Find the best rank
    let bestRank = Math.min(...profiles.map(p => p.rank));
    let bestProfile = profiles.find(p => p.rank === bestRank);
    
    gameState.profiles = profiles;
    gameState.bestRank = bestRank;
    gameState.bestProfile = bestProfile;
    gameState.currentIndex = 0;
    
    return profiles;
}

function getHintText(rank) {
    // Calculate percentile based on rank (1 is best, 50 is worst)
    const percentile = (rank / 50) * 100;
    
    if (percentile <= 30) {
        return { text: "Top 30% ⭐", class: "top-tier" };
    } else if (percentile <= 70) {
        return { text: "Mid Tier 👍", class: "mid-tier" };
    } else {
        return { text: "Lower Tier 😬", class: "low-tier" };
    }
}

// ============================================
// SCREEN MANAGEMENT
// ============================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ============================================
// CARD DISPLAY & SWIPE
// ============================================

function displayCurrentProfile() {
    const profile = gameState.profiles[gameState.currentIndex];
    if (!profile) return;
    
    const card = document.getElementById('profile-card');
    const avatar = document.getElementById('avatar');
    const initials = document.getElementById('initials');
    const name = document.getElementById('profile-name');
    const age = document.getElementById('profile-age');
    const bio = document.getElementById('profile-bio');
    const hintBadge = document.getElementById('hint-badge');
    
    // Update avatar
    avatar.style.background = `linear-gradient(135deg, ${profile.color} 0%, ${adjustColor(profile.color, -30)} 100%)`;
    initials.textContent = getInitials(profile.name);
    
    // Update info
    name.textContent = profile.name;
    age.textContent = `Age: ${profile.age}`;
    bio.textContent = profile.bio;
    
    // Handle rank and hint badges based on difficulty
    const rankBadge = document.getElementById('rank-badge');
    
    if (gameState.difficulty === 'easy') {
        // Easy: Show both rank and hint
        rankBadge.textContent = `Rank #${profile.rank}`;
        rankBadge.classList.remove('hidden');
        
        const hint = getHintText(profile.rank);
        hintBadge.textContent = hint.text;
        hintBadge.className = `hint-badge ${hint.class}`;
    } else if (gameState.difficulty === 'normal') {
        // Normal: Show hint only
        rankBadge.classList.add('hidden');
        
        const hint = getHintText(profile.rank);
        hintBadge.textContent = hint.text;
        hintBadge.className = `hint-badge ${hint.class}`;
    } else {
        // Hard: No rank or hint
        rankBadge.classList.add('hidden');
        hintBadge.classList.add('hidden');
    }
    
    // Update progress
    document.getElementById('current-profile').textContent = gameState.currentIndex + 1;
    
    // Reset card state
    card.style.transform = '';
    card.style.transition = '';
    card.classList.remove('swipe-left', 'swipe-right', 'swiping');
    document.querySelector('.swipe-indicator.left').style.opacity = 0;
    document.querySelector('.swipe-indicator.right').style.opacity = 0;
    
    // Start timer if enabled
    if (gameState.timerMode || gameState.difficulty === 'hard') {
        startTimer();
    }
}

function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// ============================================
// SWIPE HANDLING
// ============================================

let touchStartX = 0;
let touchStartY = 0;
let currentX = 0;
let isDragging = false;

function initSwipeHandlers() {
    const card = document.getElementById('profile-card');
    
    // Touch events
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd);
    
    // Mouse events
    card.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Button events
    document.getElementById('reject-btn').addEventListener('click', () => swipeCard('left'));
    document.getElementById('accept-btn').addEventListener('click', () => swipeCard('right'));
}

function handleTouchStart(e) {
    if (!gameState.isGameActive) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
    document.getElementById('profile-card').classList.add('swiping');
}

function handleTouchMove(e) {
    if (!isDragging || !gameState.isGameActive) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;
    
    // Only prevent default if horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
    }
    
    currentX = deltaX;
    updateCardPosition(deltaX);
}

function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const card = document.getElementById('profile-card');
    card.classList.remove('swiping');
    
    if (Math.abs(currentX) > 100) {
        swipeCard(currentX > 0 ? 'right' : 'left');
    } else {
        resetCardPosition();
    }
    
    currentX = 0;
}

function handleMouseDown(e) {
    if (!gameState.isGameActive) return;
    touchStartX = e.clientX;
    isDragging = true;
    document.getElementById('profile-card').classList.add('swiping');
}

function handleMouseMove(e) {
    if (!isDragging || !gameState.isGameActive) return;
    
    const deltaX = e.clientX - touchStartX;
    currentX = deltaX;
    updateCardPosition(deltaX);
}

function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    
    const card = document.getElementById('profile-card');
    card.classList.remove('swiping');
    
    if (Math.abs(currentX) > 100) {
        swipeCard(currentX > 0 ? 'right' : 'left');
    } else {
        resetCardPosition();
    }
    
    currentX = 0;
}

function updateCardPosition(deltaX) {
    const card = document.getElementById('profile-card');
    const rotation = deltaX * 0.1;
    const maxRotation = 15;
    const clampedRotation = Math.max(-maxRotation, Math.min(maxRotation, rotation));
    
    card.style.transform = `translateX(${deltaX}px) rotate(${clampedRotation}deg)`;
    
    // Update swipe indicators
    const leftIndicator = document.querySelector('.swipe-indicator.left');
    const rightIndicator = document.querySelector('.swipe-indicator.right');
    
    if (deltaX < -50) {
        leftIndicator.style.opacity = Math.min(1, Math.abs(deltaX) / 150);
        rightIndicator.style.opacity = 0;
    } else if (deltaX > 50) {
        rightIndicator.style.opacity = Math.min(1, deltaX / 150);
        leftIndicator.style.opacity = 0;
    } else {
        leftIndicator.style.opacity = 0;
        rightIndicator.style.opacity = 0;
    }
}

function resetCardPosition() {
    const card = document.getElementById('profile-card');
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = '';
    
    document.querySelector('.swipe-indicator.left').style.opacity = 0;
    document.querySelector('.swipe-indicator.right').style.opacity = 0;
}

function swipeCard(direction) {
    if (!gameState.isGameActive) return;
    
    stopTimer();
    
    const card = document.getElementById('profile-card');
    card.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
    card.classList.add(`swipe-${direction}`);
    
    if (direction === 'left') {
        AudioSystem.play('swipeLeft');
        // Reject - move to next profile
        setTimeout(() => {
            gameState.currentIndex++;
            
            if (gameState.currentIndex >= 100) {
                // Rejected all profiles - auto lose
                endGame(false, null);
            } else {
                displayCurrentProfile();
            }
        }, 400);
    } else {
        AudioSystem.play('swipeRight');
        // Accept - end game
        const chosenProfile = gameState.profiles[gameState.currentIndex];
        gameState.chosenProfile = chosenProfile;
        
        setTimeout(() => {
            const won = chosenProfile.rank === gameState.bestRank;
            endGame(won, chosenProfile);
        }, 400);
    }
}

// ============================================
// TIMER SYSTEM
// ============================================

function startTimer() {
    stopTimer();
    
    gameState.timerRemaining = 5;
    const timerDisplay = document.getElementById('timer-display');
    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');
    
    timerDisplay.classList.remove('hidden');
    timerBar.style.setProperty('--progress', '100%');
    timerBar.classList.remove('warning');
    
    const startTime = Date.now();
    
    gameState.timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, 5 - elapsed);
        
        gameState.timerRemaining = remaining;
        timerText.textContent = remaining.toFixed(1) + 's';
        
        // Update bar width using CSS custom property
        const progress = (remaining / 5) * 100;
        timerBar.style.width = `${progress}%`;
        
        // Add warning class when low
        if (remaining <= 2) {
            timerBar.classList.add('warning');
        }
        
        if (remaining <= 0) {
            stopTimer();
            // Auto-swipe left
            swipeCard('left');
        }
    }, 100);
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// ============================================
// GAME FLOW
// ============================================

function startGame() {
    gameState.isGameActive = true;
    gameState.gameStartTime = Date.now();
    gameState.chosenProfile = null;
    
    generateProfiles();
    showScreen('game-screen');
    displayCurrentProfile();
    
    // Show/hide timer display
    const timerDisplay = document.getElementById('timer-display');
    if (gameState.timerMode || gameState.difficulty === 'hard') {
        timerDisplay.classList.remove('hidden');
    } else {
        timerDisplay.classList.add('hidden');
    }
}

function endGame(won, chosenProfile) {
    gameState.isGameActive = false;
    stopTimer();
    
    const roundTime = (Date.now() - gameState.gameStartTime) / 1000;
    gameState.roundTime = roundTime;
    
    // Update stats
    stats.totalRounds++;
    
    if (won) {
        stats.wins++;
        stats.currentStreak++;
        stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
        
        // Track fastest win
        if (gameState.timerMode || gameState.difficulty === 'hard') {
            if (!stats.fastestWin || roundTime < stats.fastestWin) {
                stats.fastestWin = roundTime;
            }
        }
        
        // Track highest difficulty win
        const difficultyOrder = { 'easy': 1, 'normal': 2, 'hard': 3 };
        if (!stats.highestWinDifficulty || difficultyOrder[gameState.difficulty] > difficultyOrder[stats.highestWinDifficulty]) {
            stats.highestWinDifficulty = gameState.difficulty;
        }
        
        stats.seasonRounds.push('win');
        showWinScreen(chosenProfile, roundTime);
        AudioSystem.play('win');
    } else {
        stats.losses++;
        stats.currentStreak = 0;
        stats.seasonRounds.push('lose');
        
        showLoseScreen(chosenProfile);
        AudioSystem.play('lose');
    }
    
    // Track average rank if choice was made
    if (chosenProfile) {
        stats.gamesWithChoice++;
        stats.totalChosenRanks += chosenProfile.rank;
    }
    
    // Check for season completion
    if (stats.seasonRounds.length >= 5) {
        setTimeout(() => {
            showSeasonSummary();
        }, 2000);
    }
    
    saveStats();
}

function showWinScreen(profile, roundTime) {
    showScreen('win-screen');
    
    // Update win screen content
    const avatar = document.getElementById('win-avatar');
    avatar.style.background = `linear-gradient(135deg, ${profile.color} 0%, ${adjustColor(profile.color, -30)} 100%)`;
    avatar.querySelector('.initials').textContent = getInitials(profile.name);
    
    document.getElementById('win-name').textContent = profile.name;
    document.getElementById('win-age').textContent = `Age: ${profile.age}`;
    document.getElementById('win-rank').textContent = `#${profile.rank}`;
    document.getElementById('profiles-seen').textContent = gameState.currentIndex + 1;
    document.getElementById('win-time').textContent = formatTime(roundTime);
    
    // Create confetti
    createConfetti();
}

function showLoseScreen(chosenProfile) {
    showScreen('lose-screen');
    
    const loseMessage = document.getElementById('lose-message');
    
    if (chosenProfile) {
        loseMessage.textContent = "You missed the best match!";
        
        // Update your choice
        const loseAvatar = document.getElementById('lose-avatar');
        loseAvatar.style.background = `linear-gradient(135deg, ${chosenProfile.color} 0%, ${adjustColor(chosenProfile.color, -30)} 100%)`;
        loseAvatar.querySelector('.initials').textContent = getInitials(chosenProfile.name);
        document.getElementById('lose-name').textContent = chosenProfile.name;
        document.getElementById('your-rank').textContent = `Rank #${chosenProfile.rank}`;
        
        // Show comparison container
        document.querySelector('.comparison').style.display = 'flex';
    } else {
        loseMessage.textContent = "You rejected everyone! 😱";
        document.querySelector('.comparison').style.display = 'flex';
        
        // Set "You Chose" to None
        const loseAvatar = document.getElementById('lose-avatar');
        loseAvatar.style.background = '#ccc';
        loseAvatar.querySelector('.initials').textContent = '?';
        document.getElementById('lose-name').textContent = 'No one';
        document.getElementById('your-rank').textContent = 'N/A';
    }
    
    // Update best match info
    const bestProfile = gameState.bestProfile;
    const bestAvatar = document.getElementById('best-avatar');
    bestAvatar.style.background = `linear-gradient(135deg, ${bestProfile.color} 0%, ${adjustColor(bestProfile.color, -30)} 100%)`;
    bestAvatar.querySelector('.initials').textContent = getInitials(bestProfile.name);
    document.getElementById('best-name').textContent = bestProfile.name;
    document.getElementById('best-rank').textContent = `Rank #${bestProfile.rank}`;
}

// ============================================
// CONFETTI ANIMATION
// ============================================

function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    
    const colors = ['#FF3366', '#FFD166', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ============================================
// SEASON SYSTEM
// ============================================

function getMedalForWins(wins) {
    if (wins >= 5) return 'diamond';
    if (wins >= 4) return 'gold';
    if (wins >= 3) return 'silver';
    if (wins >= 1) return 'bronze';
    return 'gray';
}

function showSeasonSummary() {
    const wins = stats.seasonRounds.filter(r => r === 'win').length;
    const medalKey = getMedalForWins(wins);
    const medal = MEDALS[medalKey];
    
    // Award medal
    stats.medals[medalKey]++;
    saveStats();
    
    // Update season screen
    document.querySelector('#earned-medal .medal-emoji').textContent = medal.emoji;
    document.querySelector('#earned-medal .medal-title').textContent = medal.name;
    document.getElementById('season-result').textContent = `${wins}/5 Wins`;
    
    // Show rounds recap
    const recapContainer = document.getElementById('rounds-recap');
    recapContainer.innerHTML = stats.seasonRounds.map(result => 
        `<div class="recap-round">${result === 'win' ? '✅' : '❌'}</div>`
    ).join('');
    
    showScreen('season-screen');
}

function startNewSeason() {
    stats.seasonRounds = [];
    saveStats();
    showScreen('menu-screen');
}

// ============================================
// STATS MANAGEMENT
// ============================================

function loadStats() {
    const saved = localStorage.getItem('datingRouletteStats');
    if (saved) {
        const parsed = JSON.parse(saved);
        stats = { ...stats, ...parsed };
    }
}

function saveStats() {
    localStorage.setItem('datingRouletteStats', JSON.stringify(stats));
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
        stats = {
            totalRounds: 0,
            wins: 0,
            losses: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalChosenRanks: 0,
            gamesWithChoice: 0,
            fastestWin: null,
            highestWinDifficulty: null,
            seasonRounds: [],
            medals: {
                diamond: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                gray: 0
            }
        };
        saveStats();
        updateStatsDisplay();
        AudioSystem.play('click');
    }
}

function updateStatsDisplay() {
    document.getElementById('total-rounds').textContent = stats.totalRounds;
    document.getElementById('total-wins').textContent = stats.wins;
    document.getElementById('total-losses').textContent = stats.losses;
    
    const winRate = stats.totalRounds > 0 ? Math.round((stats.wins / stats.totalRounds) * 100) : 0;
    document.getElementById('win-rate').textContent = winRate + '%';
    
    document.getElementById('best-streak').textContent = stats.bestStreak;
    
    const avgRank = stats.gamesWithChoice > 0 
        ? (stats.totalChosenRanks / stats.gamesWithChoice).toFixed(1)
        : '-';
    document.getElementById('avg-rank').textContent = avgRank;
    
    document.getElementById('fastest-win').textContent = stats.fastestWin 
        ? formatTime(stats.fastestWin)
        : '-';
        
    document.getElementById('highest-diff').textContent = stats.highestWinDifficulty 
        ? stats.highestWinDifficulty.charAt(0).toUpperCase() + stats.highestWinDifficulty.slice(1)
        : '-';
    
    // Update season display
    const seasonRoundsContainer = document.getElementById('season-rounds');
    let roundsHtml = '';
    for (let i = 0; i < 5; i++) {
        const result = stats.seasonRounds[i];
        let className = 'season-round';
        let icon = '○';
        if (result === 'win') {
            className += ' win';
            icon = '✓';
        } else if (result === 'lose') {
            className += ' lose';
            icon = '✗';
        }
        roundsHtml += `<div class="${className}">${icon}</div>`;
    }
    seasonRoundsContainer.innerHTML = roundsHtml;
    
    const seasonWins = stats.seasonRounds.filter(r => r === 'win').length;
    document.getElementById('season-wins').textContent = seasonWins;
    
    // Update medals display
    const medalsGrid = document.getElementById('medals-grid');
    medalsGrid.innerHTML = Object.entries(MEDALS).map(([key, medal]) => `
        <div class="medal-item">
            <span class="medal-emoji">${medal.emoji}</span>
            <span class="medal-count">${stats.medals[key]}</span>
        </div>
    `).join('');
}

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================

function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;
    
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        container.appendChild(heart);
    }
}

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================

function initEventListeners() {
    // Splash screen
    document.getElementById('start-btn').addEventListener('click', () => {
        AudioSystem.play('click');
        showScreen('menu-screen');
    });
    
    document.getElementById('stats-btn-splash').addEventListener('click', () => {
        AudioSystem.play('click');
        updateStatsDisplay();
        showScreen('stats-screen');
    });
    
    // Menu screen
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            AudioSystem.play('click');
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.playerGender = btn.dataset.gender;
            checkPlayReady();
        });
    });
    
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            AudioSystem.play('click');
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.difficulty = btn.dataset.difficulty;
            
            // Auto-enable timer for hard mode
            if (gameState.difficulty === 'hard') {
                document.getElementById('timer-toggle').checked = true;
                gameState.timerMode = true;
            }
        });
    });
    
    document.getElementById('timer-toggle').addEventListener('change', (e) => {
        gameState.timerMode = e.target.checked;
    });
    
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        gameState.soundEnabled = e.target.checked;
    });
    
    document.getElementById('play-btn').addEventListener('click', () => {
        AudioSystem.play('click');
        startGame();
    });
    
    document.getElementById('back-to-splash').addEventListener('click', () => {
        AudioSystem.play('click');
        showScreen('splash-screen');
    });
    
    // Game screen
    document.getElementById('quit-game').addEventListener('click', () => {
        AudioSystem.play('click');
        document.getElementById('quit-modal').classList.remove('hidden');
    });
    
    // Quit modal
    document.getElementById('cancel-quit').addEventListener('click', () => {
        AudioSystem.play('click');
        document.getElementById('quit-modal').classList.add('hidden');
    });
    
    document.getElementById('confirm-quit').addEventListener('click', () => {
        AudioSystem.play('click');
        document.getElementById('quit-modal').classList.add('hidden');
        gameState.isGameActive = false;
        stopTimer();
        showScreen('menu-screen');
    });
    
    // Win screen
    document.getElementById('play-again-win').addEventListener('click', () => {
        AudioSystem.play('click');
        startGame();
    });
    
    document.getElementById('view-stats-win').addEventListener('click', () => {
        AudioSystem.play('click');
        updateStatsDisplay();
        showScreen('stats-screen');
    });
    
    document.getElementById('main-menu-win').addEventListener('click', () => {
        AudioSystem.play('click');
        showScreen('menu-screen');
    });
    
    // Lose screen
    document.getElementById('try-again').addEventListener('click', () => {
        AudioSystem.play('click');
        startGame();
    });
    
    document.getElementById('view-stats-lose').addEventListener('click', () => {
        AudioSystem.play('click');
        updateStatsDisplay();
        showScreen('stats-screen');
    });
    
    document.getElementById('main-menu-lose').addEventListener('click', () => {
        AudioSystem.play('click');
        showScreen('menu-screen');
    });
    
    // Stats screen
    document.getElementById('close-stats').addEventListener('click', () => {
        AudioSystem.play('click');
        showScreen('splash-screen');
    });
    
    document.getElementById('reset-stats').addEventListener('click', resetStats);
    
    // Season screen
    document.getElementById('new-season').addEventListener('click', () => {
        AudioSystem.play('click');
        startNewSeason();
    });
    
    document.getElementById('season-to-menu').addEventListener('click', () => {
        AudioSystem.play('click');
        stats.seasonRounds = [];
        saveStats();
        showScreen('menu-screen');
    });
}

function checkPlayReady() {
    const playBtn = document.getElementById('play-btn');
    playBtn.disabled = !gameState.playerGender;
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    AudioSystem.init();
    loadStats();
    createFloatingHearts();
    initEventListeners();
    initSwipeHandlers();
    
    // Set default difficulty
    gameState.difficulty = 'normal';
});

// Prevent pull-to-refresh on mobile
document.body.addEventListener('touchmove', (e) => {
    if (e.target.closest('.profile-card')) {
        // Allow horizontal swipes on the card
    }
}, { passive: false });
