import type { Metadata } from "next";
import ProfileView from "./ProfileView";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Clean7 account, preferences and support options.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileView />;
}
