import React from 'react';
import {
        Box,
        List,
        ListItemButton,
        ListItemText,
        Accordion,
        AccordionSummary,
        AccordionDetails,
        Typography,
        useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface QuestionCategory {
        category: string;
        questions: string[];
}

interface QuestionsSidebarProps {
        onQuestionClick: (question: string) => void;
}

const sampleQuestions: QuestionCategory[] = [
        {
                category: "小麦病虫害",
                questions: [
                        "小麦易感哪些病害？",
                        "小麦赤霉病的症状是什么？",
                        "如何防治小麦吸浆虫？",
                ]
        },
        {
                category: "桃树病虫害",
                questions: [
                        "桃树易感哪些病害？",
                        "桃树红叶病怎么防治？",
                        "桃树红叶病的症状是什么？",
                ]
        },
        {
                category: "其它示例",
                questions: [
                        "哪些作物易感星天牛？",
                        "柑橘炭疽病的症状是什么？",
                        "黑绒金龟子的形态特征是什么？"
                ]
        }
];

const QuestionsSidebar: React.FC<QuestionsSidebarProps> = ({ onQuestionClick }) => {
        const theme = useTheme();

        return (
                <Box
                        sx={{
                                width: 300,
                                height: '100%',
                                bgcolor: theme.palette.background.paper,
                                borderRight: `1px solid ${theme.palette.divider}`,
                                overflowY: 'auto',
                        }}
                >
                        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
                                样例问题
                        </Typography>
                        <List>
                                {sampleQuestions.map((category, index) => (
                                        <Accordion
                                                key={index}
                                                disableGutters
                                                elevation={0}
                                                square
                                                sx={{
                                                        '&:before': {
                                                                display: 'none',
                                                        },
                                                        bgcolor: 'transparent',
                                                }}
                                        >
                                                <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={`panel${index}a-content`}
                                                        id={`panel${index}a-header`}
                                                        sx={{
                                                                bgcolor: theme.palette.action.hover,
                                                                '&:hover': {
                                                                        bgcolor: theme.palette.action.selected,
                                                                },
                                                        }}
                                                >
                                                        <Typography>{category.category}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ p: 0 }}>
                                                        <List>
                                                                {category.questions.map((question, qIndex) => (
                                                                        <ListItemButton
                                                                                key={qIndex}
                                                                                onClick={() => onQuestionClick(question)}
                                                                                sx={{
                                                                                        pl: 4,
                                                                                        '&:hover': {
                                                                                                bgcolor: theme.palette.action.hover,
                                                                                        },
                                                                                }}
                                                                        >
                                                                                <ListItemText
                                                                                        primary={question}
                                                                                        primaryTypographyProps={{
                                                                                                fontSize: '0.9rem',
                                                                                                lineHeight: 1.2,
                                                                                        }}
                                                                                />
                                                                        </ListItemButton>
                                                                ))}
                                                        </List>
                                                </AccordionDetails>
                                        </Accordion>
                                ))}
                        </List>
                </Box>
        );
};

export default QuestionsSidebar;


