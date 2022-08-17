const fewDeaths = [
  'AAAAAAAAAAAAHHHHHHHHHHHH!!!!!!!!!!',
  'Fortunately for you, you have infinite lives.',
  "🤬🤬🤬🤬🤬",
  'Initiating reincarnation.',
  "Oops. Don't do that.",
  'spikes = ouchie mama',
  "Tip: Don't die.",
  'Ya dead.',
  "You're supposed to stay alive.",
];

const manyDeaths = [
  'Do you want me on your side when robots take over?',
  'I tried to make this game easy.',
  'Infinite lives is a gift, not a challenge.',
  'Lives: 1',
  'Masochist identified.',
  'Seriously, no more lives.',
];

const comments = [...fewDeaths, ...manyDeaths];

export default () => comments[Math.floor(Math.random() * comments.length)];
