import React from 'react';
import AuthInput from '../../partials/AuthInput';
import AuthBtn from '../../partials/AuthBtn';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { apiBaseUrl } from '../../../config.json';

/**
 * @function ForgetPassword
 * @description this is the statful component of the forget password page
 * @param {email} email - the email of the user
 * @returns {Component} the Component of the forget password page
 */

export default function ForgetPasswordCard() {
    //to check if the email is valid or not
    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const [email, setEmail] = React.useState('');
    const history = useNavigate();

    //check if the email is empty
    const [emptyEmail, setEmptyEmail] = React.useState(false);
    //check if recaptcha is checked or not
    const [reCAPTCHAFlag, setReCAPTCHAFlag] = React.useState(false);
    const [ReCAPTCHAIsClicked, setReCAPTCHAIsClicked] = React.useState(false);
    //check if the email is not a valid email
    const [emailEnteredIsTrue, setEmailEnteredIsTrue] = React.useState(false);

    //we are in page for forget password waiting page
    const [weAreInForgetPassPage, setWeAreInForgetPassPage] =
        React.useState(true);
    const handleCancel = () => {
        history('/login');
    };

    const handleDone = () => {
        history('/');
    };

    const recaptchaCallback = () => {
        setReCAPTCHAFlag(true);
    };

    const handleResetPassword = () => {
        //empty email is true so we will show error message
        if (email.length === 0) {
            setEmptyEmail(true);
            setReCAPTCHAIsClicked(false);
            setEmailEnteredIsTrue(false);
            return false;
        }
        //Recaptcha is not clicked so we will show error message
        else if (!reCAPTCHAFlag) {
            setReCAPTCHAIsClicked(true);
            setEmailEnteredIsTrue(false);
            setEmptyEmail(false);
            return false;
        }
        //enter email is false so we will show error message or not in database
        else if (validateEmail(email) === false) {
            setEmailEnteredIsTrue(true);
            setEmptyEmail(false);
            setReCAPTCHAIsClicked(false);
            return false;
        }
        return true;
    };

    const emailInDtaBase = email => {
        if (handleResetPassword() === true) {
            axios({
                method: 'post',
                url: `${apiBaseUrl}/forget-password`,
                data: {
                    email: email
                }
            })
                .then(res => {
                    if (res.status === 201) {
                        setEmailEnteredIsTrue(true);
                        setWeAreInForgetPassPage(false);
                        setReCAPTCHAIsClicked(false);
                        setReCAPTCHAFlag(false);
                        setEmptyEmail(false);
                    } else {
                        setEmailEnteredIsTrue(false);
                    }
                })
                .catch(() => {
                    setEmailEnteredIsTrue(false);
                });
        }
    };
    return (
        <div className="LoginCard">
            <div className="LoginCard__logo-container">
                <p className="LoginCard__logo">cmplr</p>
            </div>
            <div className="login-form">
                {weAreInForgetPassPage && (
                    <AuthInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="text-field"
                        id="forget-password-email"
                        value={email}
                        setValue={setEmail}
                        dataTestid="email-forget-password"
                    ></AuthInput>
                )}

                {emptyEmail && (
                    <div className="form-msg">
                        <p
                            data-testid="empty-msg-err"
                            style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                padding: '0'
                            }}
                        >
                            please enter your email address
                        </p>
                    </div>
                )}
                {ReCAPTCHAIsClicked && (
                    <div className="form-msg">
                        <p
                            data-testid="recapatch-error-msg"
                            style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                padding: '0'
                            }}
                        >
                            There was an error submitting your request
                        </p>
                    </div>
                )}
                {emailEnteredIsTrue && weAreInForgetPassPage && (
                    <div className="form-msg">
                        <p
                            data-testid="invalid-email"
                            style={{ textAlign: 'center' }}
                        >
                            Sorry, that email address is not registered with us
                        </p>
                        <p>
                            Please try again or
                            <a href="/register"> register a new account.</a>
                        </p>
                    </div>
                )}
                {weAreInForgetPassPage && (
                    <div
                        onClick={recaptchaCallback}
                        data-testid="recaptcha"
                        className="ReCAPTCHA"
                    >
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={recaptchaCallback}
                        />
                    </div>
                )}

                {!weAreInForgetPassPage && (
                    <div data-testid="confirmation-msg" className="show-msg">
                        <div className="form-msg">
                            <p style={{ textAlign: 'center' }}>
                                We&apos;ve sent you an email with instructions
                                to reset your password.
                            </p>
                            <p>
                                Please make sure it didn&apos;t wind up in your
                                Junk Mail. If you aren&apos;t receiving our
                                password reset emails, see our
                                <a href="https://tumblr.zendesk.com/hc/en-us/articles/226167067-Resetting-your-password">
                                    {' '}
                                    help documents.
                                </a>
                            </p>
                        </div>
                        <AuthBtn
                            id="done"
                            text="Done"
                            color="#001124"
                            handleClick={handleDone}
                        ></AuthBtn>
                    </div>
                )}
                {weAreInForgetPassPage && (
                    <div className="buttons-box">
                        <AuthBtn
                            dataTestid="cancel-btn"
                            id="cancel"
                            text="Cancel"
                            color="#001124"
                            handleClick={handleCancel}
                        ></AuthBtn>
                        <AuthBtn
                            id="reset-password"
                            text="Reset Password"
                            color="#FF0000"
                            handleClick={() => emailInDtaBase(email)}
                            dataTestid="reset-password-btn"
                        ></AuthBtn>
                    </div>
                )}
            </div>
        </div>
    );
}
