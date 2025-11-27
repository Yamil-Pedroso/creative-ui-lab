import "./globals.css";
import Header from "@/components/layout/Header";
import AuthProvider from "@/components/provider/AuthProvider";
import WelcomeModal from "@/components/common/welcome-message/WelcomeModal";

export const metadata = {
  title: "Zenwave Meditation",
  description: "Relaxation & Focus App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-purple-900 to-blue-900 text-white">
        <WelcomeModal />
        {/* Client wrapper */}
        <AuthProvider>
          <Header />
          <main className="pt-24">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
