function HeroSun() {
  return (
    <svg
      className="hero-sun-svg"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="60%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#F9A825" />
        </radialGradient>
      </defs>

      {/* Halo */}
      <circle
        cx="100"
        cy="100"
        r="58"
        fill="rgba(255,213,79,0.20)"
      />

      {/* Rayos */}
      <g
        stroke="#F9A825"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <line x1="100" y1="12" x2="100" y2="35" />
        <line x1="100" y1="165" x2="100" y2="188" />

        <line x1="12" y1="100" x2="35" y2="100" />
        <line x1="165" y1="100" x2="188" y2="100" />

        <line x1="35" y1="35" x2="52" y2="52" />
        <line x1="148" y1="148" x2="165" y2="165" />

        <line x1="35" y1="165" x2="52" y2="148" />
        <line x1="148" y1="52" x2="165" y2="35" />
      </g>

      {/* Sol */}
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="url(#sunGradient)"
      />
    </svg>
  );
}

export default HeroSun;