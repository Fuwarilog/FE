
const MainLayout = ({ children }) => {
 return (
    <div className="min-h-screen flex bg-white text-gray-700 font-pretendard">
      {/* Main Content */}
      <main className="flex-1 px-10 py-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>

      </main>
    </div>
  );
};

export default MainLayout;
