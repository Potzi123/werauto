import * as React from "react";
import Link from "next/link";
import { Home, BarChart2, ChevronUp } from "lucide-react";
import { signOut } from "@/utils/auth";
import { getUserName } from "@/utils/getUserName";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BarChart2, label: "Statistics", href: "/statistics" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const name = await getUserName();
      setUserName(name);
      setIsLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAccount = () => {
    router.push("/account");
  };

  const handleGroupes = () => {
    router.push("/groupe");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
        <Image src="/logo.svg" alt="Wer Auto Logo" width={80} height={80} className="rounded-full" />
          <span className="text-lg font-semibold">Wer Auto</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {isLoading ? (
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <p>{userName}</p>
                  )}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem hidden onClick={handleGroupes}>
                  <Image src="/groupes.svg" alt="Groupes" width={16} height={16} />
                  Groupes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAccount}>
                  <Image src="/account.svg" alt="Account" width={16} height={16} />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                <Image src="/sign-out.svg" alt="sign out" width={16} height={16} />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
