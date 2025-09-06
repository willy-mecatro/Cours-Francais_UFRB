
function toggleSol(btn){ const s = btn.nextElementSibling; s.classList.toggle('show'); }
function handleSubmit(e){
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent("Demande d'infos — Cours de français");
  const body = encodeURIComponent(`Nom: ${data.get('name')}
Email: ${data.get('email')}

${data.get('message')}`);
  window.location.href = `mailto:domingas@aluno.ufrb.edu.br?subject=${subject}&body=${body}`;
  return false;
}
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('navlinks');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }));
  }
});
