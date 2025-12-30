// ----------------------------------------------------
// ENGINE COMPLETA COM VALOR RAW INTERNO (SEM BUGS)
// ----------------------------------------------------

function maskProgressive(raw, masks) {
  const maskList = masks.split("||").map(m => m.trim());

  // limite máximo baseado nas máscaras
  const maxDigits = Math.max(...maskList.map(countMaskPlaceholders));
  if (raw.length > maxDigits) raw = raw.slice(0, maxDigits);

  const digitCount = raw.length;

  // 1) procura máscara com placeholders EXATOS
  let selectedMask = maskList.find(m => countMaskPlaceholders(m) === digitCount);

  if (!selectedMask) {
    // 2) se não existir exata, encontra todas que comportam (>=)
    const candidates = maskList
      .map(m => ({ mask: m, placeholders: countMaskPlaceholders(m) }))
      .filter(x => x.placeholders >= digitCount)
      // ordena por placeholders ascendente (prefere a menor que comporte)
      .sort((a, b) => a.placeholders - b.placeholders);

    if (candidates.length > 0) {
      selectedMask = candidates[0].mask;
    }
  }

  // 3) fallback: última máscara
  if (!selectedMask) selectedMask = maskList[maskList.length - 1];

  return applyProgressiveMask(raw, selectedMask);
}

function countMaskPlaceholders(mask) {
  return (mask.match(/#/g) || []).length;
}

function applyProgressiveMask(value, mask) {
  let result = "";
  let vi = 0;

  for (let i = 0; i < mask.length; i++) {
    const m = mask[i];

    if (m === "#") {
      if (value[vi]) {
        result += value[vi++];
      } else {
        break;
      }
    } else {
      // Só adiciona caractere fixo SE AINDA EXISTEM DÍGITOS A SEREM IMPRESSOS
      const remainingDigits = value.length - vi;
      if (remainingDigits > 0) {
        result += m;
      } else {
        break;
      }
    }
  }

  return result;
}

// ----------------------------------------------------
// APLICAÇÃO GLOBAL — INICIALIZA INPUTS COM MÁSCARA
// ----------------------------------------------------

function initMaskedInput(input) {
  const masks = input.dataset.mask;
  if (!masks) return;

  // Evita inicializar duas vezes
  if (input._maskInitialized) return;
  input._maskInitialized = true;

  // Valor limpo interno
  input._raw = "";

  input.addEventListener("input", (e) => {
    const typed = e.target.value.replace(/\D/g, "");

    // Atualiza o raw
    input._raw = typed;

    // Aplica máscara baseada no raw
    const formatted = maskProgressive(input._raw, masks);

    // Atualiza o valor visual
    e.target.value = formatted;
  });
}

// Inicializa todos os inputs com máscara na página
function initAllMasks() {
  document.querySelectorAll("[data-mask]").forEach(initMaskedInput);
}

// ----------------------------------------------------
// UTILITÁRIOS
// ----------------------------------------------------

function cleanObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  );
}

function getTrackingData() {
  try {
    // Pega UTMs direto do Rybbit customizado
    if (window.rybbit && typeof window.rybbit.getUTMData === 'function') {
      const utmData = window.rybbit.getUTMData();
      console.log('🐸 UTMs do Rybbit:', utmData);
      return cleanObject(utmData || {});
    }

    console.warn('⚠️ Rybbit não encontrado ou getUTMData() não disponível');
    return {};
  } catch (err) {
    console.error('❌ Erro ao obter tracking do Rybbit:', err);
    return {};
  }
}

// ----------------------------------------------------
// MASK GUARDIAN — VALIDAÇÃO E SUBMIT
// ----------------------------------------------------

window.MaskGuardian = {
  _inited: false,

  // Configurações da API (podem ser sobrescritas)
  config: {
    endpoint: "/api/leads" // ← Chama a rota interna do Astro
  },

  init() {
    if (this._inited) return;
    this._inited = true;

    // Inicializa máscaras existentes
    initAllMasks();

    // Observa novos elementos (para modais dinâmicos)
    this.observeDOM();

    // Adiciona listeners nos botões de trigger
    this.initTriggers();
  },

  // Observer para detectar quando modal aparece
  observeDOM() {
    const observer = new MutationObserver(() => {
      // Re-inicializa máscaras em novos elementos
      initAllMasks();
      // Re-inicializa triggers em novos botões
      this.initTriggers();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  // Inicializa todos os botões com data-mask-trigger
  initTriggers() {
    const triggers = document.querySelectorAll('[data-mask-trigger]:not([data-guardian-ready])');
    
    triggers.forEach(trigger => {
      // Marca como inicializado
      trigger.dataset.guardianReady = 'true';
      
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSubmit(trigger);
      });
    });
  },

  handleSubmit(trigger) {
    const form = trigger.closest("[data-form-id]") || trigger.closest("form");
    
    if (!form) {
      console.warn('Guardian: Formulário não encontrado');
      return;
    }

    // Valida TODOS os inputs com máscara do formulário
    const maskedInputs = form.querySelectorAll('[data-mask]');
    let allMasksValid = true;

    maskedInputs.forEach(input => {
      if (!this.validateInput(input)) {
        allMasksValid = false;
      }
    });

    // Valida TODOS os campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    let allRequiredValid = true;

    requiredFields.forEach(field => {
      // Pula validação se for um input com máscara (já validado acima)
      if (field.dataset.mask) return;

      if (!field.value || !field.value.trim()) {
        this.showError(field, 'Campo obrigatório');
        allRequiredValid = false;
      } else {
        this.clearError(field);
      }
    });

    // Se alguma validação falhou, para aqui
    if (!allMasksValid || !allRequiredValid) {
      console.warn('⚠️ Validação falhou. Corrija os campos destacados.');
      return;
    }

    // Pega o primeiro input com máscara (para referência no extractFormData)
    const firstMaskedInput = maskedInputs[0] || null;

    // Monta payload DINÂMICO baseado em TODOS os inputs do form
    const formData = this.extractFormData(form, maskedInputs);

    this.send(formData, firstMaskedInput, form);
  },

  // Extrai dados dinâmicos do formulário
  extractFormData(form, maskedInputs) {
    const dataValues = {};

    // Pega todos os inputs, textareas e selects com ID ou data-field
    const fields = form.querySelectorAll('input[id], textarea[id], select[id], input[data-field], textarea[data-field], select[data-field]');

    fields.forEach(field => {
      // Prioridade: data-field > id
      const fieldKey = field.dataset.field || field.id;
      
      // Ignora se não tiver identificador
      if (!fieldKey) return;
      
      // Se for um input com máscara, usa o valor RAW
      const isMasked = maskedInputs && (
        Array.isArray(maskedInputs) 
          ? Array.from(maskedInputs).includes(field)
          : field === maskedInputs
      );

      if (isMasked) {
        dataValues[fieldKey] = this.getRaw(field);
      } 
      // Caso contrário, usa o valor normal
      else if (field.value && field.value.trim()) {
        dataValues[fieldKey] = field.value.trim();
      }
    });

    return cleanObject(dataValues);
  },

  validateInput(input) {
    if (!input) return false;

    const raw = input._raw || "";
    const masks = input.dataset.mask || "";
    const maskList = masks.split("||").map(x => x.trim()).filter(Boolean);

    if (maskList.length === 0) {
      this.showError(input, "Campo inválido");
      return false;
    }

    const minDigits = Math.min(...maskList.map(countMaskPlaceholders));
    const maxDigits = Math.max(...maskList.map(countMaskPlaceholders));

    if (raw.length < minDigits || raw.length > maxDigits) {
      this.showError(input, "Número inválido");
      return false;
    }

    this.clearError(input);
    return true;
  },

  showError(input, message) {
    this.clearError(input);
    
    const container = input.parentElement || input.parentNode || document.body;

    const label = document.createElement('div');
    label.textContent = message;
    label.className = 'text-red-500 px-1 py-[1px] bg-white rounded-sm text-sm absolute -bottom-6 z-10';
    
    container.appendChild(label);
    input._errorLabel = label;
    input.classList.add('border-red-500');

    // Remove quando usuário começar a digitar
    const remover = () => {
      this.clearError(input);
    };
    input.addEventListener('input', remover, { once: true });
  },

  clearError(input) {
    if (!input) return;
    if (input._errorLabel) {
      input._errorLabel.remove();
      input._errorLabel = null;
    }
    input.classList.remove('border-red-500');
  },

  getRaw(input) {
    return input?._raw || "";
  },

  async send(formData, input, form) {
    try {
      const trigger = form?.querySelector(`[data-mask-trigger]`);
      if (trigger) trigger.disabled = true;

      // Pega tracking do Rybbit
      const trackingData = getTrackingData();
      const trackingId = window.rybbit?.getVisitorId?.() || null;
      
      console.log('🐸 UTMs capturados:', trackingData);
      console.log('👤 Visitor ID:', trackingId);

      // Monta payload para a API intermediária
      const payload = {
        formId: form.dataset.formId || "form-default",
        data: {
          ...formData,
          ...trackingData,
          trackingId,
          url: window.location.href
        }
      };

      console.log('📤 Payload completo sendo enviado:', payload);

      const res = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || (result && result.error)) {
        throw new Error(result?.error || result?.message || 'Erro na API');
      }

      console.log('✅ Lead enviado com sucesso:', result);

      // Limpa todos os campos do formulário
      if (form) {
        form.reset();
        // Limpa o _raw dos inputs com máscara
        form.querySelectorAll('[data-mask]').forEach(i => {
          if (i._raw !== undefined) i._raw = '';
        });
      }

      // Dispara evento de sucesso
      document.dispatchEvent(new CustomEvent('maskguardian:sent', { 
        detail: { 
          payload, 
          result,
          formId: form.dataset.formId 
        } 
      }));

      // Dispara evento para Rybbit (caso exista)
      if (window.rybbit) {
        window.rybbit.event('lead_submitted', {
          formId: form.dataset.formId,
          whatsapp: formData.whatsapp || formData['input-wpp'],
          name: formData.name || formData['contact-name'],
          trackingId
        });
      }
      
      // Feedback visual no botão
      if (trigger) {
        const originalText = trigger.textContent;
        const originalClasses = trigger.className;
        
        trigger.textContent = '✓ Enviado com sucesso!';
        trigger.classList.add('bg-green-600', '!bg-green-600');
        trigger.classList.remove('bg-orange-500');
        
        setTimeout(() => {
          trigger.textContent = originalText;
          trigger.className = originalClasses;
        }, 3000);
      }

      // Opcional: fecha modal automaticamente após 2s
      setTimeout(() => {
        const modal = form.closest('#contact-modal');
        if (modal && modal.classList.contains('is-visible')) {
          const closeBtn = modal.querySelector('.close-modal');
          if (closeBtn) closeBtn.click();
        }
      }, 2000);

    } catch (err) {
      console.error('❌ Erro ao enviar:', err);
      
      document.dispatchEvent(new CustomEvent('maskguardian:error', { 
        detail: { 
          error: err,
          formId: form?.dataset?.formId 
        } 
      }));

      // Feedback visual de erro no botão
      if (trigger) {
        const originalText = trigger.textContent;
        const originalClasses = trigger.className;
        
        trigger.textContent = '✕ Erro ao enviar';
        trigger.classList.add('bg-red-600', '!bg-red-600');
        trigger.classList.remove('bg-orange-500');
        
        setTimeout(() => {
          trigger.textContent = originalText;
          trigger.className = originalClasses;
        }, 3000);
      }

      // Notificação mais amigável
      const errorMsg = err instanceof Error 
        ? err.message 
        : 'Erro ao enviar. Verifique sua conexão e tente novamente.';
      
      alert(errorMsg);
    } finally {
      const trigger = form?.querySelector(`[data-mask-trigger]`);
      if (trigger) trigger.disabled = false;
    }
  }
};

// Inicializa quando o DOM estiver pronto
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.MaskGuardian.init();
    });
  } else {
    window.MaskGuardian.init();
  }

  // Re-inicializa após View Transitions do Astro
  document.addEventListener('astro:page-load', () => {
    window.MaskGuardian.init();
  });
}