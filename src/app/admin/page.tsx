"use client";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useFormState } from "react-dom";
import { sendMail } from "../serverAction/sendMail";
import { Header } from "../ui/header/Header";
import { usePathname } from "next/navigation";

const AdminPage = () => {
  const [state, action, pending] = useFormState(sendMail, undefined);
  const pathName = usePathname();
  console.log(pathName);

  return (
    <Box>
      <Header props={pathName!} />
      <Box maxWidth="sm" sx={{ mt: 5, mx: "auto" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          管理者を招待する
        </Typography>
        <form action={action}>
          <TextField
            label="メールアドレスを入力してください。"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
          />
          {state?.errors?.email && (
            <Box sx={{ color: "error.main" }}>{state.errors.email}</Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={pending}
            sx={{ mt: 2 }}
          >
            送信
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminPage;
