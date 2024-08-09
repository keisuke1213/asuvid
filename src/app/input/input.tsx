"use client";
import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Paper} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation'


export const Input = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
      setLoading(true);
      await axios.post('/api/createData', {
        name,
        date,
        deadline,
        formUrl,
      });
    } catch (error: any) {
      setError(error.message);
    }
    router.push('/');
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
              <LoadingButton variant="contained" color="primary" type="submit" loading={loading}> 
                追加
              </LoadingButton>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
