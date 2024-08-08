"use client";
import { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export const Input = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'date') {
      setDate(value);
    } else if (name === 'deadline') {
      setDeadline(value);
    } else if (name === 'formUrl') {
      setFormUrl(value);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post('/api/createData', {
        name,
        date,
        deadline,
        formUrl,
      });
    } catch (error: any) {
      setError(error.message);
    }
    setName('');
    setDate('');
    setDeadline('');
    setFormUrl('');
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ボランティア情報管理
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="ボランティア名"
              value={name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="date"
              label="日時"
              type="datetime-local"
              value={date}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              name="deadline"
              label="募集期限"
              type="datetime-local"
              value={deadline}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              name="formUrl"
              label="募集フォームのURL"
              value={formUrl}
              onChange={handleInputChange}
              margin="normal"
            />
            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                追加
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
