// REGISTRO DE PLUGINS GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. PARALLAX CON CURSOR (FONDO Y ORBES)
const heroSection = document.querySelector('.hero-container');
heroSection.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const xPos = (clientX / window.innerWidth - 0.5);
  const yPos = (clientY / window.innerHeight - 0.5);

  gsap.to(".orb-1", { x: xPos * 120, y: yPos * 120, duration: 1.5, ease: "power2.out" });
  gsap.to(".orb-2", { x: xPos * -90, y: yPos * -90, duration: 1.8, ease: "power2.out" });
  gsap.to(".orb-3", { x: xPos * 60, y: yPos * -60, duration: 2, ease: "power2.out" });
  gsap.to(".hero-bg-image", { x: xPos * 40, y: yPos * 40, duration: 2.5, ease: "power2.out" });
});

// 2. EFECTO 3D TILT EN LA TARJETA HERO
const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(tiltCard, {
      rotateY: x * 0.03,
      rotateX: -y * 0.03,
      duration: 0.5,
      ease: "power2.out"
    });
  });

  tiltCard.addEventListener('mouseleave', () => {
    gsap.to(tiltCard, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out" });
  });
}

// 3. EFECTO 3D TILT EN TARJETAS DE SOLUCIONES
document.querySelectorAll('.sol-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, { rotateY: x * 0.04, rotateX: -y * 0.04, duration: 0.4, ease: "power1.out" });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  });
});

// 4. CONTADOR ANIMADO Y APARICIÓN DE MÉTRICAS CON SCROLLTRIGGER
ScrollTrigger.create({
  trigger: "#metrics",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.from(".metric-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
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

// 5. REVELADO PROGRESIVO DE TARJETAS DE SOLUCIONES
gsap.from(".sol-card", {
  scrollTrigger: {
    trigger: "#solutions",
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// 6. ENTRADA HERO AL CARGAR LA PÁGINA
gsap.from(".hero-content > *", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.2
});

// 7. INTEGRADOR EMAILJS
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

    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

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