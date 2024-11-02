

interface DeletePostsButtonProps {
    disabled: boolean
    selectedPostsCount: number;
    onDelete: () => void;
}

const DeletePostsButton = ({ disabled, selectedPostsCount, onDelete }: DeletePostsButtonProps) => {
    if (selectedPostsCount === 0) return null;

    return (
        <button
            disabled={disabled}
            className='delete-button'
            onClick={onDelete} 

        >
            Delete Selected Posts
        </button>
    );
};

export default DeletePostsButton;