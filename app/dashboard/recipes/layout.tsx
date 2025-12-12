
import "../../globals.css";

export default function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full ">
      <main className="md:flex-1   ">
        <div className="space-y-6">{children}</div>
      </main>
    </main>
  );
}
