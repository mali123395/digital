// Wrap all code in a DOMContentLoaded event listener to ensure the HTML is loaded before running any script
document.addEventListener("DOMContentLoaded", () => {
  // ===============================================
  // RESPONSIVE HAMBURGER MENU
  // ===============================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    const navLinks = navMenu.querySelectorAll(".nav-link");

    const toggleMenu = () => {
      const isOpened = hamburger.classList.contains("active");
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      if (!isOpened) {
        hamburger.setAttribute("aria-expanded", "true");
        if (navLinks.length > 0) navLinks[0].focus();
      } else {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.focus();
      }
    };

    hamburger.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (hamburger.classList.contains("active")) {
          toggleMenu();
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && hamburger.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  // ===============================================
  // AJAX CONTACT FORM SUBMISSION
  // ===============================================
  const form = document.getElementById("contact-form");

  if (form) {
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // This is the crucial line that stops the redirect.

      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.innerHTML = "Thank you! Your message has been sent.";
            formStatus.className = "success";
          }
          form.reset();
          submitButton.disabled = false; // Re-enable the submit button
          submitButton.textContent = "Submit Form"; // Reset the button text // Hide form on success
        } else {
          const data = await response.json();
          if (formStatus) {
            formStatus.innerHTML = `Oops! There was a problem. ${
              data.error || "Please try again."
            }`;
            formStatus.className = "error";
          }
          submitButton.disabled = false;
          submitButton.textContent = "Submit Form";
        }
      } catch (error) {
        if (formStatus) {
          formStatus.innerHTML =
            "Oops! There was a network error. Please try again.";
          formStatus.className = "error";
        }
        submitButton.disabled = false;
        submitButton.textContent = "Submit Form";
      }
    });
  }
});
