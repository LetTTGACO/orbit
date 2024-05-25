import type React from "react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Header from "@/app/components/layout/header";
import Sidebar from "@/app/components/layout/sidebar";
import { Toaster } from '@/app/components/ui/toaster';
import Providers from "@/app/components/layout/providers";
import NextTopLoader from "nextjs-toploader";

export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 在服务端获取当前路由
  const session = await getServerAuthSession();
  if (!session?.user) {
    // 如果不是首页，则重定向到首页
    // 重定向到登录页
    redirect(`/`) // Navigate to the new post page
  }
  return (
    <>
      <NextTopLoader />
      <Providers session={session}>
        <Toaster />
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">{children}</main>
        </div>
      </Providers>

    </>
  );
}
