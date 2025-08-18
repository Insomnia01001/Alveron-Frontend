/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html", // rootdagi barcha html fayllar
        "./**/*.html", // barcha papkalardagi html fayllar
        "./**/*.js", // barcha js fayllar (agar ishlatayotgan bo‘lsangiz)
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};