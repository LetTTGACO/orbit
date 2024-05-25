import type React from "react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function PageLayout({
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
  return children
}
