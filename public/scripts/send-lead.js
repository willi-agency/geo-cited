const TRACKING_KEY = "tracking_data";

const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== "")
  );
};

/* ========== MUDE AQUI =========== || o ID do formulário */
const form = document.getElementById("form-contato");
const button = document.getElementById("submit-contato");

const disableForm = () => {
  form.querySelectorAll(".form-control").forEach(el => (el.disabled = true));
  button.disabled = true;
  button.innerText = "Enviando...";
};

const enableForm = () => {
  form.querySelectorAll(".form-control").forEach(el => (el.disabled = false));
  button.disabled = false;
  button.innerText = "Enviar";
};

const getUserAgentInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let version = "Unknown";
  let os = "Unknown";

  if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = "Chrome";
    version = ua.match(/Chrome\/([\d.]+)/)[1];
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = "Firefox";
    version = ua.match(/Firefox\/([\d.]+)/)[1];
  } else if (/Safari\/([\d.]+)/.test(ua) && !/Chrome/.test(ua)) {
    browser = "Safari";
    version = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
  }

  if (/Windows NT 10.0/.test(ua)) os = "Windows 10";
  else if (/Windows NT 11.0/.test(ua)) os = "Windows 11";
  else if (/Windows NT 6.1/.test(ua)) os = "Windows 7";
  else if (/Mac OS X/.test(ua)) os = "Mac OS X";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";

  return { browser, version, os };
};

const sendEmail = async (emailValues) => {
  try {
    const authRes = await fetch(
      "https://api.geocited.com.br/auth.php?api_key=57eae222-65fd-4a61-9279-898cd42b3412"
    );
    const { token, erro } = await authRes.json();
    if (!token) throw new Error(erro || "Falha na autenticação");

    const formData = new FormData();
    Object.entries(emailValues).forEach(([k, v]) => formData.append(k, v));

    const res = await fetch("https://api.geocited.com.br/dispara-email.php", {
      method: "POST",
      headers: { api_key: "57eae222-65fd-4a61-9279-898cd42b3412", token },
      body: formData,
    });

    return res.json();
  } catch (err) {
    console.error("Erro no envio de e-mail:", err);
    return { error: true, message: err.message };
  }
};

const sendLead = async (leadValues) => {
  try {
    const rawTracking = localStorage.getItem(TRACKING_KEY);
    const trackingData = rawTracking ? JSON.parse(rawTracking) : {};

    // Limpa tracking e leadValues só aqui
    const trackingClean = cleanObject({
      trackingId: trackingData.trackingId,
      utmSource: trackingData.utm_source,
      utmMedium: trackingData.utm_medium,
      utmCampaign: trackingData.utm_campaign,
      utmTerm: trackingData.utm_term,
      utmContent: trackingData.utm_content,
      gclid: trackingData.gclid,
      fbclid: trackingData.fbclid,
      source: trackingData.source,
      referrer: trackingData.referrer,
      referrerSource: trackingData.referrer_source,
      firstVisit: trackingData.firstVisit,
      lastUpdated: trackingData.lastUpdated,
    });

    const leadClean = cleanObject(leadValues);

        /* ========== MUDE AQUI =========== || apikey do cliente */
    const payload = {
      apiKey: "QSMI-y_DDmXBoscpRRFMiSlQvtmdFMA4kiOaEhjtGjRegXUXQ93r3pHHXaooFmLiwAWru",
      dataFormId: "form-fale-conosco",
      userAgent: getUserAgentInfo(),
      dataValues: { ...leadClean, ...trackingClean },
    };

    /* ========== MUDE AQUI =========== || endpoint do sistema */
    const res = await fetch("https://back-dev.geocited.com.br/api/lead/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => null);
    
    return result;
  } catch (err) {
    console.error("Erro no envio de lead:", err);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  disableForm();

  /* ========== MUDE AQUI =========== || ID dos inputs pra envio */
  const nome = form.querySelector("#nome").value;
  const telefone = form.querySelector("#telefone").value;
  const email = form.querySelector("#email").value;
  const empresa = form.querySelector("#empresa").value;
  const mensagem = form.querySelector("#mensagem").value;
  const comoConheceu = form.querySelector("#como").value;

  /* ========== MUDE AQUI =========== || dados do formulário para o email */
  const emailValues = {
    nome,
    telefone,
    email,
    empresa,
    mensagem,
    como: comoConheceu,
    cc: "backup@clientes.geocited.com.br",
    url: window.location.href,
    emailContato: "maicon.willi@geocited.com.br",
  };

  /* ========== MUDE AQUI =========== || Dados do formulário para o sistema */
  const leadValues = {
    nome,
    telefone,
    email,
    empresa,
    mensagem,
    comoConheceu,
  };

  try {
    // dispara em paralelo mas esperamos o lead
    const [_, leadResult] = await Promise.allSettled([
      sendEmail(emailValues),
      sendLead(leadValues),
    ]);

    if (
      leadResult.status === "fulfilled" &&
      leadResult.value &&
      !leadResult.value.error
    ) {
      /* ========== MUDE AQUI =========== || ação em caso de sucesso */
      window.location = "/envia-contato";
      form.reset();
      enableForm();
    } else {
      throw new Error("Falha ao enviar lead");
    }
  } catch (err) {
    alert("Não foi possível enviar sua mensagem. Tente novamente mais tarde.");
    console.error(err);
    enableForm();
  }
});

