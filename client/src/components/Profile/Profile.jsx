import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import '../css/DashboardPage.css';
import './Profile.css';
import { GET_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { getFromLocalStorage } from '../../utils/localStorage';

const Profile = () => {
    const [profilePicture, setProfilePicture] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fileInputRef = useRef(null);
    const token = getFromLocalStorage('id_token');
    let userId = null;
    
    try {
        userId = jwtDecode(token).data.id;
    } catch(e) {
        console.log("Error decoding token: ", e);
    }

    const { loading, data, error } = useQuery(GET_USER, {
        variables: { id: userId },
        fetchPolicy: 'network-only',
        skip: !userId,
    });

    const user = data?.user;    
    
    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 2097152; // 2MB

        if (file && file.size > maxSize) {
            alert('File is too large! Please select an image under 2MB.');
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePicture(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEditButtonClick = () => {
        fileInputRef.current.click();
    };

    if (loading)
        return <div>Loading...</div>;


    if (error)
        return <div>Error!</div>;

    return (
        <Row className='profile'>
            <Col sm={2} className='profile-picture-upload'>
                <div>
                    {!profilePicture && (
                        <label htmlFor="profile-picture-upload" className='profile-picture-button'>
                            Upload Photo
                        </label>
                    )}
                    {(profilePicture && (
                        <>
                            <img
                                className="rounded-circle"
                                style={{ width: '80px' }}
                                src={profilePicture}
                                alt="Profile" />
                            <button
                                className='profile-picture-edit-button'
                                onClick={handleEditButtonClick}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </>
                    ))}
                    <input
                        id="profile-picture-upload"
                        type="file"
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                        hidden
                        ref={fileInputRef}
                    />
                </div>
            </Col>
            <Col sm={10}>
                <div>
                    <h2>Name: {firstName} {lastName}</h2>
                    <h4>Email: {email}</h4>
                </div>
            </Col>
        </Row>
    );
};

export default Profile;
