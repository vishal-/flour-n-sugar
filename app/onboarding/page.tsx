"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth/AuthModal";
import { StepBasics, StepBasicsData } from "@/components/onboarding/StepBasics";
import { StepLocation, StepLocationData } from "@/components/onboarding/StepLocation";
import { StepProfile, StepProfileData } from "@/components/onboarding/StepProfile";
import { StepProducts, OnboardingProduct } from "@/components/onboarding/StepProducts";

const STEPS = [
  { id: 1, title: "Basics", icon: "🧁" },
  { id: 2, title: "Location", icon: "📍" },
  { id: 3, title: "Profile", icon: "👩‍🍳" },
  { id: 4, title: "Products", icon: "🍰" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdStore, setCreatedStore] = useState<{ name: string; slug: string } | null>(null);

  // Step 1 State
  const [basics, setBasics] = useState<StepBasicsData>({
    name: "",
    slug: "",
    storeType: "HOME_BAKER",
    description: "",
    logo: "",
    phone: "",
    contactEmail: "",
  });

  // Step 2 State
  const [location, setLocation] = useState<StepLocationData>({
    address: "",
    city: "",
    state: "",
    pincode: "",
    deliveryRadiusKm: 10,
    isHomeBaker: true,
  });

  // Step 3 State
  const [profile, setProfile] = useState<StepProfileData>({
    about: "",
    specialties: ["Custom Birthday Cakes", "Cupcakes & Minis"],
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    leadTimeHours: 24,
    instagram: "",
    whatsapp: "",
    website: "",
  });

  // Step 4 State
  const [products, setProducts] = useState<OnboardingProduct[]>([]);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!basics.name.trim()) newErrors.name = "Store name is required.";
      if (!basics.phone.trim()) newErrors.phone = "Contact phone number is required.";
    } else if (currentStep === 2) {
      if (!location.address.trim()) newErrors.address = "Street / kitchen address is required.";
      if (!location.city.trim()) newErrors.city = "Neighborhood / City is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!session?.user) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        name: basics.name,
        slug: basics.slug,
        storeType: basics.storeType,
        description: basics.description,
        logo: basics.logo,
        phone: basics.phone,
        contactEmail: basics.contactEmail || session.user.email,
        address: location.address,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        deliveryRadiusKm: location.deliveryRadiusKm,
        isHomeBaker: location.isHomeBaker,
        about: profile.about,
        specialties: profile.specialties,
        workingDays: profile.workingDays,
        leadTimeHours: profile.leadTimeHours,
        instagram: profile.instagram,
        whatsapp: profile.whatsapp || basics.phone,
        website: profile.website,
        products: products,
        publishImmediately: true,
      };

      const res = await fetch("/api/stores/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setSubmitError(data.error || "Failed to create your bakery storefront. Please try again.");
        setIsSubmitting(false);
      } else {
        setCreatedStore({
          name: data.store.name,
          slug: data.store.slug,
        });
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setSubmitError(error?.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  // SUCCESS LAUNCH VIEW
  if (createdStore) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 selection:bg-primary-light selection:text-primary">
        <div className="w-full max-w-lg bg-white dark:bg-[#2b1b17] rounded-[36px] p-8 md:p-12 shadow-2xl border border-rose-100 dark:border-rose-950/60 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <span className="text-6xl inline-block animate-bounce">🎉</span>
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
              Congratulations!
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark-brown dark:text-rose-50">
              {createdStore.name} is Live!
            </h1>
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 max-w-sm mx-auto leading-relaxed">
              Your digital bakery storefront is successfully registered and ready for dessert lovers across your city.
            </p>
          </div>

          {/* Shareable Link Box */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-left space-y-1">
            <span className="text-[10px] font-bold text-dark-brown/60 dark:text-rose-200/60 uppercase">
              Your Storefront URL
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary truncate">
                flournsugar.com/{createdStore.slug}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/${createdStore.slug}`);
                  alert("Link copied to clipboard!");
                }}
                className="text-[11px] font-bold text-dark-brown hover:text-primary transition cursor-pointer px-2 py-1 bg-white dark:bg-[#33221e] rounded-lg border border-rose-100/80 shadow-xs"
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/${createdStore.slug}`}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition text-center"
            >
              View Storefront
            </Link>
            <Link
              href="/home"
              className="flex-1 py-3.5 px-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-dark-brown dark:text-rose-100 text-xs font-bold transition text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary-light selection:text-primary">
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-rose-100/60 dark:border-rose-950/40">
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary-light dark:bg-rose-950/50 rounded-full flex items-center justify-center text-primary shadow-xs">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 0 1 4 4v2.5a.5.5 0 0 0 .5.5H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3h1.5a.5.5 0 0 0 .5-.5V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2.5c0 .7-.4 1.3-1.07 1.57A4.98 4.98 0 0 0 5 13v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a4.98 4.98 0 0 0-3.93-4.93C14.4 8.8 14 8.2 14 7.5V6a2 2 0 0 0-2-2z" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-wide text-dark-brown dark:text-rose-100">
              Flour n Sugar
            </span>
            <span className="block text-[8px] tracking-[0.15em] text-primary font-bold -mt-0.5 uppercase">
              Baker Onboarding
            </span>
          </div>
        </Link>

        <Link
          href="/home"
          className="text-xs font-semibold text-dark-brown/60 dark:text-rose-200/60 hover:text-primary transition"
        >
          Exit to Home
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 md:py-12">
        {/* Stepper Navigation */}
        <div className="mb-10">
          <div className="grid grid-cols-4 gap-2">
            {STEPS.map((s) => {
              const isCompleted = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => {
                    if (s.id < currentStep || validateCurrentStep()) {
                      setCurrentStep(s.id);
                    }
                  }}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition cursor-pointer ${
                    isCurrent
                      ? "bg-rose-50 dark:bg-rose-950/40 text-primary"
                      : isCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-dark-brown/40 dark:text-rose-200/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition shadow-xs ${
                      isCurrent
                        ? "bg-primary text-white scale-110"
                        : isCompleted
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"
                        : "bg-stone-100 dark:bg-rose-950/30 text-dark-brown/40 dark:text-rose-200/40"
                    }`}
                  >
                    {isCompleted ? "✓" : s.icon}
                  </div>
                  <span className="text-[11px] font-bold hidden sm:inline">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-rose-100/60 dark:bg-rose-950/40 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Unauthenticated Alert Banner */}
        {!session?.user && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <p className="text-xs text-dark-brown/80 dark:text-rose-100/80">
                You can fill out your store details now, and sign in when ready to launch!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition cursor-pointer flex-shrink-0"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Step Forms */}
        <div className="bg-white dark:bg-[#2b1b17] rounded-[32px] p-6 sm:p-10 shadow-sm border border-rose-100/70 dark:border-rose-950/50">
          {currentStep === 1 && (
            <StepBasics
              data={basics}
              onChange={(updated) => setBasics((prev) => ({ ...prev, ...updated }))}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <StepLocation
              data={location}
              onChange={(updated) => setLocation((prev) => ({ ...prev, ...updated }))}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <StepProfile
              data={profile}
              onChange={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <StepProducts
              products={products}
              onChange={(updatedList) => setProducts(updatedList)}
            />
          )}

          {/* Submission Error Banner */}
          {submitError && (
            <div className="mt-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs text-center font-medium">
              {submitError}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-rose-50 dark:border-rose-950/40">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-dark-brown dark:text-rose-100 hover:bg-rose-100 text-xs font-bold transition cursor-pointer disabled:opacity-50"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Storefront...</span>
                </>
              ) : currentStep === 4 ? (
                <span>Launch My Bakery 🚀</span>
              ) : (
                <span>Continue →</span>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Auth Modal for Unauthenticated Users */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}
