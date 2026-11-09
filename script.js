// REGISTRO DE PLUGINS DE GSAP
gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// 0. SECUENCIA DEL PRELOADER CON ANIMACIÓN DE ENTRADA TRIUNFAL
// -------------------------------------------------------------
const masterTL = gsap.timeline();
const counterObj = { value: 0 };
const loaderCounter = document.querySelector('.loader-counter');
const loaderBar = document.querySelector('.loader-bar');

// Rotación continua del logo del loader
gsap.to(".loader-logo-img", {
  rotate: 360,
  duration: 3,
  repeat: -1,
  ease: "none"
});

// Conteo progresivo del preloader (0% a 100%)
masterTL.to(counterObj, {
  value: 100,
  duration: 1.8,
  ease: "power2.inOut",
  onUpdate: () => {
    const val = Math.round(counterObj.value);
    if (loaderCounter) loaderCounter.innerText = val + '%';
    if (loaderBar) loaderBar.style.width = val + '%';
  }
});

// Revelado de la pantalla principal tras la carga
masterTL.to("#preloader", {
  yPercent: -100,
  duration: 1,
  ease: "expo.inOut"
})
.from(".navbar", { y: -60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
.from(".status-badge", { scale: 0.7, opacity: 0, duration: 0.6, ease: "back.out(1.8)" }, "-=0.4")
.from(".hero-title", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
.from(".hero-subtitle", { y: 25, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.6")
.from("#tilt-card", { y: 50, opacity: 0, scale: 0.92, duration: 0.9, ease: "power3.out" }, "-=0.5");

// -------------------------------------------------------------
// 1. FLOTACIÓN CONTINUA Y ULTRA-FLUIDA DE LAS ESFERAS (ORBS)
// -------------------------------------------------------------
gsap.to(".orb-1", {
  y: 40,
  x: 30,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb-2", {
  y: -35,
  x: -25,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb-3", {
  y: 45,
  x: -35,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// -------------------------------------------------------------
// 2. SEGUIMIENTO DE CURSOR HIPER-RÁPIDO CON GSAP quickTo
// -------------------------------------------------------------
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  const xTo = gsap.quickTo(cursorGlow, "x", { duration: 0.4, ease: "power2.out" });
  const yTo = gsap.quickTo(cursorGlow, "y", { duration: 0.4, ease: "power2.out" });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
}

// -------------------------------------------------------------
// 3. MOUSE PARALLAX MULTICAPA EN EL HERO
// -------------------------------------------------------------
const heroSection = document.querySelector('.hero-container');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5);
    const yPos = (clientY / window.innerHeight - 0.5);

    gsap.to(".hero-grid-pattern", { x: xPos * -30, y: yPos * -30, duration: 1.2, ease: "power1.out" });
    gsap.to(".hero-bg-image", { x: xPos * 40, y: yPos * 40, duration: 2, ease: "power2.out" });
  });
}

// -------------------------------------------------------------
// 4. ELEMENTOS MAGNÉTICOS (BOTONES Y LINKS ATRAÍDOS POR EL MOUSE)
// -------------------------------------------------------------
document.querySelectorAll('.magnetic-target').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  });
});

// -------------------------------------------------------------
// 5. EFECTO 3D TILT AVANZADO CON BARRIDO DE SHINE EN LAS TARJETAS
// -------------------------------------------------------------
const tiltCard = document.getElementById('tilt-card');
const cardShine = document.querySelector('.card-shine');

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(tiltCard, { rotateY: x * 0.04, rotateX: -y * 0.04, duration: 0.4, ease: "power2.out" });
    if (cardShine) {
      gsap.to(cardShine, { x: (x + rect.width / 2) * 1.5, duration: 0.4, ease: "power1.out" });
    }
  });

  tiltCard.addEventListener('mouseleave', () => {
    gsap.to(tiltCard, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out" });
    if (cardShine) {
      gsap.to(cardShine, { x: -300, duration: 0.8, ease: "power2.out" });
    }
  });
}

document.querySelectorAll('.sol-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, { rotateY: x * 0.05, rotateX: -y * 0.05, duration: 0.4, ease: "power1.out" });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
  });
});

// -------------------------------------------------------------
// 6. SCROLLTRIGGER: TITULARES Y MÉTRICAS ANIMADAS
// -------------------------------------------------------------
gsap.from(".reveal-text, .reveal-subtext", {
  scrollTrigger: {
    trigger: ".solutions",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.2,
  ease: "power3.out"
});

ScrollTrigger.create({
  trigger: "#metrics",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.from(".metric-card", {
      y: 60,
      opacity: 0,
      scale: 0.88,
      duration: 0.9,
      stagger: 0.15,
      ease: "back.out(1.7)"
    });

    document.querySelectorAll('.metric-number').forEach((numEl) => {
      const target = parseFloat(numEl.getAttribute('data-target'));
      const decimals = parseInt(numEl.getAttribute('data-decimals')) || 0;
      const prefix = numEl.getAttribute('data-prefix') || '';
      const suffix = numEl.getAttribute('data-suffix') || '';

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          numEl.innerText = prefix + obj.val.toFixed(decimals) + suffix;
        }
      });
    });
  }
});

gsap.from(".sol-card", {
  scrollTrigger: {
    trigger: "#solutions",
    start: "top 75%",
  },
  y: 75,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// -------------------------------------------------------------
// 7. INTEGRADOR DE FORMULARIO CON EMAILJS Y MICROANIMACIÓN
// -------------------------------------------------------------
const PUBLIC_KEY = "0t8IWcE_ybYirg9yu";
const SERVICE_ID = "service_0bk1ro6";
const TEMPLATE_ID = "template_be8zh3q";

emailjs.init(PUBLIC_KEY);

const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('btn-submit');
    const messageDiv = document.getElementById('message');
    
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    gsap.to(btn, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1 });

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
      .then(() => {
        btn.innerText = 'Solicitar Demo';
        btn.disabled = false;
        messageDiv.style.color = '#34d399';
        messageDiv.innerText = '¡Acceso concedido! Revisa tu bandeja de entrada.';
        this.reset();
      }, (error) => {
        btn.innerText = 'Solicitar Demo';
        btn.disabled = false;
        messageDiv.style.color = '#f87171';
        messageDiv.innerText = 'Error en la solicitud. Inténtalo nuevamente.';
        console.error('EmailJS Error:', error);
      });
  });
}