
import React from 'react';
import { SidebarNavItem } from '../ui';

interface NavItem {
    label: string;
    active: boolean;
}

interface MapsSidebarProps {
    navItems: NavItem[];
}

export const MapsSidebar: React.FC<MapsSidebarProps> = ({ navItems }) => {
    return (
        <aside className="col-span-2 space-y-4">
            {navItems.map(item => <SidebarNavItem key={item.label} {...item} />)}
            <div className="pt-8">
                <SidebarNavItem label="Orrget Neehy" active={false} />
            </div>
            <div className="pt-8">
                <SidebarNavItem label="This week" active={false} />
            </div>
        </aside>
    );
};
