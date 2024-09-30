'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import LogoCollection from "@/components/LogoCollection";
import Features from "@/components/Features";
import Highlights from '@/components/Highlights';
import Divider from "@mui/material/Divider";
import OurTeam from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import DatasetShowcase from "@/components/DatasetShowcase";

export default function Home() {
        const [highlightClassification, setHighlightClassification] = React.useState(false);
        const classificationButtonRef = React.useRef<HTMLButtonElement>(null);

        return (
                <Container sx={{ maxWidth: '100%' }} maxWidth={false} disableGutters>
                        {/* WARN: GNU GPLv3 License */}
                        <NavBar
                                highlightClassification={highlightClassification}
                                setHighlightClassification={setHighlightClassification}
                                classificationButtonRef={classificationButtonRef}
                        />
                        <Hero setHighlightClassification={setHighlightClassification} classificationButtonRef={classificationButtonRef} />
                        <LogoCollection></LogoCollection>
                        <Features></Features>
                        <Divider></Divider>
                        <OurTeam></OurTeam>
                        <Highlights></Highlights>
                        <DatasetShowcase></DatasetShowcase>
                        <FAQ></FAQ>
                        <Footer></Footer>
                </Container>
        );
}




