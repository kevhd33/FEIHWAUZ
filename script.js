// =======================
// GESTION DES PAGES DU LIVRE
// =======================
const pages = document.querySelectorAll('.page');
let currentIndex = 0;
let animating = false;

pages.forEach((p, i) => {
  p.classList.remove('active', 'turn-left', 'turn-right');
  p.style.backfaceVisibility = 'hidden';
  p.style.transform = 'translateZ(0)';
  if (i === 0) p.classList.add('active');
});

function turn(target) {
  if (animating || target === currentIndex) return;
  animating = true;

  const current = pages[currentIndex];
  const next = pages[target];

  pages.forEach(p => p.classList.remove('turn-left', 'turn-right', 'active'));
  next.classList.add('active');

  target > currentIndex
    ? current.classList.add('turn-left')
    : current.classList.add('turn-right');

  setTimeout(() => {
    current.classList.remove('turn-left', 'turn-right', 'active');
    currentIndex = target;
    animating = false;
  }, 1200);
}

// =======================
// MENU VOLET / FEUILLE
// =======================
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  const button = item.querySelector('button');

  // Clic pour mobile : toggle "open" class
  button.addEventListener('click', () => {
    item.classList.toggle('open');
  });

  // Optionnel : navigation vers une page en fonction du sous-menu cliqué
  const submenuLinks = item.querySelectorAll('.submenu li');
  submenuLinks.forEach((sub, index) => {
    sub.addEventListener('click', () => {
      turn(index); // ici tu peux personnaliser pour chaque rubrique
    });
  });
});

// =======================
// MUSIQUE
// =======================
const music = document.getElementById('music');
const musicBtn = document.getElementById('music-btn');
let musicPlaying = false;

if (musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (!music) return;

    musicPlaying ? music.pause() : music.play();
    musicPlaying = !musicPlaying;

    musicBtn.textContent = musicPlaying ? '🔊 Musique ON' : '🎵 Musique';
    musicBtn.style.boxShadow = musicPlaying
      ? '0 0 30px #ffd700, 0 0 60px #c9a24d'
      : '0 0 15px #c9a24d';
  });
}

// =======================
// PARTICULES FEU
// =======================
const container = document.getElementById('particles-container');

function createFireExplosionFromButton(button) {
  const rect = button.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 120; i++) {
    const fire = document.createElement('div');
    fire.className = 'fire-particle';
    fire.style.left = cx + 'px';
    fire.style.top = cy + 'px';

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 500 + 150;

    fire.style.setProperty('--x', Math.cos(angle) * radius + 'px');
    fire.style.setProperty('--y', Math.sin(angle) * radius + 'px');

    const size = Math.random() * 35 + 15;
    fire.style.width = fire.style.height = size + 'px';

    fragment.appendChild(fire);
    setTimeout(() => fire.remove(), 1500);
  }

  container.appendChild(fragment);
}

// Explosion feu au clic sur les boutons
document.querySelectorAll('.magic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    createFireExplosionFromButton(btn);
  });
});

// =======================
// CURSEUR FÉE MAGIQUE 🧚‍♀️
// =======================
const fairy = document.getElementById('fairy-cursor');
let fairyX = innerWidth / 2;
let fairyY = innerHeight / 2;
let mouseX = fairyX;
let mouseY = fairyY;
let wing = true;
const offsetX = 24;
const offsetY = 36;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateFairy() {
  fairyX += (mouseX - fairyX) * 0.18;
  fairyY += (mouseY - fairyY) * 0.18;
  const direction = mouseX < fairyX ? -1 : 1;
  fairy.style.transform = `translate3d(${fairyX - offsetX}px, ${fairyY - offsetY}px, 0) scaleX(${direction})`;
  spawnFairyParticles(fairyX, fairyY);
  requestAnimationFrame(animateFairy);
}
animateFairy();

setInterval(() => {
  fairy.style.backgroundImage = wing
    ? "url('assets/cursor/fee2.png')"
    : "url('assets/cursor/fee1.png')";
  wing = !wing;
}, 140);

// =======================
// PARTICULES MAGIQUES ✨
// =======================
function spawnFairyParticles(x, y) {
  if (Math.random() > 0.4) return;

  const p = document.createElement('div');
  p.className = 'fairy-particle';
  p.style.left = x + 'px';
  p.style.top = y + 'px';
  p.style.setProperty('--x', (Math.random() * 30 - 15) + 'px');
  p.style.setProperty('--y', (Math.random() * 30 + 10) + 'px');

  container.appendChild(p);
  setTimeout(() => p.remove(), 1000);
}
