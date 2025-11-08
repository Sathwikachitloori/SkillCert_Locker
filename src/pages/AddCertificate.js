import React from "react";
import { useNavigate } from "react-router-dom";
import AddCertificateForm from "../components/AddCertificateForm";

export default function AddCertificate() {
  const navigate = useNavigate();

  const handleAdd = (cert) => {
    const saved = JSON.parse(localStorage.getItem("certificates")) || [];
    const updated = [...saved, cert];
    localStorage.setItem("certificates", JSON.stringify(updated));
    alert("Certificate saved");
    navigate("/certificates");
  };

  return (
    <div>
      <h2>Add Certificate</h2>
      <AddCertificateForm onAdd={handleAdd} />
    </div>
  );
}
