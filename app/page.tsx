"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles,
  Calculator,
  Sliders,
  Home,
  ArrowRight,
  Star,
  X,
  Award,
  PenTool,
  Truck,
  ThumbsUp,
  Mail,
  Phone,
  User,
  Info,
  Clock,
  Sparkle,
  Menu,
  Play
} from "lucide-react";

// Types & Interfaces
interface GalleryItem {
  id: number;
  category: string;
  title: string;
  image: string;
  size: string;
  price: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  bhk: string;
  duration: string;
}

export default function HomePage() {
  // Navigation & Interactive States
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hero Section Slide Show
  const heroImages = [
    {
      src: "/hero_living_room.png",
      title: "Luxury Living Rooms",
      subtitle: "Tailored to your lifestyle"
    },
    {
      src: "/kitchen_modern.png",
      title: "German-engineered Kitchens",
      subtitle: "Effortless utility meets sleek modern aesthetics"
    },
    {
      src: "/bedroom_luxury.png",
      title: "Serene & Elegant Bedrooms",
      subtitle: "Crafted for maximum comfort and relaxation"
    }
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Budget Estimator State
  const [calcBhk, setCalcBhk] = useState<"1 BHK" | "2 BHK" | "3 BHK" | "4 BHK / Villa">("2 BHK");
  const [calcQuality, setCalcQuality] = useState<"Essential" | "Premium" | "Luxe">("Premium");
  const [includeKitchen, setIncludeKitchen] = useState(true);
  const [includeLiving, setIncludeLiving] = useState(true);
  const [includeBedroom, setIncludeBedroom] = useState(true);
  const [includeWardrobes, setIncludeWardrobes] = useState(true);
  const [includeFalseCeiling, setIncludeFalseCeiling] = useState(false);

  // Design Inspiration Gallery State
  const [activeGalleryTab, setActiveGalleryTab] = useState<"All" | "Living Room" | "Kitchen" | "Bedroom" | "Wardrobes">("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");

  // Testimonials Carousel State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // FAQs Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Booking Consultation Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalFormData, setModalFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bhk: "2 BHK",
    city: "Bengaluru",
    budget: "₹4L - ₹6L"
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Inline Consultation Form State
  const [inlineFormData, setInlineFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Bengaluru",
    agree: true
  });
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  // Quick Hero Estimator State
  const [heroBhk, setHeroBhk] = useState("2 BHK");
  const [heroCity, setHeroCity] = useState("Bengaluru");

  // Cities List
  const cities = ["Bengaluru", "Mumbai", "Delhi NCR", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];

  // Gallery items matching Livspace vibe
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: "Living Room",
      title: "Elegant Sage Green Scandinavian Living Room",
      image: "/hero_living_room.png",
      size: "14' x 16'",
      price: "₹1,85,000"
    },
    {
      id: 2,
      category: "Kitchen",
      title: "Charcoal Matte Minimalist Kitchen with Marble Countertops",
      image: "/kitchen_modern.png",
      size: "10' x 8'",
      price: "₹2,40,000"
    },
    {
      id: 3,
      category: "Bedroom",
      title: "Warm Oak & Cream Luxury Master Suite",
      image: "/bedroom_luxury.png",
      size: "12' x 14'",
      price: "₹1,95,000"
    },
    {
      id: 4,
      category: "Living Room",
      title: "Neoclassical Living with Crown Moldings",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      size: "15' x 18'",
      price: "₹2,65,000"
    },
    {
      id: 5,
      category: "Kitchen",
      title: "Bright Contemporary L-Shaped Kitchen with Breakfast Bar",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      size: "11' x 9'",
      price: "₹2,10,000"
    },
    {
      id: 6,
      category: "Wardrobes",
      title: "Walk-in Smoked Glass Wardrobes with LED Profiles",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
      size: "8' x 10'",
      price: "₹1,45,000"
    },
    {
      id: 7,
      category: "Bedroom",
      title: "Compact Mid-Century Modern Guest Room",
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
      size: "10' x 11'",
      price: "₹1,20,000"
    },
    {
      id: 8,
      category: "Wardrobes",
      title: "Glossy White Modular Sliding Wardrobe",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      size: "9' x 9'",
      price: "₹95,000"
    }
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Abhishek & Nupur Sharma",
      location: "Bengaluru, Whitefield",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      quote: "Livspace made our home look like a 5-star hotel! Our designer was extremely receptive. From design selection to installation, the updates were weekly. The flat 10-year warranty gives us absolute peace of mind.",
      rating: 5,
      bhk: "3 BHK Home",
      duration: "40 Days Delivery"
    },
    {
      id: 2,
      name: "Rohit Deshmukh",
      location: "Mumbai, Thane",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      quote: "Being an NRI, I needed someone I could trust with quality and timeline. Livspace executed the modular kitchen and storage wardrobes within budget. The German hinges and wood finishes are top-notch.",
      rating: 5,
      bhk: "2 BHK Flat",
      duration: "35 Days Delivery"
    },
    {
      id: 3,
      name: "Shreya & Raghav Roy",
      location: "Gurugram, Sector 56",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      quote: "We were skeptical about hidden costs. But the initial quote was virtually the final figure. The project manager conducted 146 checks! Extremely professional service, we are thrilled with our living area.",
      rating: 5,
      bhk: "4 BHK Villa",
      duration: "45 Days Delivery"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "What is included in the Livspace flat 10-year warranty?",
      answer: "The 10-year warranty covers modular woodwork (kitchen shutters, cabinets, wardrobes, and drawers) against manufacturing defects, wood pests, and board separation. Accessories and hardware carry specific vendor warranties up to 5 years."
    },
    {
      question: "How is the interior design cost calculated?",
      answer: "The price is based on the floor plan size (BHK), quality tier (Essential vs. Luxe), modular units requested, and any additional Civil works like false ceiling, customized painting, electrical rerouting, and custom masonry."
    },
    {
      question: "What are the timeline guarantees for home execution?",
      answer: "Livspace guarantees installation and handover within 45 working days starting from the date of final 3D design approval and site clearance. Any delays from our side carry a compensation clause."
    },
    {
      question: "Can I get my interiors done in stages or phase-by-phase?",
      answer: "Yes, you can. Many clients start with modular items (kitchen and wardrobes) and complete the living decor, wallpapers, and study furniture at a later stage. We accommodate flexible planning."
    },
    {
      question: "Is there a booking fee, and is it refundable?",
      answer: "A booking fee of 5% of the estimated project value secures your design specialist and locks in the current promotional offers. It is fully refundable within 7 days of payment if you change your mind."
    }
  ];

  // Scroll Event Listener to set glass styling on Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-playing Slideshow for Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Real-time calculation logic
  const calculateTotalEstimate = () => {
    let base = 0;

    // BHK Base Cost
    switch (calcBhk) {
      case "1 BHK": base = 180000; break;
      case "2 BHK": base = 280000; break;
      case "3 BHK": base = 420000; break;
      case "4 BHK / Villa": base = 580000; break;
    }

    // Material Quality multiplier
    let multiplier = 1.0;
    if (calcQuality === "Premium") multiplier = 1.35;
    if (calcQuality === "Luxe") multiplier = 1.85;

    let subtotal = base * multiplier;

    // Inclusion additions
    let itemsTotal = 0;
    if (includeKitchen) itemsTotal += 120000 * (calcQuality === "Luxe" ? 2.0 : calcQuality === "Premium" ? 1.4 : 1.0);
    if (includeWardrobes) itemsTotal += 90000 * (calcQuality === "Luxe" ? 1.8 : calcQuality === "Premium" ? 1.3 : 1.0);
    if (includeLiving) itemsTotal += 60000 * (calcQuality === "Luxe" ? 1.7 : calcQuality === "Premium" ? 1.3 : 1.0);
    if (includeBedroom) itemsTotal += 50000 * (calcQuality === "Luxe" ? 1.6 : calcQuality === "Premium" ? 1.3 : 1.0);
    if (includeFalseCeiling) itemsTotal += 40000 * (calcQuality === "Luxe" ? 1.5 : calcQuality === "Premium" ? 1.25 : 1.0);

    const total = subtotal + itemsTotal;

    // Return low and high range for realistic pricing
    const lowRange = Math.round((total * 0.95) / 1000) * 1000;
    const highRange = Math.round((total * 1.1) / 1000) * 1000;

    return {
      low: lowRange.toLocaleString("en-IN"),
      high: highRange.toLocaleString("en-IN")
    };
  };

  const estimate = calculateTotalEstimate();

  // Handle city selection
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    showToast(`Showing deals & estimators for ${city}`);
  };

  // Form Submissions
  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineFormData.name || !inlineFormData.email || !inlineFormData.phone) {
      showToast("Please fill in all details.");
      return;
    }
    setInlineSubmitted(true);
    setTimeout(() => {
      setInlineSubmitted(false);
      setInlineFormData({ name: "", email: "", phone: "", city: selectedCity, agree: true });
      showToast("Consultation booked! A designer will contact you shortly.");
    }, 2000);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalStep < 3) {
      setModalStep(modalStep + 1);
    } else {
      if (!modalFormData.name || !modalFormData.email || !modalFormData.phone) {
        showToast("Please fill in all user details.");
        return;
      }
      setModalSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setModalSubmitted(false);
        setModalStep(1);
        setModalFormData({ name: "", email: "", phone: "", bhk: "2 BHK", city: selectedCity, budget: "₹4L - ₹6L" });
        showToast("Thank you! Your customized quotation request is being built.");
      }, 2500);
    }
  };

  // Filter gallery items
  const filteredGallery = galleryItems.filter(item => {
    if (activeGalleryTab === "All") return true;
    return item.category === activeGalleryTab;
  });

  return (
    <div className="relative min-h-screen bg-[#fcfbfb] pb-20 lg:pb-0">

      {/* Dynamic Toast System */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl animate-slide-up border border-slate-800">
          <Sparkle className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#bf1e2e] py-2.5 px-4 text-center text-xs font-semibold text-white tracking-wide flex items-center justify-center gap-2 relative z-50 shadow-md">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold animate-pulse">Offer</span>
        Get flat 20% off on premium Modular Kitchens + Guaranteed 45 days execution!
        <a href="#booking-form" className="underline hover:text-red-100 ml-1 inline-flex items-center gap-0.5">
          Book Consultation <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* NAVIGATION HEADER */}
      <header
        className={`w-full transition-all duration-300 z-40 sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 ${scrolled
            ? "shadow-md py-3"
            : "py-4.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-black flex items-center">
                DUMMYLOGO<span className="text-[#bf1e2e] font-extrabold">.</span>
              </span>
            </a>

            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors py-1.5 px-3 rounded-full border border-gray-200"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>{selectedCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCityDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isCityDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCityDropdownOpen(false)} />
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 animate-slide-up py-1.5 overflow-hidden">
                    <p className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Select City</p>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleCityChange(city)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${selectedCity === city ? "text-primary font-semibold bg-red-50/50" : "text-slate-700"
                          }`}
                      >
                        {city}
                        {selectedCity === city && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#budget-calculator" className="hover:text-primary transition-colors flex items-center gap-1 bg-red-50 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              <Calculator className="w-3 h-3 animate-bounce" /> Budget Estimator
            </a>
            <a href="#design-gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
            <a href="#faqs" className="hover:text-primary transition-colors">FAQs</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+1800300993"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-4 h-4 text-slate-400" />
              <span>1800-300-993</span>
            </a>
            <button
              onClick={() => {
                setModalStep(1);
                setIsModalOpen(true);
              }}
              className="hidden md:block bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC HERO SECTION */}
      <section className="relative min-h-[580px] lg:h-[calc(100vh-120px)] flex items-center overflow-hidden bg-slate-950 text-white">

        {/* Slideshow background */}
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? "opacity-40" : "opacity-0 pointer-events-none"
              }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover scale-105 transition-transform duration-10000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 grid lg:grid-cols-12 gap-12 items-center">

          {/* Hero Content Area */}
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 border border-white/20 py-1 px-3.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>India&apos;s Most Trusted Home Interior Brand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Bringing home <br />
              <span className="text-gradient">to life.</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
              Get modular solutions, wardrobes, design styling, and complete renovations curated by award-winning interior designers. Backed by a flat 10-year warranty.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="bg-red-500/20 p-1.5 rounded-full border border-red-500/30">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="font-bold leading-none">10-Year Warranty</p>
                  <p className="text-xs text-slate-400">Guaranteed durability</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="bg-red-500/20 p-1.5 rounded-full border border-red-500/30">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="font-bold leading-none">45-Day Delivery</p>
                  <p className="text-xs text-slate-400">Move in on time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hero Calculator Card */}
          <div className="lg:col-span-5 bg-white text-slate-800 p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col w-full max-w-md mx-auto animate-slide-in-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-50 rounded-full filter blur-2xl -z-10 opacity-70" />
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Calculate Interior Cost
            </h3>
            <p className="text-xs text-slate-500 mb-6">Get an instant preliminary quote customized to your city.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Property Configuration</label>
                <div className="grid grid-cols-3 gap-2">
                  {["1 BHK", "2 BHK", "3 BHK"].map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setHeroBhk(bhk)}
                      className={`py-2 px-3 border rounded-lg text-xs font-bold transition-all ${heroBhk === bhk
                          ? "border-primary bg-red-50/50 text-primary"
                          : "border-gray-200 hover:border-gray-300 text-slate-600"
                        }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">City Location</label>
                <select
                  value={heroCity}
                  onChange={(e) => setHeroCity(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setModalFormData({
                      ...modalFormData,
                      bhk: heroBhk,
                      city: heroCity
                    });
                    setModalStep(2); // Jump direct to styling
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Get Estimate Breakdown</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
              <span>Over 24,500 estimations generated today</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: ONE-STOP SHOP */}
      <section className="py-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              One-stop shop for all things interiors
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office. With a wide range of furniture & decor, we have your back from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/kitchen_modern.png",
                title: "Modular Interiors",
                desc: "Functional kitchen, wardrobe and storage"
              },
              {
                img: "/hero_living_room.png",
                title: "Full Home Interiors",
                desc: "Turnkey interior solutions for your home"
              },
              {
                img: "/bedroom_luxury.png",
                title: "Luxury Interiors",
                desc: "Tailored interiors that redefine elegance"
              },
              {
                img: "/renovation_showcase.png",
                title: "Renovations",
                desc: "Expert solutions to upgrade your home"
              }
            ].map((card, idx) => (
              <div key={idx} className="group bg-[#fcfbfb] border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col justify-between p-5 min-h-[360px]">
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center py-4">
                  <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-50">
                  <ChevronRight className="w-4 h-4 mx-auto text-slate-800 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: INSPIRATION GALLERY GRID */}
      <section className="py-20 bg-slate-50 border-t border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Inspiration for home interior designs
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Give your home a new look with these interior design ideas curated for you
              </p>
            </div>
            <a href="#design-gallery" className="text-xs font-bold text-[#bf1e2e] hover:underline flex items-center gap-1 shrink-0">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Item 1 (Living Room) - Row 1, Col 1-2 */}
            <div
              onClick={() => setLightboxImage("/hero_living_room.png")}
              className="md:col-span-2 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero_living_room.png"
                alt="Living Room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                Living Room
              </div>
            </div>

            {/* Item 2 (Master Bedroom) - Row 1, Col 3 */}
            <div
              onClick={() => setLightboxImage("/bedroom_luxury.png")}
              className="md:col-span-1 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bedroom_luxury.png"
                alt="Master Bedroom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                Master Bedroom
              </div>
            </div>

            {/* Item 3 (False Ceiling) - Row 1, Col 4 */}
            <div
              onClick={() => setLightboxImage("https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80")}
              className="md:col-span-1 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
                alt="False Ceiling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                False Ceiling
              </div>
            </div>

            {/* Item 4 (Homes by Us / Dining) - Row 2, Col 1 */}
            <div
              onClick={() => setLightboxImage("/luxury_dining_room.png")}
              className="md:col-span-1 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/luxury_dining_room.png"
                alt="Dining Room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                Homes by Us
              </div>
            </div>

            {/* Item 5 (Kitchen) - Row 2, Col 2-3 */}
            <div
              onClick={() => setLightboxImage("/kitchen_modern.png")}
              className="md:col-span-2 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kitchen_modern.png"
                alt="Kitchen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                Kitchen
              </div>
            </div>

            {/* Item 6 (Wardrobe) - Row 2, Col 4 */}
            <div
              onClick={() => setLightboxImage("https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80")}
              className="md:col-span-1 relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
                alt="Wardrobes"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                Wardrobe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="py-20 bg-white border-b border-slate-100 relative z-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Why choose us
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7 text-primary" />,
                title: "Lifetime warranty*"
              },
              {
                icon: <Clock className="w-7 h-7 text-primary" />,
                title: "45-day move-in guarantee*"
              },
              {
                icon: <CheckCircle2 className="w-7 h-7 text-primary" />,
                title: "146 quality checks"
              },
              {
                icon: <ThumbsUp className="w-7 h-7 text-primary" />,
                title: "1,00,000+ happy homes"
              },
              {
                icon: <MapPin className="w-7 h-7 text-primary" />,
                title: "100+ cities"
              },
              {
                icon: <Sparkles className="w-7 h-7 text-primary" />,
                title: "22 lakh+ items"
              }
            ].map((badge, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 h-36">
                <div className="w-14 h-14 rounded-full bg-red-50/70 flex items-center justify-center border border-red-100/50 mb-3 shadow-inner">
                  {badge.icon}
                </div>
                <h5 className="text-[11px] font-bold text-slate-800 leading-tight tracking-wide px-1">
                  {badge.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTIMATE SELECTOR SECTION */}
      <section id="budget-calculator" className="py-20 bg-white border-b border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Get the estimate for your <span className="text-[#bf1e2e]">Full Home</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Calculate the approximate cost of doing up your home interiors
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Full Home Interior */}
            <div className="bg-[#fcfbfb] border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative group min-h-[260px]">
              {/* Top Row: Illustration and Layout Icon */}
              <div className="flex justify-between items-start">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-[#bf1e2e] shadow-inner">
                    <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 38V46C10 47.1046 10.8954 48 12 48H52C53.1046 48 54 47.1046 54 46V38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 30C6 28.8954 6.89543 28 8 28H56C57.1046 28 58 28.8954 58 30V38H6V30Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 28V22C12 19.7909 13.7909 18 16 18H48C50.2091 18 52 19.7909 52 22V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 48V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M42 48V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#bf1e2e] text-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-white text-[#bf1e2e]" />
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900">Full Home Interior</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Know the estimate price for your full home interiors
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setModalFormData({
                      ...modalFormData,
                      bhk: "2 BHK",
                      budget: "₹3.5L - ₹5L"
                    });
                    setModalStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#bf1e2e] hover:bg-[#9c1522] text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
                >
                  <span>Calculate</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 2: Kitchen */}
            <div className="bg-[#fcfbfb] border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative group min-h-[260px]">
              {/* Top Row: Illustration and Layout Icon */}
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-[#bf1e2e] shadow-inner">
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="44" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="10" y1="28" x2="54" y2="28" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="26" cy="18" r="2" fill="currentColor" />
                    <circle cx="38" cy="18" r="2" fill="currentColor" />
                    <rect x="16" y="36" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="38" y="36" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900">Kitchen</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Get an approximate costing for your kitchen interior.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setModalFormData({
                      ...modalFormData,
                      bhk: "Modular Kitchen",
                      budget: "₹1.5L - ₹2.5L"
                    });
                    setModalStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#bf1e2e] hover:bg-[#9c1522] text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
                >
                  <span>Calculate</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 3: Wardrobe */}
            <div className="bg-[#fcfbfb] border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative group min-h-[260px]">
              {/* Top Row: Illustration and Layout Icon */}
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-[#bf1e2e] shadow-inner">
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="8" width="40" height="48" rx="3" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="12" y1="42" x2="52" y2="42" stroke="currentColor" strokeWidth="2" />
                    <line x1="32" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="2" />
                    <rect x="27" y="20" width="2" height="10" rx="1" fill="currentColor" />
                    <rect x="35" y="20" width="2" height="10" rx="1" fill="currentColor" />
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900">Wardrobe</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Our estimate for your dream wardrobe
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setModalFormData({
                      ...modalFormData,
                      bhk: "Wardrobe Setup",
                      budget: "₹80K - ₹1.5L"
                    });
                    setModalStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#bf1e2e] hover:bg-[#9c1522] text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
                >
                  <span>Calculate</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

          {/* Banner Section */}
          <div className="mt-16 bg-[#faf9f9] rounded-3xl overflow-hidden border border-slate-100 shadow-sm grid lg:grid-cols-12 items-stretch min-h-[320px]">
            {/* Left Image Section */}
            <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kitchen_modern.png"
                alt="Lifetime Warranty Kitchen"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Info Section */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-center items-start relative overflow-hidden">
              {/* Curved skew layout overlay to mimic premium curved edge transition */}
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 bg-white -translate-x-12 -skew-x-12" />

              <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#bf1e2e] leading-snug max-w-sm">
                    ONCE YOU BUY, WE NEVER SAY GOODBYE.
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">*T&C Apply</p>
                </div>

                {/* Circle Seal Badge */}
                <div className="shrink-0 flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#bf1e2e]/20 bg-red-50 relative">
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#bf1e2e]" />
                  <div className="text-center p-2 relative z-10">
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest leading-none">India's First</p>
                    <p className="text-xs font-black text-[#bf1e2e] uppercase tracking-tighter mt-1 leading-none">LIFETIME</p>
                    <p className="text-[9px] font-extrabold text-[#bf1e2e] uppercase tracking-widest leading-none mt-0.5">WARRANTY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES SHOWCASE GRID */}
      <section id="services" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Comprehensive Interior Services
            </h2>
            <p className="text-slate-600">
              Get bespoke interior designs crafted by our design specialists. From custom wood cabinets to designer lights.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Service 1 */}
            <div className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-[#fcfbfb]">
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/kitchen_modern.png"
                  alt="Modular Kitchen"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-extrabold px-3 py-1 rounded-full border border-red-100">
                  Popular
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Modular Kitchens</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    German-engineered cabinets with lift-up shutters, space-saving tandem drawers, and durable quartz counter slabs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalFormData({ ...modalFormData, budget: "Kitchen Setup" });
                    setModalStep(2);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn mt-2"
                >
                  <span>Explore Kitchen Solutions</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-[#fcfbfb]">
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
                  alt="Modular Wardrobes"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Wardrobes & Storage</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Sliding and swing wardrobes with customized layouts, glass mirrors, loft space extension, and premium built-in organizers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalFormData({ ...modalFormData, budget: "Wardrobes" });
                    setModalStep(2);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn mt-2"
                >
                  <span>Explore Wardrobes</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-[#fcfbfb]">
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero_living_room.png"
                  alt="Full Home Interiors"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-extrabold px-3 py-1 rounded-full border border-slate-800">
                  End-to-End
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Full Home Interiors</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Complete turnkey solutions spanning painting, False ceilings, custom wall paneling, wiring, styling, and decor.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalFormData({ ...modalFormData, budget: "Full Home" });
                    setModalStep(2);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn mt-2"
                >
                  <span>Explore Complete Solutions</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Your Journey to a Dream Home
            </h2>
            <p className="text-slate-600">
              Four simple, transparent steps to achieve your customized luxury interiors stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                <Calendar className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">1. Consultation</h4>
              <p className="text-xs text-slate-500 leading-relaxed px-4">
                Meet your design consultant in person or online. Share your layout, styles, and set priorities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                <PenTool className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">2. 3D Designing</h4>
              <p className="text-xs text-slate-500 leading-relaxed px-4">
                Review interactive 3D elevations and modular layout plans. Adjust colors, materials, and components live.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">3. 146 Quality Checks</h4>
              <p className="text-xs text-slate-500 leading-relaxed px-4">
                Materials undergo rigorous moisture, durability, and alignment testing at the factories.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">4. 45-Day Handover</h4>
              <p className="text-xs text-slate-500 leading-relaxed px-4">
                Our technicians execute onsite tasks. We assemble woodwork and cleanup. Move into your custom oasis!
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setModalStep(1);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary bg-white hover:bg-gray-50 border border-slate-200 px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <span>See Complete Execution Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* DESIGN GALLERY SECTION WITH LIGHTBOX */}
      <section id="design-gallery" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore Design Inspiration
            </h2>
            <p className="text-slate-600">
              Browse actual homes designed by Livspace. Filter categories and view transparent modular pricing details.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {["All", "Living Room", "Kitchen", "Bedroom", "Wardrobes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab as any)}
                className={`py-2 px-5 rounded-full text-xs font-bold transition-all ${activeGalleryTab === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item.image)}
                className="group border border-slate-100 bg-[#fcfbfb] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold py-2 px-4 rounded-full shadow-md">
                      View Room Details
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.category}</span>
                  <h5 className="text-sm font-bold text-slate-900 truncate mt-1">{item.title}</h5>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Size: {item.size}</div>
                    <div className="text-xs font-bold text-primary">Est: {item.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS (CAROUSEL) */}
      <section id="reviews" className="py-20 bg-slate-50 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Over 20,000 Happy Homes
            </h2>
            <p className="text-sm text-slate-500">Read what actual homeowners say about our delivery and service quality.</p>
          </div>

          {/* Carousel Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 relative min-h-[300px] flex flex-col justify-between animate-fade-in">

            <div className="absolute -top-4 -left-4 text-8xl text-red-100 font-serif leading-none select-none">
              “
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Client Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonials[currentReviewIndex].image}
                  alt={testimonials[currentReviewIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Text */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonials[currentReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
                  &quot;{testimonials[currentReviewIndex].quote}&quot;
                </p>
              </div>
            </div>

            {/* Testimonial footer details */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-bold text-slate-900">{testimonials[currentReviewIndex].name}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {testimonials[currentReviewIndex].location}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-red-50 text-primary font-bold text-xs px-2.5 py-1 rounded">
                  {testimonials[currentReviewIndex].bhk}
                </span>
                <span className="bg-emerald-50 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded">
                  {testimonials[currentReviewIndex].duration}
                </span>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
              <button
                onClick={() => setCurrentReviewIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
              <button
                onClick={() => setCurrentReviewIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReviewIndex(i)}
                className={`h-2 rounded-full transition-all ${currentReviewIndex === i ? "w-6 bg-primary" : "w-2 bg-slate-300"
                  }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CUSTOMER VIDEO REVIEWS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Check out some of our customer reviews
              </h2>
            </div>
            <a
              href="#reviews"
              className="text-xs sm:text-sm font-bold text-[#bf1e2e] hover:underline flex items-center gap-1 shrink-0"
              onClick={(e) => {
                e.preventDefault();
                showToast("Loading more customer success stories...");
              }}
            >
              <span>View More</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              {/* Image Container with Play Overlay */}
              <div
                onClick={() => {
                  setActiveVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
                  setActiveVideoTitle("Rohit Paul & Shweta - Gurugram Home Tour");
                }}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=600&q=80"
                  alt="Rohit Paul & Shweta"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-slate-800" />
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">Rohit Paul & Shweta</p>
                  <p className="text-slate-300 text-xs mt-0.5">Gurugram</p>
                </div>
              </div>

              {/* Quote below image */}
              <div className="p-5 flex-1 flex items-center justify-center bg-slate-50/50">
                <p className="text-xs sm:text-sm text-slate-600 italic text-center font-medium leading-relaxed">
                  &quot;Hats off to the entire team at Livspace. They finished the project ahead of time.&quot;
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              {/* Image Container with Play Overlay */}
              <div
                onClick={() => {
                  setActiveVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
                  setActiveVideoTitle("Swati & Gaurav - Bangalore Home Tour");
                }}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80"
                  alt="Swati & Gaurav"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-slate-800" />
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">Swati & Gaurav</p>
                  <p className="text-slate-300 text-xs mt-0.5">Bangalore</p>
                </div>
              </div>

              {/* Quote below image */}
              <div className="p-5 flex-1 flex items-center justify-center bg-slate-50/50">
                <p className="text-xs sm:text-sm text-slate-600 italic text-center font-medium leading-relaxed">
                  &quot;Our experience with Livspace was nice thanks to the project managers&quot;
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              {/* Image Container with Play Overlay */}
              <div
                onClick={() => {
                  setActiveVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
                  setActiveVideoTitle("Puja Bhatia - Gurugram Home Tour");
                }}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="Puja Bhatia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-slate-800" />
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">Puja Bhatia</p>
                  <p className="text-slate-300 text-xs mt-0.5">Gurugram</p>
                </div>
              </div>

              {/* Quote below image */}
              <div className="p-5 flex-1 flex items-center justify-center bg-slate-50/50">
                <p className="text-xs sm:text-sm text-slate-600 italic text-center font-medium leading-relaxed">
                  &quot;We reached out to Livspace and they designed the house that we really wanted.&quot;
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section id="faqs" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">Got questions? We have answers. If not, contact our toll-free customer desk.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-100 bg-[#fcfbfb] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-900 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <span>{faq.question}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 ml-4">
                    {openFaqIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? "max-h-[200px] border-t border-slate-100" : "max-h-0"
                    }`}
                >
                  <p className="p-5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INLINE CONSULTATION BOOKING FORM (BOTTOM) */}
      <section id="booking-form" className="py-20 bg-gradient-premium text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-800 rounded-full filter blur-3xl opacity-40 -z-10" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-red-900 rounded-full filter blur-3xl opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Get Started On Your Dream Home
            </h2>
            <p className="text-red-100 mb-8 leading-relaxed max-w-lg text-sm sm:text-base">
              Book a consultation today to meet a design expert at a showroom near you. Free 3D design plans and initial quotation included!
            </p>

            <div className="space-y-4 text-sm text-red-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white fill-red-800" />
                <span>Zero design fees for the first 100 bookings this month</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white fill-red-800" />
                <span>Transparent price matching guarantees</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white fill-red-800" />
                <span>Flat 10-year warranty certificate upon handover</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white text-slate-800 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg mx-auto relative">

            {inlineSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Booking Requested Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A verification call is scheduled. One of our design experts will reach out to you within 2 business hours. Check your inbox for booking details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Book Free Design Consultation</h3>
                <p className="text-xs text-slate-400 mb-4">Complete the fields below to schedule your appointment.</p>

                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={inlineFormData.name}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={inlineFormData.email}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="WhatsApp / Phone Number"
                      required
                      value={inlineFormData.phone}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Preferred City</label>
                    <select
                      value={inlineFormData.city}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="agree-checkbox"
                    checked={inlineFormData.agree}
                    onChange={(e) => setInlineFormData({ ...inlineFormData, agree: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <label htmlFor="agree-checkbox" className="text-[11px] text-slate-500 leading-snug">
                    I agree to receive personalized design tips, estimation quotes, and marketing WhatsApp updates from Livspace.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide text-sm transition-all shadow-md hover:shadow-lg mt-4 flex items-center justify-center gap-2"
                >
                  <span>Book Consultation & Claim 20% Off</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* PREMIUM STRUCTURED FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

            {/* Column 1 */}
            <div className="col-span-2 flex flex-col gap-4">
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                LIVSPACE<span className="text-primary font-bold">.</span>
              </span>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Livspace is India&apos;s leading end-to-end home interior platform, designing and executing dream homes across 40+ cities. High-end finishes, German manufacturing, and flat 10-year warranty.
              </p>

              <div className="flex items-center gap-3 mt-2">
                <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold text-white">f</span>
                <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold text-white">in</span>
                <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold text-white">ig</span>
                <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold text-white">yt</span>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Our Services</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="hover:text-white transition-colors">Modular Kitchens</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Wardrobes & Storage</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Living Rooms</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Bedrooms</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Complete Home Makeover</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Why Choose Us</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">45-day Handover</a></li>
                <li><a href="#budget-calculator" className="hover:text-white transition-colors">10-Year Warranty</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">146 Quality Checks</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Customer Stories</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact Desk</h5>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 1800-300-993</li>
                <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> support@livspace.com</li>
                <li className="leading-relaxed mt-2 text-[11px]">Corporate Office: Indiranagar, Bengaluru - 560038</li>
              </ul>
            </div>

          </div>

          {/* List of Operating Cities */}
          <div className="border-t border-slate-800 py-6 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular Cities:</span> Bengaluru | Mumbai | Delhi | Noida | Gurugram | Ghaziabad | Faridabad | Pune | Hyderabad | Chennai | Kolkata | Ahmedabad | Kochi | Coimbatore | Mysore | Jaipur | Surat.
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} Livspace Home Design Private Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Use</a>
              <a href="#" className="hover:text-slate-400">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>

      {/* DETAILED STEP-BY-STEP ESTIMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 z-10 animate-slide-up">

            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  Instant Modular Quotation
                </h4>
                <p className="text-[10px] text-slate-400">Step {modalStep} of 3</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps Form */}
            {modalSubmitted ? (
              <div className="p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Estimate Compiled!</h4>
                <p className="text-xs text-slate-500 mb-6">
                  Based on your inputs, your estimated range for <span className="font-bold text-primary">{modalFormData.bhk}</span> in <span className="font-bold text-primary">{modalFormData.city}</span> is:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Calculated Value</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {modalFormData.budget}
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1">Pre-registered with code: <span className="font-mono text-slate-600 font-semibold">LIV-2026-EST</span></p>
                </div>
                <p className="text-xs text-slate-400">
                  A verification link and receipt has been sent to <span className="text-slate-800 font-semibold">{modalFormData.email}</span>. A senior designer will schedule a site visit shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="p-6">

                {/* Step 1: Property Config */}
                {modalStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">1. Choose property configuration</h5>

                    <div className="grid grid-cols-2 gap-2">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK / Villa"].map((bhk) => (
                        <button
                          type="button"
                          key={bhk}
                          onClick={() => setModalFormData({ ...modalFormData, bhk })}
                          className={`p-3 border rounded-xl text-left transition-all ${modalFormData.bhk === bhk
                              ? "border-primary bg-red-50/50 text-primary font-bold shadow-sm"
                              : "border-slate-200 hover:border-slate-300 text-slate-600"
                            }`}
                        >
                          {bhk}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Select City</label>
                      <select
                        value={modalFormData.city}
                        onChange={(e) => setModalFormData({ ...modalFormData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Interior Style selection */}
                {modalStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">2. Choose design style</h5>

                    <div className="space-y-2">
                      {[
                        { title: "Modern Minimalist", desc: "Clean geometric lines, sleek push-to-open cabinets, neutral color themes." },
                        { title: "Classic Traditional", desc: "Ornate detailing, molding sheets, dark wood highlights, brass knobs." },
                        { title: "Bohemian & Eclectic", desc: "Warm earthy tones, customized open shelving, hanging creepers, patterned tiles." }
                      ].map((style) => (
                        <button
                          type="button"
                          key={style.title}
                          onClick={() => setModalFormData({ ...modalFormData, budget: style.title })}
                          className={`w-full p-3 border rounded-xl text-left transition-all ${modalFormData.budget === style.title
                              ? "border-primary bg-red-50/50 text-primary font-bold"
                              : "border-slate-200 hover:border-slate-300 text-slate-600"
                            }`}
                        >
                          <p className="text-xs uppercase font-bold">{style.title}</p>
                          <p className="text-[10px] text-slate-400 font-normal leading-relaxed mt-1">{style.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Customer contact Details */}
                {modalStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">3. Enter delivery details</h5>

                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          required
                          value={modalFormData.name}
                          onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          value={modalFormData.email}
                          onChange={(e) => setModalFormData({ ...modalFormData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          required
                          value={modalFormData.phone}
                          onChange={(e) => setModalFormData({ ...modalFormData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-snug text-center pt-2">
                      *By submitting, you consent to receive design proposals, estimations and calls from a certified Livspace manager.
                    </p>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-6">
                  {modalStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setModalStep(modalStep - 1)}
                      className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <span>{modalStep === 3 ? "Generate Quotation" : "Next Step"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX POPUP FOR GALLERY IMAGES */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setLightboxImage(null)} />

          <div className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 z-10 shadow-2xl animate-scale-up">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage}
              alt="Room Lightbox"
              className="w-full h-auto object-contain max-h-[85vh] mx-auto bg-slate-900"
            />
          </div>
        </div>
      )}

      {/* VIDEO LIGHTBOX PLAYER MODAL */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => setActiveVideoUrl(null)} />

          <div className="relative max-w-4xl w-full aspect-video overflow-hidden rounded-2xl border border-white/10 z-10 shadow-2xl bg-black animate-scale-up">

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-20">
              <span className="text-white font-bold text-sm sm:text-base tracking-tight">{activeVideoTitle}</span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Video Iframe Player */}
            <iframe
              className="w-full h-full"
              src={`${activeVideoUrl}?autoplay=1`}
              title="Customer Video Review"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* MOBILE FOOTER NAVBAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-2 py-2.5 flex justify-around items-center">

        {/* HOME */}
        <a
          href="#"
          className="flex flex-col items-center gap-1 text-[#bf1e2e] transition-colors flex-1 text-center"
        >
          <Home className="w-5 h-5 text-[#bf1e2e]" />
          <span className="text-[9px] font-bold tracking-wider uppercase text-[#bf1e2e]">Home</span>
        </a>

        {/* DESIGN IDEAS */}
        <a
          href="#design-gallery"
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#bf1e2e] transition-colors flex-1 text-center"
        >
          <Sparkles className="w-5 h-5 text-slate-400 hover:text-[#bf1e2e]" />
          <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-500">Design Ideas</span>
        </a>

        {/* LET'S BEGIN */}
        <button
          onClick={() => {
            setModalStep(1);
            setIsModalOpen(true);
          }}
          className="flex flex-col items-center flex-1 relative -mt-6"
        >
          <div className="w-12 h-12 rounded-full bg-[#bf1e2e] text-white flex items-center justify-center border-4 border-white shadow-lg transform transition-transform hover:scale-105 active:scale-95 animate-pulse-ring">
            <Sparkle className="w-5 h-5 fill-white" />
          </div>
          <span className="text-[9px] font-bold text-slate-800 tracking-wider uppercase mt-1">Let&apos;s Begin</span>
        </button>

        {/* GET ESTIMATE */}
        <a
          href="#budget-calculator"
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#bf1e2e] transition-colors flex-1 text-center"
        >
          <Calculator className="w-5 h-5 text-slate-400 hover:text-[#bf1e2e]" />
          <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-500">Get Estimate</span>
        </a>

        {/* MORE */}
        <a
          href="#faqs"
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#bf1e2e] transition-colors flex-1 text-center"
        >
          <Menu className="w-5 h-5 text-slate-400 hover:text-[#bf1e2e]" />
          <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-500">More</span>
        </a>

      </div>

    </div>
  );
}
