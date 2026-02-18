import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("dev-auth-role")?.value as string;

  if (!role) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full bg-secondary/50">{children}</div>
  );
}
