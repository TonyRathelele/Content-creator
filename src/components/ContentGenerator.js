import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
} from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { saveAs } from 'file-saver';

const PROMPT_TEMPLATES = {
  story: {
    name: 'Story Generator',
    template: 'Create an engaging story for primary school students about {topic}. The story should be {length} words long and include {elements}.',
  },
  math: {
    name: 'Math Problem Generator',
    template: 'Generate {count} age-appropriate math problems for {grade} grade students focusing on {topic}. Include solutions and explanations.',
  },
  science: {
    name: 'Science Explanation',
    template: 'Explain the concept of {topic} in simple terms suitable for {grade} grade students. Include examples and real-world applications.',
  },
  vocabulary: {
    name: 'Vocabulary Builder',
    template: 'Create a vocabulary list of {count} words related to {topic} for {grade} grade students. Include definitions and example sentences.',
  },
  writing: {
    name: 'Creative Writing Prompt',
    template: 'Generate {count} creative writing prompts for {grade} grade students about {topic}. Make them engaging and age-appropriate.',
  },
};

const ContentGenerator = () => {
  const [template, setTemplate] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [performance, setPerformance] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateContent = async () => {
    if (!template || !topic || !grade) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setPerformance(null);
    setGeneratedImage(null);

    try {
      const startTime = window.performance.now();
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = PROMPT_TEMPLATES[template].template
        .replace('{topic}', topic)
        .replace('{grade}', grade)
        .replace('{count}', count);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const endTime = window.performance.now();
      setPerformance({
        generationTime: ((endTime - startTime) / 1000).toFixed(2),
        tokenCount: text.split(' ').length,
      });

      setResult(text);
    } catch (err) {
      setError(err.message || 'An error occurred while generating content');
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!topic) {
      setError('Please enter a topic first');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

      const prompt = `Create a child-friendly, educational illustration about ${topic} suitable for primary school students. The image should be colorful, engaging, and educational.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const imageData = response.image();
      
      setGeneratedImage(imageData);
    } catch (err) {
      setError(err.message || 'An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  const exportContent = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `content-${template}-${Date.now()}.txt`);
    }
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Generate Educational Content
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                label="Content Type"
              >
                {Object.entries(PROMPT_TEMPLATES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Space, Animals, Fractions"
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.2rem',
                  '& fieldset': {
                    borderColor: '#4ECDC4',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF6B6B',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Grade Level</InputLabel>
              <Select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                label="Grade Level"
              >
                {['1st', '2nd', '3rd', '4th', '5th'].map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade} Grade
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={generateContent}
              disabled={loading}
              sx={{ 
                mr: 2,
                background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF6B6B 40%, #4ECDC4 100%)',
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Content'}
            </Button>
            <Button
              variant="contained"
              onClick={generateImage}
              disabled={loading}
              sx={{ 
                mr: 2,
                background: 'linear-gradient(45deg, #4ECDC4 30%, #FF6B6B 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4ECDC4 40%, #FF6B6B 100%)',
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Image'}
            </Button>
            {result && (
              <Button 
                variant="outlined" 
                onClick={exportContent}
                sx={{ borderColor: '#4ECDC4', color: '#2c3e50' }}
              >
                Export Content
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {performance && (
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle2">
            Generation Time: {performance.generationTime}s | Token Count: {performance.tokenCount}
          </Typography>
        </Paper>
      )}

      {generatedImage && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Image
          </Typography>
          <Card>
            <CardMedia
              component="img"
              image={generatedImage}
              alt="Generated educational content"
              sx={{ maxHeight: 400, objectFit: 'contain' }}
            />
          </Card>
        </Paper>
      )}

      {result && (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Content
          </Typography>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ContentGenerator; 