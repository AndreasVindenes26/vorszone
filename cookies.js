// ====== DIN GOOGLE ANALYTICS ID ======
const GA_ID = "G-R1YDY56CYZ";

// ====== START ANALYTICS (kun etter samtykke) ======
function startAnalytics() {
  if (window.analyticsStartet) return;
  window.analyticsStartet = true;

  // Last inn Google script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(script);

  // Setup gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", GA_ID, {
    'anonymize_ip': true
  });
}

// ====== SJEKK OM BRUKER HAR GODTATT FØR ======
if (localStorage.getItem("cookieValg") === "godtatt") {
  startAnalytics();
}

// ====== VIS COOKIE BANNER ======
document.addEventListener("DOMContentLoaded", function () {

  if (localStorage.getItem("cookieValg")) return;

  const banner = document.createElement("div");
  banner.id = "cookieBanner";

  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      max-width: 420px;
      margin: auto;
      background: rgba(15,15,20,0.96);
      color: white;
      padding: 18px;
      border-radius: 20px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      box-shadow: 0 10px 35px rgba(0,0,0,0.4);
    ">
      <p style="font-size:14px; margin-bottom:12px; line-height:1.4;">
        Vi bruker analyse (Google Analytics) for å forbedre siden.
        Hvis du avslår, lagrer vi ikke data.
      </p>

      <div style="display:flex; gap:10px;">
        <button onclick="godtaCookies()" style="
          flex:1;
          padding:10px;
          border:none;
          border-radius:999px;
          background:#8b5cf6;
          color:white;
          font-weight:bold;
          cursor:pointer;
        ">
          Godta
        </button>

        <button onclick="avslåCookies()" style="
          flex:1;
          padding:10px;
          border:none;
          border-radius:999px;
          background:#333;
          color:white;
          font-weight:bold;
          cursor:pointer;
        ">
          Avslå
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);
});

// ====== KNAPPER ======

function godtaCookies() {
  localStorage.setItem("cookieValg", "godtatt");
  startAnalytics();

  const banner = document.getElementById("cookieBanner");
  if (banner) banner.remove();
}

function avslåCookies() {
  localStorage.setItem("cookieValg", "avslatt");

  const banner = document.getElementById("cookieBanner");
  if (banner) banner.remove();
}