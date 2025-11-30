import React, { useEffect, useState } from "react";
import "./Certificates.css";

const featuredCertificates = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuedOn: "Jan 2025",
    verified: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google",
    issuedOn: "Feb 2025",
    verified: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
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

  // editing state
  const [editing, setEditing] = useState(null); // id of cert being edited
  const [editName, setEditName] = useState("");
  const [editOrg, setEditOrg] = useState("");

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

  // DELETE: remove certificate by id
  const deleteCert = (id) => {
    if (!id) {
      // if certificate has no id (featured), do nothing
      alert("Cannot delete a featured certificate.");
      return;
    }
    // Optional: confirm
    const ok = window.confirm("Delete this certificate? This action cannot be undone.");
    if (!ok) return;

    setCertificates((prev) => prev.filter((c) => c.id !== id));
    // if currently editing this item, cancel edit
    if (editing === id) {
      setEditing(null);
    }
  };

  // EDIT: start edit mode for a certificate
  const startEdit = (cert) => {
    if (!cert.id) {
      alert("Cannot edit a featured certificate.");
      return;
    }
    setEditing(cert.id);
    setEditName(cert.name || "");
    setEditOrg(cert.organization || "");
  };

  const saveEdit = (id) => {
    if (!id) return;
    // minimal validation
    if (!editName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName.trim(), organization: editOrg.trim() } : c))
    );
    setEditing(null);
  };

  const cancelEdit = () => {
    setEditing(null);
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

      <div className="controls-bar">
        <label className="upload-btn">
          📤 Upload Certificate
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleUpload}
            hidden
          />
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

      <div className="certificates-grid">
        {filtered.map((cert) => (
          <div key={cert.id ?? cert.title ?? Math.random()} className="certificate-card">
            <div className="image-wrapper">
              <img
                src={cert.fileBase64 || cert.image}
                alt={cert.name || cert.title}
                className="certificate-image"
              />
            </div>

            {/* if in edit mode for this cert, show inputs */}
            {editing === cert.id ? (
              <div className="certificate-info">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Certificate name"
                />
                <input
                  value={editOrg}
                  onChange={(e) => setEditOrg(e.target.value)}
                  placeholder="Organization"
                />
                <div className="edit-actions">
                  <button className="save-btn" onClick={() => saveEdit(cert.id)}>
                    💾 Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="certificate-info">
                <h3>{cert.name || cert.title}</h3>
                <p>{cert.organization || cert.issuer}</p>
                <p className="date">Issued on: {cert.date || cert.issuedOn}</p>
              </div>
            )}

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

              {/* Edit and Delete buttons (now functional for user-uploaded items) */}
              <button className="edit-btn" onClick={() => startEdit(cert)}>
                ✏ Edit
              </button>

              <button className="delete-btn" onClick={() => deleteCert(cert.id)}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <p className="empty-text">
          Displaying featured certificates — upload yours to personalize this
          space.
        </p>
      )}
    </div>
  );
};

export default Certificates;
