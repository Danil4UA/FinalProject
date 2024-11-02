import { TextField, Box } from "@mui/material";

interface PostDateTimePickerProps {
  publishDate: string;
  publishTime: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostDateTimePicker = ({ publishDate, publishTime, onDateChange, onTimeChange }: PostDateTimePickerProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <TextField
        label="Publish Date"
        type="date"
        value={publishDate}
        onChange={onDateChange}
        sx={{ mr: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Publish Time"
        type="time"
        value={publishTime}
        onChange={onTimeChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default PostDateTimePicker;