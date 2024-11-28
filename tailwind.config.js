/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // This is where the magic happens - we map each font-weight class
      // to its corresponding font family
      fontFamily: {
        sans: ["Bricolage"], // Default weight (Regular)
        light: ["Bricolage-Light"],
        medium: ["Bricolage-Medium"],
        semibold: ["Bricolage-SemiBold"],
        bold: ["Bricolage-Bold"],
      },
      // This creates the connection between font-weight utilities and actual font files
      fontWeight: {
        light: {
          value: "300",
          fontFamily: "Bricolage-Light",
        },
        normal: {
          value: "400",
          fontFamily: "Bricolage",
        },
        medium: {
          value: "500",
          fontFamily: "Bricolage-Medium",
        },
        semibold: {
          value: "600",
          fontFamily: "Bricolage-SemiBold",
        },
        bold: {
          value: "700",
          fontFamily: "Bricolage-Bold",
        },
      },
    },
  },
  plugins: [],
};
