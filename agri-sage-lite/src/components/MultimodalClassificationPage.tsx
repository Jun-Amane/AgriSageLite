import React, {useState, useEffect} from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
    Box,
    Alert,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from './Footer';

interface ClassificationResult {
    status: 'success' | 'failure';
    message?: string;
    top_category?: string;
    all_probabilities: { [key: string]: number };
    entropy: number;
    agricultural_knowledge?: { [key: string]: string };
}

interface MultimodalClassificationPageProps {
    classificationType: string | null;
}

const MultimodalClassificationPage: React.FC<MultimodalClassificationPageProps> = ({classificationType}) => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaImage, setCaptchaImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ClassificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (classificationType == "disease") {
            document.title = '小麦病虫害检测';
        } else if (classificationType == "flower") {
            document.title = '花卉品种检测'
        } else if (classificationType == "bird") {
            document.title = '鸟类物种检测'
        } else {
            document.title = 'Classification';
        }
        fetchSessionId();
    }, [classificationType]);

    const fetchSessionId = async () => {
        try {
            const response = await fetch('/api/get_session_id', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch session ID');
            }
            const data = await response.json();
            setSessionId(data.session_id);
            fetchCaptcha();
        } catch (error) {
            console.error('Error fetching session ID:', error);
            setError('Failed to initialize session. Please try again.');
        }
    };

    const fetchCaptcha = async () => {
        try {
            const response = await fetch('/api/captcha', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch captcha');
            }
            const blob = await response.blob();
            setCaptchaImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching captcha:', error);
            setError('Failed to load captcha. Please try again.');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!image || !description || !captcha || !sessionId) {
            setError('Please fill all fields and ensure session is initialized');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('captcha', captcha);
        formData.append('session_id', sessionId);

        if (classificationType) {
            formData.append('type', classificationType);
        }

        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Classification failed');
            }

            setResult(data as ClassificationResult);
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
            fetchCaptcha(); // Refresh captcha after each submission
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const getChartOption = () => {
        if (!result) return {};

        const {all_probabilities} = result;
        const data = Object.entries(all_probabilities)
            .map(([name, value]) => ({
                name,
                value: (value * 100).toFixed(3),
                label: {
                    show: false
                }
            }))
            .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

        if (data.length > 0) {
            data[0].label.show = true;
        }

        const maxConfidence = parseFloat(data[0].value);

        return {
            title: {
                text: `Classification Confidence: ${maxConfidence.toFixed(3)}%`,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}%'
            },
            series: [
                {
                    name: 'Confidence',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        formatter: '{b}: {c}%',
                        position: 'outside'
                    },
                    labelLine: {
                        show: true
                    }
                }
            ]
        };
    };
    return (
        <Container maxWidth="lg">
            <NavBar/>
            <Box sx={{mt: 4, mb: 4}}>
                <Typography variant="h4" gutterBottom align="center">
                    {

                        classificationType == 'disease'
                            ? '小麦病虫害检测'
                            : (classificationType == 'flower' ? '花卉品种检测' : (classificationType == 'bird' ? '鸟类物种检测' : '多模态分类'))


                    }
                </Typography>
                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    上载图片
                                </Typography>
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadIcon/>}
                                        fullWidth
                                    >
                                        选择图片
                                    </Button>
                                </label>
                                <Box sx={{
                                    mt: 2,
                                    height: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'background.default',
                                    borderRadius: 1
                                }}>
                                    {imagePreview ? (
                                        <CardMedia
                                            component="img"
                                            image={imagePreview}
                                            alt="Uploaded image preview"
                                            sx={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    ) : (
                                        <Typography variant="body1" color="textSecondary">
                                            图片预览
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    键入描述性文本
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        label="描述文本"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        sx={{mb: 2}}
                                    />
                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        {captchaImage && (
                                            <img src={captchaImage} alt="CAPTCHA" style={{marginRight: '10px'}}/>
                                        )}
                                        <Button onClick={fetchCaptcha} variant="outlined" size="small">
                                            刷新验证码
                                        </Button>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="键入验证码"
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                        placeholder="键入验证码"
                                        sx={{mb: 2}}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isLoading}
                                        fullWidth
                                    >
                                        {isLoading ? <CircularProgress size={24}/> : '开始检测'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{mt: 4}}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    分类结果: {result ? (
                                    result.status === 'success' ? (
                                        <span style={{color: 'green', fontWeight: 'bold'}}>
                                                                                                {result.top_category}
                                                                                        </span>
                                    ) : (
                                        <span style={{color: 'red', fontWeight: 'bold'}}>失败</span>
                                    )
                                ) : (
                                    '等待中'
                                )}
                                </Typography>
                                {result && (
                                    <>
                                        {result.status === 'failure' && result.message && (
                                            <Typography variant="body1" gutterBottom>
                                                错误信息: {result.message}
                                            </Typography>
                                        )}
                                        {result.status === 'failure' && (
                                            <Typography variant="body1" gutterBottom>
                                                Entropy: {result.entropy.toFixed(4)}
                                            </Typography>
                                        )}
                                        <ReactECharts option={getChartOption()} style={{height: '300px'}}/>
                                    </>
                                )}
                                {!result && (
                                    <Box sx={{
                                        height: '300px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography variant="body1" color="textSecondary">
                                            分类结果显示
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid> <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                相关农业信息
                            </Typography>
                            {result && result.agricultural_knowledge ? (
                                <List>
                                    {Object.entries(result.agricultural_knowledge).map(([key, value]) => (
                                        <ListItem key={key}>
                                            <ListItemText
                                                primary={key.charAt(0).toUpperCase() + key.slice(1)}
                                                secondary={value}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{
                                    height: '300px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="body1" color="textSecondary">
                                        农业信息展示
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                </Grid>
            </Box>
            <Footer/>
        </Container>
    );
};

export default MultimodalClassificationPage;


