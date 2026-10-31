// "use client";

// import { use, useMemo } from "react";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import BookingShell from "@/app/components/booking/BookingShell";
// import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
// import { useServiceCategories } from "@/app/hooks/useServiceCategories";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { isListBooking } from "@/app/lib/booking";
// import { useGetServicesQuery } from "@/redux/api/catalogApi";
// import ItemListBooking from "./ItemListBooking";
// import ServicePicker from "./ServicePicker";

// export default function BookCategoryPage({
//   params,
// }: {
//   params: Promise<{ category: string }>;
// }) {
//   const { category: slug } = use(params);
//   const { allowed } = useRequireAuth();
//   const { categories, isLoading: catsLoading } = useServiceCategories();
//   const {
//     data,
//     isLoading: servicesLoading,
//     isError,
//   } = useGetServicesQuery(undefined, { skip: !allowed });

//   const category = categories.find((c) => c.slug === slug);

//   const services = useMemo(() => {
//     const list = data?.data;
//     if (isError || !Array.isArray(list)) return [];
//     return list
//       .filter((s) => s.category?.slug === slug)
//       .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
//   }, [data, isError, slug]);

//   const variant = isListBooking(slug) ? "list" : "cards";
//   const loading = !allowed || catsLoading || servicesLoading;

//   return (
//     <BookingShell>
//       <Link
//         href="/services"
//         className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
//       >
//         <ArrowLeft size={16} />
//         All services
//       </Link>

//       {loading ? (
//         <PageSkeleton variant={variant} />
//       ) : !category ? (
//         <div className="py-16 text-center">
//           <h2
//             className="text-[28px]"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             Service category not found
//           </h2>
//           <p className="mt-3 text-[var(--ink-soft)]">
//             Please pick a category from our services page.
//           </p>
//         </div>
//       ) : variant === "list" ? (
//         <ItemListBooking
//           categorySlug={slug}
//           title={category.cardTitle}
//           subtitle={category.teaser || category.description}
//           services={services}
//         />
//       ) : (
//         <ServicePicker
//           categorySlug={slug}
//           title={category.cardTitle}
//           services={services}
//         />
//       )}
//     </BookingShell>
//   );
// }


"use client";

import { use, useMemo } from "react";
import BackLink from "@/app/components/ui/BackLink";
import { ArrowLeft } from "lucide-react";
import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import { useServiceCategories } from "@/app/hooks/useServiceCategories";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { isListBooking } from "@/app/lib/booking";
import { useGetServicesQuery } from "@/redux/api/catalogApi";
import ItemListBooking from "./ItemListBooking";
import ServicePicker from "./ServicePicker";

export default function BookCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = use(params);
  const { allowed } = useRequireAuth();
  const { categories, isLoading: catsLoading } = useServiceCategories();
  const {
    data,
    isLoading: servicesLoading,
    isError,
  } = useGetServicesQuery(undefined, { skip: !allowed });

  const category = categories.find((c) => c.slug === slug);

  const services = useMemo(() => {
    const list = data?.data;
    if (isError || !Array.isArray(list)) return [];
    return list
      .filter((s) => s.category?.slug === slug)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [data, isError, slug]);

  const variant = isListBooking(slug) ? "list" : "cards";
  const loading = !allowed || catsLoading || servicesLoading;

  return (
    <BookingShell>
      <BackLink
        fallback="/services"
        className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} />
        Back
      </BackLink>

      {loading ? (
        <PageSkeleton variant={variant} />
      ) : !category ? (
        <div className="py-16 text-center">
          <h2
            className="text-[28px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Service category not found
          </h2>
          <p className="mt-3 text-[var(--ink-soft)]">
            Please pick a category from our services page.
          </p>
        </div>
      ) : variant === "list" ? (
        <ItemListBooking
          categorySlug={slug}
          title={category.cardTitle}
          subtitle={category.teaser || category.description}
          services={services}
        />
      ) : (
        <ServicePicker
          categorySlug={slug}
          title={category.cardTitle}
          services={services}
        />
      )}
    </BookingShell>
  );
}