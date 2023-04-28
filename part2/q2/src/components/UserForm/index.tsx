import React, { HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import SubmitButton from '../SubmitButton';
import { User } from '../../constants/types/User';
import Loading from '../Loading';
import Alert from '../Alert';

// Create a ReactJS component that displays a form for adding new users to the list. The form should include fields for the user's name, email, and phone number. When the user submits the form, the new user should be added to the list displayed in the component from Question 1. Use the POST method to add the new user to the API.

interface FormProps {
    callback: (data: User) => any;
}

export default function UserForm({ callback }: FormProps) {
    const [data, setData] = useState<User>({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    function handleSubmit() {
        if (!data.name || !data.email || !data.phone) return;

        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Could not fetch data.');

                return res.json();
            })
            .then((data) => {
                callback(data);
                setError(undefined);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
        <div className={styles.formWrapper}>
            {error && <Alert background>{error}</Alert>}

            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    resetData();
                }}
            >
                <Input id="name" label="Name" type="text" value={data.name} onChange={onChange} />
                <Input id="email" label="Email" type="email" value={data.email} onChange={onChange} />
                <Input id="phone" label="Phone" type="tel" value={data.phone} onChange={onChange} />
                <SubmitButton disabled={loading}>Add {loading && <Loading />}</SubmitButton>
            </form>
        </div>
    );
}
