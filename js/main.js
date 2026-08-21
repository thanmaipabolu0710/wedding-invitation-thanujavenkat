/**
 * ROYAL INDIAN WEDDING INVITATION - MAIN INTERACTIVE LOGIC
 * Features:
 * - Wax Seal Envelope Opener
 * - Ambient Indian Instrumental Music Synthesizer (Web Audio API)
 * - Lightweight Rose Petal Particle Physics Canvas
 * - Live Muhurtham Countdown Timer
 * - Dynamic Event Schedule & Itinerary Rendering
 * - Universal Add-to-Calendar (Google & Apple .ics)
 * - Interactive Lightbox Gallery
 * - RSVP Form with Instant WhatsApp Generator & Local Storage
 * - Live Guest Blessings Wall
 * - Copy-to-Clipboard Venue Helper
 */

document.addEventListener('DOMContentLoaded', () => {
  initInvitation();
});

function initInvitation() {
  renderConfigData();
  initWeddingAudio();
  initEnvelopeOpener();
  initCountdownTimer();
  initScrollAnimations();
  initGalleryLightbox();
  initVenueActions();
  initAudioPlayer();
  initShareAction();
  startAmbientMusic();

}

/* ==========================================================================
   1. RENDER CONFIGURATION DATA
   ========================================================================== */
function renderConfigData() {
  const cfg = WEDDING_CONFIG;
  if (!cfg) return;

  // Monogram & Hashtag
  document.querySelectorAll('.js-monogram').forEach(el => el.textContent = cfg.couple.monogram);
  document.querySelectorAll('.js-hashtag').forEach(el => el.textContent = cfg.couple.hashtag);

  // Couple Names
  const brideElements = document.querySelectorAll('.js-bride-name');
  const groomElements = document.querySelectorAll('.js-groom-name');
  brideElements.forEach(el => el.textContent = cfg.couple.bride.firstName);
  groomElements.forEach(el => el.textContent = cfg.couple.groom.firstName);

  // Full names & parents
  document.querySelectorAll('.js-bride-full').forEach(el => el.textContent = cfg.couple.bride.fullName);
  document.querySelectorAll('.js-groom-full').forEach(el => el.textContent = cfg.couple.groom.fullName);

  document.querySelectorAll('.js-bride-parents').forEach(el => el.textContent = cfg.couple.bride.parents);
  document.querySelectorAll('.js-groom-parents').forEach(el => el.textContent = cfg.couple.groom.parents);

  // Couple Portraits & Bios
  const brideImg = document.querySelector('.js-bride-img');
  const groomImg = document.querySelector('.js-groom-img');
  if (brideImg && cfg.couple.bride.photo) {
    brideImg.src = cfg.couple.bride.photo;
    brideImg.alt = `${cfg.couple.bride.fullName} - The Bride`;
  }
  if (groomImg && cfg.couple.groom.photo) {
    groomImg.src = cfg.couple.groom.photo;
    groomImg.alt = `${cfg.couple.groom.fullName} - The Groom`;
  }

  const brideBio = document.querySelector('.js-bride-bio');
  const groomBio = document.querySelector('.js-groom-bio');
  if (brideBio) brideBio.textContent = cfg.couple.bride.bio;
  if (groomBio) groomBio.textContent = cfg.couple.groom.bio;

  // Dates
  const dateDisplays = document.querySelectorAll('.js-wedding-date');
  dateDisplays.forEach(el => el.textContent = cfg.weddingDate.displayDate);

  const timeDisplay = document.querySelector('.js-wedding-time');
  if (timeDisplay) timeDisplay.textContent = cfg.weddingDate.muhurthamTime;

  // Shloka
  const shlokaText = document.querySelector('.js-shloka-text');
  const shlokaTrans = document.querySelector('.js-shloka-trans');
  if (shlokaText) shlokaText.textContent = cfg.shloka.sanskrit;
  if (shlokaTrans) shlokaTrans.textContent = cfg.shloka.translation;

  // Invitation Message
  const invSalutation = document.querySelector('.js-inv-salutation');
  const invBody = document.querySelector('.js-inv-body');
  const invClosing = document.querySelector('.js-inv-closing');
  if (invSalutation) invSalutation.textContent = cfg.invitationMessage.salutation;
  if (invBody) invBody.textContent = cfg.invitationMessage.body;
  if (invClosing) invClosing.textContent = cfg.invitationMessage.closing;

  // Render Multi-Event Schedule
  renderEvents(cfg.events);

  // Venue details
  const venueName = document.querySelector('.js-venue-name');
  const venueTagline = document.querySelector('.js-venue-tagline');
  const venueAddress = document.querySelector('.js-venue-address');
  const venueMapsBtn = document.querySelector('.js-btn-maps');

  if (venueName) venueName.textContent = cfg.venue.name;
  if (venueTagline) venueTagline.textContent = cfg.venue.tagline;
  if (venueAddress) venueAddress.textContent = cfg.venue.address;
  if (venueMapsBtn) venueMapsBtn.href = cfg.venue.directionsUrl;

  // Story Timeline
  renderStory(cfg.story);

  // Gallery
  renderGallery(cfg.gallery);
}

/* Render Event Itinerary Cards */
function renderEvents(events) {
  const container = document.getElementById('events-container');
  if (!container || !events) return;

  const eventIcons = {
    dinner: `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
    wedding: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
  };

  container.innerHTML = events.map((ev, index) => {
    const iconSvg = eventIcons[ev.icon] || eventIcons.wedding;
    const badgeText = ev.id === 'wedding' ? 'శుభలగ్నం' : 'విందు (Dinner)';
    return `
      <article class="event-card reveal reveal-up delay-${(index % 3 + 1) * 100}" id="event-${ev.id}">
        <div class="event-card-header">
          <span class="event-badge" style="background-color: ${ev.badgeColor};">${badgeText}</span>
          <div class="event-icon-wrap">${iconSvg}</div>
          <h3 class="event-title">${ev.title}</h3>
          <p class="event-subtitle">${ev.subtitle}</p>
        </div>
        <div class="event-body">
          <div class="event-meta-list" style="margin-bottom: 0;">
            <div class="event-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
              <div class="meta-content">
                <strong>${ev.dateStr}</strong>
                <span>${ev.timeStr}</span>
              </div>
            </div>
            <div class="event-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <div class="meta-content">
                <strong>${ev.venueName}</strong>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* Render Story Timeline */
function renderStory(milestones) {
  const container = document.getElementById('story-container');
  if (!container || !milestones) return;

  container.innerHTML = milestones.map((item, index) => `
    <div class="story-card reveal reveal-up delay-${(index + 1) * 100}">
      <div class="story-img-wrap">
        <img src="${item.image}" alt="${item.title}" class="story-img" loading="lazy" />
      </div>
      <div class="story-content">
        <span class="story-year">${item.year}</span>
        <h3 class="story-title">${item.title}</h3>
        <p class="story-desc">${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* Render Gallery */
function renderGallery(photos) {
  const container = document.getElementById('gallery-container');
  if (!container || !photos) return;

  container.innerHTML = photos.map((item, index) => `
    <div class="gallery-item reveal reveal-scale" data-index="${index}" onclick="openLightbox(${index})">
      <img src="${item.url}" alt="${item.caption}" class="gallery-thumb" loading="lazy" />
      <div class="gallery-overlay">
        <span class="gallery-caption-preview">${item.caption}</span>
      </div>
    </div>
  `).join('');
}

function initWeddingAudio() {
  window.weddingAudio = new Audio('assets/audio/wedding-song.mp3');
  window.weddingAudio.loop = true;
  window.weddingAudio.preload = 'auto';
  window.weddingAudio.volume = 0.7;

  // Try to start immediately.
  window.weddingAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioUi(true);
  }).catch(() => {
    // Browser blocked autoplay.
    // Start on the first user interaction instead.
    const startAfterInteraction = () => {
      window.weddingAudio.play().then(() => {
        isAudioPlaying = true;
        updateAudioUi(true);
      }).catch(() => {});

      document.removeEventListener('click', startAfterInteraction);
      document.removeEventListener('touchstart', startAfterInteraction);
    };

    document.addEventListener('click', startAfterInteraction, { once: true });
    document.addEventListener('touchstart', startAfterInteraction, { once: true });
  });
}
/* ==========================================================================
   2. INTERACTIVE OPENING ENVELOPE / WAX SEAL
   ========================================================================== */
function initEnvelopeOpener() {
  const overlay = document.getElementById('opening-overlay');
  const sealBtn = document.getElementById('wax-seal-btn');

  if (!overlay || !sealBtn) return;

  sealBtn.addEventListener('click', () => {
    
    // Trigger visual opening
    overlay.classList.add('opened');
    document.body.style.overflow = 'auto';

    
  });
}

/* ==========================================================================
   3. LIVE COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  const targetDate = new Date(WEDDING_CONFIG.weddingDate.targetISO).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const label = document.querySelector('.countdown-heading');
      if (label) label.textContent = 'The Wedding Celebrations Have Begun! ✨';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. FALLING ROSE PETALS PARTICLE PHYSICS (LIGHTWEIGHT CANVAS)
   ========================================================================== 
let petalCanvas, ctx, petals = [];
let isPetalActive = true;

function initPetalCanvas() {
  petalCanvas = document.getElementById('petal-canvas');
  if (!petalCanvas) return;

  ctx = petalCanvas.getContext('2d');
  resizePetalCanvas();
  window.addEventListener('resize', resizePetalCanvas);

  // Initialize petals
  const count = window.innerWidth < 680 ? 20 : 36;
  for (let i = 0; i < count; i++) {
    petals.push(createPetal());
  }

  requestAnimationFrame(renderPetals);
}

function resizePetalCanvas() {
  if (!petalCanvas) return;
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;
}

function createPetal(burst = false) {
  const colors = [
    { r: 180, g: 25, b: 45, a: 0.8 },   // Crimson Rose
    { r: 212, g: 175, b: 55, a: 0.85 }, // Golden Flake
    { r: 235, g: 90, b: 120, a: 0.75 }, // Pink Lotus
    { r: 245, g: 158, b: 11, a: 0.8 }   // Marigold
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    x: burst ? window.innerWidth / 2 + (Math.random() - 0.5) * 200 : Math.random() * window.innerWidth,
    y: burst ? window.innerHeight / 2 + (Math.random() - 0.5) * 100 : Math.random() * window.innerHeight - window.innerHeight,
    size: Math.random() * 8 + 6,
    speedY: burst ? Math.random() * 5 + 3 : Math.random() * 1.5 + 0.8,
    speedX: (Math.random() - 0.5) * 1.6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    color: color,
    oscillation: Math.random() * 10,
    oscillationSpeed: Math.random() * 0.03 + 0.01
  };
}

function triggerPetalBurst() {
  for (let i = 0; i < 40; i++) {
    petals.push(createPetal(true));
  }
}

function renderPetals() {
  if (!ctx || !petalCanvas) return;

  ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);

  petals.forEach((p, index) => {
    p.y += p.speedY;
    p.x += Math.sin(p.oscillation) * 1.2 + p.speedX;
    p.oscillation += p.oscillationSpeed;
    p.rotation += p.rotationSpeed;

    // Reset petal if off screen
    if (p.y > petalCanvas.height + 20) {
      petals[index] = createPetal();
      petals[index].y = -20;
    }

    // Draw stylized curved petal shape
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, p.size, 0);
    ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, p.size, 0, 0);
    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(renderPetals);
}*/

/* ==========================================================================
   5. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. PHOTO GALLERY LIGHTBOX
   ========================================================================== */
let currentLightboxIndex = 0;

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (!modal || !img || !caption) return;

  const item = WEDDING_CONFIG.gallery[index];
  img.src = item.url;
  img.alt = item.caption;
  caption.textContent = item.caption;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.navLightbox = function(direction) {
  const total = WEDDING_CONFIG.gallery.length;
  currentLightboxIndex = (currentLightboxIndex + direction + total) % total;
  window.openLightbox(currentLightboxIndex);
};

function initGalleryLightbox() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.navLightbox(1);
    if (e.key === 'ArrowLeft') window.navLightbox(-1);
  });
}

/* ==========================================================================
   7. RSVP FORM WITH LOCAL STORAGE & WHATSAPP SUBMISSION
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById('wedding-rsvp-form');
  const whatsappBtn = document.getElementById('btn-whatsapp-rsvp');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const guests = document.getElementById('rsvp-guests').value;
    const attending = form.querySelector('input[name="attending"]:checked')?.value || 'Yes';
    const diet = document.getElementById('rsvp-diet').value;
    const wishes = document.getElementById('rsvp-wishes').value.trim();

    // Checked events
    const selectedEvents = Array.from(form.querySelectorAll('input[name="events"]:checked')).map(
      (cb) => cb.value
    );

    if (!name) {
      showToast('Please enter your name.');
      return;
    }

    const rsvpData = {
      id: Date.now(),
      name,
      guests,
      attending,
      diet,
      events: selectedEvents,
      wishes,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Save to Local Storage
    saveRsvpLocally(rsvpData);

    // Show celebration modal
    showSuccessModal(name, attending);

    // Add to live blessings wall if wish is present
    if (wishes) {
      addBlessingToWall(rsvpData);
    }

    form.reset();
  });

  // Direct WhatsApp RSVP formatting
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvp-name').value.trim() || 'Guest';
      const guests = document.getElementById('rsvp-guests').value;
      const attending = form.querySelector('input[name="attending"]:checked')?.value || 'Yes';
      const diet = document.getElementById('rsvp-diet').value;
      const wishes = document.getElementById('rsvp-wishes').value.trim();

      const selectedEvents = Array.from(form.querySelectorAll('input[name="events"]:checked')).map(
        (cb) => cb.value
      );

      const msg = `✨ *Wedding RSVP — ${WEDDING_CONFIG.couple.monogram}* ✨\n\n` +
        `*Name:* ${name}\n` +
        `*Attending:* ${attending}\n` +
        `*Number of Guests:* ${guests}\n` +
        `*Ceremonies:* ${selectedEvents.join(', ') || 'All Ceremonies'}\n` +
        `*Dietary Preference:* ${diet}\n` +
        (wishes ? `*Blessings:* "${wishes}"\n\n` : '\n') +
        `Looking forward to celebrating together! 🎉`;

      const whatsappUrl = `https://wa.me/${WEDDING_CONFIG.rsvp.hostWhatsApp}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
}

function saveRsvpLocally(data) {
  try {
    const list = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    list.unshift(data);
    localStorage.setItem('wedding_rsvps', JSON.stringify(list));
  } catch (err) {
    console.warn('LocalStorage unavailable', err);
  }
}

function showSuccessModal(name, attending) {
  const modal = document.getElementById('rsvp-success-modal');
  const title = document.getElementById('success-title');
  const desc = document.getElementById('success-desc');

  if (!modal) return;

  if (attending === 'Yes') {
    title.textContent = `Thank You, ${name}! 🎉`;
    desc.textContent = `We are overjoyed to have you celebrate with us at ${WEDDING_CONFIG.venue.name}. Your presence will make our moments truly blessed!`;
  } else {
    title.textContent = `Warm Wishes Received`;
    desc.textContent = `Thank you for letting us know, ${name}. You will be warmly missed and kept in our hearts and prayers!`;
  }

  modal.classList.add('active');
}

window.closeSuccessModal = function() {
  const modal = document.getElementById('rsvp-success-modal');
  if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   8. GUEST BLESSINGS WALL
   ========================================================================== */
function initBlessingsWall() {
  const container = document.getElementById('blessings-container');
  if (!container) return;

  const defaultBlessings = [
    {
      name: "Amit & Priya Singhania",
      wishes: "Wishing Ananya & Rohan a lifetime of endless joy, harmony, and eternal romance. Can't wait for Udaipur!",
      date: "Aug 18, 2026"
    },
    {
      name: "Dr. K.V. Nambiar",
      wishes: "May the divine grace of Lord Ganesha shower your sacred journey with abundant happiness and prosperity.",
      date: "Aug 19, 2026"
    }
  ];

  let stored = [];
  try {
    const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    stored = rsvps.filter(r => r.wishes).map(r => ({ name: r.name, wishes: r.wishes, date: r.date }));
  } catch (e) {}

  const allBlessings = [...stored, ...defaultBlessings];
  container.innerHTML = allBlessings.map(b => createBlessingCardHtml(b)).join('');
}

function addBlessingToWall(data) {
  const container = document.getElementById('blessings-container');
  if (!container) return;

  const cardHtml = createBlessingCardHtml({
    name: data.name,
    wishes: data.wishes,
    date: data.date
  });

  container.insertAdjacentHTML('afterbegin', cardHtml);
}

function createBlessingCardHtml(b) {
  return `
    <div class="blessing-card">
      <div class="blessing-sender">
        <span>${b.name}</span>
        <span class="blessing-date">${b.date}</span>
      </div>
      <p class="blessing-text">"${b.wishes}"</p>
    </div>
  `;
}

/* ==========================================================================
   9. VENUE ACTIONS (COPY ADDRESS & TOAST NOTIFICATION)
   ========================================================================== */
function initVenueActions() {
  const copyBtn = document.getElementById('btn-copy-address');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const address = WEDDING_CONFIG.venue.address;
    navigator.clipboard.writeText(address).then(() => {
      showToast('📍 Address copied to clipboard!');
    }).catch(() => {
      showToast('Address: ' + address);
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   10. AMBIENT INDIAN INSTRUMENTAL SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let synthInterval = null;

// Traditional Indian Raag Yaman Pentatonic Frequencies (Hz)
const ragaScale = [
  261.63, // Sa  (C4)
  293.66, // Re  (D4)
  329.63, // Ga  (E4)
  369.99, // Ma* (F#4)
  392.00, // Pa  (G4)
  440.00, // Dha (A4)
  493.88, // Ni  (B4)
  523.25, // Sa' (C5)
  587.33, // Re' (D5)
  659.25  // Ga' (E5)
];

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}



function playSantoorNote(freq, time, duration = 2.0) {
  if (!audioCtx || !isAudioPlaying) return;

  const osc = audioCtx.createOscillator();
  const oscHarmonic = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  oscHarmonic.type = 'sine';

  osc.frequency.setValueAtTime(freq, time);
  oscHarmonic.frequency.setValueAtTime(freq * 2, time);

  // Plucked envelope
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(0.06, time + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  oscHarmonic.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  oscHarmonic.start(time);
  osc.stop(time + duration);
  oscHarmonic.stop(time + duration);
}

function startAmbientMusic() {
  try {
    if (!window.weddingAudio) {
      window.weddingAudio = new Audio('assets/audio/wedding-song.mp3');
      window.weddingAudio.loop = true;
      window.weddingAudio.volume = 0.7;
    }

    window.weddingAudio.currentTime = 0;
    window.weddingAudio.muted = false;

    window.weddingAudio.play().then(() => {
      isAudioPlaying = true;
      updateAudioUi(true);
    }).catch((err) => {
      console.warn('Autoplay blocked:', err);
    });

  } catch (err) {
    console.warn('Wedding audio error:', err);
  }
}
function stopAmbientMusic() {
  isAudioPlaying = false;

  if (window.weddingAudio) {
    window.weddingAudio.pause();
  }

  updateAudioUi(false);
}

function toggleAmbientMusic() {
  if (!window.weddingAudio) return;

  window.weddingAudio.muted = !window.weddingAudio.muted;

  updateAudioUi(!window.weddingAudio.muted);
}

function updateAudioUi(playing) {
  const btn = document.getElementById('btn-audio-toggle');

  if (btn) {
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute(
      'aria-label',
      playing ? 'Mute wedding music' : 'Unmute wedding music'
    );
    btn.setAttribute(
      'title',
      playing ? 'Mute wedding music' : 'Unmute wedding music'
    );
  }
}

function initAudioPlayer() {
  const btn = document.getElementById('btn-audio-toggle');
  if (btn) {
    btn.addEventListener('click', toggleAmbientMusic);
  }
}

/* ==========================================================================
   11. WHATSAPP SHARE INVITATION ACTION
   ========================================================================== */
function initShareAction() {
  const shareButtons = document.querySelectorAll('.js-share-whatsapp');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = WEDDING_CONFIG.share.text + window.location.href;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
}
