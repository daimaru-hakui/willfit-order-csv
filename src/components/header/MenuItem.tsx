"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuItem({ children, href, setOpen }: Props) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <li onClick={() => setOpen && setOpen(false)}>
      <Link
        href={href}
        className={cn(
          "block p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground",
          isActive &&
            "bg-primary hover:bg-primary hover:dark:bg-primary text-primary-foreground hover:text-primary-foreground"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
