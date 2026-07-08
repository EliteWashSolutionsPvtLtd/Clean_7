"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import FilterModal from "@/app/components/ui/modals/FilterModal";

import {
  Search,
  MapPin,
  Clock,
  Heart,
  Star,
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
    name: "Clean7 Meerut",
    status: "OPEN NOW",
    statusColor: "green",
    rating: 4.8,
    reviews: 238,
    tags: ["Laundry", "Car Wash", "Home Care"],
    address: "NH 58 Rohta Bypass Flyover Service Road Khadoli, Meerut",
    distance: "2.3",
    radius: "Serving 8 km radius",
    pickupTime: "30-45 mins",
    readyWithin: "24 hrs",
    todaySlots: [
      { label: "M", active: true },
      { label: "A", active: true },
      { label: "E", active: true },
    ],
    features: ["Free Pickup", "Express Service", "Verified Store"],
    openHours: "8:00 AM - 8:00 PM",
  },
];

export default function StoresPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState("Open Now");
  const [selectedDistance, setSelectedDistance] = useState("Within 10 km");
  const [selectedSort, setSelectedSort] = useState("Nearest");

  const cities = [
    "All Cities",
    "Noida",
    "Indirapuram",
    "Ghaziabad",
    "Delhi",
    "Gurgaon",
  ];
  const servicesList = ["Laundry", "Car Wash", "House Help"];
  const distances = ["Within 5 km", "Within 10 km", "Within 20 km", "Anywhere"];
  const sorts = ["Nearest", "Highest Rated", "Most Reviewed"];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const desktopFiltersRef = useRef<HTMLDivElement>(null);
  const mobileFiltersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutsideDesktop =
        !desktopFiltersRef.current ||
        !desktopFiltersRef.current.contains(e.target as Node);
      const isOutsideMobile =
        !mobileFiltersRef.current ||
        !mobileFiltersRef.current.contains(e.target as Node);

      if (isOutsideDesktop && isOutsideMobile) {
        setActiveModal(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeModal]);

  const renderFilters = () => (
    <>
      {/* City Filter */}
      <div
        className={`${styles.filterDropdownWrapper} ${activeModal && activeModal !== "city" ? styles.blurred : ""}`}
      >
        <div
          className={`${styles.filterItem} ${activeModal === "city" ? styles.filterItemActive : ""}`}
          onClick={() => setActiveModal(activeModal === "city" ? null : "city")}
        >
          <div className={styles.filterLeft}>
            <div className={styles.filterItemIcon}>
              <MapPin size={18} />
            </div>
            <div className={styles.filterItemContent}>
              <span className={styles.filterLabel}>City</span>
              <span className={styles.filterValue}>{selectedCity}</span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${activeModal === "city" ? styles.chevronOpen : ""}`}
          />
        </div>
        {activeModal === "city" && (
          <div className={styles.filterDropdown}>
            {cities.map((city) => (
              <div
                key={city}
                className={`${styles.dropdownOption} ${selectedCity === city ? styles.dropdownOptionActive : ""}`}
                onClick={() => {
                  setSelectedCity(city);
                  setActiveModal(null);
                }}
              >
                <span>{city}</span>
                {selectedCity === city && (
                  <CheckCircle2 size={16} className={styles.dropdownCheck} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Filter */}
      <div
        className={`${styles.filterDropdownWrapper} ${activeModal && activeModal !== "service" ? styles.blurred : ""}`}
      >
        <div
          className={`${styles.filterItem} ${activeModal === "service" ? styles.filterItemActive : ""}`}
          onClick={() =>
            setActiveModal(activeModal === "service" ? null : "service")
          }
        >
          <div className={styles.filterLeft}>
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
              <span className={styles.filterValue}>
                {selectedServices.length
                  ? `${selectedServices.length} Selected`
                  : "All Services"}
              </span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${activeModal === "service" ? styles.chevronOpen : ""}`}
          />
        </div>
        {activeModal === "service" && (
          <div className={styles.filterDropdown}>
            {servicesList.map((service) => (
              <div
                key={service}
                className={`${styles.dropdownOption} ${selectedServices.includes(service) ? styles.dropdownOptionActive : ""}`}
                onClick={() => toggleService(service)}
              >
                <span>{service}</span>
                {selectedServices.includes(service) && (
                  <CheckCircle2 size={16} className={styles.dropdownCheck} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div
        className={`${styles.filterDropdownWrapper} ${activeModal && activeModal !== "availability" ? styles.blurred : ""}`}
      >
        <div
          className={`${styles.filterItem} ${activeModal === "availability" ? styles.filterItemActive : ""}`}
          onClick={() =>
            setActiveModal(
              activeModal === "availability" ? null : "availability",
            )
          }
        >
          <div className={styles.filterLeft}>
            <div className={styles.filterItemIcon}>
              <Clock size={18} />
            </div>
            <div className={styles.filterItemContent}>
              <span className={styles.filterLabel}>Availability</span>
              <span className={styles.filterValue}>{selectedAvailability}</span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${activeModal === "availability" ? styles.chevronOpen : ""}`}
          />
        </div>
        {activeModal === "availability" && (
          <div className={styles.filterDropdown}>
            {["Open Now", "Any Time"].map((avail) => (
              <div
                key={avail}
                className={`${styles.dropdownOption} ${selectedAvailability === avail ? styles.dropdownOptionActive : ""}`}
                onClick={() => {
                  setSelectedAvailability(avail);
                  setActiveModal(null);
                }}
              >
                <span>{avail}</span>
                {selectedAvailability === avail && (
                  <CheckCircle2 size={16} className={styles.dropdownCheck} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Distance Filter */}
      <div
        className={`${styles.filterDropdownWrapper} ${activeModal && activeModal !== "distance" ? styles.blurred : ""}`}
      >
        <div
          className={`${styles.filterItem} ${activeModal === "distance" ? styles.filterItemActive : ""}`}
          onClick={() =>
            setActiveModal(activeModal === "distance" ? null : "distance")
          }
        >
          <div className={styles.filterLeft}>
            <div className={styles.filterItemIcon}>
              <MapPin size={18} />
            </div>
            <div className={styles.filterItemContent}>
              <span className={styles.filterLabel}>Distance</span>
              <span className={styles.filterValue}>{selectedDistance}</span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${activeModal === "distance" ? styles.chevronOpen : ""}`}
          />
        </div>
        {activeModal === "distance" && (
          <div className={`${styles.filterDropdown} ${styles.dropdownUp}`}>
            {distances.map((distance) => (
              <div
                key={distance}
                className={`${styles.dropdownOption} ${selectedDistance === distance ? styles.dropdownOptionActive : ""}`}
                onClick={() => {
                  setSelectedDistance(distance);
                  setActiveModal(null);
                }}
              >
                <span>{distance}</span>
                {selectedDistance === distance && (
                  <CheckCircle2 size={16} className={styles.dropdownCheck} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div
        className={`${styles.filterDropdownWrapper} ${activeModal && activeModal !== "sort" ? styles.blurred : ""}`}
      >
        <div
          className={`${styles.filterItem} ${activeModal === "sort" ? styles.filterItemActive : ""}`}
          onClick={() => setActiveModal(activeModal === "sort" ? null : "sort")}
        >
          <div className={styles.filterLeft}>
            <div className={styles.filterItemIcon}>
              <SlidersHorizontal size={18} />
            </div>
            <div className={styles.filterItemContent}>
              <span className={styles.filterLabel}>Sort By</span>
              <span className={styles.filterValue}>{selectedSort}</span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${activeModal === "sort" ? styles.chevronOpen : ""}`}
          />
        </div>
        {activeModal === "sort" && (
          <div className={`${styles.filterDropdown} ${styles.dropdownUp}`}>
            {sorts.map((sort) => (
              <div
                key={sort}
                className={`${styles.dropdownOption} ${selectedSort === sort ? styles.dropdownOptionActive : ""}`}
                onClick={() => {
                  setSelectedSort(sort);
                  setActiveModal(null);
                }}
              >
                <span>{sort}</span>
                {selectedSort === sort && (
                  <CheckCircle2 size={16} className={styles.dropdownCheck} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[var(--ground)] min-h-screen text-[var(--ink)]">
      <Navbar />
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.header}
          >
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

            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search by city, locality or pincode..."
                />
              </div>
              <button
                type="button"
                className={styles.mobileFilterBtn}
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.filtersGrid}
            ref={desktopFiltersRef}
          >
            {renderFilters()}
          </motion.div>
        </div>

        {/* List Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.listHeader}
        >
          <div className={styles.showingText}>
            Showing{" "}
            <span className={styles.highlightText}>{stores.length}</span> Store
            {stores.length !== 1 ? "s" : ""}
          </div>
          <button className={styles.clearAllBtn}>
            <RotateCw size={14} /> Clear All
          </button>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.grid}
        >
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
                    <p className={styles.distanceInfo}>{store.radius}</p>
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
                    </>
                  ) : (
                    <>
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
                          <span className={styles.timeInfoLabel}>Open</span>
                          <span className={styles.timeInfoVal}>
                            {store.openHours}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Actions Row */}
                <div className={styles.actionsRow}>
                  <Link
                    href="/pricing"
                    className={styles.btnPrimary}
                    style={{ textDecoration: "none" }}
                  >
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
                  </Link>
                  <button className={styles.btnOutline}>
                    <Navigation size={14} /> Get Directions
                  </button>
                  <a
                    href="tel:7078497263"
                    className={styles.btnOutline}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={14} /> Call Store
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <FilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filters"
      >
        <div className={styles.mobileFiltersContainer} ref={mobileFiltersRef}>
          {renderFilters()}
        </div>
      </FilterModal>

      <Footer />
    </div>
  );
}
