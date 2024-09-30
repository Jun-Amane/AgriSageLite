import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import NavBar from '@/components/NavBar';
import {CheckCircleOutline, Code, GroupWork, Science} from '@mui/icons-material';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <Container maxWidth="lg">
            <NavBar/>
            <Box sx={{mt: 4, mb: 4}}>
                <Typography variant="h3" component="h1" gutterBottom align="center" sx={{fontFamily: "Noto Serif SC"}}>
                    关于AgriSageLite
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary"
                            sx={{fontFamily: "Noto Serif SC"}}>
                    ～以人工智能赋能农业发展～
                </Typography>

                <Grid container spacing={4} sx={{mt: 4}}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardMedia
                                component="img"
                                height="240"
                                sx={{objectFit: 'cover'}}
                                image="/static/IMG_1571.webp"
                                alt="AgriSageLite概览"
                            />
                            <CardContent sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    项目概述
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    AgriSageLite是一个旨在革新农业实践的前沿人工智能驱动解决方案。本平台基于轻量化的小样本多模态深度学习分类算法，同时集成农业知识图谱问答，为多样化的农业需求提供精确的分类和分析服务。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    核心功能
                                </Typography>
                                <List sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}>
                                    {[
                                        '小麦病虫害识别',
                                        '花卉品种分类',
                                        '鸟类物种鉴定',
                                        '农业知识图谱问答',
                                        '嵌入式边缘设备适配',
                                        '农业领域小样本微调',
                                    ].map((feature, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CheckCircleOutline color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText primary={feature}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{height: '100%'}}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    <Code fontSize="large" color="primary" sx={{mr: 1, verticalAlign: 'bottom'}}/>
                                    技术栈
                                </Typography>
                                <List>
                                    {[
                                        'TensorFlow & PyTorch',
                                        'Python Flask',
                                        'Next.js & React & Typescript',
                                        'GNU/Linux',
                                        'MySQL',
                                        'Neo4j',
                                    ].map((tech, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={tech}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent
                                sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    <Science fontSize="large" color="primary" sx={{mr: 1, verticalAlign: 'bottom'}}/>
                                    研究方法
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{textIndent: '2em'}}>
                                    本项目采用创新的Blend-CNN模型，这是一种轻量化的小样本多模态分类模型。
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{textIndent: '2em'}}>
                                    该模型以双分支卷积神经网络为框架，在图像基础上，引入多路文本骨干网络提取文本描述特征，以得到更多的特征信息，从而提高模型识别精度；同时提出了基于卷积网络的多模态特征融合方式以及梯度拼配损失函数。
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{textIndent: '2em'}}>
                                    这一研究不仅推动了多模态小样本学习在农业领域的应用，也为解决农业数据稀疏性问题提供了新的思路。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent
                                sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    <GroupWork fontSize="large" color="primary" sx={{mr: 1, verticalAlign: 'bottom'}}/>
                                    研究团队
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{textIndent: '2em'}}>
                                    AgriSageLite项目由山东农业大学信息科学与工程学院的优秀本科生团队开发。团队成员研究方向有机器学习、计算机视觉和自然语言处理等，在计算机科学与农业科技融合领域展现出卓越的创新能力和研究热情，且分工明确。该项目是在指导老师国家自然科学基金（32401702）、山东省自然科学基金（ZR2023QF016）大力支持下开展。团队研究不仅注重技术创新，更致力于解决农业生产中的实际问题，推动农业现代化和智能化发展。
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Footer></Footer>
        </Container>
    );
}
