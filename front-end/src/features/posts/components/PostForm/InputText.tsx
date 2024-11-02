import { Input } from '@mui/material'

interface InputProps {
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({placeholder, value, onChange}: InputProps): JSX.Element => {
    return (
            <Input type="text"value={value}  placeholder={placeholder} onChange={onChange} />
    )
}

export default InputText