const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow text-center">
        <h2 className="text-xl font-pretendard font-semibold mb-4">Fuwari Log 로그인</h2>
        <button
          onClick={handleLogin}
          className="px-6 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Google로 로그인하기
        </button>

      </div>
    </div>
  );
};

export default LoginPage;
