import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';
import { FaExclamationCircle } from 'react-icons/fa';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function Alert({ children, ...rest }: AlertProps) {
    return (
        <div className={`${styles.alert} ${styles.error}`} {...rest}>
            <FaExclamationCircle /> {children}
        </div>
    );
}
