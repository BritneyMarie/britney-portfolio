/**
 * Formspree contact form handler.
 *
 * ⚠️  SETUP REQUIRED:
 *   1. Go to https://formspree.io and create a free account.
 *   2. Create a new form and copy your form ID (looks like "xabcdefg").
 *   3. Replace YOUR_FORM_ID below with your actual form ID.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export function initForm() {
  const form       = document.getElementById('contact-form')
  const successMsg = document.getElementById('form-success')
  const errorMsg   = document.getElementById('form-error')

  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name    = form.querySelector('#name').value.trim()
    const email   = form.querySelector('#email').value.trim()
    const message = form.querySelector('#message').value.trim()

    // Client-side guard — all fields required
    if (!name || !email || !message) return

    // Loading state
    form.classList.add('loading')
    successMsg.classList.remove('visible')
    errorMsg.classList.remove('visible')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        form.reset()
        successMsg.classList.add('visible')
      } else {
        errorMsg.classList.add('visible')
      }
    } catch {
      errorMsg.classList.add('visible')
    } finally {
      form.classList.remove('loading')
    }
  })
}
