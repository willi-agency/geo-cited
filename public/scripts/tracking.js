const TRACKING_KEY = "tracking_data";
const EXPIRATION_DAYS = 30;

function generateId() {
  return "trk_" + (crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11) + Date.now());
}

function normalizeReferrer() {
  const ref = document.referrer || "";
  if (!ref) return "direct";

  const lowerRef = ref.toLowerCase();
  if (lowerRef.includes("google.")) return "google_organic";
  if (lowerRef.includes("bing.")) return "bing_organic";
  if (lowerRef.includes("instagram.")) return "instagram_referral";
  if (lowerRef.includes("facebook.")) return "facebook_referral";
  if (lowerRef.includes("l.instagram.com") || lowerRef.includes("linktr.ee")) return "linktree_referral";

  try {
    return new URL(ref).hostname;
  } catch {
    return "direct";
  }
}

function normalizeSource(params) {
  if (params.get("gclid")) return "google_ads";
  if (params.get("fbclid")) return "facebook_ads";
  return params.get("utm_source")?.toLowerCase() || normalizeReferrer();
}

function saveTracking(data) {
  const expiresAt = data.expiresAt || new Date(Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  localStorage.setItem(TRACKING_KEY, JSON.stringify({ ...data, expiresAt }));
  console.log("Tracking salvo:", { ...data, expiresAt });
}

function getTracking() {
  const raw = localStorage.getItem(TRACKING_KEY);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    if (new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem(TRACKING_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function initTracking() {
  const params = new URLSearchParams(window.location.search);
  const existing = getTracking();
  const trackingId = existing?.trackingId || generateId();

  const utmData = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith("utm_")) {
      utmData[key] = value;
    }
  }

  const newData = {
    trackingId,
    ...utmData,
    gclid: params.get("gclid") || existing?.gclid || null,
    fbclid: params.get("fbclid") || existing?.fbclid || null,
    source: normalizeSource(params) || existing?.source || "direct",
    referrer: document.referrer || "direct",
    referrer_source: normalizeReferrer(),
    firstVisit: existing?.firstVisit || new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    expiresAt: existing?.expiresAt,
  };

  const { trackingId: _, expiresAt: __, ...restExisting } = existing || {};
  const { trackingId: ___, expiresAt: ____, ...restNew } = newData;

  if (!existing || JSON.stringify(restExisting) !== JSON.stringify(restNew)) {
    saveTracking(newData);
  }

  // Inicializa eventos
  document.querySelectorAll("[data-willi-event]").forEach(el => {
    const eventName = el.getAttribute("data-willi-event");
    if (!eventName) return;

    el.addEventListener("click", (e) => {
      const props = { ...newData }; // Inclui UTMs
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-willi-prop-")) {
          const propName = attr.name.replace("data-willi-prop-", "");
          props[propName] = attr.value; // Coleta atributos
        }
      }

      // Função para enviar evento
      const sendEvent = () => {
        if (window.rybbit) {
          try {
            window.rybbit.event(eventName, props);
            console.log(`🎯 Evento Rybbit: ${eventName}`, props);
          } catch (err) {
            console.error("❌ Erro ao enviar evento Rybbit:", err);
          }
        } else {
          console.warn("⚠️ Rybbit ainda não carregado. Tentando novamente...");
          setTimeout(sendEvent, 1000); // Tenta novamente após 1 segundo
        }
      };

      sendEvent(); // Tenta enviar o evento
    });
  });
}

// Inicializa tracking imediatamente
initTracking();