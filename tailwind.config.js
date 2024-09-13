/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			textShadow: {
				sm: "1px 1px 2px rgba(0, 0, 0, 1)",
				md: "2px 2px 4px rgba(0, 0, 0, 1)",
				lg: "3px 3px 6px rgba(0, 0, 0, 1)",
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			const textShadowUtilities = theme("textShadow");
			const textShadowClasses = Object.keys(textShadowUtilities).map((key) => {
				return {
					[`.text-shadow-${key}`]: {
						textShadow: textShadowUtilities[key],
					},
				};
			});
			addUtilities(textShadowClasses, ["responsive", "hover"]);
		},
	],
};
