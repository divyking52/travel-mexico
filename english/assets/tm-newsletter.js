(function () {
  function wire(formId, language, messages) {
    var form = document.getElementById(formId);
    if (!form || form.dataset.ready) return;
    form.dataset.ready = "true";
    var button = form.querySelector('button[type="submit"], button');
    var status = form.querySelector("[role=status]");
    if (!button) return;
    button.disabled = false;
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      button.disabled = true;
      if (status) status.textContent = messages.sending;
      try {
        var r = await fetch(
          "https://api.storebox.ai/api/v2/crm/public/forms/newsletter/submit/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: AbortSignal.timeout(20000),
            body: JSON.stringify({
              email: form.elements.email.value.trim(),
              newsletter_consent: true,
              language: language,
              source: "TravelMexico newsletter",
              _honeypot: "",
            }),
          }
        );
        var data = await r.json();
        if (!r.ok || !data.submission_id) throw new Error("Submission not confirmed");
        if (status) status.textContent = messages.ok;
        form.reset();
      } catch (error) {
        if (status) status.textContent = messages.err;
      } finally {
        button.disabled = false;
      }
    });
  }

  wire("page-en-newsletter-form", "en", {
    sending: "Sending\u2026",
    ok: "Thank you. We have received your signup request.",
    err: "We could not confirm your signup. Please try again in a few minutes.",
  });
  wire("home-newsletter-form", "es", {
    sending: "Enviando\u2026",
    ok: "Gracias. Hemos recibido tu solicitud de registro.",
    err: "No pudimos confirmar tu solicitud. Int\u00e9ntalo de nuevo en unos minutos.",
  });
})();
