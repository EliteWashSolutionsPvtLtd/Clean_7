function TestimonialItem({
  image,
  message,
  name,
  rating,
}: {
  image: string;
  message: string;
  name: string;
  rating: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={image} alt={name} />
      <p>{message}</p>
      <p>{name}</p>
      <p>{rating}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div>
      <h1>Customer Testimonials</h1>
      <h2>What Our Customers Are Saying</h2>
      <p>
        Real stories from our satisfied customers who trust us with their
        laundry and love the results.
      </p>

      {/* Horizontally Scrollable Testimonials */}
      <div></div>
    </div>
  );
}
