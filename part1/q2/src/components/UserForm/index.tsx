import React, { HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import SubmitButton from '../SubmitButton';
import { User } from '../../constants/types/User';

// Create a ReactJS component that displays a form for adding new users to the list. The form should include fields for the user's name, email, and phone number. When the user submits the form, the new user should be added to the list displayed in the component from Question 1. Use the POST method to add the new user to the API.

interface FormProps {
    onSubmit: (data: User) => any;
}

export default function UserForm({ onSubmit }: FormProps) {
    const [data, setData] = useState<User>({
        name: '',
        email: '',
        phone: '',
    });

    function resetData() {
        setData({
            name: '',
            email: '',
            phone: '',
        });
    }

    function onChange(e: any) {
        setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value } as User));
    }

    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data);
                resetData();
            }}
        >
            <Input id="name" label="Name" type="text" value={data.name} onChange={onChange} />
            <Input id="email" label="Email" type="email" value={data.email} onChange={onChange} />
            <Input id="phone" label="Phone" type="tel" value={data.phone} onChange={onChange} />
            <SubmitButton>Add</SubmitButton>
        </form>
    );
}
