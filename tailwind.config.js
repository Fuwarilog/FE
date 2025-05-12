/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'hover:bg-gray-100',
    'bg-gray-300', 'text-black', 'font-bold', 'rounded-full'
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['"Pretendard"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
