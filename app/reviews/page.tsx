import { Metadata } from "next";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read what our customers have to say about Clean7's laundry and dry cleaning services.",
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
