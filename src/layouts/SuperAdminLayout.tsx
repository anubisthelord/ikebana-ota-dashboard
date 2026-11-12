
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/header/Header';
import Sidebar from '../components/layout/Sidebar';

const SuperAdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F7FC]">
      <Sidebar title="Ikebana OTA" />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          showSearch={true}
          showAction={false}
          showAI={true}
          showNotifications={true}
          showProfile={true}
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
