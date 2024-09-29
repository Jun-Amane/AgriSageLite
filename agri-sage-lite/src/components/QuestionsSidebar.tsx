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
                category: "Wheat Diseases",
                questions: [
                        "What are the symptoms of wheat rust?",
                        "How to prevent wheat blight?",
                        "Is my wheat affected by fusarium head blight?"
                ]
        },
        {
                category: "Flower Identification",
                questions: [
                        "How to identify a sunflower?",
                        "What are the characteristics of a rose?",
                        "Can you help me identify this blue flower?"
                ]
        },
        {
                category: "Bird Species",
                questions: [
                        "What does a barn swallow look like?",
                        "How to distinguish between a crow and a raven?",
                        "What's the habitat of the American robin?"
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
                                Sample Questions
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

