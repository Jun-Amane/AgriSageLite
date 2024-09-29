'use client'

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
        const [expanded, setExpanded] = React.useState<string | false>(false);

        const handleChange =
                (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
                        setExpanded(isExpanded ? panel : false);
                };

        return (
                <Container
                        id="faq"
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
                        <Typography
                                component="h2"
                                variant="h4"
                                sx={{
                                        color: 'text.primary',
                                        width: { sm: '100%', md: '60%' },
                                        textAlign: { sm: 'left', md: 'center' },
                                }}
                        >
                                常见问题（FAQ）
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                                <Accordion
                                        expanded={expanded === 'panel1'}
                                        onChange={handleChange('panel1')}
                                >
                                        <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1d-content"
                                                id="panel1d-header"
                                        >
                                                <Typography component="h3" variant="subtitle2">
                                                        AgriSageLite能识别哪些类型的小麦病虫害？
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                                >
                                                        AgriSageLite能够识别多种常见的小麦病虫害，包括但不限于锈病、白粉病、赤霉病、蚜虫等。我们的自建数据集Wheat Blend Set涵盖了11种主要的小麦病虫害类别，确保了系统在实际应用中的广泛适用性。
                                                </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                <Accordion
                                        expanded={expanded === 'panel5'}
                                        onChange={handleChange('panel5')}
                                >
                                        <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel5d-content"
                                                id="panel5d-header"
                                        >
                                                <Typography component="h3" variant="subtitle2">
                                                        AgriSageLite是开源的吗？采用什么许可证？
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                                >
                                                        是的,AgriSageLite项目是在GNU通用公共许可证第3版(GPLv3)下开源的。这意味着您可以自由地使用、修改和分发这个项目,但必须遵守GPLv3的条款。GPLv3是一个copyleft许可证,它要求任何基于AgriSageLite的衍生作品也必须以GPLv3许可证发布。这保证了项目及其衍生作品始终保持开源状态。使用者可以自由使用该软件,但如果您修改了代码并分发,则必须公开源代码并使用相同的GPLv3许可证。
                                                </Typography>
                                        </AccordionDetails>
                                </Accordion>

                                <Accordion
                                        expanded={expanded === 'panel4'}
                                        onChange={handleChange('panel4')}
                                >
                                        <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel4d-content"
                                                id="panel4d-header"
                                        >
                                                <Typography component="h3" variant="subtitle2">
                                                        AgriSageLite如何保护用户的数据隐私？
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                                >
                                                        我们高度重视用户的数据隐私。AgriSageLite采用一次性处理机制，所有上传的图像和文本数据仅用于即时分析，分析完成后立即删除，不会在服务器上保存。此外，我们的系统还采用了加密传输和严格的访问控制措施，确保用户数据的安全性。
                                                </Typography>
                                        </AccordionDetails>
                                </Accordion>

                                <Accordion
                                        expanded={expanded === 'panel2'}
                                        onChange={handleChange('panel2')}
                                >
                                        <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2d-content"
                                                id="panel2d-header"
                                        >
                                                <Typography component="h3" variant="subtitle2">
                                                        如何使用AgriSageLite进行病虫害诊断以及其他分类任务？
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                                >
                                                        使用AgriSageLite进行分类非常简单。您只需上传作物的图片，并提供简短的文字描述（如病害症状、植株特征等信息）。我们的多模态分类系统将综合分析图像和文本信息，快速给出准确的分类结果和相应的农业信息。
                                                </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                <Accordion
                                        expanded={expanded === 'panel3'}
                                        onChange={handleChange('panel3')}
                                >
                                        <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3d-content"
                                                id="panel3d-header"
                                        >
                                                <Typography component="h3" variant="subtitle2">
                                                        AgriSageLite的多模态分类系统有什么优势？
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                                >
                                                        AgriSageLite的多模态分类系统基于自研Blend-CNN模型。该模型以双分支卷积神经网络为框架，在图像基础上，引入多路文本骨干网络提取文本描述特征，以得到更多的特征信息，从而提高模型识别精度；同时提出了基于卷积网络的多模态特征融合方式以及梯度拼配损失函数。这一研究不仅推动了多模态小样本学习在农业领域的应用，也为解决农业数据稀疏性问题提供了新的思路。
                                                </Typography>
                                        </AccordionDetails>
                                </Accordion>
                        </Box>
                </Container>
        );
}
