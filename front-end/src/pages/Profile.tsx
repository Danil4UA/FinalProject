import { MoreVert } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import axios from 'axios';

interface ProfileProps {
    collapsed: boolean;
}

const Profile = ({ collapsed }: ProfileProps) => {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const userId = localStorage.getItem('userId');

    const toggleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("doing use effect...")
                const response = await axios.get(`http://localhost:5001/api/profiles/get/${userId}`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const { first_name, last_name } = response.data;
                    console.log("Profile fetched:", first_name, last_name);

                    setFirstName(first_name);
                    setLastName(last_name);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (userId) fetchProfile();
    }, [userId]);

    return (
        <>
            <div className="profile">
                <div className="profile-picture"></div>

                {!collapsed && (
                    <div className="profile-name">
                        {firstName}
                        <br />
                        {lastName}
                    </div>
                )}

                {!collapsed && (
                    <MoreVert className="settings-icon" onClick={toggleUserInfo} />
                )}
            </div>
            {showUserInfo && <UserInfo onClose={toggleUserInfo} firstName={firstName} lastName={lastName} />}
        </>
    );
};

export default Profile;