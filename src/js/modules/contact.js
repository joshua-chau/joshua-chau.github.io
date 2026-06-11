/**
 * Initializes the mock chat contact form.
 * Connects to Web3Forms API to securely submit messages without exposing
 * email addresses on the client side.
 */
export function initContact() {
  const sendBtn = document.getElementById("mockChatSendBtn");
  const input = document.getElementById("mockChatInput");
  const contactInput = document.getElementById("mockChatContact");

  if (!sendBtn || !input) return;

  sendBtn.addEventListener("click", () => {
    const message = input.value.trim();
    if (!message) {
      // Small visual feedback if empty
      input.style.border = "1px solid #ef4444";
      setTimeout(() => {
        input.style.border = "none";
      }, 1000);
      return;
    }

    const contactInfo = contactInput ? contactInput.value.trim() : "";
    const finalMessage = contactInfo 
      ? `Contact Info: ${contactInfo}\n\nMessage:\n${message}` 
      : message;

    // Send via Web3Forms API
    sendBtn.disabled = true;
    const originalContent = sendBtn.innerHTML;
    sendBtn.innerHTML = `Sending...`;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "6429eb6f-f7d0-431a-9703-053d00247019",
        subject: "New Message from Joshua Chau's Website",
        message: finalMessage,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          input.value = "";
          if (contactInput) contactInput.value = "";
          sendBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Sent Successfully!
          `;
        } else {
          sendBtn.innerHTML = "Error, please try again";
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        sendBtn.innerHTML = "Error, please try again";
      })
      .finally(() => {
        setTimeout(() => {
          sendBtn.innerHTML = originalContent;
          sendBtn.disabled = false;
        }, 3000);
      });
  });
}
