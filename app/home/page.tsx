"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserMenu } from "@/components/auth/UserMenu";
import { NotoIcon } from "@/components/ui/NotoIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import croissant from "@iconify-icons/noto/croissant";
import chocolateBar from "@iconify-icons/noto/chocolate-bar";
import cookie from "@iconify-icons/noto/cookie";
import custard from "@iconify-icons/noto/custard";
import bread from "@iconify-icons/noto/bread";
import shortcake from "@iconify-icons/noto/shortcake";
import glowingStar from "@iconify-icons/noto/glowing-star";
import fire from "@iconify-icons/noto/fire";
import womanCook from "@iconify-icons/noto/woman-cook";

// Mock data for local bakers
interface Baker {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  location: string;
  tags: string[];
  image: string;
  whatsapp: string;
  specialtyMenu: { item: string; price: string }[];
  isTopRated?: boolean;
  isPopular?: boolean;
}

const MOCK_BAKERS: Baker[] = [
  {
    id: "baker-1",
    name: "Cakes n Cookies",
    rating: 4.9,
    reviews: 142,
    distance: "1.2 km away",
    location: "Andheri, Mumbai",
    tags: ["Custom Cakes", "Cupcakes"],
    image: "/baker-card-1.png",
    whatsapp: "https://wa.me/919876543210?text=Hi%20Cakes%20n%20Cookies,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Double Chocolate Drip Cake", price: "₹1,200" },
      { item: "Red Velvet Cupcakes (6pcs)", price: "₹450" },
      { item: "Classic Chocolate Chip Cookies", price: "₹300" }
    ],
    isTopRated: true
  },
  {
    id: "baker-2",
    name: "Sweet Cravings",
    rating: 4.9,
    reviews: 96,
    distance: "1.5 km away",
    location: "Bandra, Mumbai",
    tags: ["Cakes", "Brownies", "Pastries"],
    image: "/baker-card-2.png",
    whatsapp: "https://wa.me/919876543211?text=Hi%20Sweet%20Cravings,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Naked Vanilla Berry Cake", price: "₹1,100" },
      { item: "Fudge Chocolate Brownies (4pcs)", price: "₹400" },
      { item: "Blueberry Cheesecake Slice", price: "₹180" }
    ],
    isPopular: true
  },
  {
    id: "baker-3",
    name: "The Frosted Oven",
    rating: 4.7,
    reviews: 110,
    distance: "2.1 km away",
    location: "Powai, Mumbai",
    tags: ["Cupcakes", "Cakes", "Cookies"],
    image: "/baker-card-3.png",
    whatsapp: "https://wa.me/919876543212?text=Hi%20The%20Frosted%20Oven,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Swirl Frosting Strawberry Cupcakes", price: "₹480" },
      { item: "Lemon Drizzle Loaf", price: "₹350" },
      { item: "Oatmeal Raisin Cookies", price: "₹250" }
    ]
  },
  {
    id: "baker-4",
    name: "Bake with Love",
    rating: 4.6,
    reviews: 84,
    distance: "2.3 km away",
    location: "Juhu, Mumbai",
    tags: ["Brownies", "Cakes", "Desserts"],
    image: "/baker-card-4.png",
    whatsapp: "https://wa.me/919876543213?text=Hi%20Bake%20with%20Love,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Rich Fudge Chocolate Slice", price: "₹150" },
      { item: "Dark Chocolate Walnut Brownies", price: "₹450" },
      { item: "Creamy Caramel Custard", price: "₹250" }
    ]
  },
  {
    id: "baker-5",
    name: "Whisk & Flour",
    rating: 4.9,
    reviews: 165,
    distance: "2.6 km away",
    location: "Colaba, Mumbai",
    tags: ["Custom Cakes", "Cupcakes"],
    image: "/baker-card-5.png",
    whatsapp: "https://wa.me/919876543214?text=Hi%20Whisk%20%26%20Flour,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Two-Tier Floral Wedding Cake", price: "₹3,500" },
      { item: "Custom Photo Cake", price: "₹1,800" },
      { item: "Assorted Cupcake Box (12pcs)", price: "₹800" }
    ],
    isTopRated: true
  },
  {
    id: "baker-6",
    name: "Bake Bliss",
    rating: 4.8,
    reviews: 78,
    distance: "3.0 km away",
    location: "Powai, Mumbai",
    tags: ["Cookies", "Macarons", "Pastries"],
    image: "/baker-card-2.png",
    whatsapp: "https://wa.me/919876543215?text=Hi%20Bake%20Bliss,%20I%20found%20you%20on%20Flour%20n%20Sugar%20and%20would%20like%20to%20order!",
    specialtyMenu: [
      { item: "Gourmet Macarons Box (6pcs)", price: "₹500" },
      { item: "Almond Croissants", price: "₹180" },
      { item: "Assorted Cookie Tin", price: "₹600" }
    ]
  }
];

const LOCATIONS = [
  "All Locations",
  "Andheri, Mumbai",
  "Bandra, Mumbai",
  "Powai, Mumbai",
  "Juhu, Mumbai",
  "Colaba, Mumbai"
];

const CATEGORIES = [
  { name: "Birthday Cakes", icon: birthdayCake, tags: ["Cakes", "Custom Cakes"] },
  { name: "Cupcakes", icon: cupcake, tags: ["Cupcakes"] },
  { name: "Pastries", icon: croissant, tags: ["Pastries"] },
  { name: "Brownies", icon: chocolateBar, tags: ["Brownies"] },
  { name: "Cookies", icon: cookie, tags: ["Cookies"] },
  { name: "Desserts", icon: custard, tags: ["Desserts", "Macarons"] },
  { name: "Breads", icon: bread, tags: ["Breads"] },
  { name: "Custom Cakes", icon: shortcake, tags: ["Custom Cakes"] },
];

export default function HomePage() {
  const { data: session } = useSession();
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeBakerProfile, setActiveBakerProfile] = useState<Baker | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [mobileTab, setMobileTab] = useState("home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Baker form state
  const [bakerName, setBakerName] = useState("");
  const [bakerEmail, setBakerEmail] = useState("");
  const [bakerCity, setBakerCity] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleHeartClick = (bakerId: string, bakerName: string) => {
    if (wishlist.includes(bakerId)) {
      setWishlist(wishlist.filter(id => id !== bakerId));
      triggerToast(`Removed ${bakerName} from Wishlist`);
    } else {
      setWishlist([...wishlist, bakerId]);
      triggerToast(`Added ${bakerName} to Wishlist! ❤️`);
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bakerName && bakerEmail && bakerCity) {
      setJoinSuccess(true);
      setTimeout(() => {
        setShowJoinModal(false);
        setJoinSuccess(false);
        setBakerName("");
        setBakerEmail("");
        setBakerCity("");
        triggerToast("Application submitted successfully!");
      }, 2000);
    }
  };

  // Filtered bakers
  const filteredBakers = useMemo(() => {
    return MOCK_BAKERS.filter(baker => {
      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations" ||
        baker.location.toLowerCase().includes(selectedLocation.split(",")[0].trim().toLowerCase());

      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        baker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        baker.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        baker.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory =
        !selectedCategory ||
        baker.tags.some(tag => {
          const categoryObj = CATEGORIES.find(c => c.name === selectedCategory);
          return categoryObj?.tags.some(t => t.toLowerCase() === tag.toLowerCase());
        });

      return matchesLocation && matchesSearch && matchesCategory;
    });
  }, [selectedLocation, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-background selection:bg-primary-light selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-dark-brown text-white py-3 px-6 rounded-full shadow-lg flex items-center gap-2 border border-primary/20 animate-bounce">
          <span>✨</span>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* --- DESKTOP VIEWPORT LAYOUT --- */}
      <div className="hidden md:flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        {/* Navigation Header */}
        <header className="flex justify-between items-center py-6 border-b border-rose-50/50 dark:border-rose-950/30">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-primary-light dark:bg-rose-950/40 rounded-full flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 1 4 4v2.5a.5.5 0 0 0 .5.5H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3h1.5a.5.5 0 0 0 .5-.5V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2.5c0 .7-.4 1.3-1.07 1.57A4.98 4.98 0 0 0 5 13v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a4.98 4.98 0 0 0-3.93-4.93C14.4 8.8 14 8.2 14 7.5V6a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wide text-dark-brown dark:text-rose-100">Flour n Sugar</span>
              <span className="block text-[8px] tracking-[0.15em] text-primary font-bold -mt-1 uppercase">Local Bakers, Made with Love</span>
            </div>
          </div>

          <nav className="flex gap-8 font-medium text-sm text-dark-brown/80 dark:text-rose-100/80">
            <button
              onClick={() => { setSelectedCategory(null); setSelectedLocation("All Locations"); setSearchQuery(""); }}
              className={`hover:text-primary transition cursor-pointer ${!selectedCategory && selectedLocation === "All Locations" && searchQuery === "" ? "text-primary border-b-2 border-primary pb-1" : ""}`}
            >
              Home
            </button>
            <a href="#bakers" className="hover:text-primary transition cursor-pointer">Bakers</a>
            <a href="#categories" className="hover:text-primary transition cursor-pointer">Categories</a>
            <a href="#about" className="hover:text-primary transition cursor-pointer">About Us</a>
            <button onClick={() => triggerToast("Our Blog section is coming soon!")} className="hover:text-primary transition cursor-pointer">Blog</button>
            <Link href="/onboarding" className="hover:text-primary transition text-primary font-semibold cursor-pointer">For Bakers</Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Location Selector in Header */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-950/20 text-xs font-semibold text-dark-brown dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{selectedLocation === "All Locations" ? "Near me" : selectedLocation.split(",")[0]}</span>
                <svg className="w-3 h-3 text-dark-brown/60 dark:text-rose-200/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2b1b17] border border-rose-50 dark:border-rose-950/30 rounded-2xl shadow-xl z-20 py-2">
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocationDropdown(false);
                        triggerToast(`Switched view to ${loc}`);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30 ${selectedLocation === loc ? "text-primary bg-rose-50/50 dark:bg-rose-950/20" : "text-dark-brown dark:text-rose-100"}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Header Button */}
            <button
              onClick={() => triggerToast(`Wishlist contains ${wishlist.length} bakeries`)}
              className="relative p-2 text-dark-brown/70 dark:text-rose-100/70 hover:text-primary transition rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
            >
              <svg className="w-5.5 h-5.5" fill={wishlist.length > 0 ? "#e86276" : "none"} stroke={wishlist.length > 0 ? "#e86276" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            {session?.user ? (
              <UserMenu
                user={session.user}
                onOpenWishlist={() => triggerToast(`Wishlist contains ${wishlist.length} bakeries`)}
                onOpenOrders={() => triggerToast("Your active orders list is empty.")}
              />
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs hover:shadow-sm transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-12 lg:py-16">
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl lg:text-6xl text-dark-brown dark:text-rose-100 leading-[1.1] font-bold">
                Find amazing <br />
                <span className="text-primary italic font-normal">local bakers</span>
                <span className="text-primary ml-3 font-normal inline-block text-3xl align-middle">
                  <svg className="w-10 h-10 inline" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
              </h1>
              <p className="text-dark-brown/70 dark:text-rose-200/60 text-base max-w-lg leading-relaxed">
                Discover delicious cakes, pastries and more from talented bakers near you. Handcrafted fresh with premium quality ingredients.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-[#2b1b17] rounded-3xl p-2 shadow-card max-w-xl border border-rose-50 dark:border-rose-950/30">
              <div className="relative flex items-center px-4 py-2 border-r border-rose-100 dark:border-rose-950/50 min-w-[150px]">
                <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none cursor-pointer pr-4 appearance-none w-full"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc} className="dark:bg-[#2b1b17] dark:text-rose-100">{loc === "All Locations" ? "All Locations" : loc.split(",")[0]}</option>
                  ))}
                </select>
                <div className="absolute right-3 pointer-events-none text-dark-brown/50 dark:text-rose-100/50 text-[10px]">▼</div>
              </div>
              <div className="flex-1 flex items-center px-4 py-2">
                <input
                  type="text"
                  placeholder="Search by city, baker name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-medium bg-transparent border-none outline-none text-dark-brown dark:text-rose-100 placeholder-dark-brown/40 dark:placeholder-rose-100/40"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-dark-brown/40 dark:text-rose-100/40 hover:text-primary pr-2 text-xs">✕</button>
                )}
              </div>
              <button
                onClick={() => triggerToast(`Found ${filteredBakers.length} bakers matching your search`)}
                className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-6 py-3 font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-dark-brown/50 dark:text-rose-200/50 font-medium">Popular searches:</span>
              <div className="flex gap-2">
                {["Birthday Cakes", "Cupcakes", "Brownies"].map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedCategory(s);
                      triggerToast(`Filtered for ${s}`);
                    }}
                    className="text-primary bg-primary-light dark:bg-rose-950/40 hover:bg-primary/20 dark:hover:bg-primary/30 px-3 py-1.5 rounded-full font-semibold transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative flex justify-center">
            {/* Visual background decor */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-rose-100 dark:bg-rose-900/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-6 right-6 w-32 h-32 bg-primary-light dark:bg-primary-light/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative bg-white dark:bg-[#2b1b17] p-4 rounded-[40px] shadow-card border border-rose-50/50 dark:border-rose-950/30 max-w-[380px]">
              <img
                src="/hero-cake.png"
                alt="Flour n Sugar Specialty Cake"
                className="w-[360px] h-[380px] rounded-[32px] object-cover hover:scale-102 transition duration-500"
              />
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-[#2b1b17] px-4 py-3 rounded-2xl shadow-lg border border-rose-50 dark:border-rose-950/30 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light dark:bg-rose-950/40 rounded-full flex items-center justify-center text-primary text-xl font-bold">★</div>
                <div>
                  <span className="block text-xs font-bold text-dark-brown dark:text-rose-100">Top Rated Bakers</span>
                  <span className="block text-[10px] text-dark-brown/60 dark:text-rose-200/60">Verified Community Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-12 border-t border-rose-50/50 dark:border-rose-950/30">
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">Browse Treats</span>
            <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-100 mt-1">Explore Delicious Categories</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    if (isActive) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(cat.name);
                      triggerToast(`Showing only ${cat.name}`);
                    }
                  }}
                  className={`flex flex-col items-center p-4 rounded-3xl border transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary border-primary text-white scale-105 shadow-md"
                      : "bg-white dark:bg-[#2b1b17] border-rose-50/60 dark:border-rose-950/30 text-dark-brown dark:text-rose-100 hover:border-primary/40 hover:-translate-y-1 shadow-sm"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-xs ${
                      isActive
                        ? "bg-white/20"
                        : "bg-rose-50 dark:bg-rose-950/40"
                    }`}
                  >
                    <NotoIcon icon={cat.icon} size={28} />
                  </div>
                  <span className="text-xs font-bold text-center tracking-tight">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular Bakers Section */}
        <section id="bakers" className="py-12 border-t border-rose-50/50 dark:border-rose-950/30">
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">Handpicked for You</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-100">Popular bakers near you</h2>
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-xs text-dark-brown/50 dark:text-rose-200/50 mt-1 italic">Made with clean ingredients, baked fresh upon order</p>
          </div>

          {filteredBakers.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-50 dark:border-rose-950/30 shadow-sm">
              <div className="flex justify-center mb-2">
                <NotoIcon icon={cupcake} size={36} />
              </div>
              <p className="text-sm font-semibold text-dark-brown dark:text-rose-100 mt-2">No bakers match your specific filters.</p>
              <button
                onClick={() => { setSelectedCategory(null); setSelectedLocation("All Locations"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredBakers.map(baker => {
                const isWished = wishlist.includes(baker.id);
                return (
                  <div key={baker.id} className="bg-white dark:bg-[#2b1b17] rounded-3xl overflow-hidden shadow-sm hover:shadow-card border border-rose-50/50 dark:border-rose-950/30 transition-all duration-300 group flex flex-col justify-between">
                    <div className="relative">
                      <img
                        src={baker.image}
                        alt={baker.name}
                        className="w-full h-44 object-cover group-hover:scale-103 transition duration-500"
                      />
                      {/* Floating Rating Tag */}
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#2b1b17]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-extrabold text-dark-brown dark:text-rose-100 flex items-center gap-1 shadow-sm">
                        <span className="text-amber-400">★</span>
                        <span>{baker.rating}</span>
                      </div>

                      {/* Heart Button */}
                      <button
                        onClick={() => handleHeartClick(baker.id, baker.name)}
                        className="absolute top-3 right-3 bg-white/90 dark:bg-[#2b1b17]/90 backdrop-blur-xs p-2 rounded-full shadow-sm text-dark-brown dark:text-rose-100 hover:text-primary transition group/heart cursor-pointer"
                      >
                        <svg className="w-4 h-4 transition duration-300" fill={isWished ? "#e86276" : "none"} stroke={isWished ? "#e86276" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-bold text-dark-brown dark:text-rose-50 text-base hover:text-primary dark:hover:text-primary-light transition cursor-pointer" onClick={() => setActiveBakerProfile(baker)}>
                            {baker.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{baker.distance} ({baker.location.split(",")[0]})</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {baker.tags.map(tag => (
                            <span key={tag} className="text-[9px] bg-rose-50 dark:bg-rose-950/40 text-dark-brown/70 dark:text-rose-200 font-semibold px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => setActiveBakerProfile(baker)}
                          className="flex-1 text-center bg-rose-50 dark:bg-rose-950/30 hover:bg-primary-light dark:hover:bg-primary/20 text-primary dark:text-primary-light py-2.5 rounded-xl font-bold text-xs transition border border-rose-100 dark:border-rose-900/30 cursor-pointer"
                        >
                          View Profile
                        </button>
                        <a
                          href={baker.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl shadow-md transition flex items-center justify-center cursor-pointer"
                          title="Chat on WhatsApp"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.634-1.02-5.11-2.881-6.974-1.86-1.865-4.343-2.887-6.978-2.889-5.439 0-9.865 4.42-9.87 9.865-.002 1.765.463 3.49 1.345 5.021l-.952 3.478 3.565-.935z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Join as Baker Banner */}
        <section className="my-12 bg-rose-100/50 dark:bg-rose-950/10 rounded-[32px] p-8 lg:p-12 border border-rose-100/80 dark:border-rose-900/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <img
              src="/baker-card-5.png"
              alt="Join Flour n Sugar"
              className="w-[260px] h-[260px] rounded-2xl object-cover shadow-md"
            />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-100">Are you a baker?</h2>
            <p className="text-dark-brown/70 dark:text-rose-200/60 text-xs leading-relaxed">
              Create your free profile, show off your signature creations, and start getting discovered by dessert lovers in your area.
            </p>
            <Link
              href="/onboarding"
              className="bg-dark-brown hover:bg-dark-brown-light dark:bg-primary dark:hover:bg-primary-hover text-white font-bold text-xs px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Join as a Baker</span>
              <span>→</span>
            </Link>
          </div>
          <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-rose-200/50 dark:border-rose-900/30 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary font-bold text-sm">✓</div>
              <div>
                <span className="block text-xs font-bold text-dark-brown dark:text-rose-100">Showcase your creations</span>
                <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50">Upload menus and beautiful images</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary font-bold text-sm">✓</div>
              <div>
                <span className="block text-xs font-bold text-dark-brown dark:text-rose-100">Get more orders and followers</span>
                <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50">Connect with local customers directly</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary font-bold text-sm">✓</div>
              <div>
                <span className="block text-xs font-bold text-dark-brown dark:text-rose-100">Grow your baking business</span>
                <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50">Gain verified ratings and feedback</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 border-t border-rose-50/50 dark:border-rose-950/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">Simple Steps</span>
              <div className="flex items-center gap-2 mt-1">
                <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-100">How it works</h2>
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-xs text-dark-brown/50 dark:text-rose-200/50 mt-1">Ordering from your favorite local baker is just 3 simple steps</p>
            </div>

            <div className="relative space-y-8">
              {/* Process indicator vertical dotted line */}
              <div className="absolute left-6 top-4 bottom-4 border-l-2 border-dashed border-rose-200 dark:border-rose-900/30"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center shadow-md">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-dark-brown dark:text-rose-100">Discover</h3>
                  <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 max-w-md mt-1">
                    Find home bakers near you, filter by sweet specialties, and explore their delicious menus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center shadow-md">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-dark-brown dark:text-rose-100">Connect</h3>
                  <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 max-w-md mt-1">
                    Chat with the baker directly on WhatsApp or call to customize details, flavors, and delivery dates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center shadow-md">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-dark-brown dark:text-rose-100">Enjoy</h3>
                  <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 max-w-md mt-1">
                    Receive your fresh, hand-baked treats delivered directly to your doorstep and satisfy your sweet tooth!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img
              src="/how-it-works.png"
              alt="Freshly baked treats"
              className="w-[400px] h-[300px] rounded-[32px] object-cover shadow-sm border border-rose-50 dark:border-rose-950/30"
            />
          </div>
        </section>

        {/* Desktop Footer Stats Panel */}
        <section className="bg-dark-brown dark:bg-[#150e0c] rounded-[32px] text-white p-8 lg:p-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-3xl font-bold">Made with love, <br />just for you</h2>
              <span className="text-primary text-2xl font-serif">♡</span>
            </div>
            <p className="text-rose-100/70 dark:text-rose-200/60 text-xs leading-relaxed max-w-md">
              Support local home bakers, enjoy customized delicious desserts, and make every celebration special.
            </p>
            <button
              onClick={() => {
                document.getElementById("bakers")?.scrollIntoView({ behavior: "smooth" });
                triggerToast("Scrolling to local bakers");
              }}
              className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore bakers near you</span>
              <span>→</span>
            </button>
          </div>
          <div className="lg:col-span-6 grid grid-cols-3 gap-6 text-center border-t lg:border-t-0 lg:border-l border-rose-900/50 dark:border-rose-950/40 pt-8 lg:pt-0 lg:pl-12">
            <div>
              <span className="block text-3xl lg:text-4xl font-serif font-bold text-primary">500+</span>
              <span className="block text-[10px] text-rose-100/50 dark:text-rose-200/40 font-bold uppercase tracking-wider mt-1">Bakers</span>
            </div>
            <div>
              <span className="block text-3xl lg:text-4xl font-serif font-bold text-primary">10K+</span>
              <span className="block text-[10px] text-rose-100/50 dark:text-rose-200/40 font-bold uppercase tracking-wider mt-1">Happy Customers</span>
            </div>
            <div>
              <span className="block text-3xl lg:text-4xl font-serif font-bold text-primary">50+</span>
              <span className="block text-[10px] text-rose-100/50 dark:text-rose-200/40 font-bold uppercase tracking-wider mt-1">Cities</span>
            </div>
          </div>
        </section>
      </div>

      {/* --- MOBILE VIEWPORT LAYOUT --- */}
      <div className="md:hidden flex flex-col flex-1 pb-20 bg-background">
        {/* Mobile Header Banner */}
        <header className="sticky top-0 bg-white/95 dark:bg-[#2b1b17]/95 backdrop-blur-md z-30 px-4 py-3.5 border-b border-rose-100 flex justify-between items-center shadow-xs">
          <button onClick={() => triggerToast("Mobile sidebar coming soon!")} className="p-1.5 text-dark-brown dark:text-rose-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-primary-light dark:bg-rose-950 rounded-full flex items-center justify-center text-primary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 1 4 4v2.5a.5.5 0 0 0 .5.5H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3h1.5a.5.5 0 0 0 .5-.5V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2.5c0 .7-.4 1.3-1.07 1.57A4.98 4.98 0 0 0 5 13v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a4.98 4.98 0 0 0-3.93-4.93C14.4 8.8 14 8.2 14 7.5V6a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-dark-brown dark:text-rose-100">flour·n·sugar</span>
          </div>

          <button onClick={() => triggerToast("You have 0 new notifications")} className="p-1.5 text-dark-brown dark:text-rose-100 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </header>

        {/* Location Dropdown selector */}
        <div className="px-4 py-2.5 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-dark-brown dark:text-rose-100 outline-none cursor-pointer"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc} className="dark:bg-[#2b1b17]">{loc === "All Locations" ? "Mumbai, Maharashtra" : loc}</option>
              ))}
            </select>
          </div>
          <span className="text-[10px] text-primary font-bold">● Active</span>
        </div>

        {/* Hero & Search Header */}
        <div className="px-4 pt-6 pb-4 space-y-4">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-8 space-y-1.5">
              <h1 className="font-serif text-2xl font-bold leading-tight text-dark-brown dark:text-rose-100">
                Find amazing <br />
                <span className="text-primary">local bakers</span> near you
              </h1>
              <p className="text-[10px] text-dark-brown/60 dark:text-rose-200/50 leading-relaxed">
                Discover homemade cakes, cookies, breads and more from passionate bakers.
              </p>
            </div>
            <div className="col-span-4 relative flex justify-end">
              <img
                src="/hero-cake.png"
                alt="Cake"
                className="w-[90px] h-[90px] rounded-2xl object-cover shadow-xs border border-rose-50/50"
              />
            </div>
          </div>

          {/* Search box input mobile */}
          <div className="flex items-center bg-white dark:bg-[#33221e] rounded-2xl px-4 py-3 shadow-xs border border-rose-100/50">
            <svg className="w-4.5 h-4.5 text-dark-brown/40 dark:text-rose-100/40 mr-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search cakes, cupcakes, brownies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none bg-transparent placeholder-dark-brown/30 dark:placeholder-rose-100/30"
            />
          </div>
        </div>

        {/* Mobile Horizontal scroll Categories */}
        <div className="py-4">
          <div className="px-4 flex justify-between items-center mb-3">
            <span className="text-xs font-extrabold text-dark-brown dark:text-rose-100">Dessert Categories</span>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="text-[10px] text-primary font-bold">Clear filter</button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xs border ${
                      isActive
                        ? "bg-primary border-primary"
                        : "bg-white dark:bg-[#33221e] border-rose-100/50"
                    }`}
                  >
                    <NotoIcon icon={cat.icon} size={28} />
                  </div>
                  <span className="text-[10px] font-bold text-dark-brown/80 dark:text-rose-100/80 mt-1.5">
                    {cat.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Bakers mobile section */}
        <div className="py-4 px-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-extrabold text-dark-brown dark:text-rose-100">Featured Bakers</h2>
            <button onClick={() => triggerToast("Viewing all bakers")} className="text-[10px] font-bold text-primary">View all</button>
          </div>

          {filteredBakers.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-[#33221e] rounded-2xl border border-rose-100/50 shadow-xs">
              <span className="text-2xl">🧁</span>
              <p className="text-xs font-semibold text-dark-brown dark:text-rose-100 mt-2">No match found</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
              {filteredBakers.map(baker => {
                const isWished = wishlist.includes(baker.id);
                return (
                  <div
                    key={baker.id}
                    className="bg-white dark:bg-[#33221e] rounded-2xl overflow-hidden border border-rose-100/30 shadow-xs flex-shrink-0 w-60 relative flex flex-col justify-between"
                  >
                    <div className="relative">
                      <img
                        src={baker.image}
                        alt={baker.name}
                        className="w-full h-32 object-cover"
                      />
                      {baker.isTopRated && (
                        <div className="absolute top-2 left-2 bg-amber-400 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <NotoIcon icon={glowingStar} size={10} />
                          <span>Top Rated</span>
                        </div>
                      )}
                      {baker.isPopular && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <NotoIcon icon={fire} size={10} />
                          <span>Popular</span>
                        </div>
                      )}

                      <button
                        onClick={() => handleHeartClick(baker.id, baker.name)}
                        className="absolute top-2 right-2 bg-white/80 dark:bg-dark-brown/80 p-1.5 rounded-full text-dark-brown dark:text-rose-100 hover:text-primary transition"
                      >
                        <svg className="w-3.5 h-3.5" fill={isWished ? "#e86276" : "none"} stroke={isWished ? "#e86276" : "currentColor"} strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-3 space-y-1">
                      <h3 className="font-serif font-bold text-dark-brown dark:text-rose-100 text-sm hover:text-primary transition cursor-pointer" onClick={() => setActiveBakerProfile(baker)}>
                        {baker.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-primary">
                        <span>★ {baker.rating} ({baker.reviews})</span>
                        <span className="text-dark-brown/30">|</span>
                        <span>{baker.location.split(",")[0]}</span>
                      </div>

                      <button
                        onClick={() => setActiveBakerProfile(baker)}
                        className="w-full text-center bg-rose-50 hover:bg-primary-light text-primary py-2 rounded-lg font-bold text-[10px] transition mt-2 border border-rose-100 dark:border-rose-900/30 dark:bg-rose-950/20"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Why Flour & Sugar Section mobile */}
        <div className="py-6 px-4 bg-rose-50/20 dark:bg-rose-950/10 space-y-4">
          <h2 className="text-sm font-extrabold text-dark-brown dark:text-rose-100 text-center">Why Flour & Sugar?</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-[#33221e] p-3 rounded-xl border border-rose-100/30 space-y-1 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary text-xs">📍</div>
              <h3 className="text-[11px] font-bold text-dark-brown dark:text-rose-100">Local & Trusted</h3>
              <p className="text-[9px] text-dark-brown/50 dark:text-rose-200/40 leading-relaxed">Find verified bakers in your community.</p>
            </div>
            <div className="bg-white dark:bg-[#33221e] p-3 rounded-xl border border-rose-100/30 space-y-1 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary text-xs">🌸</div>
              <h3 className="text-[11px] font-bold text-dark-brown dark:text-rose-100">Quality Assured</h3>
              <p className="text-[9px] text-dark-brown/50 dark:text-rose-200/40 leading-relaxed">Handmade with love and strict hygiene.</p>
            </div>
            <div className="bg-white dark:bg-[#33221e] p-3 rounded-xl border border-rose-100/30 space-y-1 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary text-xs">💬</div>
              <h3 className="text-[11px] font-bold text-dark-brown dark:text-rose-100">Easy Connect</h3>
              <p className="text-[9px] text-dark-brown/50 dark:text-rose-200/40 leading-relaxed">Chat, call or place order in one tap.</p>
            </div>
            <div className="bg-white dark:bg-[#33221e] p-3 rounded-xl border border-rose-100/30 space-y-1 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-rose-950/40 flex items-center justify-center text-primary text-xs">🧁</div>
              <h3 className="text-[11px] font-bold text-dark-brown dark:text-rose-100">Wide Variety</h3>
              <p className="text-[9px] text-dark-brown/50 dark:text-rose-200/40 leading-relaxed">From customized cakes to cookies.</p>
            </div>
          </div>
        </div>

        {/* Trending Near You mobile section */}
        <div className="py-4 px-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-extrabold text-dark-brown dark:text-rose-100">Trending Near You</h2>
            <button onClick={() => triggerToast("Viewing trending bakes")} className="text-[10px] font-bold text-primary">View all</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            <div className="bg-white dark:bg-[#33221e] rounded-xl overflow-hidden border border-rose-100/30 flex-shrink-0 w-36 shadow-xs">
              <div className="relative">
                <img src="/baker-card-4.png" alt="Choc" className="w-full h-24 object-cover" />
                <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md">-10% OFF</span>
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-bold text-dark-brown dark:text-rose-100 truncate">Fudge Chocolate Cake</span>
                <span className="block text-[9px] text-primary font-bold">₹150 / slice</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#33221e] rounded-xl overflow-hidden border border-rose-100/30 flex-shrink-0 w-36 shadow-xs">
              <div className="relative">
                <img src="/baker-card-5.png" alt="Flower" className="w-full h-24 object-cover" />
                <span className="absolute top-1.5 left-1.5 bg-emerald-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md">NEW</span>
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-bold text-dark-brown dark:text-rose-100 truncate">Elegant Floral Cake</span>
                <span className="block text-[9px] text-primary font-bold">₹3,500</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#33221e] rounded-xl overflow-hidden border border-rose-100/30 flex-shrink-0 w-36 shadow-xs">
              <div className="relative">
                <img src="/baker-card-3.png" alt="Cupcake" className="w-full h-24 object-cover" />
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-bold text-dark-brown dark:text-rose-100 truncate">Swirl Strawberry Cupcakes</span>
                <span className="block text-[9px] text-primary font-bold">₹480 / 6pcs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Nav Bar (Mobile Layout Only) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#2b1b17]/95 backdrop-blur-md border-t border-rose-100/50 flex justify-around items-center py-2 shadow-lg">
          <button
            onClick={() => { setMobileTab("home"); triggerToast("Navigated to Home"); }}
            className={`flex flex-col items-center gap-0.5 ${mobileTab === "home" ? "text-primary" : "text-dark-brown/60 dark:text-rose-100/60"}`}
          >
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[9px] font-bold">Home</span>
          </button>

          <button
            onClick={() => { setMobileTab("search"); triggerToast("Tap on search input above to search!"); }}
            className={`flex flex-col items-center gap-0.5 ${mobileTab === "search" ? "text-primary" : "text-dark-brown/60 dark:text-rose-100/60"}`}
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[9px] font-bold">Search</span>
          </button>

          <button
            onClick={() => { setMobileTab("categories"); triggerToast("Explore categories horizontally above!"); }}
            className={`flex flex-col items-center gap-0.5 ${mobileTab === "categories" ? "text-primary" : "text-dark-brown/60 dark:text-rose-100/60"}`}
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="text-[9px] font-bold">Categories</span>
          </button>

          <button
            onClick={() => { setMobileTab("orders"); triggerToast("Your active orders list is empty."); }}
            className={`flex flex-col items-center gap-0.5 ${mobileTab === "orders" ? "text-primary" : "text-dark-brown/60 dark:text-rose-100/60"}`}
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[9px] font-bold">Orders</span>
          </button>

          <button
            onClick={() => {
              setMobileTab("profile");
              if (session?.user) {
                triggerToast(`Signed in as ${session.user.name}`);
              } else {
                setShowAuthModal(true);
              }
            }}
            className={`flex flex-col items-center gap-0.5 ${mobileTab === "profile" ? "text-primary" : "text-dark-brown/60 dark:text-rose-100/60"}`}
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[9px] font-bold">{session?.user ? session.user.name.split(" ")[0] : "Sign In"}</span>
          </button>
        </div>
      </div>

      {/* --- REUSABLE INTERACTIVE DRAWER/PANELS --- */}

      {/* Baker Details Drawer */}
      {activeBakerProfile && (
        <div className="fixed inset-0 bg-dark-brown/60 z-50 flex justify-end transition-opacity duration-300 backdrop-blur-xs">
          <div className="w-full sm:w-[480px] bg-white dark:bg-[#2b1b17] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-rose-50 dark:border-rose-950/30">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-rose-50 dark:border-rose-950/30">
                <span className="text-xs font-bold text-primary uppercase">Baker Profile</span>
                <button
                  onClick={() => setActiveBakerProfile(null)}
                  className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-dark-brown dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-48">
                  <img
                    src={activeBakerProfile.image}
                    alt={activeBakerProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <h2 className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-100">{activeBakerProfile.name}</h2>
                    <span className="text-xs font-extrabold bg-primary-light text-primary px-3 py-1 rounded-full flex items-center gap-1">
                      ★ {activeBakerProfile.rating}
                    </span>
                  </div>
                  <p className="text-xs text-dark-brown/50 dark:text-rose-200/50 font-medium">📍 {activeBakerProfile.location}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeBakerProfile.tags.map(tag => (
                    <span key={tag} className="text-xs bg-rose-50 dark:bg-rose-950/40 text-dark-brown/70 dark:text-rose-200 font-semibold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Specialty Menu List */}
                <div className="pt-6 space-y-3">
                  <h3 className="font-serif text-base font-bold text-dark-brown dark:text-rose-100">Signature Treats</h3>
                  <div className="space-y-2.5">
                    {activeBakerProfile.specialtyMenu.map(menuItem => (
                      <div key={menuItem.item} className="flex justify-between items-center p-3 rounded-xl bg-rose-50/30 dark:bg-rose-950/10 border border-rose-100/50 dark:border-rose-900/30">
                        <span className="text-xs font-semibold text-dark-brown dark:text-rose-100">{menuItem.item}</span>
                        <span className="text-xs font-bold text-primary">{menuItem.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-rose-50 dark:border-rose-950/30 space-y-3">
              <a
                href={activeBakerProfile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.008.01A11.99 11.99 0 0 0 .057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.634-1.02-5.11-2.881-6.974-1.86-1.865-4.343-2.887-6.978-2.889-5.439 0-9.865 4.42-9.87 9.865-.002 1.765.463 3.49 1.345 5.021l-.952 3.478 3.565-.935z" />
                </svg>
                <span>Chat on WhatsApp to Order</span>
              </a>
              <button
                onClick={() => triggerToast(`Contact email: contact@${activeBakerProfile.name.toLowerCase().replace(/[^a-z]/g, "")}.com`)}
                className="w-full py-3 bg-rose-50 dark:bg-rose-950/30 hover:bg-primary-light dark:hover:bg-primary/20 text-primary dark:text-primary-light rounded-xl font-bold text-xs transition border border-rose-100 dark:border-rose-900/30 cursor-pointer"
              >
                Send Email Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join as Baker Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-dark-brown/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#2b1b17] rounded-[32px] p-6 lg:p-8 shadow-2xl relative border border-rose-50 dark:border-rose-950/30">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-dark-brown dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition text-sm cursor-pointer"
            >
              ✕
            </button>

            {joinSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="flex justify-center">
                  <NotoIcon icon={womanCook} size={54} className="animate-bounce" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-100">Application Received!</h3>
                <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 leading-relaxed max-w-xs mx-auto">
                  Thank you for applying to join Flour n Sugar! We will review your profile and reach out within 48 hours.
                </p>
                <div className="pt-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-5">
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-100">Join as a Home Baker</h3>
                  <p className="text-xs text-dark-brown/50 dark:text-rose-200/50">Register to showcase and sell your creations locally</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-dark-brown/70 dark:text-rose-100/70 uppercase">Bakery / Chef Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sweet Delights By Marie"
                      value={bakerName}
                      onChange={(e) => setBakerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-dark-brown/70 dark:text-rose-100/70 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marie@gmail.com"
                      value={bakerEmail}
                      onChange={(e) => setBakerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-dark-brown/70 dark:text-rose-100/70 uppercase">City & Neighborhood</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandra, Mumbai"
                      value={bakerCity}
                      onChange={(e) => setBakerCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-md transition"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Better Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          triggerToast("Successfully signed in!");
        }}
      />
    </div>
  );
}
