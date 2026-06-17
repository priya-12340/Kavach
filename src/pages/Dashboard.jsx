import React, { useEffect, useState } from "react";
import SOSButton from "../components/SOSButton";
import Toast from "../components/Toast";
import Chatbot from "../components/Chatbot";
import Notifications from "../components/Notifications";
import ProfileDrawer from "../components/ProfileDrawer";
import SafeJourney from "../components/SafeJourney";
import BottomNav from "../components/BottomNav";
import VoiceActivation from "../components/VoiceActivation";
import AnonymousReport from "../components/AnonymousReport";
import Helplines from "../components/Helplines";
import EvidenceVault from "../components/EvidenceVault";

function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [userName, setUserName] = useState("User");
  const [toast, setToast] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSafeJourney, setShowSafeJourney] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showVoice, setShowVoice] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showHelplines, setShowHelplines] = useState(false);
  const [showVault, setShowVault] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kavach_user") || "{}");
    if (user.name) setUserName(user.name);

    function updateDateTime() {
      const now = new Date();
      const hours = now.getHours();
      if (hours < 12) setGreeting("🌅 Good Morning");
      else if (hours < 17) setGreeting("☀️ Good Afternoon");
      else if (hours < 20) setGreeting("🌤️ Good Evening");
      else setGreeting("🌙 Good Night");

      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      );
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === "journey") {
      setShowSafeJourney(true);
      setActiveTab("home");
    }
    if (activeTab === "report") {
      setShowReport(true);
      setActiveTab("home");
    }
    if (activeTab === "helplines") {
      setShowHelplines(true);
      setActiveTab("home");
    }
    if (activeTab === "profile") {
      setShowProfile(true);
      setActiveTab("home");
    }
  }, [activeTab]);

  return (
    <div
      className="dashboard"
      style={{ display: "block", paddingBottom: "80px" }}
    >
      {/* TOP NAV */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px 8px",
          background: "white",
        }}
      >
        <div
          style={{ fontSize: "22px", color: "#555", cursor: "pointer" }}
          onClick={() => setShowProfile(true)}
        >
          ☰
        </div>
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowNotif(true)}
        >
          <span style={{ fontSize: "24px" }}>🔔</span>
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              background: "#ff6b6b",
              color: "white",
              fontSize: "9px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
            }}
          >
            2
          </span>
        </div>
      </div>

      {/* GREETING CARD */}
      <div className="greeting-card">
        <div className="greeting-left">
          <div className="greeting-text">{greeting}</div>
          <div className="user-name-greeting">{userName}</div>
          <div className="date-time">
            <span>{dateStr}</span>
            <span>{timeStr}</span>
          </div>
        </div>
       
       <img src="/Images/kavachLogo.png" alt="logo" className="greeting-logo" />

      </div>

      {/* STATUS BAR */}
      <div className="status-bar">🟢 You are safe · Location sharing ON</div>

      <SOSButton />

      {/* FEATURE GRID */}
      <div className="feature-grid">
        <div className="feature-card" onClick={() => setShowSafeJourney(true)}>
          🛡️
          <br />
          Safe Journey
        </div>
        <div className="feature-card" onClick={() => setShowVoice(true)}>
          🎤
          <br />
          Voice Alert
        </div>
        <div className="feature-card" onClick={() => setShowReport(true)}>
          📝
          <br />
          Report
        </div>
        <div className="feature-card" onClick={() => setShowHelplines(true)}>
          📞
          <br />
          Helplines
        </div>
        <div className="feature-card" onClick={() => setShowVault(true)}>
          ☁️
          <br />
          Evidence Vault
        </div>
        <div className="feature-card">
          🤖
          <br />
          AI Chatbot
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Chatbot />
      {showNotif && <Notifications onClose={() => setShowNotif(false)} />}
      {showProfile && <ProfileDrawer onClose={() => setShowProfile(false)} />}
      {showSafeJourney && (
        <SafeJourney onClose={() => setShowSafeJourney(false)} />
      )}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {showVoice && (
        <VoiceActivation
          onClose={() => setShowVoice(false)}
          onSOSTrigger={() => {}}
        />
      )}
      {showReport && <AnonymousReport onClose={() => setShowReport(false)} />}
      {showHelplines && <Helplines onClose={() => setShowHelplines(false)} />}
      {showVault && <EvidenceVault onClose={() => setShowVault(false)} />}
    </div>
  );
}

export default Dashboard;
