'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { lightGreen, lime } from '@mui/material/colors';
import "@fontsource/noto-sans-sc"
import "@fontsource/noto-serif-sc"

const roboto = Roboto({
        weight: ['300', '400', '500', '700'],
        subsets: ['latin'],
        display: 'swap',
});

const theme = createTheme({

        // palette: {
        //         mode: 'light',
        //         primary: {
        //                 light: lightGreen[300],
        //                 main: lightGreen[500],
        //                 dark: lightGreen[800],
        //                 contrastText: '#000',
        //         },
        //         secondary: {
        //                 light: lime[300],
        //                 main: lime[500],
        //                 dark: lime[800],
        //                 contrastText: '#fff',
        //         },
        // },
        palette: {
                mode: 'light',

        },
        typography: {
                // fontFamily: roboto.style.fontFamily,
                fontFamily: ["Noto Sans SC", "Noto Serif SC", "sans-serif"].join(','),
                h1: {
                        fontWeight: 700,
                },
                h2: {
                        fontWeight: 700,
                },
                h3: {
                        fontWeight: 700,
                },
                h4: {
                        fontWeight: 700,
                },
                h5: {
                        fontWeight: 700,
                },
                h6: {
                        fontWeight: 700,
                },
        },
        components: {
                MuiAlert: {
                        styleOverrides: {
                                root: ({ ownerState }) => ({
                                        ...(ownerState.severity === 'info' && {
                                                backgroundColor: '#60a5fa',
                                        }),
                                }),
                        },
                },
        },
});

export default theme;
