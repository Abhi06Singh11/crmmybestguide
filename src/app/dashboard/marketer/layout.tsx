
import MarketerNav from '@/components/dashboard/marketer-nav';

export default function MarketerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full space-y-6">
      <MarketerNav />
      {children}
    </div>
  );
}
