const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width, height, columns, drops;
function resizeMatrix(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 18);
  drops = Array(columns).fill(1);
}
function drawMatrix(){
  ctx.fillStyle = 'rgba(7, 9, 18, 0.10)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '13px monospace';
  for(let i=0;i<drops.length;i++){
    const char = Math.random() > .5 ? '1' : '0';
    ctx.fillStyle = i % 3 === 0 ? '#ff3ca6' : '#39c5ff';
    ctx.fillText(char, i * 18, drops[i] * 18);
    if(drops[i] * 18 > height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
resizeMatrix();
drawMatrix();
window.addEventListener('resize', resizeMatrix);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Optional community invite: paste your real invite URL into JOIN_LINK.
const JOIN_LINK = '';
const joinButton = document.getElementById('join-button');
const joinNote = document.getElementById('join-note');
if (JOIN_LINK.trim()) {
  joinButton.href = JOIN_LINK.trim();
  joinButton.target = '_blank';
  joinButton.rel = 'noopener noreferrer';
  joinNote.textContent = 'You will be redirected to our community invite.';
} else {
  joinButton.addEventListener('click', event => {
    event.preventDefault();
    joinNote.textContent = 'Add your Discord or WhatsApp invite link in script.js to activate this button.';
  });
}
