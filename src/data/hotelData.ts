export interface RoomCategory {
  id: string;
  name: string;
  category: 'Suite' | 'Twin' | 'Family' | 'Standard';
  shortDescription: string;
  fullDescription: string;
  image: string;
  occupancy: string;
  bedConfiguration: string;
  sizeLabel: string;
  rateLabel: string;
  rateNote: string;
  availabilityStatus: 'Available for Inquiry' | 'Limited Dates' | 'Direct Confirmation';
  amenities: string[];
}

export interface SpecialOfferPackage {
  id: string;
  code: string;
  typeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ratePlaceholder: string;
  originalRatePlaceholder?: string;
  discountBadge?: string;
  minStay: string;
  occupancyLimit: string;
  validityText: string;
  conditionsText: string;
  includedBenefits: string[];
  ctaLabel: string;
  available: boolean;
}

export interface TestimonialItem {
  id: string;
  category: 'hotel-guest' | 'agency-client';
  serviceTag: string;
  rating: number;
  verifiedLabel: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  initials: string;
  isSampleDemo: boolean;
}

export const HOTEL_INFO = {
  name: 'Hotel Maracana',
  phoneDisplay: '+55 11 94307-2657',
  phoneRaw: '5511943072657',
  address: 'R. Piratininga - Brás, São Paulo - SP, 03042-000, Brazil',
  neighborhood: 'Brás, São Paulo - SP',
  postalCode: '03042-000',
  country: 'Brazil',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=R.+Piratininga+-+Br%C3%A1s,+S%C3%A3o+Paulo+-+SP,+03042-000,+Brazil&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+Piratininga+-+Br%C3%A1s,+S%C3%A3o+Paulo+-+SP,+03042-000,+Brazil',
  defaultGoogleReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=Hotel+Maracana+R.+Piratininga+Bras+Sao+Paulo',
  defaultTrustpilotUrl: 'https://www.trustpilot.com',
};

export const IMAGES = {
  heroFacade: '/src/assets/images/hero_hotel_maracana_1793007146083.jpg',
  executiveSuite: '/src/assets/images/room_executive_suite_1793007148625.jpg',
  deluxeTwin: '/src/assets/images/room_deluxe_twin_1793007148472.jpg',
  familyStudio: '/src/assets/images/room_family_studio_1793007150123.jpg',
  hospitalityLounge: '/src/assets/images/hotel_hospitality_lounge_1793007150089.jpg',
  facilityWifi: '/src/assets/images/facility_wifi_workspace_1793012173358.jpg',
  facilityRoomService: '/src/assets/images/facility_room_service_1793012174869.jpg',
  facilityParking: '/src/assets/images/facility_guest_parking_1793012175746.jpg',
  facilityReception: '/src/assets/images/facility_hotel_reception_1793012176479.jpg',
  facilityHousekeeping: '/src/assets/images/facility_housekeeping_care_1793012177752.jpg',
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const defaultText =
    'Hello Hotel Maracana (+55 11 94307-2657), I would like to inquire about room availability and rates in Brás, São Paulo.';
  const encoded = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${HOTEL_INFO.phoneRaw}?text=${encoded}`;
}

export const ROOMS_DATA: RoomCategory[] = [
  {
    id: 'executive-king-suite',
    name: 'Maracana Executive King Room',
    category: 'Suite',
    shortDescription:
      'Refined king accommodation designed for restful stays in the heart of Brás, São Paulo.',
    fullDescription:
      'Featuring a signature dark navy upholstered headboard, high-thread-count white linens, dedicated workspace, and sound-insulated windows overlooking São Paulo. Ideal for business travellers and couples seeking quiet comfort.',
    image: IMAGES.executiveSuite,
    occupancy: 'Up to 2 Guests',
    bedConfiguration: '1 King Bed',
    sizeLabel: 'Spacious Layout',
    rateLabel: 'Rate on Request (Placeholder: BRL — / night)',
    rateNote: 'Direct tariff confirmed via Reception or WhatsApp based on check-in dates',
    availabilityStatus: 'Available for Inquiry',
    amenities: ['Complimentary Wi-Fi', 'Comfortable Orthopaedic Bed', 'Room Service', 'Work Desk', 'Private En-Suite Bath'],
  },
  {
    id: 'deluxe-twin-room',
    name: 'Piratininga Deluxe Twin Room',
    category: 'Twin',
    shortDescription:
      'Two plush single beds with crisp white bedding, tailored for colleagues, friends, or commercial visitors.',
    fullDescription:
      'Thoughtfully appointed twin guest room offering individual reading lamps, high-speed wireless internet, room service access, and a bright marble-finished en-suite bathroom.',
    image: IMAGES.deluxeTwin,
    occupancy: 'Up to 2 Guests',
    bedConfiguration: '2 Single Comfort Beds',
    sizeLabel: 'Twin Configuration',
    rateLabel: 'Rate on Request (Placeholder: BRL — / night)',
    rateNote: 'Direct tariff confirmed via Reception or WhatsApp based on check-in dates',
    availabilityStatus: 'Available for Inquiry',
    amenities: ['Complimentary Wi-Fi', 'Twin Comfort Beds', 'Room Service', 'On-Site Parking Access', 'Writing Desk'],
  },
  {
    id: 'family-hospitality-suite',
    name: 'Brás Family & Group Suite',
    category: 'Family',
    shortDescription:
      'Generous multi-guest accommodation with a king bed and relaxing lounge seating area.',
    fullDescription:
      'Created for families and small groups visiting São Paulo, combining a restful king sleeping zone with an inviting navy-and-gold lounge area, ample luggage storage, and attentive room service.',
    image: IMAGES.familyStudio,
    occupancy: 'Up to 4 Guests',
    bedConfiguration: '1 King Bed + Lounge Seating',
    sizeLabel: 'Family Suite Layout',
    rateLabel: 'Rate on Request (Placeholder: BRL — / night)',
    rateNote: 'Direct tariff confirmed via Reception or WhatsApp based on check-in dates',
    availabilityStatus: 'Available for Inquiry',
    amenities: ['Complimentary Wi-Fi', 'Comfortable Beds', 'Room Service', 'Parking Available', 'Lounge Seating Area'],
  },
  {
    id: 'classic-comfort-double',
    name: 'Classic Comfort Double Room',
    category: 'Standard',
    shortDescription:
      'Essential luxury and quiet comfort for overnight or multi-day stays on R. Piratininga.',
    fullDescription:
      'A calm, well-proportioned double room equipped with Hotel Maracana’s signature comfortable bedding, reliable Wi-Fi connectivity, and direct access to room service and parking.',
    image: IMAGES.executiveSuite,
    occupancy: 'Up to 2 Guests',
    bedConfiguration: '1 Double Bed',
    sizeLabel: 'Classic Layout',
    rateLabel: 'Rate on Request (Placeholder: BRL — / night)',
    rateNote: 'Direct tariff confirmed via Reception or WhatsApp based on check-in dates',
    availabilityStatus: 'Direct Confirmation',
    amenities: ['Complimentary Wi-Fi', 'Comfortable Bed', 'Room Service', 'On-Site Parking Access'],
  },
];

export const CONFIRMED_FACILITIES = [
  {
    id: 'wifi',
    number: '01',
    title: 'High-Speed Wi-Fi Connectivity',
    description:
      'Reliable wireless internet access across guest rooms and public areas so business and leisure travellers stay effortlessly connected.',
    status: 'Confirmed Facility',
    image: IMAGES.facilityWifi,
  },
  {
    id: 'beds',
    number: '02',
    title: 'Premium Comfortable Beds',
    description:
      'Restful mattresses dressed in crisp white linens and tailored pillows engineered for deep, uninterrupted sleep in São Paulo.',
    status: 'Confirmed Facility',
    image: IMAGES.executiveSuite,
  },
  {
    id: 'room-service',
    number: '03',
    title: 'Attentive Room Service',
    description:
      'In-room refreshments and dining support delivered directly to your door for private comfort after a busy day in the city.',
    status: 'Confirmed Facility',
    image: IMAGES.facilityRoomService,
  },
  {
    id: 'parking',
    number: '04',
    title: 'Convenient Guest Parking',
    description:
      'Dedicated parking arrangement for guests arriving by private vehicle at R. Piratininga - Brás.',
    status: 'Confirmed Facility',
    image: IMAGES.facilityParking,
  },
  {
    id: 'reception',
    number: '05',
    title: 'Dedicated Guest Reception & WhatsApp Desk',
    description:
      'Direct assistance via +55 11 94307-2657 for check-in coordination, local Brás directions, and reservation inquiries.',
    status: 'Confirmed Service',
    image: IMAGES.facilityReception,
  },
  {
    id: 'housekeeping',
    number: '06',
    title: 'Daily Housekeeping & Hygiene Care',
    description:
      'Meticulous room preparation, fresh towels, and sanitized surfaces maintained prior to and throughout every stay.',
    status: 'Confirmed Service',
    image: IMAGES.facilityHousekeeping,
  },
];

export const SPECIAL_OFFERS: SpecialOfferPackage[] = [
  {
    id: 'weekend-getaway',
    code: 'A',
    typeLabel: 'Weekend Getaway',
    title: 'São Paulo Weekend Retreat',
    subtitle: 'Friday to Sunday relaxation in the historic Brás district',
    description:
      'Unwind over the weekend at Hotel Maracana with restful bedding, in-room service convenience, and easy access to central São Paulo landmarks and shopping.',
    image: IMAGES.executiveSuite,
    ratePlaceholder: 'Editable Placeholder: Seasonal Weekend Tariff on Request',
    originalRatePlaceholder: 'Standard Tariff Placeholder',
    discountBadge: 'Direct Booking Rate',
    minStay: 'Minimum 2 Nights (Fri–Sun)',
    occupancyLimit: 'Up to 2 Adults',
    validityText: 'Valid for Friday–Sunday check-ins · Subject to room availability',
    conditionsText: 'Direct reservation via phone or WhatsApp (+55 11 94307-2657) required to confirm weekend dates.',
    includedBenefits: ['Comfortable King or Twin Bed', 'Complimentary High-Speed Wi-Fi', 'Room Service Access', 'On-Site Parking Option'],
    ctaLabel: 'Explore Offer',
    available: true,
  },
  {
    id: 'extended-stay',
    code: 'B',
    typeLabel: 'Extended Stay Package',
    title: 'Multi-Night Extended Stay Tariff',
    subtitle: 'Preferred rates for guests staying 4 nights or longer',
    description:
      'Designed for commercial visitors, textile & retail buyers in Brás, and travellers spending several days in São Paulo who value consistent comfort.',
    image: IMAGES.deluxeTwin,
    ratePlaceholder: 'Editable Placeholder: Multi-Night Custom Quote',
    originalRatePlaceholder: 'Nightly Standard Rate',
    discountBadge: 'Extended Stay Value',
    minStay: 'Minimum 4 Consecutive Nights',
    occupancyLimit: '1–2 Guests per Room',
    validityText: 'Year-round availability · Advance reservation recommended',
    conditionsText: 'Applicable to consecutive nights booked directly with Hotel Maracana reception.',
    includedBenefits: ['High-Speed Wi-Fi', 'Daily Housekeeping', 'Room Service Access', 'Dedicated Work Desk'],
    ctaLabel: 'View Package',
    available: true,
  },
  {
    id: 'romantic-stay',
    code: 'C',
    typeLabel: 'Romantic Stay Package',
    title: 'Couples Private Comfort Stay',
    subtitle: 'Serene king suite ambiance for anniversaries and special evenings',
    description:
      'Enjoy a quiet, intimate stay in our Executive King Room featuring warm golden lighting, plush linens, and attentive in-room service upon request.',
    image: IMAGES.hospitalityLounge,
    ratePlaceholder: 'Editable Placeholder: Couples Package Rate on Inquiry',
    minStay: '1 or More Nights',
    occupancyLimit: '2 Guests (Couples)',
    validityText: 'Available year-round · Prior notice requested for special arrangements',
    conditionsText: 'Special room preparation or late check-out subject to confirmed availability at booking.',
    includedBenefits: ['Executive King Bed', 'In-Room Service Availability', 'Complimentary Wi-Fi', 'Quiet Floor Placement (Upon Request)'],
    ctaLabel: 'Discover Package',
    available: true,
  },
  {
    id: 'family-stay',
    code: 'D',
    typeLabel: 'Family Stay Package',
    title: 'Family & Group Comfort Package',
    subtitle: 'Spacious multi-guest layout with parking and Wi-Fi included',
    description:
      'Tailored for families visiting São Paulo together, offering generous sleeping arrangements, lounge seating, and convenient on-site vehicle parking.',
    image: IMAGES.familyStudio,
    ratePlaceholder: 'Editable Placeholder: Family Suite Tariff on Inquiry',
    minStay: 'Minimum 2 Nights Recommended',
    occupancyLimit: 'Up to 4 Family Guests',
    validityText: 'Available for weekend and school holiday dates',
    conditionsText: 'Please confirm number of adults and children when contacting reservations.',
    includedBenefits: ['Spacious Family Room Layout', 'Complimentary Wi-Fi for All Devices', 'On-Site Parking Access', 'Room Service Support'],
    ctaLabel: 'Explore Family Offer',
    available: true,
  },
  {
    id: 'business-stay',
    code: 'E',
    typeLabel: 'Business Stay Package',
    title: 'Brás Commercial & Corporate Stay',
    subtitle: 'Practical luxury located at R. Piratininga - Brás',
    description:
      'Positioned right in Brás for visiting entrepreneurs, executives, and trade professionals needing dependable Wi-Fi, a quiet workspace, and fast check-in.',
    image: IMAGES.deluxeTwin,
    ratePlaceholder: 'Editable Placeholder: Corporate Net Rate on Request',
    minStay: '1+ Nights (Weekday Priority)',
    occupancyLimit: '1–2 Corporate Travellers',
    validityText: 'Valid Monday through Friday · Direct corporate billing inquiry available',
    conditionsText: 'Contact reception via WhatsApp to confirm arrival time and parking slot.',
    includedBenefits: ['High-Speed Wi-Fi', 'In-Room Work Desk', 'Room Service', 'On-Site Parking Access'],
    ctaLabel: 'Book Business Stay',
    available: true,
  },
  {
    id: 'seasonal-special',
    code: 'F',
    typeLabel: 'Seasonal Special Offers',
    title: 'São Paulo Seasonal & Holiday Promotion',
    subtitle: 'Flexible seasonal stays during São Paulo cultural & trade calendar events',
    description:
      'Planning ahead for holidays or major São Paulo events? Contact Hotel Maracana directly to check current seasonal promotions and verified availability.',
    image: IMAGES.heroFacade,
    ratePlaceholder: 'Editable Placeholder: Seasonal Promotional Tariff',
    minStay: 'Varies by Holiday Calendar',
    occupancyLimit: '1–4 Guests (Room Dependent)',
    validityText: 'Seasonal calendar dates · Direct verification required',
    conditionsText: 'All seasonal rates and inclusions are confirmed transparently at the time of inquiry.',
    includedBenefits: ['Confirmed Room Category Selection', 'Complimentary Wi-Fi', 'Comfortable Bedding', 'Direct Reception Support'],
    ctaLabel: 'Check Seasonal Availability',
    available: true,
  },
];

export const OFFER_FAQS = [
  {
    question: 'How are package rates and discounts confirmed at Hotel Maracana?',
    answer:
      'To ensure complete accuracy and avoid artificial pricing, all room and package tariffs are confirmed directly by Hotel Maracana reception (+55 11 94307-2657) based on your exact check-in and check-out dates.',
  },
  {
    question: 'What facilities are included with every stay package?',
    answer:
      'Every confirmed reservation includes our core verified hotel facilities: high-speed Wi-Fi, comfortable beds with fresh linens, access to room service, and on-site parking options.',
  },
  {
    question: 'Can I modify my reservation dates or request a custom length of stay?',
    answer:
      'Yes. By booking directly through our reservation form or WhatsApp desk, you can communicate directly with our team at R. Piratininga - Brás to adjust dates or guest count subject to availability.',
  },
  {
    question: 'How do I know if a seasonal offer is currently active?',
    answer:
      'Each package card displays its status clearly. Clicking any offer button opens our direct reservation inquiry tool where our team confirms real-time room availability.',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'rev-1',
    category: 'hotel-guest',
    serviceTag: 'Hotel Hospitality & Comfort',
    rating: 5,
    verifiedLabel: 'Sample Guest Feedback (Demo Placeholder)',
    quote:
      'The location on R. Piratininga in Brás made our São Paulo business trip effortless. The beds were remarkably comfortable, the Wi-Fi remained fast for video calls, and having parking on site saved us hours.',
    authorName: 'Carlos Eduardo Mendes',
    authorRole: 'Commercial Director',
    authorCompany: 'Mendes Têxtil Brasil (Sample Profile)',
    initials: 'CM',
    isSampleDemo: true,
  },
  {
    id: 'rev-2',
    category: 'hotel-guest',
    serviceTag: 'Room Service & Cleanliness',
    rating: 5,
    verifiedLabel: 'Sample Guest Feedback (Demo Placeholder)',
    quote:
      'A calm, spotless sanctuary right in the heart of Brás. Coordinating our arrival over WhatsApp was immediate, and the room service team looked after our family with genuine Brazilian warmth.',
    authorName: 'Fernanda Oliveira',
    authorRole: 'Visiting Guest',
    authorCompany: 'Belo Horizonte, MG (Sample Profile)',
    initials: 'FO',
    isSampleDemo: true,
  },
  {
    id: 'rev-3',
    category: 'hotel-guest',
    serviceTag: 'Executive Suite Stay',
    rating: 5,
    verifiedLabel: 'Sample Guest Feedback (Demo Placeholder)',
    quote:
      'Everything you need for a reliable stay in São Paulo: quiet rooms, very comfortable mattresses, attentive reception staff, and straightforward direct booking without hidden fees.',
    authorName: 'Ricardo & Juliana Alves',
    authorRole: 'Weekend Travellers',
    authorCompany: 'Curitiba, PR (Sample Profile)',
    initials: 'RA',
    isSampleDemo: true,
  },
  {
    id: 'rev-4',
    category: 'agency-client',
    serviceTag: 'Website Design & React Development',
    rating: 5,
    verifiedLabel: 'Verified Client (Demo Showcase)',
    quote:
      'Our custom React hospitality platform transformed how guests explore rooms and reach our reservation desk. Page load speeds improved dramatically and direct WhatsApp inquiries increased right away.',
    authorName: 'Henrique Vasconcelos',
    authorRole: 'Operations Partner',
    authorCompany: 'Paulista Hospitality Group (Demo)',
    initials: 'HV',
    isSampleDemo: true,
  },
  {
    id: 'rev-5',
    category: 'agency-client',
    serviceTag: 'Brand Identity & Speed Optimization',
    rating: 5,
    verifiedLabel: 'Verified Client (Demo Showcase)',
    quote:
      'From the navy-and-gold visual identity to the mobile-first booking flow, every detail was crafted with precision. Our guests frequently compliment how clean and trustworthy the website feels.',
    authorName: 'Camila Rocha',
    authorRole: 'Marketing Lead',
    authorCompany: 'Studio Sudeste Digital (Demo)',
    initials: 'CR',
    isSampleDemo: true,
  },
  {
    id: 'rev-6',
    category: 'agency-client',
    serviceTag: 'Local SEO & Digital Marketing',
    rating: 5,
    verifiedLabel: 'Verified Client (Demo Showcase)',
    quote:
      'Implementing structured local SEO for São Paulo along with interactive Google Maps and direct review QR integration gave our property a measurable boost in local search visibility.',
    authorName: 'Lucas Tavares',
    authorRole: 'Founder & Strategist',
    authorCompany: 'Vanguard Commerce SP (Demo)',
    initials: 'LT',
    isSampleDemo: true,
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Hotel Maracana Grand Facade & Entrance',
    category: 'Exterior & Lobby',
    caption: 'Warm golden architectural lighting welcoming guests at R. Piratininga - Brás, São Paulo.',
    image: IMAGES.heroFacade,
  },
  {
    id: 'gal-2',
    title: 'Maracana Executive King Suite',
    category: 'Guest Rooms',
    caption: 'Tailored dark navy headboard, crisp white linens, and panoramic São Paulo views.',
    image: IMAGES.executiveSuite,
  },
  {
    id: 'gal-3',
    title: 'Piratininga Deluxe Twin Room',
    category: 'Guest Rooms',
    caption: 'Dual comfort beds with dedicated workspace and marble-appointed en-suite bathroom.',
    image: IMAGES.deluxeTwin,
  },
  {
    id: 'gal-4',
    title: 'Brás Family & Group Suite',
    category: 'Suites',
    caption: 'Spacious multi-guest layout combining a restful sleeping zone with a private lounge area.',
    image: IMAGES.familyStudio,
  },
  {
    id: 'gal-5',
    title: 'Hospitality Lounge & Dining Atrium',
    category: 'Lounge & Hospitality',
    caption: 'Refined navy and brass seating area crafted for relaxed mornings and guest hospitality.',
    image: IMAGES.hospitalityLounge,
  },
];
