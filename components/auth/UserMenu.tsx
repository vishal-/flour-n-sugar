"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { MatIcon } from "@/components/ui/MatIcon";
import keyboardArrowDownRounded from "@iconify-icons/material-symbols/keyboard-arrow-down-rounded";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import personOutlineRounded from "@iconify-icons/material-symbols/person-outline-rounded";
import favoriteOutlineRounded from "@iconify-icons/material-symbols/favorite-outline-rounded";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import logoutRounded from "@iconify-icons/material-symbols/logout-rounded";

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  onOpenWishlist?: () => void;
  onOpenOrders?: () => void;
}

export function UserMenu({
  user,
  onOpenWishlist,
  onOpenOrders,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [imageError, setImageError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            window.location.reload();
          },
        },
      });
    } catch {
      setSigningOut(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-100/60 dark:border-rose-900/30 transition cursor-pointer"
        aria-expanded={isOpen}
      >
        {user.image && !imageError ? (
          <img
            src={user.image}
            alt={user.name}
            onError={() => setImageError(true)}
            className="w-7 h-7 rounded-full object-cover border border-primary/20"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {getInitials(user.name || "User")}
          </div>
        )}
        <span className="text-xs font-semibold text-dark-brown dark:text-rose-100 max-w-[100px] truncate">
          {user.name.split(" ")[0]}
        </span>
        <MatIcon
          icon={keyboardArrowDownRounded}
          size={18}
          className={`text-dark-brown/60 dark:text-rose-200/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#2b1b17] border border-rose-100 dark:border-rose-950/40 rounded-2xl shadow-xl z-50 py-2 divide-y divide-rose-50 dark:divide-rose-950/30 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-3">
            <p className="text-xs font-bold text-dark-brown dark:text-rose-100 truncate">
              {user.name}
            </p>
            <p className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition"
            >
              <MatIcon
                icon={storefrontOutlineRounded}
                size={18}
                className="text-primary"
              />
              <span>My Store</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition"
            >
              <MatIcon
                icon={personOutlineRounded}
                size={18}
                className="text-primary"
              />
              <span>My Profile</span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenWishlist?.();
              }}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition cursor-pointer"
            >
              <MatIcon
                icon={favoriteOutlineRounded}
                size={18}
                className="text-primary"
              />
              <span>Saved Bakers</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenOrders?.();
              }}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition cursor-pointer"
            >
              <MatIcon
                icon={chatBubbleOutlineRounded}
                size={18}
                className="text-primary"
              />
              <span>My Inquiries</span>
            </button>
          </div>

          <div className="py-1">
            <button
              disabled={signingOut}
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2.5 transition cursor-pointer disabled:opacity-50"
            >
              <MatIcon
                icon={logoutRounded}
                size={18}
                className="text-red-500"
              />
              <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
