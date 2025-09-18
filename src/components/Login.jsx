import React, { useState, useEffect } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
} from 'reactstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const validate = (name, value) => {
        let error = null;

        if (name === 'email') {
            if (!value) error = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(value)) error = errorMessages.email;
        }

        if (name === 'password') {
            if (!value) error = 'Password is required';
            else if (value.length < 4) error = errorMessages.password;
        }

        return error;
    };

    const handleChange = (event) => {
        let { name, value, type } = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        setForm({ ...form, [name]: value });
        const error = validate(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    useEffect(() => {
        const noErrors = Object.values(errors).every((err) => !err);
        const allFilled = form.email && form.password && form.terms;
        setIsValid(noErrors && allFilled);
    }, [form, errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;
        axios
            .get('https://68cc2efa716562cf5076c520.mockapi.io/login')
            .then((res) => {
                const user = res.data.find(
                    (item) => item.password == form.password && item.email == form.email
                );
                if (user) {
                    setForm(initialForm);
                    navigate('/success')
                } else {
                    navigate('/error');
                }
            });
    };

    return (
        <div className="login-container" >
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        data-testid="email-input"
                        id="exampleEmail"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={handleChange}
                        value={form.email}
                        invalid={!!errors.email}
                    />
                    {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        data-testid="password-input"
                        id="examplePassword"
                        name="password"
                        placeholder="Enter your password "
                        type="password"
                        onChange={handleChange}
                        value={form.password}
                        invalid={!!errors.password}
                    />
                    {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                </FormGroup>
                <FormGroup check>
                    <Input
                        data-testid="terms-checkbox"
                        id="terms"
                        name="terms"
                        checked={form.terms}
                        type="checkbox"
                        onChange={handleChange}
                    />{' '}
                    <Label htmlFor="terms" check>
                        I agree to terms of service and privacy policy
                    </Label>
                </FormGroup>
                <FormGroup className="text-center p-4">
                    <Button data-testid="submit-button" color="primary" disabled={!isValid}>
                        Sign In
                    </Button>
                </FormGroup>
            </Form>
        </div>

    );
}
