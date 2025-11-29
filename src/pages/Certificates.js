import React, { useEffect, useState } from "react";
import "./Certificates.css";

const featuredCertificates = [
  {
  title: "AWS Cloud Practitioner",
  issuer: "Amazon Web Services",
  issuedOn: "Jan 2025",
  verified: true,
  image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
},

{
  title: "Google Data Analytics",
  issuer: "Google",
  issuedOn: "Feb 2025",
  verified: true,
  image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
},

  {
    id: 3,
    name: "Microsoft Azure Fundamentals",
    organization: "Microsoft",
    date: "Nov 2024",
    verified: false,
    image:
      "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
  },
];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("certificates")) || [];
    setCertificates(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("certificates", JSON.stringify(certificates));
  }, [certificates]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newCert = {
        id: Date.now(),
        name: file.name.split(".")[0],
        organization: "Uploaded Certificate",
        date: new Date().toLocaleDateString(),
        verified: false,
        fileBase64: reader.result,
      };
      setCertificates((prev) => [newCert, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  const toggleVerified = (id) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  const handleShare = (cert) => {
    const text = `🎓 Check out my certificate: ${cert.name} — ${cert.organization}`;
    navigator.clipboard.writeText(text);
    alert("✅ Certificate details copied to clipboard!");
  };

  const filtered =
    certificates.length > 0
      ? certificates
          .filter(
            (c) =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.organization.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sortBy === "recent") return b.id - a.id;
            if (sortBy === "oldest") return a.id - b.id;
            if (sortBy === "verified") return b.verified - a.verified;
            return 0;
          })
      : featuredCertificates;

  const totalCount = certificates.length;
  const verifiedCount = certificates.filter((c) => c.verified).length;
  const lastAdded =
    certificates.length > 0
      ? new Date(certificates[0].date).toDateString()
      : "—";

  return (
    <div className="certificates-page">
      <h1>Your Certificates</h1>

      {/* Dashboard Summary */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Certificates</h3>
          <p>{totalCount}</p>
        </div>
        <div className="stat-card">
          <h3>Last Added</h3>
          <p>{lastAdded}</p>
        </div>
        <div className="stat-card">
          <h3>Verified</h3>
          <p>{verifiedCount}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-bar">
        <label className="upload-btn">
          📤 Upload Certificate
          <input type="file" accept="image/*,application/pdf" onChange={handleUpload} hidden />
        </label>

        <input
          type="text"
          placeholder="🔍 Search certificates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="verified">Verified First</option>
        </select>
      </div>

      {/* Certificates */}
      <div className="certificates-grid">
        {filtered.map((cert) => (
          <div key={cert.id} className="certificate-card">
            <div className="image-wrapper">
              <img
                src={cert.fileBase64 || cert.image}
                alt={cert.name}
                className="certificate-image"
              />
            </div>
            <div className="certificate-info">
              <h3>{cert.name}</h3>
              <p>{cert.organization}</p>
              <p className="date">Issued on: {cert.date}</p>
            </div>
            <div className="certificate-actions">
              <button
                className={`verify-btn ${cert.verified ? "verified" : ""}`}
                onClick={() => toggleVerified(cert.id)}
              >
                {cert.verified ? "✅ Verified" : "Verify"}
              </button>
              <button className="share-btn" onClick={() => handleShare(cert)}>
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <p className="empty-text">
          Displaying featured certificates — upload yours to personalize this space.
        </p>
      )}
    </div>
  );
};

export default Certificates;
