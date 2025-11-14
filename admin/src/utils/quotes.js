// 🧠 For Beginners Just Starting Out
const beginnerQuotes = [
  "Every line of code you write is a vote for the programmer you’re becoming.",
  "You don’t need to be great to start, but you need to start to be great.",
  "The first bug you fix teaches more than a hundred tutorials.",
  "LeetCode isn’t a test of intelligence — it’s a training ground for resilience."
];

// 🔄 For Those Who Started but Struggle with Consistency
const consistencyQuotes = [
  "Consistency isn’t a trait — it’s a decision you make every day.",
  "You’re not behind. You’re just one solved problem away from momentum.",
  "The best programmers aren’t the ones who never stop — they’re the ones who always restart.",
  "Thinking 'I’m not consistent' is the first sign you care enough to change."
];

// 🌅 Morning Quotes
const morningQuotes = [
  "Solve one problem before the world wakes up — and you’ve already won the day.",
  "Today’s bugs are tomorrow’s breakthroughs.",
  "The morning mind is fresh — feed it a challenge.",
  "Start your day with logic — the rest will follow.",
  "One solved problem before breakfast is a silent victory."
];

// 🌞 Afternoon Quotes
const afternoonQuotes = [
  "Midday is for momentum — keep the streak alive.",
  "A single solved problem can turn a slow afternoon into a productive one.",
  "Don’t wait for motivation — debug your way into it.",
  "Your future self is cheering for the effort you put in now.",
  "The best use of a break? Solving what you couldn’t in the morning."
];

// 🌇 Evening Quotes
const eveningQuotes = [
  "Even one solved problem is progress. Stack them like commits — they add up.",
  "You didn’t quit today. That’s a win worth logging.",
  "The day ends, but your growth doesn’t. Sleep like someone who leveled up.",
  "Reflect, refactor, and rest — tomorrow’s code will be cleaner.",
  "Evening effort builds morning confidence."
];

// 🌙 Night Quotes
const nightQuotes = [
  "Late-night logic is where breakthroughs are born.",
  "The quiet hours are perfect for quiet wins.",
  "You’re not behind — you’re building in silence.",
  "Night sessions aren’t about grinding — they’re about growing.",
  "Code now, dream in algorithms."
];

// 🔁 For Restarting After a Break
const restartQuotes = [
  "You’re not starting over — you’re starting wiser.",
  "The break wasn’t failure. It was fuel.",
  "Restarting isn’t weakness. It’s proof you still believe in yourself."
];

export function selectQuote(user) {
  const time = getTimeOfDay();

  // Map time to corresponding quote array
  const timeQuotesMap = {
    Morning: morningQuotes,
    Afternoon: afternoonQuotes,
    Evening: eveningQuotes,
    Night: nightQuotes
  };

  // Get quotes based on time
  const timeQuotes = timeQuotesMap[time] || [];

  // Add consistency quotes if user is consistent
  const isConsistent = user.streakCount > 3;
  const combinedQuotes = isConsistent ? [...timeQuotes, ...consistencyQuotes] : timeQuotes;

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * combinedQuotes.length);
  return combinedQuotes[randomIndex];
}

function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Evening";
  } else {
    return "Night";
  }
}
