import React, { useState, useEffect } from "react";

const famousByProfession = {
  developer: [
    { name: "AWS Certified Developer", org: "Amazon" },
    { name: "Google Associate Android Developer", org: "Google" },
    { name: "Microsoft Certified: Azure Developer", org: "Microsoft" },
  ],
  data: [
    { name: "Google Data Analytics", org: "Google" },
    { name: "IBM Data Science Professional", org: "IBM" },
    { name: "Microsoft Certified: Data Scientist", org: "Microsoft" },
  ],
  cloud: [
    { name: "AWS Solutions Architect", org: "Amazon" },
    { name: "Google Cloud Professional", org: "Google" },
  ],
  default: [
    { name: "Project Management Professional (PMP)", org: "PMI" },
    { name: "Digital Marketing Certificate", org: "Various" },
  ],
};

function AddCertificateForm({ onAdd }) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Professional");
  const [fileName, setFileName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const prof = (user && user.profession) ? user.profession.toLowerCase() : "default";
    if (prof.includes("data")) setSuggestions(famousByProfession.data);
    else if (prof.includes("cloud")) setSuggestions(famousByProfession.cloud);
    else if (prof.includes("dev") || prof.includes("developer") || prof.includes("software")) setSuggestions(famousByProfession.developer);
    else setSuggestions(famousByProfession.default);
  }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);

    // save file as base64 in memory if needed (for demo)
    const reader = new FileReader();
    reader.onload = () => {
      // store temporarily in session (Add handler will capture)
      sessionStorage.setItem("lastFileBase64", reader.result);
    };
    reader.readAsDataURL(f);
  };

  const handleSuggestion = (s) => {
    setName(s.name);
    setOrganization(s.org);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !organization || !date) {
      alert("Please fill certificate name, organization and date.");
      return;
    }
    const cert = {
      id: Date.now(),
      name,
      organization,
      date,
      category,
      fileName,
      fileBase64: sessionStorage.getItem("lastFileBase64") || null,
    };
    onAdd(cert);
    setName(""); setOrganization(""); setDate(""); setCategory("Professional"); setFileName("");
    sessionStorage.removeItem("lastFileBase64");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add New Certificate</h3>

      <div style={{ marginTop: 8 }}>
        <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Popular certificates for your profession</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {suggestions.map((s, i) => (
            <button type="button" key={i} className="btn secondary" onClick={() => handleSuggestion(s)} style={{ padding: "6px 10px", borderRadius: 8 }}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="form-row" style={{ marginTop: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Certificate name" />
        <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Issuing organization" />
      </div>

      <div className="form-row" style={{ marginTop: 12 }}>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} >
          <option>Professional</option>
          <option>Academic</option>
          <option>Short Course</option>
          <option>Other</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Upload certificate (optional)</label>
        <input type="file" onChange={handleFile} />
        {fileName && <div style={{ marginTop: 6, color: "var(--muted)" }}>{fileName}</div>}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="submit" className="btn">Save Certificate</button>
        <button type="button" className="btn secondary" onClick={() => { setName(""); setOrganization(""); setDate(""); setCategory("Professional"); setFileName(""); sessionStorage.removeItem("lastFileBase64");}}>Reset</button>
      </div>
    </form>
  );
}

export default AddCertificateForm;
