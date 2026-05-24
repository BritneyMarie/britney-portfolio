/**
 * EmailJS contact form handler.
 */
const EMAILJS_SERVICE_ID  = 'service_4zxya5g'
const EMAILJS_TEMPLATE_ID = 'template_mxh6xh6'
const EMAILJS_PUBLIC_KEY   = 'VEss2FICj5mnFCIF2'

export function initForm() {
  const form       = document.getElementById('contact-form')
  const successMsg = document.getElementById('form-success')
  const errorMsg   = document.getElementById('form-error')

  if (!form) return

  // Initialise EmailJS
  if (window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY)
  }

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
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name,
        email,
        message,
      })

      form.reset()
      successMsg.classList.add('visible')
    } catch {
      errorMsg.classList.add('visible')
    } finally {
      form.classList.remove('loading')
    }
  })
}
