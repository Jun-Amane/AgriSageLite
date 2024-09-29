'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const items = [
        {
                icon: <Avatar src="/static/features/wheat.png" alt="小麦病虫害识别" sx={{ width: 24, height: 24 }} />,
                title: '智能小麦病虫害诊断',
                description: '利用先进的图像识别技术，快速准确地识别和诊断小麦病虫害，为农户提供及时的防治建议，有效提高作物产量和质量。',
                imageLight: 'url("/static/IMG_1824.png")',
                imageDark: 'url("/static/IMG_1824.png")',
        },
        {
                icon: <Avatar src="/static/features/flower.png" alt="花卉品种识别" sx={{ width: 24, height: 24 }} />,
                title: '精准花卉品种鉴定',
                description: '融合图像分析和深度学习算法，实现快速、准确的花卉品种识别，助力园艺爱好者和专业人士更好地了解和管理植物。',
                imageLight: 'url("/static/IMG_1454.JPG")',
                imageDark: 'url("/static/IMG_1454.JPG")',
        },
        {
                icon: <Avatar src="/static/features/bird.png" alt="鸟类物种识别" sx={{ width: 24, height: 24 }} />,
                title: '高效鸟类物种识别',
                description: '结合多模态分析技术，精确识别各种鸟类物种，为生态研究、野生动物保护和观鸟爱好者提供专业的辅助工具。',
                imageLight: 'url("/static/Indigo_Bunting_0002_12163.jpg")',
                imageDark: 'url("/static/Indigo_Bunting_0002_12163.jpg")',
        },
];

const getChipSx = (selected: boolean): SxProps<Theme> => (theme: Theme) => ({
        ...(selected && {
                background: 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
                color: 'hsl(0, 0%, 100%)',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
                '& .MuiChip-label': {
                        color: 'hsl(0, 0%, 100%)',
                },
        }),
});

interface MobileLayoutProps {
        selectedItemIndex: number;
        handleItemClick: (index: number) => void;
        selectedFeature: (typeof items)[0];
}

function MobileLayout({
        selectedItemIndex,
        handleItemClick,
        selectedFeature,
}: MobileLayoutProps) {
        if (!items[selectedItemIndex]) {
                return null;
        }

        return (
                <Box
                        sx={{
                                display: { xs: 'flex', sm: 'none' },
                                flexDirection: 'column',
                                gap: 2,
                        }}
                >
                        <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                                {items.map(({ title }, index) => (
                                        <Chip
                                                size="medium"
                                                key={index}
                                                label={title}
                                                onClick={() => handleItemClick(index)}
                                                sx={getChipSx(selectedItemIndex === index)}
                                        />
                                ))}
                        </Box>
                        <Card variant="outlined">
                                <Box
                                        sx={{
                                                mb: 2,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                minHeight: 280,
                                                backgroundImage: items[selectedItemIndex].imageLight,
                                        }}
                                />
                                <Box sx={{ px: 2, pb: 2 }}>
                                        <Typography
                                                gutterBottom
                                                sx={{ color: 'text.primary', fontWeight: 'medium' }}
                                        >
                                                {selectedFeature.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                                                {selectedFeature.description}
                                        </Typography>
                                </Box>
                        </Card>
                </Box>
        );
}

export default function Features() {
        const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

        const handleItemClick = (index: number) => {
                setSelectedItemIndex(index);
        };

        const selectedFeature = items[selectedItemIndex];

        return (
                <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
                        <Box sx={{ width: { sm: '100%', md: '60%' } }}>
                                <Typography
                                        component="h2"
                                        variant="h4"
                                        gutterBottom
                                        sx={{ color: 'text.primary' }}
                                >
                                        核心功能
                                </Typography>
                                <Typography
                                        variant="body1"
                                        sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
                                >
                                        AgriSageLite是一款革命性的智慧农业解决方案，巧妙融合了尖端人工智能技术与深厚的农业专业知识。我们的系统运用自己研发的Blend-CNN轻量级多模态深度学习分类模型，能够精准识别小麦病虫害、鉴定花卉品种并辨识鸟类，为现代农业生产和生态保护提供全方位的智能支持。通过创新的轻量级设计，AgriSageLite不仅保证了高效率和准确性，还为边缘设备的适配提供了支持。我们致力于推动农业数字化转型，为可持续发展、生物多样性保护和精准农业管理贡献力量。
                                </Typography>
                        </Box>
                        <Box
                                sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row-reverse' },
                                        gap: 2,
                                }}
                        >
                                <div>
                                        <Box
                                                sx={{
                                                        display: { xs: 'none', sm: 'flex' },
                                                        flexDirection: 'column',
                                                        gap: 2,
                                                        height: '100%',
                                                }}
                                        >
                                                {items.map(({ icon, title, description }, index) => (
                                                        <Box
                                                                key={index}
                                                                component={Button}
                                                                onClick={() => handleItemClick(index)}
                                                                sx={(theme) => ({
                                                                        p: 2,
                                                                        height: '100%',
                                                                        width: '100%',
                                                                        '&:hover': {
                                                                                backgroundColor: theme.palette.action.hover,
                                                                        },
                                                                        ...(selectedItemIndex === index && {
                                                                                backgroundColor: theme.palette.action.selected,
                                                                        }),
                                                                })}
                                                        >
                                                                <Box
                                                                        sx={{
                                                                                width: '100%',
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'left',
                                                                                gap: 1,
                                                                                textAlign: 'left',
                                                                                textTransform: 'none',
                                                                                color: selectedItemIndex === index ? 'text.primary' : 'text.secondary',
                                                                        }}
                                                                >
                                                                        {icon}
                                                                        <Typography variant="h6">{title}</Typography>
                                                                        <Typography variant="body2">{description}</Typography>
                                                                </Box>
                                                        </Box>
                                                ))}
                                        </Box>
                                        <MobileLayout
                                                selectedItemIndex={selectedItemIndex}
                                                handleItemClick={handleItemClick}
                                                selectedFeature={selectedFeature}
                                        />
                                </div>
                                <Box
                                        sx={{
                                                display: { xs: 'none', sm: 'flex' },
                                                width: { xs: '100%', md: '70%' },
                                                height: 'var(--items-image-height)',
                                        }}
                                >
                                        <Card
                                                variant="outlined"
                                                sx={{
                                                        height: '100%',
                                                        width: '100%',
                                                        display: { xs: 'none', sm: 'flex' },
                                                        pointerEvents: 'none',
                                                        overflow: 'hidden',
                                                }}
                                        >
                                                <Box
                                                        sx={(theme) => ({
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                backgroundRepeat: 'no-repeat',
                                                                backgroundImage: theme.palette.mode === 'dark' ? items[selectedItemIndex].imageDark : items[selectedItemIndex].imageLight,
                                                        })}
                                                />
                                        </Card>
                                </Box>
                        </Box>
                </Container>
        );
}
