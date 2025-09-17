
import React from 'react';
import { MapsHeader, MapsSidebar, MapsMainContent, MapsRightSidebar } from './maps';

// --- MOCK DATA ---
const sidebarNavItems = [
  { label: 'This week', active: true },
  { label: 'Acdnocatiov', active: false },
  { label: 'Achinatory', active: false },
  { label: 'Tastatorve', active: false },
  { label: 'Toroctinnes', active: false },
  { label: 'Thu Coumetoy', active: false },
];

const BlankPage: React.FC = () => {
  const consistencyStreak = 8;

  return (
    <section className="w-full animate-fade-in-up">
      <div className="mx-auto max-w-[95rem] px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Top Header Section */}
        <MapsHeader consistencyStreak={consistencyStreak} />

        {/* Divider */}
        <div className="border-t border-light-secondary my-4"></div>

        {/* --- THREE COLUMN LAYOUT --- */}
        <div className="grid grid-cols-12 gap-8 py-8">
          <MapsSidebar navItems={sidebarNavItems} />
          <MapsMainContent />
          <MapsRightSidebar />
        </div>
      </div>
    </section>
  );
};

export default BlankPage;
