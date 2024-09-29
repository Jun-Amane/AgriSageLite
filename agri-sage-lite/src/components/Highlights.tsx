import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

import { green, lightGreen } from '@mui/material/colors';

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const items = [
        {
                icon: <CrisisAlertIcon />,
                title: '高精度识别',
                description: '利用自研的先进深度学习模型，我们的系统能够以极高的准确率识别植物病害、花卉种类和鸟类，为农业决策提供可靠依据。',
        },
        {
                icon: <LineWeightIcon />,
                title: '轻量级设计',
                description: '优化的模型结构确保了系统的轻量化，能够在各种设备上高效运行，无需昂贵的硬件支持，让智能农业触手可及。',
        },
        {
                icon: <DynamicFeedIcon />,
                title: '多模态分析',
                description: '融合图像和文本数据的多模态分析能力，全方位捕捉农业信息，提供更全面、更准确的分类结果和洞察。',
        },
        {
                icon: <AutoFixHighRoundedIcon />,
                title: '农业专属优化',
                description: '针对农业领域的特定需求进行优化与微调，包括作物病虫害识别、花卉分类和鸟类识别，为农业生产和生态保护提供专业支持。',
        },
        {
                icon: <ConstructionRoundedIcon />,
                title: '广泛适用性',
                description: '系统设计具有强大的泛用性，无论是应对全新的农业问题、未知的农业场景，还是拓展到相关的生态领域，AgriSageLite都能快速适配并提供有效解决方案。',
        },
        {
                icon: <QueryStatsRoundedIcon />,
                title: '小样本学习',
                description: '采用先进的小样本学习技术，即使在数据有限的情况下，也能快速适应新的分类任务，为稀有物种或新型病害的识别适配提供可能。',
        },
];

export default function Highlights() {
        return (
                <Box
                        id="highlights"
                        sx={{
                                pt: { xs: 4, sm: 12 },
                                pb: { xs: 8, sm: 16 },
                                color: 'white',
                                bgcolor: 'rgb(5, 7, 10)',
                                // bgcolor: green[900],
                        }}
                >
                        <Container
                                sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: { xs: 3, sm: 6 },
                                }}
                        >
                                <Box
                                        sx={{
                                                width: { sm: '100%', md: '60%' },
                                                textAlign: { sm: 'left', md: 'center' },
                                        }}
                                >
                                        <Typography component="h2" variant="h4" gutterBottom>
                                                产品亮点
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'grey.400' }}>
                                                探索AgriSageLite的独特优势：高精度识别、轻量级设计、多模态分析能力，以及专为农业优化的功能。我们致力于为现代农业提供智能、高效且易用的解决方案，推动农业科技的创新发展。
                                        </Typography>
                                </Box>
                                <Grid container spacing={2}>
                                        {items.map((item, index) => (
                                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                                        <Stack
                                                                direction="column"
                                                                component={Card}
                                                                spacing={1}
                                                                useFlexGap
                                                                sx={{
                                                                        color: 'inherit',
                                                                        p: 3,
                                                                        height: '100%',
                                                                        borderStyle: 'solid',
                                                                        borderWidth: 1,
                                                                        borderColor: 'hsla(220, 20%, 80%, 0.4)',
                                                                        backgroundColor: 'rgb(11, 14, 20)',
                                                                }}
                                                        >
                                                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                                                <div>
                                                                        <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                                                                                {item.title}
                                                                        </Typography>
                                                                        <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                                                                {item.description}
                                                                        </Typography>
                                                                </div>
                                                        </Stack>
                                                </Grid>
                                        ))}
                                </Grid>
                        </Container>
                </Box>
        );
}
