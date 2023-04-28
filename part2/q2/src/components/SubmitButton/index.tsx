import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function SubmitButton({ children, ...rest }: ButtonProps) {
    return (
        <button className={styles.submitButton} type="submit" {...rest}>
            {children}
        </button>
    );
}
