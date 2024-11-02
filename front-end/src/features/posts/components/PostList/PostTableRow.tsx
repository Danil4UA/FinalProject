import { TableRow, TableCell, Checkbox, Tooltip, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


interface PostTableRowProps {
    post: any;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
    showCheckbox?: boolean;
}

const PostTableRow = ({ post, isSelected, onSelect, onEdit, onDelete, showCheckbox }: PostTableRowProps) => {
    return (
        <TableRow hover selected={isSelected} onClick={onSelect} 
        sx={{ 
            
            '&:hover': { backgroundColor: '#f5f5f5' },
            // padding: 0
            
            }}>
            {showCheckbox && (
                <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={isSelected} onChange={onSelect} />
                </TableCell>
            )}
            <TableCell>
                <Tooltip title={post.content} arrow>
                    <Typography variant="body2" noWrap>
                        {post.content.length > 50 ? `${post.content.slice(0, 140)}...` : post.content}
                    </Typography>
                </Tooltip>
            </TableCell>
            {/* <TableCell>{post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'Not selected'}</TableCell> */}
            <TableCell align="right">
                <IconButton
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    sx={{
                        color: '#0056b3',
                        border: '1px solid #0056b3',
                        borderRadius: '4px',
                        '&:hover': {
                            color: 'rgba(30, 144, 255, 0.9)',
                            borderColor: 'rgba(30, 144, 255, 0.5)',
                            backgroundColor: 'rgba(30, 144, 255, 0.1)',
                        },
                    }}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    sx={{
                        color: 'rgba(255, 99, 71, 0.7)',
                        border: '1px solid rgba(255, 99, 71, 0.3)',
                        borderRadius: '4px',
                        '&:hover': {
                            color: 'rgba(255, 69, 0, 0.9)',
                            borderColor: 'rgba(255, 69, 0, 0.5)',
                            backgroundColor: 'rgba(255, 235, 238, 0.3)',
                        },
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default PostTableRow;