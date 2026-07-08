import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import {
  Search,
  MapPin,
  Clock,
  Heart,
  Star,
  Truck,
  Zap,
  CheckCircle2,
  Navigation,
  Phone,
  ChevronDown,
  RotateCw,
  SlidersHorizontal,
  CalendarDays,
} from "lucide-react";
import styles from "./page.module.css";

const stores = [
  {
    id: 1,
    name: "Clean7 Indirapuram",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.8,
    reviews: 238,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "Gaur City Road, Indirapuram, Ghaziabad, Uttar Pradesh 201014",
    distance: "2.3 km away",
    radius: "Serving 8 km radius",
    pickupTime: "30-45 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: true },
      { label: "E", active: true },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
  {
    id: 2,
    name: "Clean7 Sector 62",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.7,
    reviews: 156,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "Plot No. 23, Sector 62, Noida, Uttar Pradesh 201309",
    distance: "3.8 km away",
    radius: "Serving 7 km radius",
    pickupTime: "25-40 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: false },
      { label: "E", active: true },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
  {
    id: 3,
    name: "Clean7 Raj Nagar",
    status: "CLOSED",
    statusColor: "red",
    opensTomorrow: "8:00 AM",
    rating: 4.6,
    reviews: 112,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017",
    distance: "5.6 km away",
    radius: "Serving 6 km radius",
    pickupTime: "-",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "-", active: false },
      { label: "-", active: false },
      { label: "-", active: false },
    ],
    openHours: "8:00 AM - 8:00 PM",
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
  {
    id: 4,
    name: "Clean7 Vaishali",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.7,
    reviews: 98,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "Shop No. 5, Vaishali, Ghaziabad, Uttar Pradesh 201010",
    distance: "1.9 km away",
    radius: "Serving 6 km radius",
    pickupTime: "30-45 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: true },
      { label: "E", active: false },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
  {
    id: 5,
    name: "Clean7 Noida Sector 137",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.8,
    reviews: 205,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "Sector 137, Noida, Uttar Pradesh 201305",
    distance: "4.1 km away",
    radius: "Serving 7 km radius",
    pickupTime: "25-40 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: true },
      { label: "E", active: true },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
  {
    id: 6,
    name: "Clean7 Ghaziabad City",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.5,
    reviews: 87,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "MG Road, Ghaziabad, Uttar Pradesh 201001",
    distance: "2.8 km away",
    radius: "Serving 5 km radius",
    pickupTime: "35-50 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: false },
      { label: "E", active: true },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
  },
];

export default function StoresPage() {
  return (
    <div className="bg-[var(--ground)] min-h-screen text-[var(--ink)]">
      <Navbar />
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.badge}>OUR STORES</div>
          <h1 className={styles.title}>
            Find a Clean7
            <br />
            Store <span className={styles.highlight}>Near You</span>
          </h1>
          <p className={styles.subtitle}>
            Premium laundry, car wash, and home care services
            <br />
            available at 28+ locations. Find the nearest store and
            <br />
            experience the Clean7 difference.
          </p>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by city, locality or pincode..."
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className={styles.filtersBar}>
          <div className={styles.filterGroups}>
            <div className={styles.filterItem}>
              <div className={styles.filterItemIcon}>
                <MapPin size={18} />
              </div>
              <div className={styles.filterItemContent}>
                <span className={styles.filterLabel}>City</span>
                <div className={styles.filterValue}>
                  All Cities <ChevronDown size={14} />
                </div>
              </div>
            </div>
            <div className={styles.filterDivider} />
            <div className={styles.filterItem}>
              <div className={styles.filterItemIcon}>
                <div className={styles.squaresIcon}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.filterItemContent}>
                <span className={styles.filterLabel}>Service</span>
                <div className={styles.filterValue}>
                  All Services <ChevronDown size={14} />
                </div>
              </div>
            </div>
            <div className={styles.filterDivider} />
            <div className={styles.filterItem}>
              <div className={styles.filterItemIcon}>
                <Clock size={18} />
              </div>
              <div className={styles.filterItemContent}>
                <span className={styles.filterLabel}>Availability</span>
                <div className={styles.filterValue}>
                  Open Now <ChevronDown size={14} />
                </div>
              </div>
            </div>
            <div className={styles.filterDivider} />
            <div className={styles.filterItem}>
              <div className={styles.filterItemIcon}>
                <MapPin size={18} />
              </div>
              <div className={styles.filterItemContent}>
                <span className={styles.filterLabel}>Distance</span>
                <div className={styles.filterValue}>
                  Within 10 km <ChevronDown size={14} />
                </div>
              </div>
            </div>
            <div className={styles.filterDivider} />
            <div className={styles.filterItem}>
              <div className={styles.filterItemIcon}>
                <SlidersHorizontal size={18} />
              </div>
              <div className={styles.filterItemContent}>
                <span className={styles.filterLabel}>Sort By</span>
                <div className={styles.filterValue}>
                  Nearest <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
          <button className={styles.moreFiltersBtn}>
            <SlidersHorizontal size={16} /> More Filters
          </button>
        </div>

        {/* List Header */}
        <div className={styles.listHeader}>
          <div className={styles.showingText}>
            Showing <span className={styles.highlightText}>28</span> Stores
          </div>
          <button className={styles.clearAllBtn}>
            <RotateCw size={14} /> Clear All
          </button>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {stores.map((store) => (
            <div key={store.id} className={styles.card}>
              {/* Card Image Wrapper */}
              <div className={styles.cardImageWrapper}>
                <div
                  className={`${styles.statusBadge} ${
                    store.statusColor === "green"
                      ? styles.statusGreen
                      : styles.statusRed
                  }`}
                >
                  {store.status}
                </div>
                <Image
                  src="/images/franchise/store.png"
                  alt={store.name}
                  fill
                  className={styles.cardImage}
                />
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.storeName}>{store.name}</h3>
                  <button className={styles.favBtn}>
                    <Heart size={20} />
                  </button>
                </div>

                <div className={styles.ratingRow}>
                  <Star
                    className={styles.starIcon}
                    size={14}
                    fill="currentColor"
                  />
                  <span className={styles.rating}>{store.rating}</span>
                  <span className={styles.reviews}>
                    ({store.reviews} reviews)
                  </span>
                </div>

                <div className={styles.tagsRow}>
                  {store.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.locationRow}>
                  <MapPin className={styles.locIcon} size={16} />
                  <div className={styles.locDetails}>
                    <p className={styles.address}>{store.address}</p>
                    <p className={styles.distanceInfo}>
                      {store.distance} <span className={styles.dot}>•</span>{" "}
                      {store.radius}
                    </p>
                  </div>
                </div>

                {/* Time Info Grid */}
                <div className={styles.timeInfoGrid}>
                  {store.status === "OPEN NOW" ? (
                    <>
                      <div className={styles.timeInfoItem}>
                        <Clock size={16} className={styles.timeIcon} />
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>
                            Pickup in
                          </span>
                          <span className={styles.timeInfoVal}>
                            {store.pickupTime}
                          </span>
                        </div>
                      </div>
                      <div className={styles.timeInfoItem}>
                        <CalendarDays size={16} className={styles.timeIcon} />
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>
                            Ready within
                          </span>
                          <span className={styles.timeInfoVal}>
                            {store.readyWithin}
                          </span>
                        </div>
                      </div>
                      <div className={styles.timeInfoItem}>
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>
                            Today's Slots
                          </span>
                          <div className={styles.slotsRow}>
                            {store.todaySlots.map((slot, i) => (
                              <span
                                key={i}
                                className={`${styles.slotDot} ${
                                  slot.active
                                    ? styles.slotActive
                                    : styles.slotInactive
                                }`}
                              >
                                {slot.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.timeInfoItem}>
                        <div className={styles.timeInfoContent}>
                          <span className={styles.opensTomorrowLabel}>
                            Opens Tomorrow
                          </span>
                          <span className={styles.opensTomorrowVal}>
                            {store.opensTomorrow}
                          </span>
                        </div>
                      </div>
                      <div className={styles.timeInfoItem}>
                        <CalendarDays size={16} className={styles.timeIcon} />
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>
                            Ready within
                          </span>
                          <span className={styles.timeInfoVal}>
                            {store.readyWithin}
                          </span>
                        </div>
                      </div>
                      <div className={styles.timeInfoItem}>
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>
                            Today's Slots
                          </span>
                          <span className={styles.timeInfoVal}>- - -</span>
                        </div>
                      </div>
                      <div className={styles.timeInfoItem}>
                        <div className={styles.timeInfoContent}>
                          <span className={styles.timeInfoLabel}>Open</span>
                          <span className={styles.timeInfoVal}>
                            {store.openHours}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Features Row */}
                <div className={styles.featuresRow}>
                  {store.features.includes("Free Pickup") && (
                    <div className={styles.featureItem}>
                      <Truck size={14} className={styles.featureIcon} /> Free
                      Pickup
                    </div>
                  )}
                  {store.features.includes("Express Service") && (
                    <div className={styles.featureItem}>
                      <Zap size={14} className={styles.featureIcon} /> Express
                      Service
                    </div>
                  )}
                  {store.features.includes("Verified Store") && (
                    <div className={styles.featureItem}>
                      <CheckCircle2 size={14} className={styles.featureIcon} />{" "}
                      Verified Store
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className={styles.actionsRow}>
                  <button className={styles.btnPrimary}>
                    Check Pricing
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className={styles.btnOutline}>
                    <Navigation size={14} /> Get Directions
                  </button>
                  <button className={styles.btnOutline}>
                    <Phone size={14} /> Call Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
