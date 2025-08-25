import "./HostelCard.css";

export default function HostelCard({ hostel }: { hostel: any }) {
  return (
    <div className="hostel-card">
      <h2>{hostel.name}</h2>
      <p>{hostel.address}</p>
      <p className="phone">📞 {hostel.phone}</p>
      <button>View Details</button>
    </div>
  );
}
