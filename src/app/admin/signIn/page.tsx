"use client";
import { signin } from "@/app/serverAction/auth";
import { useFormState } from "react-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

export default function SignupForm() {
  const [state, action, pending] = useFormState(signin, undefined);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        管理者ログイン
      </Typography>
      <form action={action}>
        <TextField
          label="メールアドレスを入力してください。"
          variant="outlined"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          placeholder="Email"
        />
        {state?.errors?.email && (
          <Typography color="error">{state.errors.email}</Typography>
        )}
        <TextField
          label="パスワードを入力してください。"
          variant="outlined"
          fullWidth
          margin="normal"
          id="password"
          name="password"
          type="password"
        />
        {state?.errors?.password && (
          <Box sx={{ color: "error.main" }}>
            <Typography>Password must:</Typography>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </Box>
        )}
        <input type="hidden" name="admin" value="admin" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={pending}
          sx={{ mt: 2 }}
        >
          ログイン
        </Button>
      </form>
    </Container>
  );
}
