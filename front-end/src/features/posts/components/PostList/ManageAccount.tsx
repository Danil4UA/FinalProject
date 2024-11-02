import { useSelectPosts } from "../../state/postsHooks.ts";
import { useNavigate } from 'react-router-dom';
import { deletePost, fetchPosts } from "../../state/postSlice.ts";
import { useAppDispatch } from "../../state/postsHooks.ts";
import { Snackbar, Box } from '@mui/material';
import SearchFilter from "./SearchFilter.tsx";
import PostTable from "./PostTable.tsx";
import DeletePostsButton from "./DeletePostsButton.tsx";
import { useState, useEffect } from "react";

const ManageAccount = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isDeleting, setIsDeleting] = useState(false); 
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const posts = useSelectPosts() || [];

    const handleSelectPost = (postId: number) => {
        setSelectedPosts((prev) => 
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
        );
    };

    const handleEdit = (postId: number) => {
        navigate(`/edit-post/${postId}`);
    };

    // 1 post deletion
    const handleDeletePost = async (postId: number) => {
        try {
            await dispatch(deletePost(postId));
            setOpenSnackbar(true);
            setSelectedPosts(prev => prev.filter(id => id !== postId));
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };
    
    // many posts deletion

    const handleDeletePosts = async () => {
        setIsDeleting(true); 
        try {
            await Promise.all(selectedPosts.map(id => dispatch(deletePost(id))));
            setSelectedPosts([]);
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Failed to delete posts:', error);
        }finally {
            setIsDeleting(false);
        }
    };

    const filteredPosts = posts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter ? post.status === statusFilter : true)
    );

    return (
        <div style={{display: "flex"}}>

            <div className="manage-account"> 
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={() => setOpenSnackbar(false)}
                            message="Posts deleted successfully"
                        />
                        
                        <SearchFilter 
                            searchQuery={searchQuery} 
                            statusFilter={statusFilter} 
                            setSearchQuery={setSearchQuery} 
                            setStatusFilter={setStatusFilter} 
                        />

                    <Box
                            sx={{
                                padding: '20px',          // Отступы внутри
                                backgroundColor: 'white', // Фон контейнера
                                borderRadius: '8px',       // Скругление углов
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Тень
                                marginBottom: '20px',      // Отступ снизу
                                textAlign: 'left'        // Выравнивание текста по центру
                            }}
            >
                
                    <PostTable 
                        posts={filteredPosts} 
                        selectedPosts={selectedPosts} 
                        onSelectPost={handleSelectPost} 
                        onEditPost={handleEdit} 
                        onDeletePost={handleDeletePost} 
                    />
                        </Box>
                    
                        <DeletePostsButton 
                            selectedPostsCount={selectedPosts.length} 
                            onDelete={handleDeletePosts} 
                            disabled={isDeleting}
                        />
            </div>
        </div>
        
    );
};

export default ManageAccount;


