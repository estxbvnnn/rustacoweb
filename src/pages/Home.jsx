import React from "react";
import "../assets/styles.css";
import "../assets/home-dark.css";

import logoNuevo from "../assets/img/logonuevo.png";
import lootroomTextLogo from "../assets/img/lootroomlogo.png";
import syvarLogo from "../assets/img/syvarlogo.png";
import rustypotTextLogo from "../assets/img/rustypotlogo.png";

const sponsorLogos = [
  { src: lootroomTextLogo, alt: "Lootroom", width: 170 },
  { src: rustypotTextLogo, alt: "Rustypot", width: 150 },
  { src: syvarLogo, alt: "Syvar", width: 150 },
];

export default function Home() {
  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  return (
    <div
      className="home-dark has-video-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1vh 0 2vh",
        gap: "1vh",
      }}
    >
      <main
        className="home-hero"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.4rem",
          paddingTop: 0,
        }}
      >
        <img
          className="home-hero-logo"
          src={logoNuevo}
          alt="Rustaco"
          style={{ width: "min(72vw, 520px)" }}
        />
        <p
          style={{
            margin: 0,
            fontSize: "1.6rem",
            fontWeight: 900,
            letterSpacing: "8px",
            textTransform: "uppercase",
            color: "#ffffffeb",
            textShadow: "0 8px 30px rgba(0,0,0,0.8)",
          }}
        >
          Soon...
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginTop: "3.6rem",
          }}
        >
          {sponsorLogos.map(({ src, alt, width }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              style={{ width, height: "auto", objectFit: "contain" }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}