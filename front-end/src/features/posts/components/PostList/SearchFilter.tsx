import { Search } from '@mui/icons-material'; // Импортируем иконку

interface SearchFilterProps {
    searchQuery: string;
    statusFilter: string;
    setSearchQuery: (query: string) => void;
    setStatusFilter: (status: string) => void;
    
}

const SearchFilter = ({ searchQuery, statusFilter, setSearchQuery, setStatusFilter }: SearchFilterProps) => {
    return (
        <div className="search-container">

            <div className="search-input-container">
                <Search className="search-icon" />
                <input
                    type="text"
                    // placeholder="Search by content"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="custom-input"
                />
            </div>

            <div className="custom-select-container">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="custom-select"
                >
                    <option value="">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="custom-select-container">
                <select className="custom-select">

                    <option value="">Linked In</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google</option>

                </select>
            </div>
        </div>
    );
};

export default SearchFilter;