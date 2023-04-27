import React, { useEffect, useState } from 'react';
import { User } from '../constants/types/User';
import styles from './index.module.css';
import { FaSpinner } from 'react-icons/fa';

// Create a ReactJS component that displays a list of users retrieved from the following API endpoint: https://jsonplaceholder.typicode.com/users. The component should display the user's name, email, and phone number. Use the fetch() method to retrieve the data from the API.
export default function UsersTable() {
    const [users, setUsers] = useState<Array<User>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setLoading(false);
                if (!res.ok) throw new Error('Could not fetch data.');

                return res.json();
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <div className={styles.tableWrapper}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.name}>Name</th>
                        <th className={styles.email}>Email</th>
                        <th className={styles.phone}>Phone</th>
                    </tr>
                </thead>

                <tbody>
                    {!loading &&
                        users.map((user) => {
                            return (
                                <tr key={user.email}>
                                    <td className={styles.name}>{user.name}</td>
                                    <td className={styles.email}>{user.email}</td>
                                    <td className={styles.phone}>{user.phone}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {loading && (
                <div className={styles.loading}>
                    <FaSpinner></FaSpinner>
                </div>
            )}
        </div>
    );
}
