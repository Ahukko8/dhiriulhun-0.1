/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
    "./app/(tabs)/index.tsx",
  ],
  theme: {
    fontFamily: {
      dhivehi: ["Dhivehi", "sans-serif"],
      arabi: ["Arabi", "sans-serif"],
      dhivehiTitle: [" DhivehiTitle", "sans-serif"],
      dhivehiContent: ["dhivehiContent", "sans-serif"],
      arabNext: ["arabNext"],
      arabQuran: ["arabQuran"],
    },
  },
  plugins: [],
};
