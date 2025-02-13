import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#9533EB',
                'primary-light': '#EEDCFF',
            },
            fontFamily: {
                sans: ['Inria Sans'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-hamburgers'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config
