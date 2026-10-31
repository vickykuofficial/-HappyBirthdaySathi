/* Gate floating emojis */
(function(){
  const container = document.getElementById('gateEmojis');
  const emojis = ['🎂','💖','✨','🌸','🦋','👑','🎵','❤️','🌻','😘'];
  for(let i=0;i<22;i++){
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left = Math.random()*100 + 'vw';
    s.style.animationDelay = (Math.random()*8) + 's';
    s.style.animationDuration = (6 + Math.random()*6) + 's';
    container.appendChild(s);
  }
})();

/* Hero particles */
(function(){
  const c = document.getElementById('heroParticles');
  for(let i=0;i<40;i++){
    const d = document.createElement('div');
    d.className = 'particle';
    d.style.left = Math.random()*100 + '%';
    d.style.top = Math.random()*100 + '%';
    d.style.animationDelay = (Math.random()*6) + 's';
    d.style.animationDuration = (4 + Math.random()*6) + 's';
    c.appendChild(d);
  }
})();

const particleStyle = document.createElement('style');
particleStyle.textContent = `.particle{position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(255,107,157,0.7);box-shadow:0 0 8px rgba(255,107,157,0.8);animation:twinkle 5s ease-in-out infinite;}@keyframes twinkle{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:1;transform:scale(1.8)}}`;
document.head.appendChild(particleStyle);

/* Quotes */
const quotes = [
  "In a world full of temporary things, you are a perpetual feeling.",
  "You are my today and all of my tomorrows, Sathi.",
  "Some people make the world more special just by being in it — you are one of them.",
  "Happy Birthday to the person who makes my heart smile every single day.",
  "May your day be as beautiful as your soul and as bright as your smile.",
  "You are not just my friend — you are my favorite notification.",
  "Distance means so little when someone means so much.",
  "On your birthday, I wish you all the happiness your heart can hold, and then some more."
];
let qIndex = 0, qChar = 0, qDeleting = false;
const quoteEl = document.getElementById('quoteText');
const dotsEl = document.getElementById('quoteDots');
quotes.forEach((_,i)=>{ const s=document.createElement('span'); if(i===0) s.classList.add('active'); dotsEl.appendChild(s); });
function typeQuote(){
  const current = quotes[qIndex];
  if(!qDeleting){
    quoteEl.textContent = current.slice(0, qChar+1);
    qChar++;
    if(qChar === current.length){ qDeleting = true; setTimeout(typeQuote, 2200); return; }
  } else {
    quoteEl.textContent = current.slice(0, qChar-1);
    qChar--;
    if(qChar === 0){ qDeleting = false; qIndex = (qIndex+1)%quotes.length; updateDots(); }
  }
  setTimeout(typeQuote, qDeleting ? 35 : 60);
}
function updateDots(){ [...dotsEl.children].forEach((d,i)=> d.classList.toggle('active', i===qIndex)); }
typeQuote();
/* Audio player */
const bgAudio = document.getElementById('bgAudio');
let musicPlaying = false;
function updateMusicBtn(){ const btn=document.getElementById('musicToggle'); btn.textContent = musicPlaying ? '🔊' : '🔇'; }
function playMusic(){ bgAudio.play().then(()=>{ musicPlaying=true; updateMusicBtn(); }).catch(()=>{ musicPlaying=false; updateMusicBtn(); }); }
function pauseMusic(){ bgAudio.pause(); musicPlaying=false; updateMusicBtn(); }
document.getElementById('musicToggle').addEventListener('click', ()=>{ musicPlaying ? pauseMusic() : playMusic(); });

/* Built-in photos (auto-loaded) */
const BUILTIN_PHOTOS = ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg'];
function loadBuiltinPhotos(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  grid.innerHTML = '';
  BUILTIN_PHOTOS.forEach((src,i)=>{
    const card = document.createElement('div');
    card.className = 'gallery-card';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Memory ' + (i+1);
    img.onerror = function(){ card.style.display = 'none'; };
    card.appendChild(img);
    grid.appendChild(card);
  });
}

/* Enter */
let siteEntered = false;
function enterSite(){
  if(siteEntered) return;
  siteEntered = true;
  document.getElementById('gate').style.display='none';
  document.getElementById('main').classList.remove('hidden');
  launchConfetti(120);
}
// Try automatic playback + enter on visit
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
function initSite(){
  loadBuiltinPhotos();
  bgAudio.play().then(()=>{ musicPlaying=true; updateMusicBtn(); enterSite(); }).catch(()=>{ /* keep gate as fallback */ });
}
// Fallback: any first interaction starts music + enters
document.addEventListener('click', ()=>{
  if(!musicPlaying) playMusic();
  if(!siteEntered) enterSite();
}, { once: true });
document.getElementById('enterBtn').addEventListener('click', ()=>{
  enterSite();
  playMusic();
});

/* Birthday gift */
document.getElementById('giftBtn').addEventListener('click', ()=>{
  const btn = document.getElementById('giftBtn');
  const reveal = document.getElementById('giftReveal');
  btn.disabled = true;
  btn.textContent = '🎁 Opened!';
  reveal.classList.remove('hidden');
  reveal.classList.add('show');
  launchConfetti(150);
  burstEmojis();
});
/* Cake */
let cakeCut = false;
document.getElementById('cutBtn').addEventListener('click', cutCake);
document.getElementById('cake').addEventListener('click', cutCake);
function cutCake(){
  if(cakeCut) return;
  cakeCut = true;
  const cake = document.getElementById('cake');
  cake.classList.add('cut');
  // wind blows the first photo away
  const photoLeft = document.getElementById('photoLeft');
  if(photoLeft) photoLeft.classList.add('blow-away');
  const smoke = document.createElement('div');
  smoke.className = 'smoke';
  smoke.textContent = '💨';
  cake.appendChild(smoke);
  document.getElementById('cutBtn').disabled = true;
  const msg = document.getElementById('cakeMsg');
  const msgs = ["Make a wish! ✨","Yay! Happy Birthday Sathi! 🎂🎉","You are loved! 💖","Best year yet! 🌟"];
  msg.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  launchConfetti(200);
  burstEmojis();
}
function burstEmojis(){
  const emojis = ['🎉','🎊','💖','✨','🎂','🌸','🦋','👑','😘','❤️','🐱','🥧','🐱','🥧'];
  for(let i=0;i<30;i++){
    const e = document.createElement('div');
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.position='fixed';
    e.style.left = (40 + Math.random()*20) + 'vw';
    e.style.top = '50vh';
    e.style.fontSize = (1.5 + Math.random()*2) + 'rem';
    e.style.zIndex = 70;
    e.style.pointerEvents='none';
    e.style.transition = 'all 1.6s cubic-bezier(.2,.8,.2,1)';
    document.body.appendChild(e);
    requestAnimationFrame(()=>{
      e.style.transform = `translate(${(Math.random()-0.5)*60}vw, ${(Math.random()-1)*60}vh) rotate(${Math.random()*720}deg)`;
      e.style.opacity = '0';
    });
    setTimeout(()=>e.remove(), 1700);
  }
}

/* Confetti */
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function launchConfetti(count){
  const colors = ['#ff6b9d','#ffd166','#a855f7','#ffffff','#ff3d7f','#7afcff'];
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: -20 - Math.random()*canvas.height*0.3,
      vx: (Math.random()-0.5)*6,
      vy: 2 + Math.random()*4,
      size: 6 + Math.random()*8,
      color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*Math.PI*2,
      vr: (Math.random()-0.5)*0.2,
      life: 0,
      maxLife: 120 + Math.random()*60,
      shape: Math.random() < 0.5 ? 'rect' : 'circle'
    });
  }
  if(!animating){ animating = true; animateConfetti(); }
}
let animating = false;
function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles = particles.filter(p=>{
    p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.rot += p.vr; p.life++;
    if(p.y > canvas.height + 20 || p.life > p.maxLife) return false;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life/p.maxLife);
    if(p.shape === 'rect'){ ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2); }
    else { ctx.beginPath(); ctx.arc(0,0,p.size/3,0,Math.PI*2); ctx.fill(); }
    ctx.restore();
    return true;
  });
  if(particles.length > 0){ requestAnimationFrame(animateConfetti); }
  else { animating = false; ctx.clearRect(0,0,canvas.width,canvas.height); }
}

