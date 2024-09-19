import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom'; 
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(true); 
    const [resetDialogVisible, setResetDialogVisible] = useState(false); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [verificationCode, setVerificationCode] = useState(''); 
    const [showVerificationCode, setShowVerificationCode] = useState(false); 

    const navigate = useNavigate(); 
    

    const handleSubmit = async () => {
        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else {
            setEmailError(''); 
        }

        if (!isValid) {
            return;
        }

        try {
            // await axios.post('https://auth-c7xw.onrender.com/auth/forgot-password', { email });
            setShowVerificationCode(true); 
        } catch (error) {
            setEmailError('An error occurred while sending the reset link');
        }
    };

    const handleVerificationSubmit = async () => {
        if (!verificationCode) {
            setEmailError('Verification code is required');
            return;
        }

        try {
            // await axios.post('https://auth-c7xw.onrender.com/auth/verify-code', { verificationCode });
            setVisible(false); 
            setResetDialogVisible(true); 
        } catch (error) {
            setEmailError('Invalid verification code');
        }
    };

    const handleResetPassword = async () => {
        let isValid = true;
        if (!newPassword || !confirmPassword) {
            setPasswordError('Both fields are required');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) {
            return;
        }

        try {
            // await axios.post('https://auth-c7xw.onrender.com/auth/reset-password', { newPassword, confirmPassword });
            setResetDialogVisible(false); 
            navigate('/'); 
        } catch (error) {
            setPasswordError('An error occurred while resetting the password');
        }
    };

    const handleCancel = () => {
        setResetDialogVisible(false);
        navigate('/'); 
    };

    return (
        <div className="forgot-password-container">
            <Dialog 
                header="Forgot Password" 
                visible={visible} 
                style={{ width: '30vw' }} 
                onHide={() => setVisible(false)} 
                className="glass-effect-dialog"
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="p-inputtext-sm"
                            />
                            <label htmlFor="email">Email</label>
                        </span>
                        {emailError && <small className="p-error">{emailError}</small>}
                    </div>

                    {showVerificationCode && (
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText 
                                    id="verification-code" 
                                    value={verificationCode} 
                                    onChange={(e) => setVerificationCode(e.target.value)} 
                                    className="p-inputtext-sm"
                                />
                                <label htmlFor="verification-code">Verification Code</label>
                            </span>
                        </div>
                    )}
                </div>

                <div className="submit-button">
                    {!showVerificationCode ? (
                        <Button 
                            label="Submit Email" 
                            className="p-button-rounded p-button-glass"
                            onClick={handleSubmit}
                        />
                    ) : (
                        <Button 
                            label="Submit Code" 
                            className="p-button-rounded p-button-glass"
                            onClick={handleVerificationSubmit}
                        />
                    )}
                </div>
            </Dialog>

            <Dialog 
                header="Reset Password" 
                visible={resetDialogVisible} 
                style={{ width: '30vw' }} 
                onHide={() => setResetDialogVisible(false)} 
                className="glass-effect-dialog"
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText 
                                id="new-password" 
                                type="password"
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                className="p-inputtext-sm"
                            />
                            <label htmlFor="new-password">New Password</label>
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText 
                                id="confirm-password" 
                                type="password"
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="p-inputtext-sm"
                            />
                            <label htmlFor="confirm-password">Confirm Password</label>
                        </span>
                    </div>
                    {passwordError && <small className="p-error">{passwordError}</small>} 
                </div>

                <div className="dialog-footer">
                    <Button 
                        label="Continue" 
                        className="p-button-rounded p-button-glass"
                        onClick={handleResetPassword}
                    />
                    <Button 
                        label="Cancel" 
                        className="p-button-rounded p-button-glass"
                        onClick={handleCancel} 
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default ForgotPassword;
