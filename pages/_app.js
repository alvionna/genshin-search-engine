import '../styles/global.css';
import { Inter, Imbue } from 'next/font/google';
 
export const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});
 
export const imbue = Imbue({
    variable: '--font-imbue',
    subsets: ['latin'],
    display: 'swap',
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{
            `html {
            font-family: ${inter.style.fontFamily};
            }
            h1, h2, h3, h4, h5, h6 { 
                font-family: ${imbue.style.fontFamily};
                font-size: 30px;
                letter-spacing: 0.1rem;
                margin-top: 2px;
            }
            `
            }
            </style>
            <Component {...pageProps} />
        </>
    );
}