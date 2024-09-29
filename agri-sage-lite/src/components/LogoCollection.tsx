import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface LogoInfo {
        src: string;
        name: string;
}

const logos: LogoInfo[] = [
        { src: '/static/logo_coll/gnu.png', name: 'GNU' },
        { src: '/static/logo_coll/linux.png', name: 'Linux' },
        // TODO: Relace with MariaDB?
        { src: '/static/logo_coll/mysql.png', name: 'MySQL' },
        { src: '/static/logo_coll/node.png', name: 'Node.js' },
        { src: '/static/logo_coll/python.png', name: 'Python' },
        { src: '/static/logo_coll/react.png', name: 'React' },
];

const logoStyle = {
        width: '60px',
        height: '60px',
        margin: '0 16px',
        opacity: 0.7,
};

export default function LogoCollection() {
        return (
                <Box id="logoCollection" sx={{ py: 4 }}>
                        <Typography
                                component="p"
                                variant="subtitle2"
                                align="center"
                                sx={{ color: 'text.secondary' }}
                        >
                                基于自由及开源软件构建
                        </Typography>
                        <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
                                {logos.map((logo, index) => (
                                        <Grid item key={index} sx={{ textAlign: 'center', m: 2 }}>
                                                <img
                                                        src={logo.src}
                                                        alt={`${logo.name} logo`}
                                                        style={logoStyle}
                                                />
                                                <Typography
                                                        variant="caption"
                                                        sx={{ display: 'block', mt: 1 }}
                                                >
                                                        {logo.name}
                                                </Typography>
                                        </Grid>
                                ))}
                        </Grid>
                </Box>
        );
}

