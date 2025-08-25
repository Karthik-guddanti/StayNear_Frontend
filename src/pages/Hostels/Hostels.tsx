import "./Hostels.css";

export default function Hostels() {
  return (
    <section className="hostels">
      <h2>Nearby Hostels</h2>
      <p>Discover hostels around your location with ease.</p>
      <div className="map-container">
        <iframe
          title="Google Map"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Hostels+in+Bengaluru`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </section>
  );
}
