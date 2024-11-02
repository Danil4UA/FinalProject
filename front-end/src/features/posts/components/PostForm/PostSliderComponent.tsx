import { Slider, Typography } from '@mui/material';

interface Props {
    characthersCount: number;
    onSliderChange: (value: number) => void;
}

const PostSliderComponent = ({ characthersCount, onSliderChange }: Props): JSX.Element => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        event.preventDefault()
        onSliderChange(newValue as number);
    };

    return (
        <>
            <Typography gutterBottom>Approximate characters: <span>{characthersCount}</span></Typography>
            <Slider
                value={characthersCount}
                onChange={handleSliderChange}
                min={10}
                max={1000}
                step={10}
            />
        </>
    );
};

export default PostSliderComponent;