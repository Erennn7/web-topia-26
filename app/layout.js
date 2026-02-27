import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import ChatbotMock from "@/components/ChatbotMock";
import GamificationBar from "@/components/GamificationBar";
import PointsPopup from "@/components/PointsPopup";
import Providers from "@/components/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Lumis — Senior Services & Community Resources",
  description:
    "A centralized portal helping seniors aged 60+ and caregivers discover essential services, support programs, and community resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <Providers>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navbar />
            <GamificationBar />
            <main id="main-content" className="relative">{children}</main>
            <Footer />
            <AccessibilityToolbar />
            <ChatbotMock />
            <PointsPopup />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
