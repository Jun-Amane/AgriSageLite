import React, { useState, useRef, useEffect } from 'react';
import {
        Box,
        TextField,
        IconButton,
        Typography,
        List,
        ListItem,
        ListItemText,
        CircularProgress,
        useTheme,
        InputAdornment,
        Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ErrorIcon from '@mui/icons-material/Error';
import NavBar from './NavBar';
import QuestionsSidebar from './QuestionsSidebar';
import TypewriterEffect from './TypewriterEffect';

interface Message {
        text: string;
        isUser: boolean;
        isError?: boolean;
        timestamp?: number;
        isTyping?: boolean;
}

const ChatInterface: React.FC = () => {
        const [input, setInput] = useState('');
        const [messages, setMessages] = useState<Message[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const messagesEndRef = useRef<HTMLDivElement>(null);
        const theme = useTheme();

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
        };

        const handleSendMessage = async (message: string = input) => {
                if (message.trim() === '' || isLoading) return;

                const userMessage: Message = {
                        text: message,
                        isUser: true,
                        timestamp: Date.now()
                };
                setMessages(prevMessages => [...prevMessages, userMessage]);
                setInput('');
                setIsLoading(true);

                try {
                        const response = await fetch('/api/chat', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: message }),
                        });

                        const data = await response.json();

                        if (response.ok && data.status === 'success') {
                                const botMessage: Message = {
                                        text: data.response,
                                        isUser: false,
                                        timestamp: data.timestamp * 1000, // Convert to milliseconds
                                        isTyping: true
                                };
                                setMessages(prevMessages => [...prevMessages, botMessage]);
                        } else {
                                throw new Error(data.error || 'An unknown error occurred');
                        }
                } catch (error) {
                        console.error('Error:', error);
                        const errorMessage: Message = {
                                text: error instanceof Error ? error.message : 'An unknown error occurred',
                                isUser: false,
                                isError: true,
                                timestamp: Date.now()
                        };
                        setMessages(prevMessages => [...prevMessages, errorMessage]);
                } finally {
                        setIsLoading(false);
                }
        };

        const handleQuestionClick = (question: string) => {
                handleSendMessage(question);
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                        event.preventDefault();
                        handleSendMessage();
                }
        };

        useEffect(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages]);

        const handleTypingComplete = (index: number) => {
                setMessages(prevMessages =>
                        prevMessages.map((msg, i) =>
                                i === index ? { ...msg, isTyping: false } : msg
                        )
                );
        };

        return (
                <Box sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme.palette.background.default
                }}>
                        <NavBar />
                        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                                <Box sx={{
                                        width: 300,
                                        flexShrink: 0,
                                        borderRight: `1px solid ${theme.palette.divider}`,
                                        overflowY: 'auto'
                                }}>
                                        <QuestionsSidebar onQuestionClick={handleQuestionClick} />
                                </Box>
                                <Box sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: '#F4F4F4',
                                        width: 'calc(100% - 300px)',
                                        maxWidth: 'calc(100% - 300px)'
                                }}>
                                        <Typography variant="subtitle1" sx={{ p: 2, color: theme.palette.text.secondary }}>
                                                AgriSageLite Knowledge Base
                                        </Typography>
                                        <Box sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                px: { xs: 2, sm: 4, md: 6 },
                                                py: 2,
                                                '&::-webkit-scrollbar': {
                                                        width: '0.4em'
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: 'rgba(0,0,0,.1)',
                                                        borderRadius: '10px'
                                                }
                                        }}>
                                                <List>
                                                        {messages.map((message, index) => (
                                                                <ListItem
                                                                        key={index}
                                                                        sx={{
                                                                                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                                                                                mb: 1,
                                                                                alignItems: 'flex-start',
                                                                        }}
                                                                >
                                                                        {!message.isUser && (
                                                                                <Avatar sx={{ bgcolor: message.isError ? theme.palette.error.main : theme.palette.secondary.main, mr: 1, flexShrink: 0 }}>
                                                                                        {message.isError ? <ErrorIcon /> : <SmartToyIcon />}
                                                                                </Avatar>
                                                                        )}
                                                                        <Box sx={{
                                                                                p: 2,
                                                                                bgcolor: message.isUser
                                                                                        ? theme.palette.primary.light
                                                                                        : message.isError
                                                                                                ? theme.palette.error.light
                                                                                                : theme.palette.background.paper,
                                                                                color: message.isUser
                                                                                        ? theme.palette.primary.contrastText
                                                                                        : message.isError
                                                                                                ? theme.palette.error.contrastText
                                                                                                : theme.palette.text.primary,
                                                                                borderRadius: message.isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                                                                maxWidth: '70%',
                                                                                wordBreak: 'break-word',
                                                                                overflowWrap: 'break-word',
                                                                                boxShadow: 1,
                                                                        }}>
                                                                                {message.isTyping ? (
                                                                                        <TypewriterEffect
                                                                                                text={message.text}
                                                                                                onComplete={() => handleTypingComplete(index)}
                                                                                        />
                                                                                ) : (
                                                                                        <ListItemText
                                                                                                primary={message.text}
                                                                                                secondary={message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                                                                                                primaryTypographyProps={{
                                                                                                        color: message.isError ? 'error' : 'inherit',
                                                                                                        sx: { wordBreak: 'break-word' }
                                                                                                }}
                                                                                                secondaryTypographyProps={{
                                                                                                        fontSize: '0.75rem',
                                                                                                        color: theme.palette.text.secondary
                                                                                                }}
                                                                                        />
                                                                                )}
                                                                        </Box>
                                                                        {message.isUser && (
                                                                                <Avatar sx={{ bgcolor: theme.palette.primary.main, ml: 1, flexShrink: 0 }}>
                                                                                        <PersonIcon />
                                                                                </Avatar>
                                                                        )}
                                                                </ListItem>
                                                        ))}
                                                </List>
                                                <div ref={messagesEndRef} />
                                        </Box>
                                        <Box sx={{
                                                p: 2,
                                                bgcolor: '#F4F4F4',
                                        }}>
                                                <Box sx={{ maxWidth: 800, margin: 'auto' }}>
                                                        <TextField
                                                                fullWidth
                                                                multiline
                                                                minRows={1}
                                                                maxRows={4}
                                                                variant="outlined"
                                                                placeholder="Ask a question..."
                                                                value={input}
                                                                onChange={handleInputChange}
                                                                onKeyDown={handleKeyDown}
                                                                disabled={isLoading}
                                                                InputProps={{
                                                                        endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                        <IconButton
                                                                                                onClick={() => handleSendMessage()}
                                                                                                disabled={isLoading || input.trim() === ''}
                                                                                                color="primary"
                                                                                        >
                                                                                                {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                                                                                        </IconButton>
                                                                                </InputAdornment>
                                                                        ),
                                                                        sx: {
                                                                                bgcolor: theme.palette.background.paper,
                                                                                borderRadius: '20px',
                                                                                '& fieldset': { border: 'none' },
                                                                        }
                                                                }}
                                                        />
                                                        <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center', color: theme.palette.text.secondary }}>
                                                                大模型可能会出错，请注意甄别。按Ctrl+Enter发送消息。
                                                        </Typography>
                                                </Box>
                                        </Box>
                                </Box>
                        </Box>
                </Box>
        );
};

export default ChatInterface;


