import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Check,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  Clock,
  Info,
} from 'lucide-react';
import {
  SPECIAL_OFFERS,
  OFFER_FAQS,
  SpecialOfferPackage,
  buildWhatsAppUrl,
  HOTEL_INFO,
} from '../data/hotelData';

interface SpecialOffersSectionProps {
  onSelectOfferForBooking: (offer: SpecialOfferPackage) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onSelectOfferForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [quickCheckIn, setQuickCheckIn] = useState<string>('2026-11-06');
  const [quickCheckOut, setQuickCheckOut] = useState<string>('2026-11-08');
  const [quickGuests, setQuickGuests] = useState<string>('2 Guests');

  const categories = [
    { id: 'ALL', label: 'All Offers (6)' },
    { id: 'A', label: 'Weekend Getaway' },
    { id: 'B', label: 'Extended Stay' },
    { id: 'C', label: 'Romantic Stay' },
    { id: 'D', label: 'Family Stay' },
    { id: 'E', label: 'Business Stay' },
    { id: 'F', label: 'Seasonal Special' },
  ];

  const filteredOffers =
    selectedCategory === 'ALL'
      ? SPECIAL_OFFERS
      : SPECIAL_OFFERS.filter((item) => item.code === selectedCategory);

  return (
    <section
      id="exclusive-offers"
      className="py-20 bg-[#0A1128] text-white border-t border-white/10"
      aria-labelledby="offers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-[#C5A059] mb-3">
              Hotel Maracana · Brás, São Paulo
            </p>
            <h2
              id="offers-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-semibold text-white tracking-tight"
            >
              Exclusive Offers &amp; Packages
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Discover exceptional stays and exclusive offers designed to make your experience
              unforgettable. All package rates are confirmed directly by our reception desk with
              zero hidden booking fees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(
                `Hello Hotel Maracana, I would like to inquire about your Exclusive Offers & Packages for Check-in: ${quickCheckIn}, Check-out: ${quickCheckOut} (${quickGuests}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C5A059] text-[#0A1128] text-sm font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Package Desk</span>
            </a>
          </div>
        </div>

        {/* Featured Offer Banner at Top of Section */}
        <div className="rounded-xl bg-[#111C38] border border-[#C5A059]/30 p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C5A059]">
                <span>Featured Direct-Booking Privilege</span>
                <span aria-hidden="true">·</span>
                <span>R. Piratininga - Brás, São Paulo</span>
                <span aria-hidden="true">·</span>
                <span>Verified Hotel Facilities Included</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-display font-semibold text-white">
                Find Your Perfect Stay in São Paulo — Custom Date &amp; Package Inquiry
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Select your preferred check-in and check-out dates below to pre-fill your package
                inquiry. Because Hotel Maracana provides personalized tariffs without artificial
                countdown timers or inflated discounts, our reservation team confirms exact nightly
                and multi-night rates directly.
              </p>
            </div>

            {/* Interactive Date & Guest Selector inside Featured Banner */}
            <div className="lg:col-span-5 bg-[#0A1128] border border-white/10 rounded-lg p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="offer-checkin"
                    className="block text-xs text-slate-300 mb-1 font-medium"
                  >
                    Check-In Date
                  </label>
                  <div className="relative">
                    <input
                      id="offer-checkin"
                      type="date"
                      value={quickCheckIn}
                      onChange={(e) => setQuickCheckIn(e.target.value)}
                      className="w-full rounded-md bg-[#111C38] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059] tabular-nums"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="offer-checkout"
                    className="block text-xs text-slate-300 mb-1 font-medium"
                  >
                    Check-Out Date
                  </label>
                  <div className="relative">
                    <input
                      id="offer-checkout"
                      type="date"
                      value={quickCheckOut}
                      onChange={(e) => setQuickCheckOut(e.target.value)}
                      className="w-full rounded-md bg-[#111C38] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059] tabular-nums"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="offer-guests"
                    className="block text-xs text-slate-300 mb-1 font-medium"
                  >
                    Guests
                  </label>
                  <select
                    id="offer-guests"
                    value={quickGuests}
                    onChange={(e) => setQuickGuests(e.target.value)}
                    className="w-full rounded-md bg-[#111C38] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Family Guests">4 Family Guests</option>
                  </select>
                </div>

                <div className="sm:pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectOfferForBooking(SPECIAL_OFFERS[0])}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-md bg-[#C5A059] text-[#0A1128] text-xs font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                  >
                    Find Your Perfect Stay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Package Category Filter Bar */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 border-b border-white/10"
          role="tablist"
          aria-label="Filter hotel stay packages"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#C5A059] text-[#0A1128] font-semibold'
                    : 'bg-[#111C38] text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <article
              key={offer.id}
              className="rounded-xl bg-[#111C38] border border-white/10 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:border-[#C5A059]/50"
            >
              <div>
                {/* Image Slot with Resilient Fallback */}
                <div className="relative h-56 w-full bg-[#0A1128] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={`${offer.title} at Hotel Maracana`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="font-mono text-[#C5A059] font-medium">
                      Package {offer.code} · {offer.typeLabel}
                    </span>
                    <span className="text-slate-300 tabular-nums">{offer.minStay}</span>
                  </div>
                </div>

                {/* Offer Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif-display font-semibold text-white">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-[#C5A059] mt-1">{offer.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{offer.description}</p>

                  {/* Pricing & Minimum Stay Metadata Box */}
                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="text-slate-400">Package Tariff:</span>
                      <span className="font-medium text-[#C5A059] tabular-nums">
                        {offer.ratePlaceholder}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Occupancy Limit:</span>
                      <span className="tabular-nums">{offer.occupancyLimit}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Validity:</span>
                      <span>{offer.validityText}</span>
                    </div>
                  </div>

                  {/* Included Verified Benefits */}
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs font-medium text-slate-200 mb-2">
                      Included Verified Hotel Services:
                    </p>
                    <ul className="space-y-1.5">
                      {offer.includedBenefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-xs text-slate-300"
                        >
                          <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal pt-1">
                    {offer.conditionsText}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectOfferForBooking(offer)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{offer.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={buildWhatsAppUrl(
                    `Hello Hotel Maracana (${HOTEL_INFO.phoneDisplay}), I would like to inquire about Package ${offer.code}: ${offer.title} (${offer.typeLabel}) for Check-in: ${quickCheckIn}, Check-out: ${quickCheckOut}, Guests: ${quickGuests}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Offer FAQ Area */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C5A059] mb-2">
              Booking Transparency &amp; Policies
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-semibold text-white">
              Special Offers &amp; Reservations FAQ
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Clear answers regarding package validity, direct rate confirmation, cancellations, and
              confirmed inclusions at Hotel Maracana in Brás, São Paulo.
            </p>
            <div className="mt-6 p-4 rounded-lg bg-[#111C38] border border-white/10 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-[#C5A059] font-medium">
                <Info className="w-4 h-4 shrink-0" />
                <span>Editable Rate Placeholders Active</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                In accordance with hotel policy, no fabricated discounts or artificial urgency
                timers are shown. Click any offer button to request confirmed dates and rates.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {OFFER_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-lg bg-[#111C38] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
