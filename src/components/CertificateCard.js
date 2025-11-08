import React, { useState, useEffect } from "react";

function downloadJSON(cert) {
  const data = JSON.stringify(cert, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${cert.name.replace(/\s+/g, "_")}_certificate.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function CertificateCard({ cert, onDelete }) {
  const [verified, setVerified] = useState(cert.verified || false);

  // Save verification state to localStorage so it persists
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("certificates")) || [];
    const updated = stored.map((c) =>
      c.id === cert.id ? { ...c, verified } : c
    );
    localStorage.setItem("certificates", JSON.stringify(updated));
  }, [verified, cert.id]);

  const handleVerify = () => {
    setVerified(true);
    alert(`✅ ${cert.name} has been verified successfully!`);
  };

  const handleShare = () => {
    const shareText = `🏅 I’ve earned the ${cert.name} certificate from ${cert.organization}!`;
    const shareUrl = window.location.href;
    const fullText = `${shareText}\n${shareUrl}`;
    if (navigator.share) {
      navigator.share({ title: "My Certificate", text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(fullText);
      alert("Link copied! You can share it anywhere 🌐");
    }
  };

  return (
    <div className="cert-card">
      <h4>{cert.name}</h4>
      <p>Issued by: {cert.organization}</p>
      <p>Date: {cert.date}</p>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>{cert.category}</p>

      {verified ? (
        <p className="verified-tag">✅ Verified</p>
      ) : (
        <button className="btn verify" onClick={handleVerify}>
          Verify
        </button>
      )}

      <div className="cert-actions">
        <button className="btn" onClick={() => downloadJSON(cert)}>
          Download
        </button>
        <button className="btn secondary" onClick={handleShare}>
          Share
        </button>
        <button
          className="btn danger"
          onClick={() => {
            if (window.confirm("Delete this certificate?")) onDelete(cert.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CertificateCard;
