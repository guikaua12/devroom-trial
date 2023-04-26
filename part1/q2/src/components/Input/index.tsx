import React, { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function Input({ id, label, ...rest }: InputProps) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...rest} />
        </div>
    );
}
