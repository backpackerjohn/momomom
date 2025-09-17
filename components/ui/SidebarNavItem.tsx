import React from 'react';
import { PlaceholderIcon } from '../icons';

export const SidebarNavItem: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
    <div className="flex items-center space-x-4 py-2 cursor-pointer group">
        <PlaceholderIcon />
        <span className={`text-text-on-light-muted group-hover:text-text-on-light-strong transition-colors ${active ? 'text-text-on-light-strong font-semibold' : ''}`}>{label}</span>
    </div>
);
