import AuthLayout from "../components/Layout/AuthLayout";
import ExchangeCard from "../components/Cards/ExchangeCard";
import DayCard from "../components/Cards/DayCard";
import CommunityCard from "../components/Cards/CommunityCard";

export default function MainPage({user, setUser}) {
  return (
    <AuthLayout user={user}>
      <div className="flex flex-col gap-6 px-6 py-8">
        <ExchangeCard />
        <DayCard />
        <CommunityCard />
      </div>
    </AuthLayout>
  );
}
