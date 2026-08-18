"use client";

export interface StepProfileData {
  about: string;
  specialties: string[];
  workingDays: string[];
  leadTimeHours: number;
  instagram: string;
  whatsapp: string;
  website: string;
}

interface StepProfileProps {
  data: StepProfileData;
  onChange: (data: Partial<StepProfileData>) => void;
  errors: Record<string, string>;
}

const SPECIALTY_OPTIONS = [
  "Custom Birthday Cakes",
  "Wedding Tier Cakes",
  "Cupcakes & Minis",
  "Fudge Brownies",
  "French Macarons",
  "Pastries & Tarts",
  "Artisan Sourdough",
  "Cheesecakes",
  "100% Eggless Bakes",
  "Vegan & Dairy-Free",
  "Gluten-Free Treats",
  "Dessert Jars & Puddings",
  "Cookie Gift Boxes",
];

const DAYS_OF_WEEK = [
  { id: "Mon", label: "Mon" },
  { id: "Tue", label: "Tue" },
  { id: "Wed", label: "Wed" },
  { id: "Thu", label: "Thu" },
  { id: "Fri", label: "Fri" },
  { id: "Sat", label: "Sat" },
  { id: "Sun", label: "Sun" },
];

const LEAD_TIME_OPTIONS = [
  { hours: 6, label: "Same Day (6 hrs notice)" },
  { hours: 12, label: "12 hours notice" },
  { hours: 24, label: "24 hours (1 day advance)" },
  { hours: 48, label: "48 hours (2 days advance)" },
  { hours: 72, label: "72 hours (3 days advance)" },
  { hours: 120, label: "5+ days advance (Custom Wedding/Events)" },
];

export function StepProfile({ data, onChange }: StepProfileProps) {
  const toggleSpecialty = (item: string) => {
    if (data.specialties.includes(item)) {
      onChange({ specialties: data.specialties.filter((s) => s !== item) });
    } else {
      onChange({ specialties: [...data.specialties, item] });
    }
  };

  const toggleDay = (day: string) => {
    if (data.workingDays.includes(day)) {
      onChange({ workingDays: data.workingDays.filter((d) => d !== day) });
    } else {
      onChange({ workingDays: [...data.workingDays, day] });
    }
  };

  const selectAllDays = () => {
    onChange({ workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Step 3 of 4</span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Store Profile & Story
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-1">
          Share your craft, product specialties, operating schedule, and social channels.
        </p>
      </div>

      {/* Baker Story / About */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            About the Baker & Kitchen Story
          </label>
          <span className="text-[10px] text-dark-brown/40 dark:text-rose-200/40">
            {data.about.length}/600 chars
          </span>
        </div>
        <textarea
          rows={3}
          maxLength={600}
          placeholder="e.g. Certified pastry chef passionate about clean ingredients, French baking techniques, and crafting show-stopping custom cakes for life's sweetest milestones."
          value={data.about}
          onChange={(e) => onChange({ about: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e] resize-none"
        />
      </div>

      {/* Specialties Multi-select Chips */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Baking Specialties (Select all that apply)
          </label>
          <span className="text-[10px] font-bold text-primary">
            {data.specialties.length} selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIALTY_OPTIONS.map((item) => {
            const isSelected = data.specialties.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleSpecialty(item)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white dark:bg-[#33221e] text-dark-brown/70 dark:text-rose-100/70 border border-rose-100 dark:border-rose-950/60 hover:border-primary/40"
                }`}
              >
                <span>{isSelected ? "✓" : "+"}</span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Working Days & Lead Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Working Days */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
              Baking & Order Days
            </label>
            <button
              type="button"
              onClick={selectAllDays}
              className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
            >
              Select all (Every day)
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = data.workingDays.includes(day.id);
              return (
                <button
                  type="button"
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white dark:bg-[#33221e] text-dark-brown/60 dark:text-rose-100/60 border border-rose-100 dark:border-rose-950/60 hover:border-primary/40"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lead Time */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Typical Preparation Notice Required
          </label>
          <select
            value={data.leadTimeHours}
            onChange={(e) => onChange({ leadTimeHours: parseInt(e.target.value, 10) })}
            className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e] cursor-pointer"
          >
            {LEAD_TIME_OPTIONS.map((opt) => (
              <option key={opt.hours} value={opt.hours}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-dark-brown/50 dark:text-rose-200/50">
            Sets customer expectations for advance ordering time.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
          Social Links & Portfolios
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center rounded-2xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 px-3.5 py-2.5 text-xs font-semibold">
            <span className="text-dark-brown/40 dark:text-rose-200/40 select-none mr-1.5">instagram.com/</span>
            <input
              type="text"
              placeholder="sweetdelights"
              value={data.instagram}
              onChange={(e) => onChange({ instagram: e.target.value.replace(/^@/, "") })}
              className="w-full text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center rounded-2xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 px-3.5 py-2.5 text-xs font-semibold">
            <span className="text-dark-brown/40 dark:text-rose-200/40 select-none mr-1.5">Website:</span>
            <input
              type="url"
              placeholder="https://..."
              value={data.website}
              onChange={(e) => onChange({ website: e.target.value })}
              className="w-full text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
