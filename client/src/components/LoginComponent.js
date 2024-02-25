import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usernameInput, setUserName] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [usernameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        handleFetchData();
    }, []); 

    const handleFetchData = async () => {
        try {
            const response = await fetch('/auth/login');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setUserName(data.username);
            setPassword(data.password);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error, e.g., set an error state
        }
    };    

    const onButtonClick = () => {
        handleLogin();
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usernameInput, passwordInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (response.status === 200) {
                console.log('Login successful:', data);
                const { userDocument } = data;
                const userID = userDocument._id;
                navigate(`/users/find/${userID}`);
            } else if (response.status === 401) {
                console.log('Incorrect password');
                setPasswordError('Incorrect password');   
            } else if (response.status === 404) {
                console.log('User not found');
                setUserNameError('User not found');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={usernameInput}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUserName(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    type="password"
                    value={passwordInput}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
            </div>
        </div>
    );
}

export default Login;
