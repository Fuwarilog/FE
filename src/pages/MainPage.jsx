import AuthLayout from "../components/Layout/AuthLayout";
import MainLayout from "../components/Layout/MainLayout";
import ExchangeCard from "../components/Cards/ExchangeCard";
import CommunityCard from "../components/Cards/CommunityCard";

export default function MainPage({ user }) {
  return (
    <AuthLayout user={user}>
      <MainLayout>
        <div className="flex flex-col gap-6 px-6 py-8">
          <ExchangeCard />
          <CommunityCard />
        </div>
      </MainLayout>
    </AuthLayout>
  );
}
