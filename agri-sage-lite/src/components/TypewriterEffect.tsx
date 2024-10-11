import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

interface TypewriterEffectProps {
        text: string;
        onComplete?: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, onComplete }) => {
        const [displayedText, setDisplayedText] = useState('');

        const calculateDelay = (textLength: number): number => {
                const baseDelay = 50;
                const minDelay = 10;
                const longMessageThreshold = 100;

                if (textLength <= longMessageThreshold) {
                        return baseDelay;
                } else {
                        const reducedDelay = baseDelay * (longMessageThreshold / textLength);
                        return Math.max(reducedDelay, minDelay);
                }
        };

        useEffect(() => {
                const delay = calculateDelay(text.length);
                let i = 0;
                const timer = setInterval(() => {
                        if (i < text.length) {
                                setDisplayedText((prev) => prev + text.charAt(i));
                                i++;
                        } else {
                                clearInterval(timer);
                                if (onComplete) onComplete();
                        }
                }, delay);

                return () => clearInterval(timer);
        }, [text, onComplete]);

        return <Typography>{displayedText}</Typography>;
};

export default TypewriterEffect;


