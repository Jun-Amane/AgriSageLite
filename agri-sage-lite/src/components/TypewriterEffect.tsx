import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

interface TypewriterEffectProps {
        text: string;
        delay?: number;
        onComplete?: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay = 50, onComplete }) => {
        const [displayedText, setDisplayedText] = useState('');

        useEffect(() => {
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
        }, [text, delay, onComplete]);

        return <Typography>{displayedText}</Typography>;
};

export default TypewriterEffect;

