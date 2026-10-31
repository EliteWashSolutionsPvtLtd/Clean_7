

// // import type { Metadata } from "next";
// // import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
// // import "./globals.css";
// // import LenisProvider from "./components/LenisProvider";
// // import RoutePrefetch from "./components/RoutePrefetch";
// // import { ThemeProvider } from "./components/ThemeProvider";
// // import StoreProvider from "@/redux/StoreProvider";
// // import WhatsAppButton from "./components/WhatsAppButton";
// // import {
// //   getSiteUrl,
// //   SITE_DESCRIPTION,
// //   SITE_KEYWORDS,
// //   SITE_NAME,
// // } from "./lib/site-config";
// // import CustomCursor from "./utils/CustomCursor";
// // import InstagramAppButton from "./components/InstagramAppButton";
// // import FacebookButton from "./components/FacebookButton";
// // import SocialMediaButton from "./components/SocialMediaButton";

// // const inter = Inter({
// //   variable: "--font-inter",
// //   subsets: ["latin"],
// // });

// // const jakarta = Plus_Jakarta_Sans({
// //   variable: "--font-heading",
// //   subsets: ["latin"],
// //   weight: ["500", "600", "700", "800"],
// // });

// // const fraunces = Fraunces({
// //   variable: "--font-fraunces",
// //   subsets: ["latin"],
// //   axes: ["opsz"],
// //   style: ["normal", "italic"],
// // });

// // const siteUrl = getSiteUrl();

// // export const metadata: Metadata = {
// //   metadataBase: new URL(siteUrl),
// //   title: {
// //     default: `Clean7`,
// //     template: `%s | Clean7`,
// //   },
// //   description: SITE_DESCRIPTION,
// //   keywords: SITE_KEYWORDS,
// //   applicationName: SITE_NAME,
// //   authors: [{ name: SITE_NAME, url: siteUrl }],
// //   creator: SITE_NAME,
// //   publisher: SITE_NAME,
// //   formatDetection: {
// //     email: false,
// //     address: false,
// //     telephone: false,
// //   },
// //   openGraph: {
// //     type: "website",
// //     locale: "en_IN",
// //     url: "/",
// //     siteName: SITE_NAME,
// //     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
// //     description: SITE_DESCRIPTION,
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
// //     description: SITE_DESCRIPTION,
// //   },
// //   robots: {
// //     index: true,
// //     follow: true,
// //     googleBot: {
// //       index: true,
// //       follow: true,
// //       "max-video-preview": -1,
// //       "max-image-preview": "large",
// //       "max-snippet": -1,
// //     },
// //   },
// //   category: "business",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en-IN" suppressHydrationWarning>
// //       <body
// //         className={`${inter.variable} ${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
// //       >
// //         <StoreProvider>
// //           <ThemeProvider
// //             attribute="class"
// //             defaultTheme="system"
// //             enableSystem
// //           >
// //             <CustomCursor />

// //             <LenisProvider>
// //               <RoutePrefetch />
// //               {children}
// //               {/* <FacebookButton />
// //               <InstagramAppButton />
// //               <WhatsAppButton /> */}
// //               <SocialMediaButton />
// //             </LenisProvider>
// //           </ThemeProvider>
// //         </StoreProvider>
// //       </body>
// //     </html>
// //   );
// // }


// import type { Metadata } from "next";
// import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
// import "./globals.css";
// import LenisProvider from "./components/LenisProvider";
// import RoutePrefetch from "./components/RoutePrefetch";
// import { ThemeProvider } from "./components/ThemeProvider";
// import StoreProvider from "@/redux/StoreProvider";
// import WhatsAppButton from "./components/WhatsAppButton";
// import {
//   getSiteUrl,
//   SITE_DESCRIPTION,
//   SITE_KEYWORDS,
//   SITE_NAME,
// } from "./lib/site-config";
// import CustomCursor from "./utils/CustomCursor";
// import InstagramAppButton from "./components/InstagramAppButton";
// import FacebookButton from "./components/FacebookButton";
// import SocialMediaButton from "./components/SocialMediaButton";
// import CartButton from "./components/cart/CartButton";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// const jakarta = Plus_Jakarta_Sans({
//   variable: "--font-heading",
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
// });

// const fraunces = Fraunces({
//   variable: "--font-fraunces",
//   subsets: ["latin"],
//   axes: ["opsz"],
//   style: ["normal", "italic"],
// });

// const siteUrl = getSiteUrl();

// export const metadata: Metadata = {
//   metadataBase: new URL(siteUrl),
//   title: {
//     default: `Clean7`,
//     template: `%s | Clean7`,
//   },
//   description: SITE_DESCRIPTION,
//   keywords: SITE_KEYWORDS,
//   applicationName: SITE_NAME,
//   authors: [{ name: SITE_NAME, url: siteUrl }],
//   creator: SITE_NAME,
//   publisher: SITE_NAME,
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "/",
//     siteName: SITE_NAME,
//     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
//     description: SITE_DESCRIPTION,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
//     description: SITE_DESCRIPTION,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   category: "business",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en-IN" suppressHydrationWarning>
//       <body
//         className={`${inter.variable} ${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
//       >
//         <StoreProvider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//           >
//             <CustomCursor />

//             <LenisProvider>
//               <RoutePrefetch />
//               {children}
//               {/* <FacebookButton />
//               <InstagramAppButton />
//               <WhatsAppButton /> */}
//               <SocialMediaButton />
//               <CartButton />
//             </LenisProvider>
//           </ThemeProvider>
//         </StoreProvider>
//       </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
// import "./globals.css";
// import LenisProvider from "./components/LenisProvider";
// import RoutePrefetch from "./components/RoutePrefetch";
// import { ThemeProvider } from "./components/ThemeProvider";
// import StoreProvider from "@/redux/StoreProvider";
// import WhatsAppButton from "./components/WhatsAppButton";
// import {
//   getSiteUrl,
//   SITE_DESCRIPTION,
//   SITE_KEYWORDS,
//   SITE_NAME,
// } from "./lib/site-config";
// // import InstagramAppButton from "./components/InstagramAppButton";
// import FacebookButton from "./components/FacebookButton";
// import SocialMediaButton from "./components/SocialMediaButton";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// const jakarta = Plus_Jakarta_Sans({
//   variable: "--font-heading",
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
// });

// const fraunces = Fraunces({
//   variable: "--font-fraunces",
//   subsets: ["latin"],
//   axes: ["opsz"],
//   style: ["normal", "italic"],
// });

// const siteUrl = getSiteUrl();

// export const metadata: Metadata = {
//   metadataBase: new URL(siteUrl),
//   title: {
//     default: `Clean7`,
//     template: `%s | Clean7`,
//   },
//   description: SITE_DESCRIPTION,
//   keywords: SITE_KEYWORDS,
//   applicationName: SITE_NAME,
//   authors: [{ name: SITE_NAME, url: siteUrl }],
//   creator: SITE_NAME,
//   publisher: SITE_NAME,
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "/",
//     siteName: SITE_NAME,
//     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
//     description: SITE_DESCRIPTION,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
//     description: SITE_DESCRIPTION,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   category: "business",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en-IN" suppressHydrationWarning>
//       <body
//         className={`${inter.variable} ${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
//       >
//         <StoreProvider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//           >
//             <CustomCursor />

//             <LenisProvider>
//               <RoutePrefetch />
//               {children}
//               {/* <FacebookButton />
//               <InstagramAppButton />
//               <WhatsAppButton /> */}
//               <SocialMediaButton />
//             </LenisProvider>
//           </ThemeProvider>
//         </StoreProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import RoutePrefetch from "./components/RoutePrefetch";
import { ThemeProvider } from "./components/ThemeProvider";
import StoreProvider from "@/redux/StoreProvider";
import WhatsAppButton from "./components/WhatsAppButton";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
} from "./lib/site-config";
import InstagramAppButton from "./components/InstagramAppButton";
import FacebookButton from "./components/FacebookButton";
import SocialMediaButton from "./components/SocialMediaButton";
import CartButton from "./components/cart/CartButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Clean7`,
    template: `%s | Clean7`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Laundry, dry cleaning & pickup delivery`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >

            <LenisProvider>
              <RoutePrefetch />
              {children}
              {/* <FacebookButton />
              <InstagramAppButton />
              <WhatsAppButton /> */}
              <SocialMediaButton />
              <CartButton />
            </LenisProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}