import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  MessageCircle,
  Calendar,
  Users,
  Check,
  ArrowRight,
  Menu,
  X,
  Wifi,
  BedDouble,
  Utensils,
  Car,
  ShieldCheck,
  Clock,
  ExternalLink,
  Maximize2,
} from 'lucide-react';
import {
  HOTEL_INFO,
  IMAGES,
  ROOMS_DATA,
  CONFIRMED_FACILITIES,
  GALLERY_ITEMS,
  RoomCategory,
  SpecialOfferPackage,
  buildWhatsAppUrl,
} from './data/hotelData';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { ReviewsAndTestimonialsSection } from './components/ReviewsAndTestimonialsSection';

export type PageId = 'home' | 'rooms' | 'about' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Room filter state for Page 2 (Rooms & Accommodation)
  const [roomFilter, setRoomFilter] = useState<string>('ALL');

  // Gallery filter & lightbox state
  const [galleryFilter, setGalleryFilter] = useState<string>('ALL');
  const [lightboxItem, setLightboxItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  // Booking & Contact Form state (shared across quick bar, room/package selection, and Page 4)
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-10');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-13');
  const [guestCount, setGuestCount] = useState<string>('2 Guests');
  const [selectedRoomOrOffer, setSelectedRoomOrOffer] = useState<string>(
    'Maracana Executive King Room'
  );
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestNotes, setGuestNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  // Navigate between the 4 separate pages cleanly
  const navigateToPage = (page: PageId, preselectItem?: string) => {
    if (preselectItem) {
      setSelectedRoomOrOffer(preselectItem);
    }
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: 'Hotel Maracana – Luxury Hotel in Brás, São Paulo, Brazil',
      rooms: 'Rooms & Accommodation | Hotel Maracana – São Paulo',
      about: 'About Us & Hospitality | Hotel Maracana – Brás, São Paulo',
      contact: 'Contact & Booking | Hotel Maracana (+55 11 94307-2657)',
    };
    document.title = pageTitles[activePage];
  }, [activePage]);

  const handleSelectRoomForBooking = (room: RoomCategory) => {
    navigateToPage('contact', room.name);
  };

  const handleSelectOfferForBooking = (offer: SpecialOfferPackage) => {
    navigateToPage('contact', `Package ${offer.code}: ${offer.title}`);
  };

  const handleBookingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim()) {
      setFormError('Please enter your full name so our reception desk can prepare your inquiry.');
      return;
    }
    if (!guestPhone.trim() && !guestEmail.trim()) {
      setFormError('Please provide either a phone/WhatsApp number or an email address.');
      return;
    }
    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      setFormError('Check-out date must be after the check-in date.');
      return;
    }

    setBookingSubmitted(true);
  };

  const composedWhatsAppInquiry = buildWhatsAppUrl(
    `Hello Hotel Maracana (${HOTEL_INFO.phoneDisplay}), I would like to request a reservation:\n` +
      `• Selection: ${selectedRoomOrOffer}\n` +
      `• Check-in: ${checkInDate}\n` +
      `• Check-out: ${checkOutDate}\n` +
      `• Guests: ${guestCount}\n` +
      (guestName ? `• Guest Name: ${guestName}\n` : '') +
      (guestPhone ? `• Contact Phone: ${guestPhone}\n` : '') +
      (guestNotes ? `• Special Notes: ${guestNotes}` : '')
  );

  const filteredRooms =
    roomFilter === 'ALL'
      ? ROOMS_DATA
      : ROOMS_DATA.filter((r) => r.category.toUpperCase() === roomFilter);

  const filteredGallery =
    galleryFilter === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === galleryFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A1128]">
      {/* TOP BAR CONTRACT: Strictly 1 row, 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#0A1128] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className="text-xl sm:text-2xl font-serif-display font-semibold tracking-wide text-[#C5A059] whitespace-nowrap shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded"
          >
            Hotel Maracana
          </button>

          {/* Zone 2: 4 concise single-line text navigation links connecting the 4 separate pages */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200"
            aria-label="Primary Page Navigation"
          >
            <button
              type="button"
              onClick={() => navigateToPage('home')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'home'
                  ? 'text-[#C5A059] border-[#C5A059]'
                  : 'border-transparent hover:text-white hover:border-white/40'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('rooms')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'rooms'
                  ? 'text-[#C5A059] border-[#C5A059]'
                  : 'border-transparent hover:text-white hover:border-white/40'
              }`}
            >
              Rooms &amp; Accommodation
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('about')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'about'
                  ? 'text-[#C5A059] border-[#C5A059]'
                  : 'border-transparent hover:text-white hover:border-white/40'
              }`}
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('contact')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'contact'
                  ? 'text-[#C5A059] border-[#C5A059]'
                  : 'border-transparent hover:text-white hover:border-white/40'
              }`}
            >
              Contact &amp; Booking
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateToPage('contact')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0A1128] bg-[#C5A059] rounded-lg hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
            >
              Book Your Stay
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation for the 4 Separate Pages */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111C38] border-t border-white/10 px-4 py-4 space-y-2">
            {(
              [
                { id: 'home', label: 'Page 1: Home' },
                { id: 'rooms', label: 'Page 2: Rooms & Accommodation' },
                { id: 'about', label: 'Page 3: About Us' },
                { id: 'contact', label: 'Page 4: Contact & Booking' },
              ] as { id: PageId; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToPage(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-[#C5A059] text-[#0A1128] font-semibold'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          PAGE 1: HOME PAGE (6 Core Sections + Exclusive Offers & Photo Gallery)
         ===================================================================== */}
      {activePage === 'home' && (
        <main className="flex-1">
          {/* HOME SECTION 1: HERO BANNER */}
          <section className="relative bg-[#0A1128] text-white overflow-hidden">
            <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
              {/* High-Resolution Hotel Background Video & Fallback Image */}
              <div className="absolute inset-0 bg-[#0A1128]">
                <img
                  src={IMAGES.heroFacade}
                  alt="Hotel Maracana exterior and grand entrance in Brás, São Paulo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-55"
                />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={IMAGES.heroFacade}
                  className="absolute inset-0 w-full h-full object-cover opacity-65"
                >
                  <source
                    src="https://res.cloudinary.com/k7og2ybq/video/upload/v1793007379/hero-background.mp4.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://res.cloudinary.com/k7og2ybq/video/upload/v1793007379/hero-background.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 via-[#0A1128]/65 to-[#0A1128]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-black/30" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-2xl space-y-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#C5A059]">
                    <span>R. Piratininga - Brás</span>
                    <span aria-hidden="true">·</span>
                    <span>São Paulo - SP, 03042-000</span>
                    <span aria-hidden="true">·</span>
                    <span>Brazil</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-semibold tracking-tight text-white leading-[1.1]">
                    Welcome to Hotel Maracana
                  </h1>

                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                    Experience warm Brazilian hospitality, tranquil comfort, and effortless access
                    to central São Paulo. Thoughtfully appointed rooms, reliable Wi-Fi, attentive
                    room service, and dedicated parking await your arrival in Brás.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateToPage('contact')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Book Your Stay</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToPage('contact')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/30 bg-white/5 text-white text-sm font-medium hover:bg-white/15 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Phone className="w-4 h-4 text-[#C5A059]" />
                      <span>Contact Us</span>
                    </button>
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#C5A059]/40 text-[#C5A059] text-sm font-medium hover:bg-[#C5A059]/10 transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp: {HOTEL_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quick Booking Strip Below Hero */}
            <div className="relative z-20 bg-[#111C38] border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div>
                    <label
                      htmlFor="hero-checkin"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Check-In Date
                    </label>
                    <input
                      id="hero-checkin"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full rounded-lg bg-[#0A1128] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A059] tabular-nums"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-checkout"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Check-Out Date
                    </label>
                    <input
                      id="hero-checkout"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full rounded-lg bg-[#0A1128] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A059] tabular-nums"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-guests"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Guests &amp; Room Preference
                    </label>
                    <select
                      id="hero-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full rounded-lg bg-[#0A1128] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Guests">2 Guests (Double / Twin)</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Family Guests">4 Guests (Family Suite)</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => navigateToPage('contact')}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Check Availability</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HOME SECTION 2: ABOUT OUR HOTEL */}
          <section
            id="home-about"
            className="py-20 bg-white border-b border-slate-200"
            aria-labelledby="about-section-heading"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                      Section 02 · About Our Hotel
                    </p>
                    <h2
                      id="about-section-heading"
                      className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128] tracking-tight"
                    >
                      A Timeless Sanctuary of Comfort in Brás, São Paulo
                    </h2>
                    <p className="text-base text-slate-600 leading-relaxed">
                      Situated on <strong className="text-[#0A1128]">R. Piratininga - Brás</strong>,
                      Hotel Maracana blends classic Brazilian hospitality with calm, contemporary
                      comfort. Whether you are visiting São Paulo for commercial trade in Brás, a
                      weekend getaway, or a family visit, our team ensures every stay feels
                      effortless and welcoming.
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      Every guest room is prepared with restful bedding, high-speed wireless
                      internet, and direct access to room service and parking—allowing you to rest
                      deeply in one of Brazil’s most vibrant districts.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="text-sm font-semibold text-[#0A1128] mt-0.5">
                        Brás, São Paulo - SP
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Direct Reservation Desk</p>
                      <p className="text-sm font-semibold text-[#0A1128] mt-0.5 tabular-nums">
                        {HOTEL_INFO.phoneDisplay}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Postal Code</p>
                      <p className="text-sm font-semibold text-[#0A1128] mt-0.5 tabular-nums">
                        03042-000, Brazil
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateToPage('about')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A1128] text-white text-xs sm:text-sm font-medium hover:bg-[#162247] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Read Our Full Story</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToPage('rooms')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-[#0A1128] text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Explore Rooms</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative h-full min-h-[360px] rounded-2xl overflow-hidden bg-[#0A1128] border border-slate-200">
                    <img
                      src={IMAGES.hospitalityLounge}
                      alt="Hotel Maracana hospitality lounge and dining area in São Paulo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-xs uppercase tracking-widest text-[#C5A059]">
                        Signature Atmosphere
                      </p>
                      <p className="text-lg font-serif-display font-medium mt-0.5">
                        Warm navy-and-gold interiors crafted for serene mornings and relaxed
                        evenings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HOME SECTION 3: OUR ROOMS */}
          <section
            id="home-rooms"
            className="py-20 bg-[#F8FAFC]"
            aria-labelledby="home-rooms-heading"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                    Section 03 · Our Rooms
                  </p>
                  <h2
                    id="home-rooms-heading"
                    className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128]"
                  >
                    Accommodations Designed for Restful Stays
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                    Explore our room categories featuring comfortable beds, complimentary Wi-Fi, and
                    attentive room service. Room rates are confirmed directly upon inquiry with no
                    intermediary markups.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigateToPage('rooms')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#0A1128] text-[#0A1128] text-xs sm:text-sm font-semibold hover:bg-[#0A1128] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
                >
                  <span>View All Room Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ROOMS_DATA.slice(0, 3).map((room) => (
                  <article
                    key={room.id}
                    className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#C5A059] transition-colors"
                  >
                    <div>
                      <div className="relative h-60 bg-[#0A1128] overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                          <span>{room.bedConfiguration}</span>
                          <span aria-hidden="true">·</span>
                          <span>{room.occupancy}</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                            <span>{room.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{room.availabilityStatus}</span>
                          </div>
                          <h3 className="text-2xl font-serif-display font-semibold text-[#0A1128]">
                            {room.name}
                          </h3>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {room.shortDescription}
                        </p>

                        <div className="pt-3 border-t border-slate-100">
                          <p className="text-xs font-semibold text-[#0A1128] tabular-nums">
                            {room.rateLabel}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{room.rateNote}</p>
                        </div>

                        <ul className="pt-2 space-y-1.5 border-t border-slate-100">
                          {room.amenities.map((amenity) => (
                            <li
                              key={amenity}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                              <span>{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleSelectRoomForBooking(room)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0A1128] text-white text-xs font-semibold hover:bg-[#162247] transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Book This Room</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                      </button>
                      <a
                        href={buildWhatsAppUrl(
                          `Hello Hotel Maracana, I would like to check availability and rates for the ${room.name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-lg border border-slate-300 text-[#0A1128] text-xs font-medium hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                        title="Inquire via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-[#C5A059]" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* HOME SECTION 4: HOTEL FACILITIES */}
          <section
            id="home-facilities"
            className="py-20 bg-white border-t border-slate-200"
            aria-labelledby="facilities-heading"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                  Section 04 · Hotel Facilities
                </p>
                <h2
                  id="facilities-heading"
                  className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128]"
                >
                  Confirmed Guest Amenities &amp; Services
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  We showcase only verified facilities confirmed for your comfort at Hotel Maracana
                  in Brás, São Paulo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONFIRMED_FACILITIES.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#F8FAFC] border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#C5A059] transition-colors shadow-xs"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-[#0A1128] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                          <span className="font-mono font-semibold text-[#C5A059]">
                            {item.number}.
                          </span>
                          <span className="text-slate-200">{item.status}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-serif-display font-semibold text-[#0A1128]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SPECIAL OFFERS & PACKAGES SECTION (Requested Add-On Section) */}
          <SpecialOffersSection onSelectOfferForBooking={handleSelectOfferForBooking} />

          {/* CURATED HOTEL PHOTO GALLERY SECTION (Requested Add-On Section) */}
          <section
            id="photo-gallery"
            className="py-20 bg-[#F8FAFC] border-t border-slate-200"
            aria-labelledby="gallery-heading"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                    Visual Tour · Hotel Maracana
                  </p>
                  <h2
                    id="gallery-heading"
                    className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128]"
                  >
                    Hotel &amp; Accommodation Photo Gallery
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Click any photograph to inspect our rooms, suites, and hospitality spaces in
                    full detail.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['ALL', 'Exterior & Lobby', 'Guest Rooms', 'Suites', 'Lounge & Hospitality'].map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setGalleryFilter(cat)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          galleryFilter === cat
                            ? 'bg-[#0A1128] text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0A1128]'
                        }`}
                      >
                        {cat === 'ALL' ? 'All Photos' : cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`group relative rounded-2xl overflow-hidden bg-[#0A1128] border border-slate-200 ${
                      idx === 0 && galleryFilter === 'ALL' ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      className="w-full h-72 text-left relative block focus:outline-none"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 p-2 rounded-lg bg-[#0A1128]/70 text-white opacity-90 group-hover:bg-[#C5A059] group-hover:text-[#0A1128] transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <p className="text-xs text-[#C5A059] font-medium">{item.category}</p>
                        <h3 className="text-xl font-serif-display font-semibold mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1">{item.caption}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOME SECTION 5: GUEST REVIEWS & RATINGS + CLIENT TESTIMONIALS */}
          <ReviewsAndTestimonialsSection />

          {/* HOME SECTION 6: LOCATION & CONTACT */}
          <section
            id="home-location-contact"
            className="py-20 bg-[#0A1128] text-white border-t border-white/10"
            aria-labelledby="location-heading"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                      Section 06 · Location &amp; Contact
                    </p>
                    <h2
                      id="location-heading"
                      className="text-3xl sm:text-4xl font-serif-display font-semibold text-white"
                    >
                      Visit Hotel Maracana in Brás, São Paulo
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      Conveniently situated on R. Piratininga in the Brás district of São Paulo,
                      offering straightforward access for commercial buyers, solo travellers, and
                      families.
                    </p>

                    <div className="pt-4 space-y-4 border-t border-white/10 text-sm">
                      <div>
                        <p className="text-xs text-[#C5A059] uppercase tracking-wider font-medium">
                          Hotel Address
                        </p>
                        <p className="text-white font-medium mt-1">{HOTEL_INFO.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#C5A059] uppercase tracking-wider font-medium">
                          Phone &amp; WhatsApp Reservations
                        </p>
                        <p className="text-white font-medium mt-1 tabular-nums">
                          {HOTEL_INFO.phoneDisplay}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#C5A059] uppercase tracking-wider font-medium">
                          Standard Check-In / Check-Out
                        </p>
                        <p className="text-slate-300 mt-1 tabular-nums">
                          Check-In from {HOTEL_INFO.checkInTime} · Check-Out until{' '}
                          {HOTEL_INFO.checkOutTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs sm:text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Reservation</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => navigateToPage('contact')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/25 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Open Full Booking Form</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </button>
                  </div>
                </div>

                {/* Embedded Google Maps for R. Piratininga - Brás, São Paulo - SP, 03042-000, Brazil */}
                <div className="lg:col-span-7 min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-[#111C38] flex flex-col">
                  <iframe
                    title="Google Map Location for Hotel Maracana, R. Piratininga - Brás, São Paulo"
                    src={HOTEL_INFO.googleMapsEmbedUrl}
                    className="w-full flex-1 min-h-[340px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="px-4 py-3 bg-[#111C38] border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span>{HOTEL_INFO.address}</span>
                    <a
                      href={HOTEL_INFO.googleMapsDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#C5A059] hover:underline whitespace-nowrap shrink-0"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE 2: ROOMS & ACCOMMODATION (Dedicated Full Page)
         ===================================================================== */}
      {activePage === 'rooms' && (
        <main className="flex-1">
          {/* Page Header */}
          <section className="bg-[#0A1128] text-white py-16 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                  Page 2 · Rooms &amp; Accommodation
                </p>
                <h1 className="text-4xl sm:text-5xl font-serif-display font-semibold text-white">
                  Rooms &amp; Suites at Hotel Maracana
                </h1>
                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  Explore our thoughtfully appointed room categories on R. Piratininga - Brás, São
                  Paulo. Each room includes our confirmed hotel facilities—high-speed Wi-Fi,
                  comfortable beds, room service access, and parking options.
                </p>
              </div>
            </div>
          </section>

          {/* Room Categories Filter & Detailed Listing */}
          <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-200">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {[
                    { id: 'ALL', label: 'All Room Categories (4)' },
                    { id: 'SUITE', label: 'Executive King' },
                    { id: 'TWIN', label: 'Deluxe Twin' },
                    { id: 'FAMILY', label: 'Family Suite' },
                    { id: 'STANDARD', label: 'Classic Double' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setRoomFilter(tab.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        roomFilter === tab.id
                          ? 'bg-[#0A1128] text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0A1128]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <a
                  href={buildWhatsAppUrl(
                    'Hello Hotel Maracana, I am browsing the Rooms & Accommodation page and would like to check room rates and availability.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire Rates on WhatsApp</span>
                </a>
              </div>

              <div className="space-y-8">
                {filteredRooms.map((room) => (
                  <article
                    key={room.id}
                    className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch"
                  >
                    <div className="lg:col-span-5 relative min-h-[280px] bg-[#0A1128]">
                      <img
                        src={room.image}
                        alt={room.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs text-white">
                        <span>{room.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{room.bedConfiguration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{room.occupancy}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h2 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#0A1128]">
                            {room.name}
                          </h2>
                          <span className="text-xs font-medium text-[#C5A059]">
                            {room.availabilityStatus}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {room.fullDescription}
                        </p>

                        <div className="pt-4 border-t border-slate-100">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                            Confirmed Room Amenities
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {room.amenities.map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                              >
                                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-[#0A1128] tabular-nums">
                            {room.rateLabel}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{room.rateNote}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleSelectRoomForBooking(room)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A1128] text-white text-xs sm:text-sm font-semibold hover:bg-[#162247] transition-colors whitespace-nowrap shrink-0"
                          >
                            <span>Reserve Room</span>
                            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                          </button>
                          <a
                            href={buildWhatsAppUrl(
                              `Hello Hotel Maracana (${HOTEL_INFO.phoneDisplay}), I would like to reserve the ${room.name} (${room.bedConfiguration}).`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs sm:text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Include Exclusive Offers & Packages on Rooms Page as well */}
          <SpecialOffersSection onSelectOfferForBooking={handleSelectOfferForBooking} />
        </main>
      )}

      {/* =====================================================================
          PAGE 3: ABOUT US (Dedicated Full Page)
         ===================================================================== */}
      {activePage === 'about' && (
        <main className="flex-1">
          <section className="bg-[#0A1128] text-white py-16 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                  Page 3 · About Hotel Maracana
                </p>
                <h1 className="text-4xl sm:text-5xl font-serif-display font-semibold text-white">
                  Our Story, Atmosphere &amp; Commitment to Guest Comfort
                </h1>
                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  Located at {HOTEL_INFO.address}, Hotel Maracana welcomes travellers from across
                  Brazil and around the world with dependable comfort and genuine hospitality.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                <div className="lg:col-span-6 space-y-5">
                  <h2 className="text-3xl font-serif-display font-semibold text-[#0A1128]">
                    Warm Brazilian Hospitality in the Heart of Brás
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Brás is one of São Paulo’s most historic and energetic commercial districts. At
                    Hotel Maracana on R. Piratininga, we created an oasis where guests can step
                    inside from the bustling streets of São Paulo into a calm, well-ordered
                    environment defined by deep navy tones, crisp white linens, and warm golden
                    lighting.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Our philosophy is simple: provide every guest with the essentials that truly
                    matter—deep sleep on comfortable beds, dependable high-speed Wi-Fi, responsive
                    room service, and convenient on-site parking—backed by direct communication via
                    phone and WhatsApp at{' '}
                    <span className="font-semibold text-[#0A1128] tabular-nums">
                      {HOTEL_INFO.phoneDisplay}
                    </span>
                    .
                  </p>

                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                      <h3 className="text-lg font-serif-display font-semibold text-[#0A1128]">
                        Transparent Direct Booking
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        We never display fabricated discounts or hidden fees. All room tariffs and
                        availability are verified directly with our reception desk.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                      <h3 className="text-lg font-serif-display font-semibold text-[#0A1128]">
                        Verified Guest Facilities
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Complimentary Wi-Fi, comfortable beds, attentive room service, and guest
                        parking confirmed for your stay in São Paulo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden bg-[#0A1128] border border-slate-200 h-64 sm:h-full">
                    <img
                      src={IMAGES.heroFacade}
                      alt="Hotel Maracana exterior in Brás, São Paulo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-[#0A1128] border border-slate-200 h-64 sm:h-full">
                    <img
                      src={IMAGES.hospitalityLounge}
                      alt="Hotel Maracana interior lounge"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Confirmed Facilities Overview on About Page */}
          <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif-display font-semibold text-[#0A1128] mb-8">
                Our Confirmed Hospitality Standards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONFIRMED_FACILITIES.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs"
                  >
                    <div className="relative h-48 w-full bg-[#0A1128] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span className="font-mono font-semibold text-[#C5A059]">
                          {item.number}.
                        </span>
                        <span className="text-slate-200">{item.status}</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-xl font-serif-display font-semibold text-[#0A1128]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customer Reviews & Testimonials on About Page */}
          <ReviewsAndTestimonialsSection />
        </main>
      )}

      {/* =====================================================================
          PAGE 4: CONTACT & BOOKING (Dedicated Full Page)
         ===================================================================== */}
      {activePage === 'contact' && (
        <main className="flex-1">
          <section className="bg-[#0A1128] text-white py-16 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                  Page 4 · Contact &amp; Booking
                </p>
                <h1 className="text-4xl sm:text-5xl font-serif-display font-semibold text-white">
                  Reserve Your Stay or Contact Our Reception
                </h1>
                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  Complete the reservation enquiry form below or message our team directly on
                  WhatsApp at <span className="text-[#C5A059]">{HOTEL_INFO.phoneDisplay}</span> for
                  immediate rate and availability confirmation.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Reservation & Contact Enquiry Form */}
                <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#0A1128]">
                    Direct Reservation &amp; Guest Enquiry Form
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your check-in and check-out dates, preferred room or package, and contact
                    details.
                  </p>

                  {bookingSubmitted ? (
                    <div className="mt-6 p-6 rounded-xl bg-[#0A1128] text-white border border-[#C5A059] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                          Enquiry Prepared for Hotel Maracana
                        </span>
                        <span className="text-xs text-slate-300 tabular-nums">
                          {HOTEL_INFO.phoneDisplay}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif-display font-semibold">
                        Thank You, {guestName}! Your Stay Enquiry is Ready.
                      </h3>
                      <div className="p-4 rounded-lg bg-[#111C38] border border-white/10 text-xs sm:text-sm space-y-1.5 text-slate-200">
                        <p>
                          <strong className="text-[#C5A059]">Selected Room / Package:</strong>{' '}
                          {selectedRoomOrOffer}
                        </p>
                        <p className="tabular-nums">
                          <strong className="text-[#C5A059]">Check-In:</strong> {checkInDate} ·{' '}
                          <strong className="text-[#C5A059]">Check-Out:</strong> {checkOutDate}
                        </p>
                        <p>
                          <strong className="text-[#C5A059]">Guests:</strong> {guestCount}
                        </p>
                        {guestNotes && (
                          <p>
                            <strong className="text-[#C5A059]">Special Requests:</strong>{' '}
                            {guestNotes}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Click the button below to send your formatted reservation details directly
                        to Hotel Maracana reception via WhatsApp (+55 11 94307-2657) for instant
                        confirmation:
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={composedWhatsAppInquiry}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs sm:text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send Reservation via WhatsApp Now</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setBookingSubmitted(false)}
                          className="px-4 py-3 rounded-lg border border-white/20 text-xs sm:text-sm text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          Modify Enquiry Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingFormSubmit} className="mt-6 space-y-5" noValidate>
                      {formError && (
                        <div
                          role="alert"
                          className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 font-medium"
                        >
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="booking-checkin"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Check-In Date *
                          </label>
                          <input
                            id="booking-checkin"
                            type="date"
                            required
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128] tabular-nums"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="booking-checkout"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Check-Out Date *
                          </label>
                          <input
                            id="booking-checkout"
                            type="date"
                            required
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128] tabular-nums"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="booking-selection"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Room Category or Package
                          </label>
                          <select
                            id="booking-selection"
                            value={selectedRoomOrOffer}
                            onChange={(e) => setSelectedRoomOrOffer(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128]"
                          >
                            <optgroup label="Hotel Rooms">
                              {ROOMS_DATA.map((r) => (
                                <option key={r.id} value={r.name}>
                                  {r.name} ({r.occupancy})
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Exclusive Packages">
                              <option value="Package A: São Paulo Weekend Retreat">
                                Package A: Weekend Getaway
                              </option>
                              <option value="Package B: Multi-Night Extended Stay Tariff">
                                Package B: Extended Stay (4+ Nights)
                              </option>
                              <option value="Package C: Couples Private Comfort Stay">
                                Package C: Romantic Stay Package
                              </option>
                              <option value="Package D: Family & Group Comfort Package">
                                Package D: Family Stay Package
                              </option>
                              <option value="Package E: Brás Commercial & Corporate Stay">
                                Package E: Business Stay Package
                              </option>
                              <option value="Package F: São Paulo Seasonal & Holiday Promotion">
                                Package F: Seasonal Special Offer
                              </option>
                            </optgroup>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="booking-guests"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Number of Guests
                          </label>
                          <select
                            id="booking-guests"
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128]"
                          >
                            <option value="1 Adult">1 Adult</option>
                            <option value="2 Guests">2 Guests</option>
                            <option value="3 Guests">3 Guests</option>
                            <option value="4 Family Guests">4 Guests (Family / Group)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="guest-name"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Full Name *
                          </label>
                          <input
                            id="guest-name"
                            type="text"
                            required
                            placeholder="e.g., Gabriel Santos"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="guest-phone"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            id="guest-phone"
                            type="tel"
                            placeholder="e.g., +55 11 99999-0000"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128] tabular-nums"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="guest-email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="guest-email"
                          type="email"
                          placeholder="guest@example.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guest-notes"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Reservation Enquiry &amp; Special Requests (Parking, Arrival Time, Bed
                          Preference)
                        </label>
                        <textarea
                          id="guest-notes"
                          rows={3}
                          placeholder="Let us know if you require on-site parking, twin vs. king bedding, or expected arrival time at R. Piratininga..."
                          value={guestNotes}
                          onChange={(e) => setGuestNotes(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0A1128] focus:outline-none focus:border-[#0A1128]"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                          type="submit"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0A1128] text-white text-sm font-semibold hover:bg-[#162247] transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>Prepare Reservation Enquiry</span>
                          <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                        </button>
                        <a
                          href={composedWhatsAppInquiry}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Direct WhatsApp Booking</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>

                {/* Direct Contact Card & Embedded Map */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-2xl bg-[#0A1128] text-white p-6 sm:p-8 border border-[#C5A059]/30 space-y-5">
                    <h2 className="text-2xl font-serif-display font-semibold text-[#C5A059]">
                      Direct Hotel Contact Details
                    </h2>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                          Hotel Name
                        </p>
                        <p className="font-semibold text-white mt-0.5">{HOTEL_INFO.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                          Telephone &amp; WhatsApp
                        </p>
                        <a
                          href={`tel:${HOTEL_INFO.phoneDisplay.replace(/\s+/g, '')}`}
                          className="font-semibold text-[#C5A059] hover:underline mt-0.5 block tabular-nums"
                        >
                          {HOTEL_INFO.phoneDisplay}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                          Street Address
                        </p>
                        <p className="text-slate-200 mt-0.5">{HOTEL_INFO.address}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs sm:text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Message +55 11 94307-2657 on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                    <iframe
                      title="Hotel Maracana Google Map on Contact Page"
                      src={HOTEL_INFO.googleMapsEmbedUrl}
                      className="w-full h-72 border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>R. Piratininga - Brás, São Paulo - SP</span>
                      <a
                        href={HOTEL_INFO.googleMapsDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0A1128] hover:text-[#C5A059] inline-flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Lightbox Modal for Photo Gallery */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#0A1128] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[360px] sm:h-[480px] bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#0A1128]/80 text-white hover:bg-[#C5A059] hover:text-[#0A1128] transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs text-[#C5A059] font-medium">{lightboxItem.category}</p>
                <h3 className="text-xl font-serif-display font-semibold">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{lightboxItem.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  navigateToPage('contact');
                }}
                className="px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIET LUXURY FOOTER */}
      <footer className="bg-[#070C1D] text-slate-300 border-t border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-2xl font-serif-display font-semibold text-[#C5A059] block">
                Hotel Maracana
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Refined Brazilian hospitality, restful comfort, and verified facilities located on
                R. Piratininga in Brás, São Paulo.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-3">
                4-Page Website Navigation
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('home')}
                    className="hover:text-white transition-colors"
                  >
                    Page 1: Home (6 Core Sections &amp; Offers)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('rooms')}
                    className="hover:text-white transition-colors"
                  >
                    Page 2: Rooms &amp; Accommodation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('about')}
                    className="hover:text-white transition-colors"
                  >
                    Page 3: About Us &amp; Hospitality
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('contact')}
                    className="hover:text-white transition-colors"
                  >
                    Page 4: Contact &amp; Booking
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-3">
                Confirmed Hotel Facilities
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>High-Speed Wi-Fi Connectivity</li>
                <li>Comfortable Orthopaedic Beds</li>
                <li>Attentive Room Service</li>
                <li>Convenient On-Site Guest Parking</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-3">
                Address &amp; Reservations
              </h3>
              <p className="text-slate-300">{HOTEL_INFO.address}</p>
              <p className="text-white font-semibold tabular-nums">{HOTEL_INFO.phoneDisplay}</p>
              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#C5A059] hover:underline font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Hotel Maracana — R. Piratininga - Brás, São Paulo - SP, 03042-000, Brazil.</p>
            <p>All rates &amp; availability confirmed directly via reception (+55 11 94307-2657).</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
