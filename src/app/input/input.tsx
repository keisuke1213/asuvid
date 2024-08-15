"use client";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { create } from "./create";
import { SubmitButton } from "../common/submitButton";

export const Input = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          投稿フォーム
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <form action={create}>
            <TextField
              fullWidth
              name="name"
              label="ボランティア名"
              type="text"
              margin="normal"
            />
            <TextField
              fullWidth
              name="date"
              label="日時"
              type="datetime-local"
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
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              name="formUrl"
              label="募集フォームのURL"
              type="text"
              margin="normal"
            />
            <Box textAlign="center" mt={2}>
              <SubmitButton option={"送信"} />
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
