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
          "block py-1 px-3 dark:hover:bg-zinc-700 text-muted-foreground hover:text-foreground hover:border-primary border-b-2",
          isActive &&
            "text-primary border-primary"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
