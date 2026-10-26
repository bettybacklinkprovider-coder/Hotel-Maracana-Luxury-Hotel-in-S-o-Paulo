import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  CheckCircle2,
  Quote,
  Settings2,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { HOTEL_INFO, TESTIMONIALS_DATA } from '../data/hotelData';
import { QrCodeSvg } from './QrCodeSvg';

export const ReviewsAndTestimonialsSection: React.FC = () => {
  // Editable Review Platform Links (clearly marked as customizable placeholders until live URLs are supplied)
  const [googleReviewUrl, setGoogleReviewUrl] = useState<string>(
    HOTEL_INFO.defaultGoogleReviewUrl
  );
  const [trustpilotUrl, setTrustpilotUrl] = useState<string>(
    HOTEL_INFO.defaultTrustpilotUrl
  );
  const [qrTargetPlatform, setQrTargetPlatform] = useState<'google' | 'trustpilot'>('google');
  const [showLinkEditor, setShowLinkEditor] = useState<boolean>(false);

  // Filter for "What Our Clients Say" testimonials
  const [testimonialFilter, setTestimonialFilter] = useState<
    'all' | 'hotel-guest' | 'agency-client'
  >('all');

  const activeQrUrl = qrTargetPlatform === 'google' ? googleReviewUrl : trustpilotUrl;

  const ratingBreakdown = [
    { stars: 5, percentage: 100, label: '5 Stars' },
    { stars: 4, percentage: 0, label: '4 Stars' },
    { stars: 3, percentage: 0, label: '3 Stars' },
    { stars: 2, percentage: 0, label: '2 Stars' },
    { stars: 1, percentage: 0, label: '1 Star' },
  ];

  const filteredTestimonials =
    testimonialFilter === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.category === testimonialFilter);

  return (
    <div className="space-y-0">
      {/* PART 1: Customer Reviews & Ratings Breakdown with Google Reviews, Trustpilot & Functional QR Code */}
      <section
        id="guest-reviews-ratings"
        className="py-20 bg-white border-t border-slate-200"
        aria-labelledby="ratings-breakdown-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-2">
                Verified Review Channels &amp; Direct QR Access
              </p>
              <h2
                id="ratings-breakdown-heading"
                className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128]"
              >
                Customer Reviews &amp; Ratings
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                We value transparent, authentic guest feedback. Explore our rating summary, visit
                our Google Reviews and Trustpilot profiles, or scan the functional QR code to share
                your experience.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setShowLinkEditor((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-[#0A1128] hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                <Settings2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>
                  {showLinkEditor ? 'Close Review Link Settings' : 'Configure Review URLs'}
                </span>
              </button>
            </div>
          </div>

          {/* Optional Live Review Link Configurator for the Hotel Owner */}
          {showLinkEditor && (
            <div className="mb-10 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#0A1128]">
                  Configure Actual Google Reviews &amp; Trustpilot Links
                </h3>
                <span className="text-xs text-slate-500">
                  Updates “See Reviews” buttons and live QR Code immediately
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="google-review-url-input"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Google Reviews URL (Editable Placeholder / Live Link)
                  </label>
                  <input
                    id="google-review-url-input"
                    type="url"
                    value={googleReviewUrl}
                    onChange={(e) => setGoogleReviewUrl(e.target.value)}
                    placeholder="https://g.page/r/..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A1128]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="trustpilot-url-input"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Trustpilot Review URL (Editable Placeholder / Live Link)
                  </label>
                  <input
                    id="trustpilot-url-input"
                    type="url"
                    value={trustpilotUrl}
                    onChange={(e) => setTrustpilotUrl(e.target.value)}
                    placeholder="https://www.trustpilot.com/review/..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A1128]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Reference Image Inspired 3-Column Ratings + Platform Cards + QR Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Overall Rating & 5-to-1 Star Percentage Bars */}
            <div className="lg:col-span-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[#0A1128] tabular-nums">5.0</span>
                      <span className="text-sm text-slate-500 font-medium">/ 5.0</span>
                    </div>
                    <div
                      className="flex items-center gap-1 mt-2 text-[#D4AF37]"
                      aria-label="5 out of 5 stars"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 tabular-nums">
                      Based on 6 Sample / Demo Reviews (Awaiting Live Sync)
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-medium text-slate-600 block">
                      Hotel Maracana
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Brás, São Paulo - SP
                    </span>
                  </div>
                </div>

                {/* 5-Star to 1-Star Breakdown Bars */}
                <div className="mt-6 space-y-3">
                  {ratingBreakdown.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <div className="w-14 flex items-center gap-1 font-medium text-slate-700 shrink-0 tabular-nums">
                        <span>{row.stars}</span>
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      </div>
                      <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#0A1128] transition-all duration-300"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono text-slate-600 tabular-nums shrink-0">
                        {row.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                Note: Rating bars reflect sample demonstration entries. Connect your live Google
                Place ID or Trustpilot profile via “Configure Review URLs” above.
              </p>
            </div>

            {/* Column 2: Google Reviews & Trustpilot Platform Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              {/* Google Reviews Card */}
              <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:border-[#C5A059] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Authentic Multi-Color Google 'G' SVG Emblem */}
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0A1128]">Google Reviews</h3>
                        <p className="text-xs text-slate-500">
                          R. Piratininga - Brás, São Paulo
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-[#0A1128] tabular-nums">5.0</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                    <span className="ml-2 text-xs text-slate-500">
                      Google Maps Listing Link
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Placeholder / Map Search Active
                  </span>
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1128] hover:text-[#C5A059] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>See Reviews</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Trustpilot Card */}
              <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:border-[#C5A059] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Trustpilot Emerald Star Emblem */}
                      <div className="w-10 h-10 rounded-xl bg-[#00B67A]/10 border border-[#00B67A]/30 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 fill-[#00B67A] text-[#00B67A]" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0A1128]">Trustpilot</h3>
                        <p className="text-xs text-slate-500">Hospitality Review Channel</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-[#0A1128] tabular-nums">5.0</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-[#00B67A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />
                    ))}
                    <span className="ml-2 text-xs text-slate-500">Editable Profile URL</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Configurable Link Placeholder
                  </span>
                  <a
                    href={trustpilotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1128] hover:text-[#00B67A] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>See Reviews</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Stylish "Review Us!" Functional QR Code Card */}
            <div className="lg:col-span-3 rounded-2xl bg-[#0A1128] text-white p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-[#C5A059]/40 shadow-xs">
              <div className="w-full">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-1">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan or Click</span>
                </div>
                <h3 className="text-2xl font-serif-display font-semibold text-white">
                  Review Us!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Scan with your phone camera to open our review page directly
                </p>

                {/* Segmented Toggle for QR Target */}
                <div className="mt-3 inline-flex p-1 rounded-lg bg-[#111C38] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQrTargetPlatform('google')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      qrTargetPlatform === 'google'
                        ? 'bg-[#C5A059] text-[#0A1128] font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Google QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrTargetPlatform('trustpilot')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      qrTargetPlatform === 'trustpilot'
                        ? 'bg-[#C5A059] text-[#0A1128] font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Trustpilot QR
                  </button>
                </div>
              </div>

              {/* Functional Clickable & Scannable QR Code */}
              <a
                href={activeQrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="my-5 inline-block p-2 rounded-xl bg-white hover:scale-105 transition-transform"
                title={`Open ${qrTargetPlatform === 'google' ? 'Google Reviews' : 'Trustpilot'} page`}
              >
                <QrCodeSvg value={activeQrUrl} size={144} />
              </a>

              <div className="w-full space-y-2">
                <a
                  href={activeQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0A1128] text-xs font-semibold hover:bg-[#d4b26a] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Leave a Review Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-400 truncate" title={activeQrUrl}>
                  Links to: {qrTargetPlatform === 'google' ? 'Google Maps Listing' : 'Trustpilot'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: Professional Client Testimonials & Guest Reviews Grid ("What Our Clients Say") */}
      <section
        id="what-our-clients-say"
        className="py-20 bg-gradient-to-b from-white via-[#F5F3FF]/60 to-white border-t border-slate-200/80"
        aria-labelledby="client-testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0A1128] mb-2">
                Hospitality &amp; Digital Excellence Showcase
              </p>
              <h2
                id="client-testimonials-heading"
                className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#0A1128]"
              >
                What Our Clients Say
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Real feedback on our commitment to quality, creativity, and digital excellence.
                <span className="ml-1 text-xs text-slate-500">
                  (Sample showcase cards clearly labeled as demonstration content)
                </span>
              </p>
            </div>

            {/* Interactive Filter Controls */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setTestimonialFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  testimonialFilter === 'all'
                    ? 'bg-[#0A1128] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1128]'
                }`}
              >
                All Testimonials (6)
              </button>
              <button
                type="button"
                onClick={() => setTestimonialFilter('hotel-guest')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  testimonialFilter === 'hotel-guest'
                    ? 'bg-[#0A1128] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1128]'
                }`}
              >
                Hotel Guests (3)
              </button>
              <button
                type="button"
                onClick={() => setTestimonialFilter('agency-client')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  testimonialFilter === 'agency-client'
                    ? 'bg-[#0A1128] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1128]'
                }`}
              >
                Digital &amp; Web Services (3)
              </button>
            </div>
          </div>

          {/* Responsive 3-Cards-Per-Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTestimonials.map((item) => (
              <article
                key={item.id}
                className="relative rounded-2xl bg-white border border-slate-200 p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-400 flex flex-col justify-between"
              >
                {/* Decorative Quotation Mark Icon in Light Purple */}
                <Quote
                  className="w-9 h-9 text-purple-200/80 absolute top-6 right-6 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* Five Golden Star Icons */}
                  <div
                    className="flex items-center gap-1 text-[#F59E0B]"
                    aria-label="5 out of 5 golden stars"
                  >
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>

                  {/* Verified Badge + Service Category as Quiet Inline Metadata */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.verifiedLabel}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-slate-500">{item.serviceTag}</span>
                  </div>

                  {/* Review Quote Text */}
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">“{item.quote}”</p>
                </div>

                {/* Circular Customer Profile Avatar + Bold Dark Navy Name + Role/Company */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-full bg-[#0A1128] text-[#C5A059] font-serif-display font-semibold text-base flex items-center justify-center shrink-0 border border-[#C5A059]/40"
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#0A1128] truncate">
                      {item.authorName}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {item.authorRole} · {item.authorCompany}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
