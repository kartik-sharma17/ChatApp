"use client"
import { toast, Toaster } from 'sonner'
import { Navbar } from "@/app/@components";
import { useEffect } from "react";
import { Socket } from "@/app/webSocket";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    Socket.on("messageNotification", ({ fromName }) => {
      toast.success(<span>
        Received a message from <strong>{fromName}</strong>
      </span>)
    })

    return () => {
      Socket.off("messageNotification");
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
