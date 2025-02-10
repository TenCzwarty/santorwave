"use client";

import React from "react";
import Link from "next/link";
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

import { Win95ThemePicker } from "@/components/win-95/theme-picker";

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  return (
    <AppBar className="!static z-10 flex h-[50px] justify-center">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button
            onClick={() => setIsOpen(true)}
            active={isOpen}
            style={{ fontWeight: "bold" }}
          >
            <Logo variant="32x32_4" style={{ marginRight: 4 }} />
            Start
          </Button>

          {isOpen && (
            <MenuList
              ref={ref}
              style={{
                position: "absolute",
                left: "0",
                top: "100%",
              }}
              onClick={() => setIsOpen(false)}
            >
              <MenuListItem>
                <Link href="/">Home</Link>
              </MenuListItem>
              <MenuListItem>
                <Link href="/releases">Releases</Link>
              </MenuListItem>
              <MenuListItem disabled>Songs</MenuListItem>
              <MenuListItem disabled>Playlists</MenuListItem>
              <Separator />
              <MenuListItem disabled>Logout</MenuListItem>
              <MenuListItem disabled>アエステティック</MenuListItem>
            </MenuList>
          )}
        </div>

        <div className="flex items-center">
          <p className="mx-2">choose your vibe</p>
          <Win95ThemePicker />
        </div>
      </Toolbar>
    </AppBar>
  );
};
