"use client";

export interface StepLocationData {
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryRadiusKm: number;
  isHomeBaker: boolean;
}

interface StepLocationProps {
  data: StepLocationData;
  onChange: (data: Partial<StepLocationData>) => void;
  errors: Record<string, string>;
}

export function StepLocation({ data, onChange, errors }: StepLocationProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Step 2 of 4</span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Location & Delivery
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-1">
          Help customers in your neighborhood discover your kitchen and understand delivery coverage.
        </p>
      </div>

      {/* Home Baker Privacy Card */}
      <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex items-start gap-4">
        <span className="text-2xl p-2 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 flex-shrink-0">
          🏡
        </span>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-dark-brown dark:text-rose-100">
              Home Baker Privacy Protection
            </span>
            {/* Toggle switch */}
            <button
              type="button"
              role="switch"
              aria-checked={data.isHomeBaker}
              onClick={() => onChange({ isHomeBaker: !data.isHomeBaker })}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                data.isHomeBaker ? "bg-primary" : "bg-dark-brown/20 dark:bg-rose-950/60"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  data.isHomeBaker ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <p className="text-[11px] text-dark-brown/70 dark:text-rose-200/70 leading-relaxed">
            {data.isHomeBaker
              ? "Enabled: Your exact street address is kept private and will never appear on public search results. Only your city and neighborhood will be visible."
              : "Disabled: Your exact physical store address will be publicly listed for walk-in customers."}
          </p>
        </div>
      </div>

      {/* Street Address */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
          Kitchen / Bakery Street Address <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Flat 402, Rosewood Heights, Hill Road"
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          className={`w-full px-4 py-3 rounded-2xl border text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none transition bg-white dark:bg-[#33221e] ${
            errors.address
              ? "border-red-400 focus:border-red-500"
              : "border-rose-100 dark:border-rose-950/60 focus:border-primary"
          }`}
        />
        {errors.address && <p className="text-[11px] text-red-500 font-medium mt-1">{errors.address}</p>}
        {data.isHomeBaker && (
          <p className="text-[10px] text-dark-brown/50 dark:text-rose-200/50">
            🔒 Kept confidential for order logistics and pickup instructions only.
          </p>
        )}
      </div>

      {/* City, State, Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Neighborhood / City <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Bandra, Mumbai"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none transition bg-white dark:bg-[#33221e] ${
              errors.city
                ? "border-red-400 focus:border-red-500"
                : "border-rose-100 dark:border-rose-950/60 focus:border-primary"
            }`}
          />
          {errors.city && <p className="text-[11px] text-red-500 font-medium mt-1">{errors.city}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            State / Region
          </label>
          <input
            type="text"
            placeholder="e.g. Maharashtra"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Postal / Pincode
          </label>
          <input
            type="text"
            placeholder="e.g. 400050"
            value={data.pincode}
            onChange={(e) => onChange({ pincode: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e]"
          />
        </div>
      </div>

      {/* Delivery / Service Radius */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#33221e] border border-rose-100/80 dark:border-rose-950/60 space-y-4 shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <label className="block text-xs font-bold text-dark-brown dark:text-rose-100">
              Delivery & Service Radius
            </label>
            <p className="text-[11px] text-dark-brown/60 dark:text-rose-200/60">
              How far from your kitchen do you deliver or offer courier services?
            </p>
          </div>
          <span className="text-sm font-extrabold bg-primary-light text-primary px-3 py-1 rounded-full">
            {data.deliveryRadiusKm} km radius
          </span>
        </div>

        <input
          type="range"
          min={2}
          max={40}
          step={1}
          value={data.deliveryRadiusKm}
          onChange={(e) => onChange({ deliveryRadiusKm: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-rose-100 dark:bg-rose-950/50 rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="flex justify-between text-[10px] font-bold text-dark-brown/40 dark:text-rose-200/40">
          <span>2 km (Local neighborhood)</span>
          <span>15 km</span>
          <span>40 km (Citywide)</span>
        </div>
      </div>
    </div>
  );
}
