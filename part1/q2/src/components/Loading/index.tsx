import React from 'react';
import styles from './index.module.css';
import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <FaSpinner></FaSpinner>
        </div>
    );
}
