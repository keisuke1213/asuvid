"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';

type Info = {
    id: number;
    name: string;
    date: string;
    deadline: string;
    formUrl: string;
};

export const DisplayInfo = () => {
    const [info, setInfo] = useState<Info[]>([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchInfo = async () => {
        try {
            const response = await axios.get('/api/getData');
            console.log(response.data);
            setInfo(response.data);
        } catch (error: any) {
            setError(error.message);
        }
        };
    
        fetchInfo();
    }, []);
    
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                ボランティア情報一覧
                </Typography>
                <Grid container spacing={3}>
                {info.map((info) => (
                <Grid item xs={12} sm={6} md={4} key={info.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                    {info.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    日時: {info.date}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    締め切り: {info.deadline}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    フォームURL: {info.formUrl}
                    </Typography>
                </Paper>
                </Grid>
                ))}
                </Grid>
            </Box>
        </Container>
    );
    }