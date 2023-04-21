import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import "@/styles/global.css";
// import { Inter } from "@next/font/google";

// const inter = Inter({
//   variable: "--font-inter",
// });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6 flex overflow-y-hidden">
        <Sidebar />
        <GlassPane className="h-screen w-screen flex justify-center items-center pl-6">
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
