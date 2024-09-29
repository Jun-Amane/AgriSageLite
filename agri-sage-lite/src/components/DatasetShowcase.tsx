'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const datasets = [
        {
                title: 'Oxford 102 Flowers',
                price: '102',
                description: [
                        '102个精选花卉品种',
                        '8,189张高质量图像',
                        '图像质量统一，便于分析',
                        '计算机视觉研究的热门数据集',
                ],
                buttonText: '访问数据集',
                buttonVariant: 'outlined',
                buttonColor: 'primary',
                link: 'https://www.robots.ox.ac.uk/~vgg/data/flowers/102/',
        },
        {
                title: 'Wheat Blend Set',
                price: '11',
                subheader: 'Customised',
                description: [
                        '专为本项目定制开发',
                        '聚焦小麦病虫害识别',
                        '融合图像与文本数据',
                        '实现精准健康诊断',
                        '多模态分类技术',
                        '涵盖广泛小麦品种',
                ],
                buttonText: '了解更多',
                buttonVariant: 'contained',
                buttonColor: 'secondary',
                link: 'https://example.com/wheat-blend-set',
        },
        {
                title: 'CUB-200-2011',
                price: '200',
                description: [
                        '200种鸟类精细分类',
                        '11,788张高清鸟类图像',
                        '详尽的物种注释信息',
                        '挑战级细粒度分类任务',
                ],
                buttonText: '访问数据集',
                buttonVariant: 'outlined',
                buttonColor: 'primary',
                link: 'http://www.vision.caltech.edu/visipedia/CUB-200-2011.html',
        },
];

export default function DatasetShowcase() {
        return (
                <Container
                        id="datasets"
                        sx={{
                                pt: { xs: 4, sm: 12 },
                                pb: { xs: 8, sm: 16 },
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
                                <Typography
                                        component="h2"
                                        variant="h4"
                                        gutterBottom
                                        sx={{ color: 'text.primary' }}
                                >
                                        我们的核心数据集
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        探索驱动我们多模态分类系统的精选数据集。包括公开数据集以及自构建数据集。
                                        这些丰富多样的数据集为小麦病虫害、花卉和鸟类的精准分类提供了强大支持，
                                        是我们打造智能农业解决方案的基石。
                                </Typography>
                        </Box>
                        <Grid
                                container
                                spacing={3}
                                sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                        >
                                {datasets.map((dataset) => (
                                        <Grid
                                                size={{ xs: 12, sm: dataset.title === 'CUB-200-2011' ? 12 : 6, md: 4 }}
                                                key={dataset.title}
                                        >
                                                <Card
                                                        sx={[
                                                                {
                                                                        p: 2,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: 4,
                                                                },
                                                                dataset.title === 'Wheat Blend Set' &&
                                                                ((theme) => ({
                                                                        border: 'none',
                                                                        background:
                                                                                'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                                                                        boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                                                        ...theme.applyStyles('dark', {
                                                                                background:
                                                                                        'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                                                                boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                                                        }),
                                                                })),
                                                        ]}
                                                >
                                                        <CardContent>
                                                                <Box
                                                                        sx={[
                                                                                {
                                                                                        mb: 1,
                                                                                        display: 'flex',
                                                                                        justifyContent: 'space-between',
                                                                                        alignItems: 'center',
                                                                                        gap: 2,
                                                                                },
                                                                                dataset.title === 'Wheat Blend Set'
                                                                                        ? { color: 'grey.100' }
                                                                                        : { color: '' },
                                                                        ]}
                                                                >
                                                                        <Typography component="h3" variant="h6" sx={{ fontFamily: "Noto Serif SC" }}>
                                                                                {dataset.title}
                                                                        </Typography>
                                                                        {dataset.subheader && (
                                                                                <Chip
                                                                                        icon={<AutoAwesomeIcon />}
                                                                                        label={dataset.subheader}
                                                                                        sx={{
                                                                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                                                color: 'white',
                                                                                                '& .MuiChip-icon': {
                                                                                                        color: 'white',
                                                                                                },
                                                                                        }}
                                                                                />
                                                                        )}
                                                                </Box>
                                                                <Box
                                                                        sx={[
                                                                                {
                                                                                        display: 'flex',
                                                                                        alignItems: 'baseline',
                                                                                },
                                                                                dataset.title === 'Wheat Blend Set'
                                                                                        ? { color: 'grey.50' }
                                                                                        : { color: null },
                                                                        ]}
                                                                >
                                                                        {dataset.price && (
                                                                                <>
                                                                                        <Typography component="h3" variant="h2" sx={{ fontFamily: "Noto Serif SC" }}>
                                                                                                {dataset.price}
                                                                                        </Typography>
                                                                                        <Typography component="h3" variant="h6">
                                                                                                &nbsp; 个类别
                                                                                        </Typography>
                                                                                </>
                                                                        )}
                                                                </Box>
                                                                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                                                                {dataset.description.map((line) => (
                                                                        <Box
                                                                                key={line}
                                                                                sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                                                                        >
                                                                                <CheckCircleRoundedIcon
                                                                                        sx={[
                                                                                                {
                                                                                                        width: 20,
                                                                                                },
                                                                                                dataset.title === 'Wheat Blend Set'
                                                                                                        ? { color: 'primary.light' }
                                                                                                        : { color: 'primary.main' },
                                                                                        ]}
                                                                                />
                                                                                <Typography
                                                                                        variant="subtitle2"
                                                                                        component={'span'}
                                                                                        sx={[
                                                                                                dataset.title === 'Wheat Blend Set'
                                                                                                        ? { color: 'grey.50' }
                                                                                                        : { color: null },
                                                                                        ]}
                                                                                >
                                                                                        {line}
                                                                                </Typography>
                                                                        </Box>
                                                                ))}
                                                        </CardContent>
                                                        <CardActions>
                                                                <Button
                                                                        fullWidth
                                                                        variant={dataset.buttonVariant as 'outlined' | 'contained'}
                                                                        color={dataset.buttonColor as 'primary' | 'secondary'}
                                                                        href={dataset.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                >
                                                                        {dataset.buttonText}
                                                                </Button>
                                                        </CardActions>
                                                </Card>
                                        </Grid>
                                ))}
                        </Grid>
                </Container>
        );
}
