import { FormControl} from '@mui/material';

interface Props {
    label: string;
    name: string;
    options: string[];
    value: string;
    onChange: any
}

const PostCustomSelect = ({ name, options, value, onChange }: Props): JSX.Element => {
    return (
        <>
            <select name={name}value={value} onChange={onChange} className='custom-select generate-post-select'>

                {options.map((option) => (
                    <option key={option} value={option} >
                        {option}
                    </option>
                ))}
            </select>
        </>
    )
} 
    



export default PostCustomSelect;