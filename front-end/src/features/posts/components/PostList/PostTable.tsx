import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PostTableRow from './PostTableRow';
import { useEffect, useState } from 'react';

interface PostTableProps {
    posts: any[];
    selectedPosts: number[];
    onSelectPost: (id: number) => void;
    onEditPost: (id: number) => void;
    onDeletePost: (id: number) => void; 
}

const PostTable = ({ posts, selectedPosts, onSelectPost, onEditPost, onDeletePost }: PostTableProps) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    useEffect(() => {
        setShowCheckboxes(selectedPosts.length > 0);
    }, [selectedPosts]);

    const handleRowClick = (id: number) => {
        onSelectPost(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {showCheckboxes && <TableCell>Select</TableCell>}
                        <TableCell>Posts</TableCell>
                        {/* <TableCell>Date</TableCell> */}
                        <TableCell></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostTableRow
                                key={post.id}
                                post={post}
                                isSelected={selectedPosts.includes(post.id)}
                                onSelect={() => handleRowClick(post.id)}
                                onEdit={() => onEditPost(post.id)}
                                onDelete={() => onDeletePost(post.id)}
                                showCheckbox={showCheckboxes}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No posts available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PostTable;