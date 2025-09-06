// ---------- Données ----------
const QUIZ = [
  // ---------- VOCABULAIRE (10)
  {cat:'vocabulaire', q:'Choisissez le synonyme de “rapide” :', opts:['lent','vite','tard','lourd'], a:1},
  {cat:'vocabulaire', q:'Le mot “boulangerie” désigne :', opts:['un médecin','un lieu où l’on vend du pain','une école','un marché en plein air'], a:1},
  {cat:'vocabulaire', q:'Complétez : “J’ai besoin d’_____ pour écrire.”', opts:['une règle','un stylo','un sac','un verre'], a:1},
  {cat:'vocabulaire', q:'Quel est l’intrus ?', opts:['chaise','table','fenêtre','manger'], a:3},
  {cat:'vocabulaire', q:'“Bon marché” signifie :', opts:['cher','gratuit','peu coûteux','neuf'], a:2},
  {cat:'vocabulaire', q:'Traduisez : “dog” en français', opts:['chat','chien','souris','oiseau'], a:1},
  {cat:'vocabulaire', q:'Quel est le contraire de “petit” ?', opts:['grand','léger','rapide','gros'], a:0},
  {cat:'vocabulaire', q:'Complétez : “Je bois de l’_____ tous les matins.”', opts:['eau','pain','lait','jus'], a:2},
  {cat:'vocabulaire', q:'Quel mot appartient au champ lexical de la cuisine ?', opts:['casserole','stylo','chaussure','fenêtre'], a:0},
  {cat:'vocabulaire', q:'“Bibliothèque” signifie :', opts:['endroit pour dormir','endroit pour lire et emprunter des livres','endroit pour cuisiner','endroit pour jouer'], a:1},

  // ---------- GRAMMAIRE (10)
  {cat:'grammaire', q:'Accordez correctement : “Les étudiant__ sont motivé__”.', opts:['s / s','x / s','s / es','s / s'], a:0},
  {cat:'grammaire', q:'Choisissez l’article : ___ université', opts:['le','la','l’','les'], a:2},
  {cat:'grammaire', q:'Lequel est une préposition ?', opts:['rapidement','dans','beau','hier'], a:1},
  {cat:'grammaire', q:'Pluriel de “un cheval” :', opts:['des chevals','des chevaux','des chevales','des chevaus'], a:1},
  {cat:'grammaire', q:'Place correcte du pronom : “Je ___ vois demain.”', opts:['te','toi','tu','t’'], a:0},
  {cat:'grammaire', q:'Transformez au féminin : “un acteur” →', opts:['une actrice','une acteur','une actricee','une acteuress'], a:0},
  {cat:'grammaire', q:'Quelle est la bonne phrase ?', opts:['Il a mangé la pomme.','Il a manger la pomme.','Il a mangés la pomme.','Il a mangées la pomme.'], a:0},
  {cat:'grammaire', q:'Choisissez : “Elle ___ jolie.”', opts:['est','es','sont','étais'], a:0},
  {cat:'grammaire', q:'Quel est l’adverbe dans “Il parle doucement” ?', opts:['Il','parle','doucement','—'], a:2},
  {cat:'grammaire', q:'Le pluriel de “journal” est :', opts:['journales','journals','journaux','journaleses'], a:2},

  // ---------- CONJUGAISON (10)
  {cat:'conjugaison', q:'Présent : “nous (aller)”', opts:['nous allons','nous allez','nous va','nous irons'], a:0},
  {cat:'conjugaison', q:'Imparfait : “il (faire)”', opts:['il a fait','il fit','il faisait','il fera'], a:2},
  {cat:'conjugaison', q:'Passé composé : “elles (arriver)”', opts:['elles arrivèrent','elles sont arrivées','elles arrivaient','elles seront arrivées'], a:1},
  {cat:'conjugaison', q:'Futur simple : “je (pouvoir)”', opts:['je peux','je pourrai','je pouvais','je pourrais'], a:1},
  {cat:'conjugaison', q:'Subjonctif : “il faut que tu (venir)”', opts:['viens','viendras','viennes','venais'], a:2},
  {cat:'conjugaison', q:'Présent : “ils (finir)”', opts:['ils finissent','ils finis','ils finisaient','ils finiront'], a:0},
  {cat:'conjugaison', q:'Imparfait : “nous (avoir)”', opts:['nous avons','nous aurons','nous avions','nous avoir'], a:2},
  {cat:'conjugaison', q:'Passé composé : “tu (prendre)”', opts:['tu prendras','tu prenais','tu as pris','tu prends'], a:2},
  {cat:'conjugaison', q:'Futur simple : “elle (voir)”', opts:['elle verra','elle voyait','elle voit','elle a vu'], a:0},
  {cat:'conjugaison', q:'Conditionnel : “nous (vouloir)”', opts:['nous voulons','nous voulions','nous voudrions','nous voudrions'], a:2},
];



const CAT_LABELS = {vocabulaire:'Vocabulaire', grammaire:'Grammaire', conjugaison:'Conjugaison'};
const STEPS = ['vocabulaire','grammaire','conjugaison','resultats']; // ← 4ᵉ étape "resultats"
let currentStep = 0;

// on mémorise les réponses pour conserver l’état en changeant d’étape
const ANSWERS = { vocabulaire:{}, grammaire:{}, conjugaison:{} };

// ---------- Utilitaires ----------
function scoreToCEFR(pct){
  if (pct < 26) return 'A1';
  if (pct < 41) return 'A2';
  if (pct < 56) return 'B1';
  if (pct < 71) return 'B2';
  if (pct < 86) return 'C1';
  return 'C2';
}
function questions(cat){ return QUIZ.filter(q=>q.cat===cat); }

function renderSteps(){
  return STEPS.map((s,idx)=>`
    <span class="step-pill ${idx===currentStep?'active':''}">
      ${idx+1}/${STEPS.length} · ${s==='resultats'?'Résultats':CAT_LABELS[s]}
    </span>`).join('');
}

// ---------- Rendu des étapes ----------
function renderSection(cat){
  const qs = questions(cat);
  return `
    <section class="card quiz-section" data-cat="${cat}">
      <h4 style="margin-top:0">${CAT_LABELS[cat]} <span class="small">(${qs.length} questions)</span></h4>
      ${qs.map((q,i)=>{
        const saved = ANSWERS[cat][i];
        const id = `${cat}-${i}`;
        return `
          <div class="q">
            <div class="q-text">${q.q}</div>
            <div class="q-opts">
              ${q.opts.map((opt,idx)=>`
                <label class="opt">
                  <input type="radio" name="${id}" value="${idx}" ${saved===idx?'checked':''}>
                  <span>${opt}</span>
                </label>`).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </section>`;
}

function attachAnswerListeners(cat){
  const qs = questions(cat);
  qs.forEach((_,i)=>{
    const name = `${cat}-${i}`;
    document.querySelectorAll(`input[name="${name}"]`).forEach(inp=>{
      inp.addEventListener('change', ()=>{ ANSWERS[cat][i] = parseInt(inp.value,10); });
    });
  });
}

// ---------- Calcul + rendu résultats (comme un volet) ----------
function computeResults(){
  let correct = 0, totals = 0;
  const byCat = {vocabulaire:{c:0,t:0}, grammaire:{c:0,t:0}, conjugaison:{c:0,t:0}};
  const mistakes = [];

  ['vocabulaire','grammaire','conjugaison'].forEach(cat=>{
    const qs = questions(cat);
    qs.forEach((q,i)=>{
      const val = ANSWERS[cat][i];
      totals++; byCat[cat].t++;
      if (val === q.a){ correct++; byCat[cat].c++; }
      else {
        mistakes.push({
          cat,
          q: q.q,
          your: (val!=null) ? q.opts[val] : '(non répondu)',
          good: q.opts[q.a]
        });
      }
    });
  });

  const pct = Math.round(100*correct/totals);
  const level = scoreToCEFR(pct);
  return {correct, totals, pct, level, byCat, mistakes};
}

function renderResults(){
  const {correct, totals, pct, level, byCat, mistakes} = computeResults();

  const donutCirc = 2*Math.PI*90; const dash = donutCirc*(pct/100);
  const bars = ['vocabulaire','grammaire','conjugaison'].map(cat=>{
    const p = byCat[cat].t? Math.round(100*byCat[cat].c/byCat[cat].t):0;
    return `<div>
      <div class="small" style="margin-bottom:6px">${CAT_LABELS[cat]} — <strong>${byCat[cat].c}/${byCat[cat].t}</strong> (${p}%)</div>
      <div class="bar"><span style="width:${p}%"></span></div>
    </div>`;
  }).join('');

  const errs = mistakes.length
    ? mistakes.map(m=>`
        <div class="err">
          <div class="small"><strong>${CAT_LABELS[m.cat]}</strong></div>
          <div style="margin:6px 0">${m.q}</div>
          <div class="small">Ta réponse : <strong>${m.your}</strong></div>
          <div class="small">Bonne réponse : <strong>${m.good}</strong></div>
        </div>`).join('')
    : `<div class="ok">👏 Bravo, aucune erreur !</div>`;

  return `
  <section class="card res-card">
    <h3>Résultat</h3>
    <div class="dash">
      <div class="donut">
        <div class="donut-wrap">
          <svg viewBox="0 0 220 220" aria-label="Score global">
            <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(148,163,184,.25)" stroke-width="24"/>
            <circle cx="110" cy="110" r="90" fill="none"
              stroke="url(#grad)"
              stroke-width="24" stroke-linecap="round"
              stroke-dasharray="${dash} ${donutCirc-dash}"
              transform="rotate(-90 110 110)"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#5b9cff"/>
                <stop offset="100%" stop-color="#a855f7"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="label" style="left:0;right:0;top:50%;transform:translateY(-50%)">
            <div style="font-size:34px">${pct}%</div>
            <div class="small">Niveau <strong>${level}</strong></div>
            <div class="small">${correct}/${totals} bonnes réponses</div>
          </div>
        </div>
      </div>

      <div>
        <div class="bars">${bars}</div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-outline" id="retake" type="button">Recommencer</button>
          <button class="btn btn-outline" id="toggle-errors" type="button">Afficher les erreurs</button>
          <a class="btn btn-primary" href="contact.html#inscription">Demander une évaluation orale</a>
        </div>
        <div class="errors" id="errors">${errs}</div>
      </div>
    </div>
    <div class="small" style="margin-top:10px">⚠️ Test indicatif. Le niveau CECR (A1–C2) se confirme avec une évaluation orale.</div>
  </section>`;
}

// ---------- Navigation ----------
function showStep(){
  // Steps pills
  document.getElementById('steps').innerHTML = renderSteps();

  // Section
  const slot = document.getElementById('section');
  const step = STEPS[currentStep];

  if (step === 'resultats') {
    slot.innerHTML = renderResults();
    // Nav boutons pour résultats
    document.getElementById('prev').style.visibility = 'visible';
    document.getElementById('next').style.display = 'none';
    document.getElementById('finish').style.display = 'none';

    // Actions
    const btnErr = document.getElementById('toggle-errors');
    const boxErr = document.getElementById('errors');
    btnErr.addEventListener('click', ()=>{
      const open = boxErr.classList.toggle('show');
      btnErr.textContent = open ? 'Masquer les erreurs' : 'Afficher les erreurs';
    });
    document.getElementById('retake').addEventListener('click', ()=>{
      // reset réponses
      Object.keys(ANSWERS).forEach(c=>ANSWERS[c]={});
      currentStep = 0;
      showStep();
      window.scrollTo({top:0,behavior:'smooth'});
    });
    window.scrollTo({top:0, behavior:'smooth'});
    return;
  }

  // Étapes QCM
  slot.innerHTML = renderSection(step);
  attachAnswerListeners(step);

  // Boutons nav
  document.getElementById('prev').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
  document.getElementById('next').style.display   = currentStep < STEPS.length-2 ? 'inline-flex' : 'none'; // visible jusqu'à l'avant-dernière étape QCM
  document.getElementById('finish').style.display = currentStep === STEPS.length-2 ? 'inline-flex' : 'none'; // visible sur Conjugaison uniquement
  window.scrollTo({top:0, behavior:'smooth'});
}

function goNext(){ if (currentStep < STEPS.length-1){ currentStep++; showStep(); } }
function goPrev(){ if (currentStep > 0){ currentStep--; showStep(); } }

// ---------- Setup ----------f
document.addEventListener('DOMContentLoaded', () => {
  showStep();

  document.getElementById('next').addEventListener('click', goNext);
  document.getElementById('prev').addEventListener('click', goPrev);

  // "Terminer" : passe à l'étape "resultats" (le calcul se fait dans renderResults)
  document.getElementById('quiz-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    currentStep = STEPS.length - 1; // resultats
    showStep();
  });
});
