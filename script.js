// Custom JavaScript for Bootstrap Pro Website

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initializeAnimations()

  // Initialize form handling
  initializeFormHandling()

  // Initialize smooth scrolling
  initializeSmoothScrolling()

  // Initialize navbar scroll effect
  initializeNavbarScrollEffect()

  // Initialize tooltips and popovers if Bootstrap JS is loaded
  initializeTooltipsAndPopovers()
})

// Animation Initialization
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    element.classList.add("loading")
    observer.observe(element)
  })

  // Service cards hover effect
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Form Handling
function initializeFormHandling() {
  const contactForm = document.querySelector("form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name") || document.getElementById("name")?.value
      const email = formData.get("email") || document.getElementById("email")?.value
      const message = formData.get("message") || document.getElementById("message")?.value

      // Basic validation
      if (!name || !email || !message) {
        showNotification("Please fill in all required fields.", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        showNotification("Thank you! Your message has been sent successfully.", "success")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".custom-notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `custom-notification alert alert-${type === "error" ? "danger" : type === "success" ? "success" : "info"} alert-dismissible fade show`
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
    `

  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === "error" ? "exclamation-triangle" : type === "success" ? "check-circle" : "info-circle"} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Smooth Scrolling for anchor links
function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        e.preventDefault()
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Navbar scroll effect
function initializeNavbarScrollEffect() {
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.classList.add("scrolled")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.classList.remove("scrolled")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
    }

    lastScrollTop = scrollTop
  })
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 1000) {
  element.style.animation = `${animation} ${duration}ms ease-in-out`

  setTimeout(() => {
    element.style.animation = ""
  }, duration)
}

// Initialize tooltips and popovers if Bootstrap JS is loaded
function initializeTooltipsAndPopovers() {
  const bootstrap = window.bootstrap // Declare the bootstrap variable

  if (typeof bootstrap !== "undefined") {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    const popoverList = popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  }
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Call lazy loading initialization
initializeLazyLoading()

// Console message for developers
console.log("%c🚀 Bootstrap Pro Website", "color: #0d6efd; font-size: 16px; font-weight: bold;")
console.log("%cBuilt with Bootstrap 5, modern CSS, and vanilla JavaScript", "color: #20c997; font-size: 12px;")
