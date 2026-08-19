"use client";

import { useState } from "react";
import Link from "next/link";
import { StoreFrontTheme, STOREFRONT_THEME_LIST, STOREFRONT_THEME_MAP } from "@/types";
import { MatIcon } from "@/components/ui/MatIcon";
import { NotoIcon } from "@/components/ui/NotoIcon";
import sparkles from "@iconify-icons/noto/sparkles";
import paletteOutline from "@iconify-icons/material-symbols/palette-outline";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";
import checkCircleOutlineRounded from "@iconify-icons/material-symbols/check-circle-outline-rounded";

interface ThemeSelectorProps {
  initialTheme: StoreFrontTheme;
  storeSlug: string;
}

export function ThemeSelector({
  initialTheme,
  storeSlug,
}: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<StoreFrontTheme>(initialTheme);
  const [isSaving, setIsSaving] = useState(false);
  const [savedTheme, setSavedTheme] = useState<StoreFrontTheme>(initialTheme);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const hasChanges = selectedTheme !== savedTheme;
  const currentDef = STOREFRONT_THEME_MAP[selectedTheme];

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/stores/theme", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selectedTheme }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update theme");
      }

      setSavedTheme(selectedTheme);
      setStatusMessage({
        type: "success",
        text: `Theme successfully updated to "${currentDef.name}"!`,
      });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setStatusMessage({
        type: "error",
        text: error.message || "Failed to save theme. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Active Theme Preview & Action Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5"
            style={{ backgroundColor: currentDef.primaryColor, color: "#FFFFFF" }}
          >
            <MatIcon icon={paletteOutline} size={28} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-dark-brown/50 dark:text-rose-200/50">
                Active Store Theme:
              </span>
              <span
                className="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: currentDef.accentColor, color: currentDef.primaryColor }}
              >
                {currentDef.name}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-dark-brown dark:text-rose-50">
              {currentDef.tagline}
            </h3>
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60">
              {currentDef.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href={`/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-primary border border-rose-100 dark:border-rose-900/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Preview Live Store</span>
            <MatIcon icon={openInNewRounded} size={14} />
          </Link>

          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer ${
              hasChanges
                ? "bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg"
                : "bg-stone-100 dark:bg-rose-950/20 text-stone-400 dark:text-rose-300/40 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : hasChanges ? (
              <span>Apply & Save Theme</span>
            ) : (
              <span>Saved</span>
            )}
          </button>
        </div>
      </div>

      {/* Status Feedback Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/40"
              : "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200 border border-red-200 dark:border-red-800/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <MatIcon icon={checkCircleOutlineRounded} size={16} />
            <span>{statusMessage.text}</span>
          </div>

          {statusMessage.type === "success" && (
            <Link
              href={`/${storeSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-emerald-700 dark:text-emerald-300"
            >
              View Updated Storefront ↗
            </Link>
          )}
        </div>
      )}

      {/* 12-Theme Selection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50 flex items-center gap-2">
              <span>Choose a Storefront Theme</span>
              <NotoIcon icon={sparkles} size={18} />
            </h3>
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
              Select a curated visual identity that matches your bakery&apos;s ambiance, treat styles, and confectionery aesthetic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STOREFRONT_THEME_LIST.map((theme) => {
            const isSelected = selectedTheme === theme.value;
            const isSaved = savedTheme === theme.value;

            return (
              <div
                key={theme.value}
                onClick={() => setSelectedTheme(theme.value)}
                className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? "bg-white dark:bg-[#2b1b17] border-primary ring-2 ring-primary/30 shadow-md scale-[1.01]"
                    : "bg-white/80 dark:bg-[#2b1b17]/80 border-rose-100/70 dark:border-rose-950/50 hover:border-rose-300 dark:hover:border-rose-800 shadow-2xs hover:shadow-xs"
                }`}
              >
                {/* Top Row: Theme Name & Color Dots */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Dual Color Swatch Bubble */}
                      <div className="flex items-center -space-x-1.5">
                        <div
                          className="w-5 h-5 rounded-full border-2 border-white shadow-2xs"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div
                          className="w-5 h-5 rounded-full border-2 border-white shadow-2xs"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                      </div>

                      <h4 className="font-serif text-base font-bold text-dark-brown dark:text-rose-50">
                        {theme.name}
                      </h4>
                    </div>

                    {isSaved ? (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    ) : isSelected ? (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary-light text-primary px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    ) : null}
                  </div>

                  <p className="text-xs font-semibold text-dark-brown/80 dark:text-rose-200/80">
                    {theme.tagline}
                  </p>

                  <p className="text-[11px] text-dark-brown/60 dark:text-rose-200/60 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Bottom Color Palette Bar */}
                <div className="mt-4 pt-3 border-t border-rose-100/50 dark:border-rose-950/40 flex items-center justify-between text-[10px] text-dark-brown/50 dark:text-rose-200/50">
                  <span className="font-mono">{theme.primaryColor}</span>
                  <span className="font-bold text-primary group-hover:underline">
                    {isSelected ? "✓ Click 'Apply' to Save" : "Select Theme"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
