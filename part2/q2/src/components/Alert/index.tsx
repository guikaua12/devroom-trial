import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';
import { FaExclamationCircle } from 'react-icons/fa';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    background?: boolean;
}

export default function Alert({ children, background = false, ...rest }: AlertProps) {
    return (
        <div className={`${styles.alert} ${styles.error} ${background ? styles.background : ''}`} {...rest}>
            <FaExclamationCircle /> {children}
        </div>
    );
}
