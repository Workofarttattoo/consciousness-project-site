const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const disableSubmitButtons = (form, disabled) => {
  form.querySelectorAll("button[type='submit'], input[type='submit']").forEach((element) => {
    element.disabled = disabled;
  });
};

const enhanceForm = (form, options = {}) => {
  const {
    pendingMessage = "Sending...",
    successMessage = form.dataset.successMessage,
    errorMessage = form.dataset.errorMessage,
    resetOnSuccess = true,
    onSuccess,
  } = options;

  const messageEl = form.querySelector(".form-message");

  if (!messageEl) {
    return;
  }

  const endpoint = form.dataset.endpoint || form.action;
  const method = (form.dataset.method || form.method || "POST").toUpperCase();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.dataset.submitting === "true") {
      return;
    }

    if (!endpoint) {
      messageEl.textContent = "Form temporarily unavailable.";
      return;
    }

    messageEl.textContent = pendingMessage;
    form.dataset.submitting = "true";
    disableSubmitButtons(form, true);

    try {
      const formData = new FormData(form);
      const response = await fetch(endpoint, {
        method,
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      messageEl.textContent = successMessage || "Thanks! Your submission is on its way.";

      if (resetOnSuccess) {
        form.reset();
      }

      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      messageEl.textContent =
        errorMessage || "We could not submit your response. Please try again later.";
    } finally {
      form.dataset.submitting = "false";
      disableSubmitButtons(form, false);
    }
  });
};

const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  enhanceForm(newsletterForm, {
    pendingMessage: "Sending your opt-in...",
  });
}

const interestForm = document.getElementById("interest-form");
if (interestForm) {
  enhanceForm(interestForm, {
    pendingMessage: "Sharing your signals...",
  });
}

const modal = document.getElementById("rsvp-modal");
const triggerButtons = document.querySelectorAll("[data-modal-target='rsvp-modal']");

triggerButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    modal?.showModal();
  });
});

if (modal) {
  const modalForm = document.getElementById("rsvp-form");
  const messageEl = modal.querySelector(".form-message");

  if (modalForm && messageEl) {
    const closeButtons = modal.querySelectorAll("[data-close='true']");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.close("cancel");
      });
    });

    enhanceForm(modalForm, {
      pendingMessage: "Sending your request...",
      resetOnSuccess: false,
      onSuccess: () => {
        setTimeout(() => {
          modal.close("confirm");
        }, 900);
      },
    });

    modal.addEventListener("cancel", (event) => {
      event.preventDefault();
      modal.close("cancel");
    });

    modal.addEventListener("close", () => {
      messageEl.textContent = "";
      modalForm.reset();
      modalForm.dataset.submitting = "false";
      disableSubmitButtons(modalForm, false);
    });
  }
}
