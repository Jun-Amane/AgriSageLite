import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const teamMembers = [
        {
                avatar: <Avatar alt="Ziyu Zhou" src="/static/avatar/jun.webp" />,
                name: '周子钰',
                occupation: '多模态深度学习、系统构建、运行维护',
                descriptions:
                        "周子钰，2004年生，本科生。IEEE学生会员，中国计算机学会学生会员。周子钰的主要研究方向涵盖了计算机系统、软件工程和多模态学习这三个互相关联且充满前景的领域。在计算机系统方面,他关注系统架构设计、性能优化等核心问题;在软件工程领域,他专注于软件开发方法论、项目管理等实践性很强的主题;在多模态学习方向,他着眼于融合视觉、语言等多种模态信息的人工智能技术,这也是当前AI领域的一个热点研究方向。"
        },
        {
                avatar: <Avatar alt="Guangye Li" src="/static/avatar/gy.webp" />,
                name: '李广烨',
                occupation: '数字图像处理、自然语言处理',
                descriptions:
                        "李广烨，2004年生，本科生。中国计算机学会学生会员。李广烨的主要研究方向涵盖了大数据挖掘分析、机器学习和软件工程这三个既相互关联又各具特色的领域。在大数据挖掘分析方面，他专注于数据预处理、特征工程、模式识别等核心技术；在机器学习领域，他致力于研究深度学习算法、自然语言处理等前沿问题。他的研究有望为企业智能决策、智慧城市建设、个性化推荐系统等领域带来创新性的解决方案，对推动数字经济发展具有重要意义。"
        },
        {
                avatar: <Avatar alt="Yang Song" src="/static/avatar/sheep.webp" />,
                name: '宋扬',
                occupation: '数字图像处理、自然语言处理',
                descriptions:
                        "宋扬，2004年生，本科生。中国计算机学会学生会员。宋扬的主要研究方向聚焦于计算机视觉和高光谱图像处理这两个既前沿又紧密相关的领域。在计算机视觉方面，他关注目标检测、图像分割、场景理解等核心技术；在高光谱图像处理领域，他致力于研究光谱信息提取、维度降低、目标识别等关键问题。他的研究有望为遥感图像分析、农作物监测、疾病诊断等领域带来创新性的解决方案，对提高环境监测精度、农业生产效率和医疗诊断准确性具有重要意义。"
        },
        {
                avatar: <Avatar alt="Wenqiang Chen" src="/static/avatar/wq.webp" />,
                name: '陈文强',
                occupation: '嵌入式系统开发',
                descriptions:
                        "陈文强，2002年生，本科生。中国计算机学会学生会员。陈文强的主要研究方向涵盖了计算机系统、计算机视觉和数字图像处理这三个既相互关联又各具特色的领域。在计算机系统方面,他关注系统架构设计、性能优化、分布式系统等核心问题;在计算机视觉领域,他专注于机器视觉算法、深度学习模型等前沿技术;在数字图像处理方向,他着重研究图像增强、图像压缩、图像分割等关键技术。他的研究有望为智能设备优化、大规模视觉数据处理等领域带来创新性的解决方案,对推动计算机技术在各行各业的应用具有重要意义。"
        },
        {
                avatar: <Avatar alt="Jiahui Zhou" src="/static/avatar/chuck.webp" />,
                name: '周佳慧',
                occupation: '植物表型学大数据研究',
                descriptions:
                        "周佳慧，2003年生，本科生。中国计算机学会学生会员。周佳慧的主要研究方向集中在计算机视觉和植物表型学这两个既前沿又充满应用前景的交叉领域。在计算机视觉方面,他关注图像处理、目标检测、图像分割等核心技术;在植物表型学领域,他致力于将先进的计算机视觉技术应用于植物生长、形态和生理特征的自动化分析与量化研究。这一研究方向不仅体现了他对技术创新的追求,也展示了他将计算机科学与生命科学相结合的独特视角，为智慧农业和可持续发展贡献自己的智慧。"
        },
];

export default function OurTeam() {
        return (
                <Container
                        id="our_team"
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
                                        我们的团队
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        认识AgriSageLite背后的专家团队。我们的成员在AI、大数据、嵌入式系统和植物科学等领域拥有深厚的专业知识，共同致力于推动智慧农业的创新与发展。
                                </Typography>
                        </Box>
                        <Grid container spacing={2} justifyContent="center">
                                {teamMembers.map((member, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Card
                                                        variant="outlined"
                                                        sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'space-between',
                                                                height: '100%',
                                                        }}
                                                >
                                                        <CardContent>
                                                                <Typography
                                                                        variant="body1"
                                                                        gutterBottom
                                                                        sx={{ color: 'text.secondary' }}
                                                                >
                                                                        {member.descriptions}
                                                                </Typography>
                                                        </CardContent>
                                                        <Box>
                                                                <CardHeader
                                                                        avatar={member.avatar}
                                                                        title={member.name}
                                                                        subheader={member.occupation}
                                                                />
                                                        </Box>
                                                </Card>
                                        </Grid>
                                ))}
                        </Grid>
                </Container>
        );
}


