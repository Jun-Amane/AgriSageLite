import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

function Copyright() {
        return (
                <div>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                {'Copyright © AgriSageLite Committee '}
                                {new Date().getFullYear()}
                                {'. Designed by Ziyu Zhou in Tai\'an'}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                {'A part of '}
                                <Link color="text.secondary" href="https://github.com/Jun-Amane/AgriSageLite">
                                        AgriSageLite
                                </Link>
                                {' project. Open-sourced under '}
                                <Link color="text.secondary" href="https://github.com/Jun-Amane/AgriSageLite/blob/master/LICENSE">
                                        GNU GPLv3 License
                                </Link>
                                {'.'}
                        </Typography>
                </div>
        );
}

export default function Footer() {
        return (
                <Container
                        sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: { xs: 4, sm: 8 },
                                py: { xs: 8, sm: 10 },
                                textAlign: { sm: 'center', md: 'left' },
                        }}
                >

                        <Box
                                sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        pt: { xs: 4, sm: 8 },
                                        width: '100%',
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                }}
                        >
                                <div>
                                        { /* TODO: On github wiki */}
                                        <Link color="text.secondary" variant="body2" href="https://github.com/Jun-Amane/AgriSageLite/blob/master/LICENSE">
                                                开源许可
                                        </Link>
                                        <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                                                &nbsp;•&nbsp;
                                        </Typography>
                                        <Link color="text.secondary" variant="body2" href="https://github.com/Jun-Amane/AgriSageLite/wiki">
                                                隐私条款
                                        </Link>
                                        <Copyright />
                                </div>
                                <Stack
                                        direction="row"
                                        spacing={1}
                                        useFlexGap
                                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                                >
                                        { /* TODO: Here, SDAU logo */}
                                        <IconButton
                                                color="inherit"
                                                size="small"
                                                href="https://github.com/Jun-Amane/AgriSageLite"
                                                aria-label="GitHub"
                                                sx={{ alignSelf: 'center' }}
                                        >
                                                <FacebookIcon />
                                        </IconButton>
                                </Stack>
                        </Box>
                </Container>
        );
}
