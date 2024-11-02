import Logout from "./Logout";
import { useEffect, useRef } from "react";
import AccountPanel from "./AccountPanel";

interface UserInfoProps {
    onClose: ()=> void
    firstName: string
    lastName: string
}



const UserInfo = ({ onClose, firstName, lastName }: UserInfoProps): JSX.Element => {
    const userInfoRef = useRef<HTMLDivElement>(null);
    const userEmail = localStorage.getItem("userEmail")



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userInfoRef.current && !userInfoRef.current.contains(event.target as Node)) {
                onClose(); // Закрываем окно, если кликнули вне его
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Удаляем слушатель при размонтировании
        };
    }, [onClose]);


    return (
        <div className="user-info" ref={userInfoRef}>
            <div className="user-info-top">
                <div className="profile-picture"></div>

                <div className="profile-user-data">
                    <p style={{marginBottom:"5px", fontWeight:"bold" }}>{firstName} {lastName}</p>
                    <p>{userEmail}</p>
                </div>
            </div>
            



            <div className="user-info-bottom">
                <AccountPanel/>
                <Logout />
            </div>
           
        </div>
        
    );
};

export default UserInfo
