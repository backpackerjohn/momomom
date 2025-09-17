
import React from 'react';

export const LockIcon: React.FC<{ locked: boolean; className?: string }> = ({ locked, className = 'w-5 h-5' }) => {
    if (locked) {
        // A solid, filled lock icon when locked
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
        );
    }
    // An outlined lock icon when unlocked
    return (
       <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
        </svg>
    );
};
