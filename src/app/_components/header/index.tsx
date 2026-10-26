"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClickAway } from "@uidotdev/usehooks";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
} from "react95";
import { Logo } from "@react95/icons";
import themes from "react95/dist/themes";

import { Win95ThemePicker } from "@/components/win-95/theme-picker";
import { useWin95ThemePickerContext } from "@/components/win-95/theme-picker-context";

// Navigation items
const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/releases", label: "Releases" },
  { href: "/discover", label: "Discover" },
  { href: "/lab", label: "Audio Lab" },
] as const;

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { setTheme } = useWin95ThemePickerContext();

  // On the wrapper, not the menu: with it on the menu, clicking Start while
  // open counted as "away" and closed it, then onClick reopened it at once.
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleRandomTheme = () => {
    const themeNames = Object.keys(themes);
    const randomIndex = Math.floor(Math.random() * themeNames.length);
    const randomThemeName = themeNames[randomIndex];
    if (randomThemeName && randomThemeName in themes) {
      setTheme(themes[randomThemeName as keyof typeof themes]);
    }
  };

  return (
    <AppBar className="!static z-10 flex h-[50px] justify-center">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div
          ref={ref}
          style={{ position: "relative", display: "inline-block", zIndex: 50 }}
        >
          <Button
            onClick={() => setIsOpen((open) => !open)}
            active={isOpen || undefined}
            style={{ fontWeight: "bold" }}
          >
            <Logo variant="32x32_4" style={{ marginRight: 4 }} />
            Start
          </Button>

          {isOpen && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                top: "100%",
                zIndex: 100,
              }}
              onClick={() => setIsOpen(false)}
            >
              {NAV_ITEMS.map((item) => (
                <MenuListItem 
                  key={item.href} 
                  style={{ padding: 0 }}
                >
                  <Link 
                    href={item.href} 
                    className="block w-full px-4 py-1 text-left"
                    style={{ fontWeight: isActive(item.href) ? "bold" : "normal" }}
                  >
                    {item.label}
                  </Link>
                </MenuListItem>
              ))}
              <MenuListItem disabled>Playlists</MenuListItem>
              <Separator />
              <MenuListItem disabled>Logout</MenuListItem>
              <MenuListItem disabled>アエステティック</MenuListItem>
            </MenuList>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="mx-2">choose your vibe</p>
          <Win95ThemePicker />
          <Button onClick={handleRandomTheme} title="Random theme">
            🎲
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
