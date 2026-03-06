"use client";

import {
  ChevronRight,
  //Grid,
  //Info,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface MenuLink {
  label: string;
  description?: string;
  url?: string;
  icon?: {
    component: LucideIcon;
    color: string;
  };
}
interface MenuItem {
  title: string;
  url?: string;
  links?: MenuLink[];
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

interface MobileNavigationMenuProps {
  open: boolean;
}

interface MenuSubLinkProps {
  link: MenuLink;
}

const LOGO = {
  url: "/",
  src: "/SLB.png",
  alt: "logo",
  title: "",
};

const NAVIGATION: MenuItem[] = [
  // {
  //   title: "Company",
  //   links: [
  //     {
  //       label: "About Us",
  //       url: "/about",
  //       description: "Our mission & values",
  //       icon: { component: Info, color: "#f59e0b" },
  //     },
  //     {
  //       label: "Portfolio",
  //       url: "/portfolio",
  //       description: "See our work",
  //       icon: { component: Grid, color: "#6366f1" },
  //     },
  //   ],
  // },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

const MOBILE_BREAKPOINT = 1024;

interface NavProps {
  className?: string;
}

const Nav = ({ className }: NavProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { openCart, lines } = useCartStore();
  const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <Fragment>
      <section
        className={cn(
          "dark pointer-events-auto relative z-999 bg-background",
          className,
        )}
      >
        <div className="container h-16">
          <div className="flex h-full items-center justify-between">
            <a
              href={LOGO.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <img
                src={LOGO.src}
                alt={LOGO.alt}
                className="inline-block h-10 w-auto"
              />
              <span className="hidden text-foreground md:inline-block">
                {LOGO.title}
              </span>
            </a>

            <div className="flex items-center gap-2">
              <NavigationMenu className="hidden lg:flex" viewport={false}>
                <NavigationMenuList>
                  {NAVIGATION.map((item, index) => (
                    <DesktopMenuItem
                      key={`desktop-link-${index}`}
                      item={item}
                      index={index}
                    />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <button
                onClick={openCart}
                className="relative flex items-center justify-center p-2 text-foreground"
              >
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </button>

              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {open ? (
                    <X className="size-5.5 stroke-foreground" />
                  ) : (
                    <Menu className="size-5.5 stroke-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu open={open} />
      <CartDrawer />
    </Fragment>
  );
};

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.links) {
    return (
      <NavigationMenuItem value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal text-foreground focus:!bg-transparent data-[active=true]:!bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !p-0">
          <ul className="w-[20rem] p-2.5">
            {item.links.map((link, i) => (
              <li key={`desktop-nav-sublink-${i}`}>
                <MenuSubLink link={link} />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent font-normal text-foreground`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MenuSubLink = ({ link }: MenuSubLinkProps) => {
  return (
    <a
      href={link.url}
      className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2.5">
          {link.icon && (
            <link.icon.component
              className="size-5"
              style={{ stroke: link.icon.color }}
            />
          )}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm leading-none text-foreground">
              {link.label}
            </h3>
            <p className="text-sm leading-[1.2] text-muted-foreground/80">
              {link.description}
            </p>
          </div>
        </div>
        <ChevronRight className="size-3.5 stroke-muted-foreground opacity-100" />
      </div>
    </a>
  );
};

const MobileNavigationMenu = ({ open }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-16 [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container pb-12">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
            </div>
            <div className="flex h-full flex-col justify-between gap-20">
              <Accordion type="multiple" className="w-full">
                {NAVIGATION.map((item, index) => renderMobileMenuItem(item, index))}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.links) {
    return (
      <AccordionItem key={item.title} value={`nav-${index}`}>
        <AccordionTrigger className="h-[3.75rem] items-center p-0 text-base font-normal text-muted-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.links.map((subItem) => (
            <MenuSubLink key={subItem.label} link={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="flex h-[3.75rem] items-center border-b p-0 text-left text-base font-normal text-muted-foreground nth-last-1:border-0"
    >
      {item.title}
    </a>
  );
};

export { Nav };