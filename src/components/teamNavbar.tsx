"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  Wallet,
  NotebookText,
  Keyboard,
  Music,
  ImageIcon,
  Calendar,
  Settings,
  Mail,
  MessageCircle,
  CreditCard,
  Home,
  HomeIcon,
  BadgeDollarSign,
} from "lucide-react";

function TeamNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <Image
            src="/logo.png"
            width={130}
            height={100}
            alt="logo"
            className="pt-1 bg-slate-300 rounded-full px-3 py-1"
          />
        </Link>

        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex space-x-4 text-sm">
            {/* First Core Features Section */}
            <div className="flex flex-col space-y-2 justify-start">
              <div className="text-slate-400 text-sm py-2 justify-center">
                Core features
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Home className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Home essentials</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Keyboard className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Shoes</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <NotebookText className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Clothes</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Wallet className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Electronics</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Music className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Toys</span>
              </div>
            </div>

            {/* Second Core Features Section */}
            <div className="flex flex-col space-y-2">
              <div className="text-slate-400 text-sm py-2">
                Premium features
              </div>
              <div className="flex items-center gap-2 justify-start">
                <BadgeDollarSign className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Handbags</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Keyboard className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Sports</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <NotebookText className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Gym</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Wallet className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Beauty</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Music className="h-4 w-4 text-slate-200" />
                <span className="text-sm py-2">Skincare</span>
              </div>
            </div>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="filter">
          {/* Second Core Features Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 justify-start">
              <input
                type="checkbox"
                id="sortAZ"
                className="h-4 w-4 text-slate-200 accent-slate-200"
              />
              <label htmlFor="sortAZ" className="text-sm py-2">
                A-Z
              </label>
            </div>

            <div className="flex items-center gap-2 justify-start">
              <input
                type="checkbox"
                id="sortZA"
                className="h-4 w-4 text-slate-200 accent-slate-200"
              />
              <label htmlFor="sortZA" className="text-sm py-2">
                Z-A
              </label>
            </div>

            <div className="flex items-center gap-2 justify-start">
              <input
                type="checkbox"
                id="sortHighToLow"
                className="h-4 w-4 text-slate-200 accent-slate-200"
              />
              <label htmlFor="sortHighToLow" className="text-sm py-2">
                Price - High to low
              </label>
            </div>

            <div className="flex items-center gap-2 justify-start">
              <input
                type="checkbox"
                id="sortLowToHigh"
                className="h-4 w-4 text-slate-200 accent-slate-200"
              />
              <label htmlFor="sortLowToHigh" className="text-sm py-2">
                Price - low to high
              </label>
            </div>
          </div>
        </MenuItem>

        <Link href={"/profile/my-submissions"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Submissions"
          ></MenuItem>
        </Link>

        <Link href={"/profile"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Profile"
          ></MenuItem>
        </Link>

        <Link href={"/login"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Logout"
          ></MenuItem>
        </Link>

      </Menu>
    </div>
  );
}

export default TeamNavbar;
