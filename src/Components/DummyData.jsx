import DjTessco from "../assets/BackgroundImage/djTeesco.jpg"
import plane from "../assets/logos/plane.png"
import chat from "../assets/logos/chat.png"
import payout from "../assets/logos/payout.png"
import secure from "../assets/logos/secure.png"
import verified from '../assets/logos/verified.png'
import calender from '../assets/logos/calender.png'
import publicLink from '../assets/logos/publicLink.png'
import transparency from '../assets/logos/transparency.png'
import invoice from '../assets/logos/invoice.png'
import savings from '../assets/logos/savings.png'
import budget from '../assets/logos/budget.png'
import contract from '../assets/logos/contract.png'
import tracking from '../assets/logos/tracking.png'
import Bell from "../assets/logos/Bell.png"
// import calender from "../assets/logos/calender.png"
export const dummyVendors = [
  { id: 1, name: "DjReason", location: "Lagos, Nigeria", rating: 4, price: 500000, image: DjTessco },
  { id: 2, name: "Mc_Mo", location: "Lagos, Nigeria", rating: 4, price: 500000, image: DjTessco },
  { id: 3, name: "Alujo Band", location: "Lagos, Nigeria", rating: 4, price: 300000, image: DjTessco },
  { id: 4, name: "Splash Photography", location: "Lagos, Nigeria", rating: 4, price: 300000, image: DjTessco },
  { id: 5, name: "Vibe DJ Collective", location: "Lagos, Nigeria", rating: 5, price: 650000, image: DjTessco },
  { id: 6, name: "Hypeman Jerry", location: "Abuja, Nigeria", rating: 4, price: 250000, image: DjTessco },
  { id: 7, name: "Symphony Strings", location: "Lagos, Nigeria", rating: 5, price: 450000, image: DjTessco },
  { id: 8, name: "Gold Event Lights", location: "Lagos, Nigeria", rating: 4, price: 700000, image: DjTessco },
  { id: 9, name: "Dele Live Sax", location: "Ibadan, Nigeria", rating: 4, price: 200000, image: DjTessco },
  { id: 10, name: "Echo Sound System", location: "Lagos, Nigeria", rating: 5, price: 800000, image: DjTessco },
  { id: 11, name: "Shutter Masters", location: "Lagos, Nigeria", rating: 4, price: 350000, image: DjTessco },
  { id: 12, name: "MC Gentle", location: "Port Harcourt, Nigeria", rating: 4, price: 300000, image: DjTessco },
  { id: 13, name: "Rhythm Bakers", location: "Lagos, Nigeria", rating: 4, price: 150000, image: DjTessco },
  { id: 14, name: "Naija Decor Hub", location: "Lagos, Nigeria", rating: 5, price: 950000, image: DjTessco },
  { id: 15, name: "DJ Spark", location: "Lagos, Nigeria", rating: 4, price: 400000, image: DjTessco }
];
export const stepsData = [
    {
      id: 1,
      icon: plane,
      title: "Discover & Filter",
      description: "Users browse a curated marketplace of verified entertainers. Using the lightweight availability calendar, clients can see real-time openings without the back-and-forth of 'Are you free?'"
    },
    {
      id: 2,
      icon: secure,
      title: "Secure Booking (The Escrow Lock)",
      description: "Once a client hits 'Book Now,' the payment is made immediately but held in a secure Escrow System. A trustworthy guarantee on both end."
    },
    {
      id: 3,
      icon: chat,
      title: "Seamless Collaboration",
      description: "FeastSync provides a workspace for both parties to finalize event details (setlists, arrival times, and equipment needs) with reminder notification sent to both parties as the event date approaches, synced directly with the lightweight calendar."
    },
    {
      id: 4,
      icon: payout,
      title: "The 'Handshake' & Payout",
      description: "Once the event is successfully completed, the client confirms the 'Check-out' on the platform. The Escrow releases the funds directly to the entertainer's wallet."
    }
  ]
  export const features = [
  { id: 1, icon: verified, label: "Verified Professional Profiles" },
  { id: 2, icon: secure, label: "Secure Escrow Payments" },
  { id: 3, icon: calender, label: "Lightweight Availability Calendar" },
  { id: 4, icon: publicLink, label: "Sharable Public Profile Link" },
  { id: 5, icon: transparency, label: "Transparency First" },
  { id: 6, icon: invoice, label: "Professional Invoices" },
  { id: 7, icon: savings, label: "Artist Savings Wallet" },
  { id: 8, icon: budget, label: "Fraud-Free Bookings" },
  { id: 9, icon: contract, label: "100% Digital Contracts" },
  { id: 10, icon: tracking, label: "Milestone Tracking" },
  { id: 11, icon: payout, label: "Budgeting Insights" },
  { id: 12, icon: savings, label: "Earnings Insights" },
]

export const allVendors = [
  { id: 1, name: 'DJ Kolade', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all1.png' },
  { id: 2, name: 'DjVicky', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all2.png' },
  { id: 3, name: 'DJCosmo', location: 'Lagos, Nigeria', rating: 5, price: 300000, image: '/src/assets/all3.png' },
  { id: 4, name: 'Mc Jerry', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all1.png' },
  { id: 5, name: 'Afro Life Band', location: 'Lagos, Nigeria', rating: 3, price: 300000, image: '/src/assets/all2.png' },
  { id: 6, name: 'Lens Master Ade', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all3.png' },
  { id: 7, name: 'DJ Rhythmx', location: 'Lagos, Nigeria', rating: 4, price: 350000, image: '/src/assets/all1.png' },
  { id: 8, name: 'MC Showtime', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all2.png' },
  { id: 9, name: 'CineVision Ng', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/all3.png' },
  { id: 10, name: 'Sound Wave DJs', location: 'Lagos, Nigeria', rating: 5, price: 250000, image: '/src/assets/all1.png' },
  { id: 11, name: 'Elite MCs', location: 'Lagos, Nigeria', rating: 4, price: 280000, image: '/src/assets/all2.png' },
  { id: 12, name: 'Golden Strings Band', location: 'Lagos, Nigeria', rating: 5, price: 450000, image: '/src/assets/all3.png' },
  { id: 13, name: 'Focus Snap Studio', location: 'Lagos, Nigeria', rating: 4, price: 200000, image: '/src/assets/all1.png' },
  { id: 14, name: 'Urban Beats Pro', location: 'Lagos, Nigeria', rating: 4, price: 320000, image: '/src/assets/all2.png' },
  { id: 15, name: 'Lagos Event Host', location: 'Lagos, Nigeria', rating: 5, price: 270000, image: '/src/assets/all3.png' },
  { id: 16, name: 'Prime Lens Media', location: 'Lagos, Nigeria', rating: 4, price: 380000, image: '/src/assets/all1.png' },
  { id: 17, name: 'Classic Rhythm Band', location: 'Lagos, Nigeria', rating: 3, price: 400000, image: '/src/assets/all2.png' },
  { id: 18, name: 'Visionary Films', location: 'Lagos, Nigeria', rating: 5, price: 500000, image: '/src/assets/all3.png' },
]
export const djVendors = [
  { id: 1, name: 'DJ Kolade', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 2, name: 'DJ Vicky', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 3, name: 'DJ Cosmo', location: 'Abuja, Nigeria', rating: 5, price: 350000, image: '/src/assets/BackgroundImage/dj3.png' },
  { id: 4, name: 'DJ VibeMaster', location: 'Abuja, Nigeria', rating: 4, price: 250000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 5, name: 'DJ Rhythm King', location: 'Port Harcourt, Nigeria', rating: 4, price: 350000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 6, name: 'DJ Tunde', location: 'Abuja, Nigeria', rating: 4, price: 250000, image: '/src/assets/BackgroundImage/dj3.png' },
  { id: 7, name: 'DJ Amaka', location: 'Port Harcourt, Nigeria', rating: 4, price: 350000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 8, name: 'DJ Luxe', location: 'Lagos, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 9, name: 'DJ Blazer', location: 'Lagos, Nigeria', rating: 3, price: 200000, image: '/src/assets/BackgroundImage/dj3.png' },
  { id: 10, name: 'DJ Emeka', location: 'Enugu, Nigeria', rating: 4, price: 280000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 11, name: 'DJ Sola', location: 'Ibadan, Nigeria', rating: 5, price: 420000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 12, name: 'DJ Flash', location: 'Lagos, Nigeria', rating: 3, price: 220000, image: '/src/assets/BackgroundImage/dj3.png' },
  { id: 13, name: 'DJ Gold', location: 'Kano, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 14, name: 'DJ Bayo', location: 'Lagos, Nigeria', rating: 4, price: 310000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 15, name: 'DJ Starboy', location: 'Abuja, Nigeria', rating: 5, price: 450000, image: '/src/assets/BackgroundImage/dj3.png' },
  { id: 16, name: 'DJ Chioma', location: 'Port Harcourt, Nigeria', rating: 4, price: 290000, image: '/src/assets/BackgroundImage/dj1.png' },
  { id: 17, name: 'DJ Drip', location: 'Lagos, Nigeria', rating: 3, price: 230000, image: '/src/assets/BackgroundImage/dj2.png' },
  { id: 18, name: 'DJ Royale', location: 'Calabar, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/dj3.png' },
]
export const mcVendors = [
  { id: 1, name: 'MC Kolade', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 2, name: 'MC Vicky', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 3, name: 'MC Cosmo', location: 'Abuja, Nigeria', rating: 5, price: 350000, image: '/src/assets/BackgroundImage/mc3.png' },
  { id: 4, name: 'MC VibeMaster', location: 'Abuja, Nigeria', rating: 4, price: 250000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 5, name: 'MC Rhythm King', location: 'Port Harcourt, Nigeria', rating: 4, price: 350000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 6, name: 'MC Tunde', location: 'Abuja, Nigeria', rating: 4, price: 250000, image: '/src/assets/BackgroundImage/mc3.png' },
  { id: 7, name: 'MC Amaka', location: 'Port Harcourt, Nigeria', rating: 4, price: 350000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 8, name: 'MC Luxe', location: 'Lagos, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 9, name: 'MC Blazer', location: 'Lagos, Nigeria', rating: 3, price: 200000, image: '/src/assets/BackgroundImage/mc3.png' },
  { id: 10, name: 'MC Emeka', location: 'Enugu, Nigeria', rating: 4, price: 280000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 11, name: 'MC Sola', location: 'Ibadan, Nigeria', rating: 5, price: 420000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 12, name: 'MC Flash', location: 'Lagos, Nigeria', rating: 3, price: 220000, image: '/src/assets/BackgroundImage/mc3.png' },
  { id: 13, name: 'MC Gold', location: 'Kano, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 14, name: 'MC Bayo', location: 'Lagos, Nigeria', rating: 4, price: 310000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 15, name: 'MC Starboy', location: 'Abuja, Nigeria', rating: 5, price: 450000, image: '/src/assets/BackgroundImage/mc3.png' },
  { id: 16, name: 'MC Chioma', location: 'Port Harcourt, Nigeria', rating: 4, price: 290000, image: '/src/assets/BackgroundImage/mc1.png' },
  { id: 17, name: 'MC Drip', location: 'Lagos, Nigeria', rating: 3, price: 230000, image: '/src/assets/BackgroundImage/mc2.png' },
  { id: 18, name: 'MC Royale', location: 'Calabar, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/mc3.png' },
]
export const liveBandVendors = [
  { id: 1, name: 'Awesome Melody', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 2, name: 'Yoruba Luxe Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 3, name: 'Afro Rhythm Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband3.png' },
  { id: 4, name: 'Drum Circle NG', location: 'Lagos, Nigeria', rating: 3, price: 300000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 5, name: 'Naija Beats Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 6, name: 'Cultural Vibe Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband3.png' },
  { id: 7, name: 'Lagos Sound Crew', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 8, name: 'Afro Fusion Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 9, name: 'Heritage Live Band', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband3.png' },
  { id: 10, name: 'Rhythm & Soul NG', location: 'Abuja, Nigeria', rating: 5, price: 350000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 11, name: 'Highlife Kings', location: 'Abuja, Nigeria', rating: 4, price: 280000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 12, name: 'Calabar Sound Band', location: 'Calabar, Nigeria', rating: 3, price: 250000, image: '/src/assets/BackgroundImage/liveband3.png' },
  { id: 13, name: 'Juju Masters NG', location: 'Port Harcourt, Nigeria', rating: 4, price: 320000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 14, name: 'Fuji Vibes Band', location: 'Ibadan, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 15, name: 'Afrobeat All Stars', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/liveband3.png' },
  { id: 16, name: 'Igbo Cultural Band', location: 'Enugu, Nigeria', rating: 3, price: 270000, image: '/src/assets/BackgroundImage/liveband1.png' },
  { id: 17, name: 'Hausa Harmony Band', location: 'Kano, Nigeria', rating: 4, price: 310000, image: '/src/assets/BackgroundImage/liveband2.png' },
  { id: 18, name: 'Pan African Sound', location: 'Lagos, Nigeria', rating: 5, price: 380000, image: '/src/assets/BackgroundImage/liveband3.png' },
]
export const photographyVendors = [
  { id: 1, name: 'Vic Photography', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 2, name: 'Lens Master Ade', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 3, name: 'CineVision NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer3.png' },
  { id: 4, name: 'Shutter Kings', location: 'Lagos, Nigeria', rating: 3, price: 300000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 5, name: 'Frame Perfect NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 6, name: 'Golden Lens Studio', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer3.png' },
  { id: 7, name: 'SnapPro Lagos', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 8, name: 'Click & Capture', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 9, name: 'Visual Story NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer3.png' },
  { id: 10, name: 'Pixel Perfect NG', location: 'Abuja, Nigeria', rating: 5, price: 350000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 11, name: 'Moments by Tunde', location: 'Abuja, Nigeria', rating: 4, price: 280000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 12, name: 'Lagos Visuals Co.', location: 'Lagos, Nigeria', rating: 3, price: 250000, image: '/src/assets/BackgroundImage/photographer3.png' },
  { id: 13, name: 'Exposure Studio', location: 'Port Harcourt, Nigeria', rating: 4, price: 320000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 14, name: 'Candid Creatives', location: 'Ibadan, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 15, name: 'Prime Angle NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/photographer3.png' },
  { id: 16, name: 'Aperture Kings', location: 'Enugu, Nigeria', rating: 3, price: 270000, image: '/src/assets/BackgroundImage/photographer1.png' },
  { id: 17, name: 'Focus & Flair', location: 'Lagos, Nigeria', rating: 4, price: 310000, image: '/src/assets/BackgroundImage/photographer2.png' },
  { id: 18, name: 'NaijaShots Studio', location: 'Kano, Nigeria', rating: 5, price: 380000, image: '/src/assets/BackgroundImage/photographer3.png' },
]
export const videographerVendors = [
  { id: 1, name: 'Visual Studio', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 2, name: 'CineShot NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 3, name: 'ReelLife Studio', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer3.png' },
  { id: 4, name: 'Motion Frames NG', location: 'Lagos, Nigeria', rating: 3, price: 300000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 5, name: 'Frame By Frame', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 6, name: 'Lagos Film Crew', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer3.png' },
  { id: 7, name: 'Cinematic Lens NG', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 8, name: 'Story Reel Studio', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 9, name: 'ProShot Nigeria', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer3.png' },
  { id: 10, name: 'Apex Filmworks', location: 'Abuja, Nigeria', rating: 5, price: 350000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 11, name: 'Naija Reels Co.', location: 'Abuja, Nigeria', rating: 4, price: 280000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 12, name: 'Footage Kings NG', location: 'Lagos, Nigeria', rating: 3, price: 250000, image: '/src/assets/BackgroundImage/videographer3.png' },
  { id: 13, name: 'Aerial Shots NG', location: 'Port Harcourt, Nigeria', rating: 4, price: 320000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 14, name: 'Scene & Sound', location: 'Ibadan, Nigeria', rating: 5, price: 400000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 15, name: 'Cut & Roll Studio', location: 'Lagos, Nigeria', rating: 4, price: 300000, image: '/src/assets/BackgroundImage/videographer3.png' },
  { id: 16, name: 'Director\'s Eye NG', location: 'Enugu, Nigeria', rating: 3, price: 270000, image: '/src/assets/BackgroundImage/videographer1.png' },
  { id: 17, name: 'Raw Footage NG', location: 'Lagos, Nigeria', rating: 4, price: 310000, image: '/src/assets/BackgroundImage/videographer2.png' },
  { id: 18, name: 'Blockshot Studio', location: 'Kano, Nigeria', rating: 5, price: 380000, image: '/src/assets/BackgroundImage/videographer3.png' },
]
export const walletSummary = {
  totalBalance: 285500,
  availableBalance: 241000,
  escrowBalance: 44500,
  pendingEscrow: 44500,
  pendingTransactions: 2,
  completedBookings: 31,
  milestones: [
    {
      id: "m1",
      title: "Wedding Catering - Adeola & Kunle",
      bookingId: "FS-2026-0604-001",
      received: 105000,
      escrow: 45000,
      note: "70% released"
    },
    {
      id: "m2",
      title: "Birthday Party - Mrs. Johnson",
      bookingId: "FS-2026-0602-003",
      received: 59500,
      escrow: 25500,
      note: "70% released"
    },
    {
      id: "m3",
      title: "Corporate Event - TechCorp Ltd",
      bookingId: "FS-2026-0528-004",
      received: 320000,
      escrow: 0,
      note: ""
    }
  ],
  recentTransactions: [
    {
      id: 1,
      description: "Milestone Payment",
      eventName: "Wedding - Adeola & Kunle",
      bookingId: "FS-2026-0604-001",
      date: "Jun 4, 2026",
      amount: 150000
    },
    {
      id: 2,
      description: "Withdrawal to GTBank",
      eventName: "Payout",
      bookingId: "FS-WD-0603-002",
      date: "Jun 3, 2026",
      amount: -120000
    },
    {
      id: 3,
      description: "Escrow Hold",
      eventName: "Birthday Party - Mrs. Johnson",
      bookingId: "FS-2026-0602-003",
      date: "Jun 2, 2026",
      amount: 85000
    }
  ]
};

export const ledgerStats = {
  vendorName: "Adeyemi Catering",
  totalCredits: 735000,
  totalWithdrawn: 320000,
  inEscrow: 44500,
  totalTransactions: 6,
  availableBalance: 370500,
  pendingRelease: 44500
};

export const allTransactions = [
  {
    id: 1,
    description: "Milestone Payment",
    eventName: "Wedding - Adeola & Kunle",
    bookingId: "FS-2026-0604-001",
    date: "Jun 4, 2026",
    amount: 150000,
    type: "milestone"
  },
  {
    id: 2,
    description: "Withdrawal to GTBank",
    eventName: "Payout",
    bookingId: "FS-WD-0603-002",
    date: "Jun 3, 2026",
    amount: -120000,
    type: "withdrawn"
  },
  {
    id: 3,
    description: "Escrow Hold",
    eventName: "Birthday Party - Mrs. Johnson",
    bookingId: "FS-2026-0602-003",
    date: "Jun 2, 2026",
    amount: 85000,
    type: "escrow"
  },
  {
    id: 4,
    description: "Milestone Payment",
    eventName: "Corporate Event - TechCorp Ltd",
    bookingId: "FS-2026-0528-004",
    date: "May 28, 2026",
    amount: 320000,
    type: "milestone"
  },
  {
    id: 5,
    description: "Refund - Cancelled Booking",
    eventName: "Refund",
    bookingId: "FS-RF-0525-005",
    date: "May 25, 2026",
    amount: -45000,
    type: "refunds"
  },
  {
    id: 6,
    description: "Escrow Hold",
    eventName: "Naming Ceremony - The Okoyes",
    bookingId: "FS-2026-0520-006",
    date: "May 20, 2026",
    amount: 65000,
    type: "escrow"
  }
];
export const allNotifications = [
  {
    id: "notif_001",
    type: "payment",
    title: "Payment Received",
    message: "You received ₦105,000 for Wedding Catering - Adeola & Kunle. 70% released to your wallet.",
    time: "2 hours ago",
    date: "2026-06-04T10:30:00",
    read: false,
    icon: savings,
    category: "wallet",
    bookingId: "FS-2026-0604-001"
  },
  {
    id: "notif_002",
    type: "booking",
    title: "New Booking Request",
    message: "Mrs. Johnson sent you a booking request for Birthday Party on Jun 15, 2026.",
    time: "5 hours ago",
    date: "2026-06-04T07:45:00",
    read: false,
    icon: calender,
    category: "bookings",
    bookingId: "FS-2026-0615-002"
  },
  {
    id: "notif_003",
    type: "escrow",
    title: "Escrow Released",
    message: "₦45,500 held in escrow for Naming Ceremony has been released to your available balance.",
    time: "1 day ago",
    date: "2026-06-03T16:20:00",
    read: true,
    icon: payout,
    category: "wallet",
    bookingId: "FS-2026-0520-006"
  },
  {
    id: "notif_004",
    type: "withdrawal",
    title: "Withdrawal Successful",
    message: "Your withdrawal of ₦120,000 to GTBank ****4521 was successful.",
    time: "2 days ago",
    date: "2026-06-03T14:15:00",
    read: true,
    icon: savings,
    category: "wallet",
    bookingId: "FS-WD-0603-002"
  },
  {
    id: "notif_005",
    type: "review",
    title: "New Review",
    message: "TechCorp Ltd left you a 5-star review: 'Excellent service and delicious food!'",
    time: "3 days ago",
    date: "2026-06-01T11:30:00",
    read: true,
    icon: verified,
    category: "reviews",
    bookingId: "FS-2026-0528-004"
  },
  {
    id: "notif_006",
    type: "reminder",
    title: "Event Reminder",
    message: "Reminder: You have a Wedding Catering event tomorrow for Adeola & Kunle.",
    time: "4 days ago",
    date: "2026-05-31T09:00:00",
    read: true,
    icon:Bell,
    category: "bookings",
    bookingId: "FS-2026-0604-001"
  },
  {
    id: "notif_007",
    type: "refund",
    title: "Refund Processed",
    message: "Refund of ₦45,000 for cancelled booking has been processed.",
    time: "1 week ago",
    date: "2026-05-25T11:10:00",
    read: true,
    icon: "../assets/logos/budget.png",
    category: "wallet",
    bookingId: "FS-RF-0525-005"
  },
  {
    id: "notif_008",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Corporate Event - TechCorp Ltd has been confirmed.",
    time: "2 weeks ago",
    date: "2026-05-20T15:00:00",
    read: true,
    icon: calender,
    category: "bookings",
    bookingId: "FS-2026-0528-004"
  }
];

export const notificationStats = {
  total: 8,
  unread: 2,
  categories: {
    wallet: 4,
    bookings: 3,
    reviews: 1
  }
};