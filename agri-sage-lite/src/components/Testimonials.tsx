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
                avatar: <Avatar alt="Ziyu Zhou" src="/static/avatar/jun.png" />,
                name: 'Ziyu Zhou',
                occupation: 'AI开发、系统构建、运行维护',
                descriptions:
                        "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
        },
        {
                avatar: <Avatar alt="Guangye Li" src="/static/avatar/gy.jpeg" />,
                name: 'Guangye Li',
                occupation: '大数据挖掘与分析',
                descriptions:
                        "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
        },
        {
                avatar: <Avatar alt="Yang Song" src="/static/avatar/sheep.jpeg" />,
                name: 'Yang Song',
                occupation: '大数据挖掘与分析',
                descriptions:
                        "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
        },
        {
                avatar: <Avatar alt="Wenqiang Chen" src="/static/avatar/wq.jpeg" />,
                name: 'Wenqiang Chen',
                occupation: '嵌入式系统开发',
                descriptions:
                        "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
        },
        {
                avatar: <Avatar alt="Jiahui Zhou" src="/static/avatar/chuck.jpeg" />,
                name: 'Jiahui Zhou',
                occupation: '植物表型学大数据研究',
                descriptions:
                        "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
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


