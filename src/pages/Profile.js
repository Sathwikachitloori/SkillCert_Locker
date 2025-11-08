import React, { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", profession: "", bio: "", skills: [], avatar: null });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile")) || JSON.parse(localStorage.getItem("user")) || profile;
    setProfile(saved);
  }, []);

  useEffect(() => {
    // keep localStorage user in sync
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("user", JSON.stringify({ name: profile.name, email: profile.email, profession: profile.profession, bio: profile.bio, skills: profile.skills, avatar: profile.avatar }));
  }, [profile]);

  const handleAvatar = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ ...profile, avatar: reader.result });
    };
    reader.readAsDataURL(f);
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    const val = e.target.elements.skill.value.trim();
    if (!val) return;
    setProfile({ ...profile, skills: [...(profile.skills || []), val] });
    e.target.reset();
  };

  const removeSkill = (s) => {
    setProfile({ ...profile, skills: profile.skills.filter(x => x !== s) });
  };

  const downloadProfile = () => {
    const data = JSON.stringify(profile, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(profile.name || "profile").replace(/\s+/g,'_')}_profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Profile</h2>

      <div className="profile-grid">
        <div className="card">
          <div style={{ textAlign: "center" }}>
            {profile.avatar ? <img src={profile.avatar} alt="avatar" className="avatar" /> : <div style={{ width: 180, height: 180, borderRadius: 12, background: "#eef2ff", display: "inline-block" }} />}
            <div style={{ marginTop: 12 }}>
              <input type="file" onChange={handleAvatar} />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={downloadProfile}>Download Profile</button>
          </div>
        </div>

        <div className="card">
          <label style={{ display: "block", marginBottom: 8 }}>Full name</label>
          <input type="text" value={profile.name || ""} onChange={(e)=>setProfile({ ...profile, name: e.target.value })} />

          <label style={{ display: "block", marginTop: 10 }}>Email</label>
          <input type="text" value={profile.email || ""} onChange={(e)=>setProfile({ ...profile, email: e.target.value })} />

          <label style={{ display: "block", marginTop: 10 }}>Profession</label>
          <input type="text" value={profile.profession || ""} onChange={(e)=>setProfile({ ...profile, profession: e.target.value })} />

          <label style={{ display: "block", marginTop: 10 }}>Bio</label>
          <textarea value={profile.bio || ""} onChange={(e)=>setProfile({ ...profile, bio: e.target.value })} />

          <div style={{ marginTop: 12 }}>
            <form onSubmit={handleSkillAdd}>
              <input name="skill" placeholder="Add a skill (press Add)" />
              <button className="btn" style={{ marginLeft: 8 }}>Add</button>
            </form>

            <div style={{ marginTop: 8 }}>
              {(profile.skills || []).map((s, i) => (
                <span key={i} style={{ display: "inline-block", padding: "6px 10px", marginRight: 8, marginBottom: 8, background: "#eef2ff", borderRadius: 8 }}>
                  {s} <button onClick={() => removeSkill(s)} style={{ marginLeft: 8, border: "none", background: "transparent", cursor: "pointer" }}>✕</button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <button className="btn" onClick={() => alert("Profile saved")}>Save</button>
            <button className="btn secondary" style={{ marginLeft: 8 }} onClick={() => { localStorage.removeItem("profile"); alert("Profile reset"); setProfile({ name: "", email: "", profession: "", bio: "", skills: [], avatar: null }); }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
