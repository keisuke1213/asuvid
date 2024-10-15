"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { updateInfo } from "@/app/serverAction/updateInfo";
import { InfoContainer } from "@/app/types/infoType";
import { LoadingButton } from "@mui/lab";

export const EditInfo: FC<InfoContainer> = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState<Dayjs | null>(
    info.deadline ? dayjs(info.deadline) : null
  );
  const [dates, setDates] = useState<Dayjs[]>(
    info.dates && info.dates.length > 0
      ? info.dates.map((item) => dayjs(item.date))
      : []
  );

  const addDateField = () => {
    setDates([...dates, dayjs()]);
  };

  const removeDateField = (index: number) => {
    const newDates = dates.filter((_, i) => i !== index);
    setDates(newDates);
  };

  const [type, setType] = useState<string>(info.type);
  console.log(type);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  console.log(type);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("type", type);

    if (deadline) {
      formData.append("deadline", deadline.toISOString());
    }
    dates.forEach((date) => {
      formData.append(`dates`, date.toISOString());
    });

    await updateInfo(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: 300,
        margin: "0 auto",
        mt: 4,
        mb: 5,
      }}
    >
      <input type="hidden" name="id" value={info.id} />
      <Typography variant="h5" component="h2" gutterBottom>
        編集
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">カテゴリ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            defaultValue={info.type}
            label="カテゴリ"
            onChange={handleChange}
          >
            <MenuItem value={"RECRUITMENT"}>活動募集</MenuItem>
            <MenuItem value={"CONTACT"}>お知らせ</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        name="name"
        variant="outlined"
        label="タイトル"
        fullWidth
        defaultValue={info?.name}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {dates.map((date, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <DemoItem label={`日時 ${index + 1}`}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  const newDates = [...dates];
                  newDates[index] = newValue || dayjs();
                  setDates(newDates);
                }}
              />
            </DemoItem>
            <Button
              onClick={() => removeDateField(index)}
              variant="outlined"
              color="error"
            >
              削除
            </Button>
          </Box>
        ))}
        <Button
          onClick={addDateField}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          日付を追加
        </Button>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="締め切り">
          <DatePicker
            value={deadline}
            defaultValue={dayjs(info?.deadline)}
            onChange={(newValue) => setDeadline(newValue)}
          />
        </DemoItem>
      </LocalizationProvider>

      <TextField
        name="content"
        variant="outlined"
        label="内容"
        fullWidth
        defaultValue={info?.content}
        multiline
        rows={4}
      />
      <TextField
        name="formUrl"
        variant="outlined"
        label="URL"
        fullWidth
        defaultValue={info?.formUrl}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
      >
        編集
      </LoadingButton>
    </Box>
  );
};
