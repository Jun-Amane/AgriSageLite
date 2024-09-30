import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { keyframes } from '@mui/system';
import Link from 'next/link';

interface HeroProps {
        setHighlightClassification: React.Dispatch<React.SetStateAction<boolean>>;
        classificationButtonRef: React.RefObject<HTMLButtonElement>;
}

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

interface ArrowIndicatorProps {
        left: number;
}

const ArrowIndicator: React.FC<ArrowIndicatorProps> = ({ left }) => (
        <Box
                sx={{
                        position: 'fixed',
                        top: '70px',
                        left: `${left}px`,
                        zIndex: 1100,
                        animation: `${bounceAnimation} 2s infinite`,
                }}
        >
                <ArrowUpward sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography
                        variant="caption"
                        sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                marginTop: '8px',
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                        }}
                >
                        点击这里开始
                </Typography>
        </Box>
);

export default function Hero({ setHighlightClassification, classificationButtonRef }: HeroProps) {
        const [showArrow, setShowArrow] = React.useState(false);
        const [arrowLeft, setArrowLeft] = React.useState(0);

        const updateArrowPosition = () => {
                if (classificationButtonRef.current) {
                        const rect = classificationButtonRef.current.getBoundingClientRect();
                        setArrowLeft(rect.left + rect.width / 2 - 20);
                }
        };

        React.useEffect(() => {
                updateArrowPosition();
                window.addEventListener('resize', updateArrowPosition);
                return () => {
                        window.removeEventListener('resize', updateArrowPosition);
                };
        }, []);

        const handleExplore = () => {
                setHighlightClassification(true);
                setShowArrow(true);
                updateArrowPosition();

                // Hide the arrow after 5 seconds
                setTimeout(() => {
                        setShowArrow(false);
                        setHighlightClassification(false);
                }, 5000);
        };

        return (
                <Box
                        sx={{
                                width: '100%',
                                backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
                                backgroundRepeat: 'no-repeat',
                                paddingTop: { xs: 14, sm: 20 },
                                paddingBottom: { xs: 8, sm: 12 },
                        }}
                >
                        {showArrow && <ArrowIndicator left={arrowLeft} />}
                        <Container
                                sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                }}
                        >
                                <Stack
                                        spacing={2}
                                        sx={{
                                                alignItems: 'center',
                                                width: { xs: '100%', sm: '70%' },
                                                textAlign: 'center',
                                        }}
                                >
                                        {/* 主标题 */}
                                        <Typography
                                                variant="h1"
                                                sx={{
                                                        fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                                                        fontFamily: 'Noto Serif SC',
                                                        fontWeight: 900,
                                                        lineHeight: 1.2,
                                                        color: 'text.primary',
                                                }}
                                        >
                                                AgriSage {' '}
                                                <Typography
                                                        component="span"
                                                        color="primary"
                                                        sx={{ fontSize: 'inherit', fontFamily: 'inherit' }}
                                                >
                                                        Lite
                                                </Typography>
                                        </Typography>

                                        {/* 副标题 */}
                                        <Typography
                                                variant="h2"
                                                sx={{
                                                        fontSize: { xs: '1rem', sm: '1.5rem', md: '1.75rem' },
                                                        fontWeight: 700,
                                                        fontFamily: 'Noto Serif SC',
                                                        color: 'text.secondary',
                                                        mb: 2,
                                                }}
                                        >
                                                ～轻量级
                                                <Typography
                                                        component="span"
                                                        color="primary"
                                                        sx={{ fontWeight: 800, fontSize: 'inherit', fontFamily: 'inherit' }}
                                                >
                                                        小样本多模态
                                                </Typography>
                                                的
                                                <Typography
                                                        component="span"
                                                        color="primary"
                                                        sx={{ fontWeight: 800, fontSize: 'inherit', fontFamily: 'inherit' }}
                                                >
                                                        泛用
                                                </Typography>
                                                智慧农业
                                                <Typography
                                                        component="span"
                                                        color="primary"
                                                        sx={{ fontWeight: 800, fontSize: 'inherit', fontFamily: 'inherit' }}
                                                >
                                                        解决方案
                                                </Typography>
                                                ～
                                        </Typography>
                                        {/* 描述 */}
                                        <Typography
                                                variant="body1"
                                                sx={{
                                                        color: 'text.secondary',
                                                        width: { sm: '100%', md: '80%' },
                                                }}
                                        >
                                                AgriSageLite是一款革新性的农业分类系统，由自研的先进轻量级多模态深度学习模型Blend-CNN驱动。这种多模态方法不仅提高了模型的识别精度，还增强了系统对复杂农业场景的理解能力。
                                                同时集成了基于农业知识图谱的智能问答模型。用户可以提出各种农业相关问题，系统将利用丰富的知识库提供准确、详细的回答。
                                                作为一款轻量级解决方案，AgriSageLite在保持高精度的同时，大幅降低了内存占用和计算需求。这意味着它能够在各种设备上高效运行，从智能手机到田间的便携设备，都能实现快速、准确的实时分类。

                                        </Typography>
                                        {/* 按钮 */}
                                        <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ width: { xs: '100%', sm: '600px' }, pt: 2, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                                <Link href="/about" passHref>
                                                        <Button
                                                                variant="contained"
                                                                color="primary"
                                                                sx={{ textTransform: 'none' }}
                                                        >
                                                                关于我们
                                                        </Button>
                                                </Link>
                                                <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ textTransform: 'none' }}
                                                        onClick={handleExplore}
                                                >
                                                        开始使用AgriSageLite分类
                                                </Button>
                                                <Link href="/chat" passHref>
                                                        <Button
                                                                variant="contained"
                                                                color="primary"
                                                                sx={{ textTransform: 'none' }}
                                                        >
                                                                开始使用知识图谱问答
                                                        </Button>
                                                </Link>
                                                <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ textTransform: 'none' }}
                                                        component="a"
                                                        href="https://github.com/Jun-Amane/AgriSageLite/wiki"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                >
                                                        需要帮助？
                                                </Button>
                                        </Stack>
                                </Stack>
                        </Container>
                </Box>
        );
}

