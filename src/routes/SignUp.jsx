import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row } from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';
import { useGoogleLogin } from '@react-oauth/google';
import googleIcon from "/home/tarvis/Documents/software_projects/fit+together-v2/frontend/src/assets/icons8-google-32.png"

function UserSignUp() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Initial form state
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [formState, setFormstate] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
        firstName: "",
        lastName: ""
    });

    // Handler to update form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormstate(state => ({
            ...state,
            [name]: value
        }));
    }

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // Handle signup submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        const { username, password, passwordCheck, email, firstName, lastName } = formState;

        try {
            if (password !== passwordCheck) {
                throw new Error("Passwords must match");
            }

            // Prepare form data for submission
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);

            if (profileImage) {
                formData.append("image", profileImage);
            }

            const signupResponse = await ApiHandler.SignUp(formData);
            console.log("Signup response:", signupResponse);
            if (signupResponse) {
                login(signupResponse.token);
                navigate('/'); // success, go to homepage
            }
        } catch (error) {
            console.log("Caught error in handleSignUp:", error);
            const serverMessage = error.message || "Signup failed.";
            setErrorMessage(serverMessage);
        }
    };

    // Google Sign-In success handler
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const loginResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ access_token: tokenResponse.access_token })
                });

                const data = await loginResponse.json();
                if (data.authToken) {
                    login(data.authToken);
                    navigate('/');
                } else {
                    setErrorMessage('Google Sign-In failed');
                }
            } catch (error) {
                console.error('Google sign-in error:', error);
                setErrorMessage('Error during Google Sign-In');
            }
        },
        onError: () => {
            setErrorMessage("Google Sign-In failed");
        }
    });

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className="p-3 border rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
                <h2 className="text-center">Sign Up</h2>

                {/* Display error messages to the user */}
                {errorMessage && (
                    <div className="alert alert-danger text-center" role="alert">
                        {errorMessage}
                    </div>
                )}

                <Form onSubmit={handleSignUp}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formState.username}
                                placeholder="Enter Username"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formState.email}
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formState.password}
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPasswordCheck">
                            <Form.Label>Re-enter password</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordCheck"
                                value={formState.passwordCheck}
                                placeholder="Re-enter password"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='text'
                                name="firstName"
                                value={formState.firstName}
                                placeholder="John"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='text'
                                name="lastName"
                                value={formState.lastName}
                                placeholder="Doe"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {preview && <img src={preview} alt="Preview" className="mt-2" width="100" />}
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button className="justify-content-center align-items-center" variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                <hr/>
                {/* Custom Google Sign-In Button */}
                <div className="d-grid gap-2">
                    <Button
                        className="justify-content-center align-items-center" 
                        variant="outline-primary" 
                        type="submit"
                        width="100%"
                        onClick={googleLogin}
                    >
                        <span>
                            <img src={googleIcon} alt="" height="20px" width="20px"/>
                        </span>
                        Sign up with Google
                    </Button>
                </div>

            </div>
        </Container>
    );
}

export default UserSignUp;
