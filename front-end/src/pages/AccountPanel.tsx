import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AccountPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isChanged, setIsChanged] = useState(false)

    const nameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem("userEmail")

    const togglePanel = () => {
        setIsOpen((prev) => !prev);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5001/api/profiles/update/${userId}`,
                {
                    firstName: nameRef.current?.value,
                    lastName: lastNameRef.current?.value
                },
                {
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                const { first_name, last_name } = response.data.updatedProfile;

                setFirstName(first_name);
                setLastName(last_name);
                setIsChanged(false)

                localStorage.setItem('firstName', first_name);
                localStorage.setItem('lastName', last_name);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = () => {
        setIsChanged(true); // Set change state on input change
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5001/api/profiles/get/${userId}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    const { first_name, last_name } = response.data;

                    if (nameRef.current) nameRef.current.value = first_name;
                    if (lastNameRef.current) lastNameRef.current.value = last_name;

                    setFirstName(first_name);
                    setLastName(last_name);
                    setIsChanged(false); // Reset change state
                    
                    localStorage.setItem('firstName', first_name);
                    localStorage.setItem('lastName', last_name);
                    console.log("storage=>", localStorage)
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (isOpen) fetchProfile();
    }, [isOpen, userId]);

    return (
        <>
            <div onClick={togglePanel} className="settings-button">Account Settings</div>
            {isOpen && <div className="overlay" onClick={togglePanel}></div>}

            <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
                <div style={{ borderBottom: "1px solid rgb(231, 231, 231)", padding: "17px 32px", fontSize: "20px", fontWeight: "bold" }}>Account Settings</div>

                <div style={{ padding: "24px", display: "flex", justifyContent: "flex-start", gap: "24px", alignItems: "center" }}>
                    <div className="profile-picture"style={{ padding: "0", width: "72px", height: "72px" }}></div>
                    <div style={{ padding: "0" }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0", marginBottom:"5px" }}>{firstName} {lastName}</p>
                        <p style={{ fontSize: "14px", margin: "0" }}>{userEmail}</p>
                    </div>
                </div>

                <ul className='settings-panel-nav'>
                    <li>Account</li>
                    <li>Platforms</li>
                </ul>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ marginBottom: "24", fontSize: "18px", padding: "0" }}>Basic Information</div>
                    <form onSubmit={handleFormSubmit} style={{ display: "flex", gap: "24px", flexDirection: "column" }}>
                        <div style={{display:"flex", gap:"20px", padding:"0"}}>
                            <div style={{ width: "100%", padding: "0" }}>
                                <label>Name</label>
                                <input
                                    className='user-request-input'
                                    type="text"
                                    placeholder='Name'
                                    ref={nameRef}
                                    onChange={handleInputChange} // Track changes
                                    style={{ width: "100%", padding: "11px 12px", boxSizing: "border-box", margin: "10px 0", borderRadius: "10px" }}
                                />
                            </div>
                            <div style={{ width: "100%", padding: "0" }}>
                                <label>Last Name</label>
                                <input
                                    className='user-request-input'
                                    type="text"
                                    placeholder='Last Name'
                                    ref={lastNameRef}
                                    onChange={handleInputChange} // Track changes
                                    style={{ width: "100%", padding: "11px 12px", boxSizing: "border-box", margin: "10px 0", borderRadius: "10px" }}
                                />
                            </div>
                        </div>
                        
                        {isChanged && ( // Conditionally render the button
                            <button type="submit" style={{ marginTop: "12px", border: "1px solid #e7e6e6", backgroundColor: "white", padding: "5px 10px", borderRadius: "5px", alignSelf: "flex-end" }}>
                                Save
                            </button>
                        )}
                    </form>

                    <div style={{ padding: "0", margin: "0", fontSize: "18px", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <span>Security</span>
                        <div style={{ padding: "0" }}>
                            <p style={{ margin: "0", marginBottom:"5px" }}>E-mail</p>
                            <p style={{ margin: "0" }}>{userEmail}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0" }}>
                            <div style={{ padding: "0" }}>
                                <p style={{ margin: "0", marginBottom: "5px"  }}>Password</p>
                                <p style={{ margin: "0" }}>********</p>
                            </div>
                            <button style={{ margin: "0", border:"1px solid #e7e6e6", backgroundColor:"white", padding:"5px 10px", borderRadius:"5px" }}>Change Password</button>
                        </div>
                    </div>
                </div>

                <button
                    style={{ position: "absolute", top: "12px", left: "-16px", width: "32px", height: "32px", padding: "0", margin: "0", backgroundColor:"white", border:"2px solid rgb(231, 231, 231)", borderRadius:"5px" }}
                    onClick={togglePanel}
                >
                    x
                </button>
            </div>
        </>
    );
};

export default AccountPanel;