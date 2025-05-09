import Sidebar from "../SideBar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 min-w-[180px] bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
