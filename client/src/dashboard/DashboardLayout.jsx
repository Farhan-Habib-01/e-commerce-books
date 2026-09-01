import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col md:flex-row">
        <aside className="w-full shrink-0 md:sticky md:top-0 md:h-[calc(100vh-84px)] md:w-64">
          <div className="h-full overflow-y-auto">
            <SideBar />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;