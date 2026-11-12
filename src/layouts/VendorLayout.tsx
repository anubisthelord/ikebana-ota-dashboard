
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';

import Header from '../components/layout/header/Header';
import Sidebar from '../components/layout/Sidebar';

const VendorLayout: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const handleAddHotel = () => {
    if (!vendorId) return;
    navigate(`/vendor/${vendorId}/hotels/new`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F7FC]">
      <Sidebar title="Ikebana OTA" />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          showSearch={true}
          showAction={true}
          actionLabel="Add Hotel"
          actionIcon={<Plus className="h-4 w-4" />}
          onAction={handleAddHotel}
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

export default VendorLayout;
