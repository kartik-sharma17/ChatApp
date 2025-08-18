import { Toaster } from 'sonner'
import { ChatBox, ChatArea } from "@/app/@components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-9 h-screen">
            {children}
            <Toaster richColors position="top-right" />
          </div>
          <div className="hidden md:col-span-3 md:block">
            <ChatBox />
          </div>
        </div>
      </body>
    </html>
  );
}
