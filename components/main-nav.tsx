"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  FolderKanban,
  Settings,
  SquareStack,
  Box,
  ImagePlus,
  Diff,
  Palette,
  ListOrdered,
  Users,
  Gift,
  Dice6,
} from "lucide-react";

import clsx from "clsx";
import TextLegend from "@/components/typography/text-legend";
import { Button } from "@/components/ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      type: "group",
      id: "general",
      title: "General",
      children: [
        {
          type: "item",
          id: "overview",
          Icon: FolderKanban,
          href: `/${params.storeId}`,
          label: "Overview",
          active: pathname === `/${params.storeId}`,
        },
        {
          type: "item",
          id: "settings",
          Icon: Settings,
          href: `/${params.storeId}/settings`,
          label: "Settings",
          active: pathname === `/${params.storeId}/settings`,
        },
      ],
    },

    {
      type: "group",
      id: "catalog",
      title: "Catalog",
      children: [
        {
          type: "item",
          id: "products",
          href: `/${params.storeId}/products`,
          label: "Products",
          active: pathname.includes("products"),
          Icon: Box,
        },
        {
          type: "item",
          id: "categories",
          Icon: SquareStack,
          href: `/${params.storeId}/categories`,
          label: "Categories",
          active: pathname.includes("categories"),
        },
        {
          type: "item",
          id: "billboards",
          Icon: ImagePlus,
          href: `/${params.storeId}/billboards`,
          label: "Billboards",
          active: pathname.includes("billboards"),
        },
        {
          type: "item",
          id: "sizes",
          Icon: Diff,
          href: `/${params.storeId}/sizes`,
          label: "Sizes",
          active: pathname.includes("sizes"),
        },
        {
          type: "item",
          id: "colors",
          Icon: Palette,
          href: `/${params.storeId}/colors`,
          label: "Colors",
          active: pathname.includes("colors"),
        },
        {
          type: "item",
          id: "brands",
          Icon: Dice6,
          href: `/${params.storeId}/brands`,
          label: "Brands",
          active: pathname.includes("brands"),
        },
      ],
    },

    {
      type: "group",
      id: "sale",
      title: "Sale",
      children: [
        {
          type: "item",
          id: "orders",
          href: `/${params.storeId}/orders`,
          label: "Orders",
          active: pathname.includes("orders"),
          Icon: ListOrdered,
        },
      ],
    },

    {
      type: "group",
      id: "customer",
      title: "Customer",
      children: [
        {
          type: "item",
          id: "customers",
          href: `/${params.storeId}/customers`,
          label: "Customers",
          active: pathname.includes("customers"),
          Icon: Users,
        },
      ],
    },

    {
      type: "group",
      id: "promotion",
      title: "Promotion",
      children: [
        {
          type: "item",
          id: "coupons",
          href: `/${params.storeId}/coupons`,
          label: "Coupons",
          active: pathname.includes("coupons"),
          Icon: Gift,
        },
      ],
    },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-[64px] left-0 min-w-[240px] h-[calc(100vh-64px)] border-r border-neutral-200 dark:border-neutral-800",
        "flex flex-col p-4 gap-4",
        className
      )}
      {...props}
    >
      {routes.map((sidebarItem) => (
        <div key={sidebarItem.id} className='flex flex-col'>
          <TextLegend className='mb-4'>{sidebarItem.title}</TextLegend>
          {sidebarItem.children.map((sidebarChildrenItem) => (
            <Button
              key={`${sidebarItem.id}_${sidebarChildrenItem.id}`}
              variant='ghost'
              className='justify-start'
              asChild
            >
              <Link
                href={sidebarChildrenItem.href ?? "/"}
                key={sidebarChildrenItem.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary",
                  sidebarChildrenItem.active
                    ? "text-black dark:text-white bg-muted"
                    : "text-muted-foreground"
                )}
              >
                <sidebarChildrenItem.Icon className='w-4 h-4 mr-4' />
                {sidebarChildrenItem.label}
              </Link>
            </Button>
          ))}
        </div>
      ))}
    </nav>
  );
}
