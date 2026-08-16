"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "@/lib/auth-client";

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

export function UserMenu({ user, onOpenWishlist, onOpenOrders }: UserMenuProps) {
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
        <svg
          className={`w-3.5 h-3.5 text-dark-brown/60 dark:text-rose-200/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#2b1b17] border border-rose-100 dark:border-rose-950/40 rounded-2xl shadow-xl z-50 py-2 divide-y divide-rose-50 dark:divide-rose-950/30 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-3">
            <p className="text-xs font-bold text-dark-brown dark:text-rose-100 truncate">{user.name}</p>
            <p className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenWishlist?.();
              }}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Saved Bakers</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenOrders?.();
              }}
              className="w-full text-left px-4 py-2 text-xs font-medium text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>My Inquiries</span>
            </button>
          </div>

          <div className="py-1">
            <button
              disabled={signingOut}
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
