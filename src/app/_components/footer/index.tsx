"use client";

import React from "react";
import Link from "next/link";
import { AppBar, Button, Handle, Toolbar } from "react95";

export const Footer = () => (
  <div>
    <footer className="fixed bottom-0 left-0 w-full z-50">
      <AppBar as="div" style={{ position: "relative" }}>
        <Toolbar>
          <Link href="/">
            <Button variant="menu">Home</Button>
          </Link>
          <Button variant="menu">Stack</Button>

          <Handle size={35} />
          <p className="mx-4">
            &copy; {new Date().getFullYear()} SantorWave. Curated with 懐かしさ
            (nostalgia)
          </p>

          <Button variant="menu" disabled style={{ marginLeft: "auto" }}>
            Options
          </Button>
        </Toolbar>
      </AppBar>
    </footer>
  </div>
);
