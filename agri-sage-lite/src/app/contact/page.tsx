'use client'

import React, { useEffect, useRef } from 'react';
import {
        Container,
        Typography,
        Grid,
        Card,
        CardContent,
        Avatar,
        Box,
} from '@mui/material';
import NavBar from '@/components/NavBar';
import { Email, LocationOn, Business, Person } from '@mui/icons-material';
import Footer from '@/components/Footer';

declare global {
        interface Window {
                AMap: any;
        }
}

export default function ContactPage() {
        const mapRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
                const script = document.createElement('script');
                script.src = `https://webapi.amap.com/maps?v=2.0&key=c2f0834060a984952357ea0b4251b6b3`;
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                        if (mapRef.current) {
                                const map = new window.AMap.Map(mapRef.current, {
                                        zoom: 11,
                                        center: [117.16, 36.16],
                                });
                                const marker = new window.AMap.Marker({
                                        position: new window.AMap.LngLat(117.1575, 36.1625),
                                        title: 'AgriSageLite'
                                });
                                map.add(marker);
                        }
                };

                return () => {
                        document.body.removeChild(script);
                };
        }, []);

        return (
                <Container maxWidth="lg">
                        <NavBar />
                        <Box sx={{ mt: 4, mb: 4 }}>
                                <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontFamily: "Noto Serif SC" }}>
                                        联系我们
                                </Typography>
                                <Grid container spacing={2} sx={{ mt: 4 }}>
                                        <Grid item xs={12} md={4}>
                                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                                <Box sx={{ display: 'flex', mb: 2 }}>
                                                                        <Avatar
                                                                                alt="Avatar"
                                                                                src="/static/avatar/jun.webp"
                                                                                sx={{ width: 80, height: 80 }}
                                                                        />
                                                                </Box>
                                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                                        <Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                                                        <Person color="primary" sx={{ mr: 1, fontSize: 28 }} />
                                                                                        <Typography variant="h6" color="primary">PjM & SE: 周子钰</Typography>
                                                                                </Box>
                                                                                <Typography variant="body1">山东农业大学</Typography>
                                                                                <Typography variant="body1">信息科学与工程学院</Typography>
                                                                                <Typography variant="body1">本科生</Typography>
                                                                        </Box>
                                                                        <Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                                                        <Email color="primary" sx={{ mr: 1, fontSize: 28 }} />
                                                                                        <Typography variant="h6" color="primary">Email</Typography>
                                                                                </Box>
                                                                                <Typography variant="body1">zzy040330@ieee.org</Typography>
                                                                                <Typography variant="body1">Jun.Amane@zzy040330.moe</Typography>
                                                                        </Box>
                                                                        <Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                                                        <Business color="primary" sx={{ mr: 1, fontSize: 28 }} />
                                                                                        <Typography variant="h6" color="primary">单位</Typography>
                                                                                </Box>
                                                                                <Typography variant="body1">山东农业大学</Typography>
                                                                                <Typography variant="body1">信息科学与工程学院</Typography>
                                                                        </Box>
                                                                        <Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                                                        <LocationOn color="primary" sx={{ mr: 1, fontSize: 28 }} />
                                                                                        <Typography variant="h6" color="primary">地址</Typography>
                                                                                </Box>
                                                                                <Typography variant="body1">山东农业大学 泮河校区</Typography>
                                                                                <Typography variant="body1">山东省 泰安市 泰山区 泮河大街7号</Typography>
                                                                                <Typography variant="body1">邮编：271017</Typography>
                                                                        </Box>
                                                                </Box>
                                                        </CardContent>
                                                </Card>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                                <Card sx={{ height: '100%' }}>
                                                        <CardContent>
                                                                <Typography variant="h5" component="div" gutterBottom>
                                                                        联系地址
                                                                </Typography>
                                                                <Box ref={mapRef} sx={{ height: 500, width: '100%' }} />
                                                        </CardContent>
                                                </Card>
                                        </Grid>
                                </Grid>
                        </Box>
                        <Footer></Footer>
                </Container>
        );
}


