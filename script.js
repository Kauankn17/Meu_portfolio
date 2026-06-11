/* =============================================================================
   PORTFÓLIO — KAUAN VICTOR  (script.js)
   -----------------------------------------------------------------------------
   Tudo o que esse arquivo faz:
     1. Esconde a tela de loading depois de ~1s
     2. Adiciona classe ".scrolled" na navbar ao rolar
     3. Move o brilho radial que segue o cursor (apenas desktop)
     4. Desenha o canvas de estrelas animadas no fundo
     5. Renderiza dinamicamente os blocos de Skills, Projetos e Trajetória
     6. Anima as barras de skills quando entram em tela (IntersectionObserver)
     7. Trata o formulário de contato (feedback visual ao enviar)
     8. Atualiza o ano automaticamente no rodapé
     9. Controla o mini-player de música (play/pause, volume, expandir)
   ============================================================================= */

/* Aguarda o DOM carregar para garantir que todos os elementos existem */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------
     1. LOADING SCREEN
     Aplica .hidden depois de 900ms para fade-out via CSS,
     e remove o nó da árvore depois de 1600ms.
     ---------------------------------------------------------------------- */
  const loading = document.getElementById('loading-screen');
  setTimeout(() => loading.classList.add('hidden'), 900);
  setTimeout(() => loading.remove(), 1600);


  /* ----------------------------------------------------------------------
     2. NAVBAR COMPACTA NO SCROLL
     ---------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ----------------------------------------------------------------------
     3. CURSOR GLOW (segue o mouse com easing)
     ---------------------------------------------------------------------- */
  const glow = document.getElementById('cursor-glow');
  // matchMedia detecta dispositivos com toque (sem mouse fino)
  if (!window.matchMedia('(pointer: coarse)').matches) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function tick() {
      // Interpolação linear (LERP) para suavizar o movimento
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      requestAnimationFrame(tick);
    })();
  }


  /* ----------------------------------------------------------------------
     4. CANVAS DE ESTRELAS
     ---------------------------------------------------------------------- */
  const canvas = document.getElementById('stars');
  const ctx    = canvas.getContext('2d');
  let w, h;
  const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
  resize();
  addEventListener('resize', resize);

  // Cria 90 partículas com posição, velocidade, tamanho e cor aleatórios
  const particles = Array.from({ length: 90 }, () => ({
    x:  Math.random() * w,
    y:  Math.random() * h,
    r:  Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    a:  Math.random() * 0.6 + 0.2,
    hue: Math.random() > 0.5 ? 285 : 240,
  }));

  // Loop de animação
  (function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      // Atualiza posição e faz wrap nas bordas
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

      // Cria gradiente radial para dar efeito de brilho
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `oklch(0.85 0.2 ${p.hue} / ${p.a})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })();


  /* ----------------------------------------------------------------------
     5. CONTEÚDO DINÂMICO (skills, projetos, timeline)
     Manter os dados em arrays facilita atualizar o site sem mexer no HTML.
     ---------------------------------------------------------------------- */
  const skills = [
    { name: 'Java',              level: 40 },
    { name: 'Python',            level: 100 },
    { name: 'JavaScript',        level: 70 },
    { name: 'HTML / CSS',        level: 95 },
    { name: 'Banco de Dados',    level: 80 },
    { name: 'Git / GitHub',      level: 60 },
    { name: 'UI / UX',           level: 65 },
    { name: 'APIs',              level: 10 },
    { name: 'Desenvolvimento Web', level: 67 },
  ];

  const projects = [
    {
      title: 'Jogo de ping pong simples',
      desc:  'Um jogo de ping pong simples feito no ensino medio como um primeiro contato com as linguagens',
      image: 'assets/pingPong.png',
      tech:  ['Html', 'Css', 'JavaScript'],
      github: 'https://github.com/Kauankn17/Jogo-de-PingPong-simples', 
      demo: 'Jogo alinhado/jogo.html',
    },
    {
      title: 'Um site simples da alura',
      desc:  'um site de apresentação simples da alura',
      image: 'assets/alura.png',
      tech:  ['Html', 'Css', 'JavaScript'],
      github: 'https://github.com/Kauankn17/Site-basico-da-alura-Curso-', 
      demo: 'aluraplus-aula04/index.html',
    },
    {
      title: 'Em desenvolvimento...',
      desc:  '...',
      image: 'assets/preto.png',
      tech:  ['???', '???', '???'],
      github: '#', 
      demo: '#',
    },
  ];

  const timelineItems = [
    {
      icon: 'mortarboard',
      year: '2022 — 2025',
      title: 'Ensino médio profissionalizante em Desenvolvimento de Sistemas',
      place: 'Colégio · já finalizado',
      desc:  'introdução ao TI em geral, lógica computacional, programação em python e integração com banco de dados em Mysql',
    },
    {
      icon: 'lightning-charge',
      year: '2025 - 2026',
      title: 'Formatura do colégio e oportunidade de bolsa 100% na Unicesumar',
      place: 'Colégio - Faculdade - Análise e Desenvolvimento de sistemas',
      desc:  'Troca do colégio para uma universidade',
    },
    {
      icon: 'trophy',
      year: '23/05/2025',
      title: 'Hackathon Elotech',
      place: 'Top 2 - R$ 1000.00',
      desc:  'Um mês após minha entrada minha primeira surpresa, segundo lugar em minha primeira participação em um hackathon com outros 5 integrantes em minha equipe'
    },
    {
      icon: 'award',
      year: '2026 - 2027...',
      title: 'Cursando meu curso...',
      place: 'loading...',
      desc:  'To be continue...',
    },
  ];

  // ---- Skills: cria um card por habilidade ----
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = skills.map(s => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="glass glow-hover skill-card" data-level="${s.level}">
        <div class="skill-head">
          <span class="name">${s.name}</span>
          <span class="level">${s.level}%</span>
        </div>
        <div class="skill-bar"><span></span></div>
      </div>
    </div>
  `).join('');

  // ---- Projetos: monta a grade de cards ----
  const projectsGrid = document.getElementById('projects-grid');
  projectsGrid.innerHTML = projects.map(p => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="glass glow-hover project-card">
        <div class="project-image">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
          <div class="project-actions">
            <a class="btn-outline" href="${p.github}"><i class="bi bi-github"></i> GitHub</a>
            <a class="btn-gradient btn-sm-pill" href="${p.demo}">Demo <i class="bi bi-box-arrow-up-right"></i></a>
          </div>
        </div>
      </article>
    </div>
  `).join('');

  // ---- Timeline ----
  const timelineEl = document.getElementById('timeline');
  timelineEl.innerHTML = timelineItems.map(it => `
    <li>
      <span class="marker"><i class="bi bi-${it.icon}"></i></span>
      <div class="glass glow-hover card-item">
        <div class="year">${it.year}</div>
        <h3 class="title">${it.title}</h3>
        <div class="place">${it.place}</div>
        <p class="desc">${it.desc}</p>
      </div>
    </li>
  `).join('');


  /* ----------------------------------------------------------------------
     6. ANIMAÇÃO DAS BARRAS DE SKILLS AO ENTRAR NA VIEWPORT
     ---------------------------------------------------------------------- */
  const skillCards = document.querySelectorAll('.skill-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const bar  = card.querySelector('.skill-bar > span');
        // Aplica width = nível% para animar a barra
        bar.style.width = card.dataset.level + '%';
        io.unobserve(card); // anima apenas uma vez
      }
    });
  }, { threshold: 0.25 });
  skillCards.forEach(c => io.observe(c));


  /* ----------------------------------------------------------------------
     7. FORMULÁRIO DE CONTATO
     Simula o envio com feedback visual (não envia para servidor).
     ---------------------------------------------------------------------- */
  const form = document.getElementById('contact-form');
const submit = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) return;

  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const assunto = document.getElementById('subject').value;
  const mensagem = document.getElementById('message').value;

  const corpo = encodeURIComponent(
    `${mensagem}`
  );

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=kauanferrarekm7@gmail.com` +
    `&su=${encodeURIComponent(assunto)}` +
    `&body=${corpo}`;

  window.open(gmailUrl, '_blank');

  submit.innerHTML = '<span>Mensagem enviada ✓</span>';

  setTimeout(() => {
    submit.innerHTML =
      '<span>Enviar mensagem</span> <i class="bi bi-send"></i>';

    form.reset();
  }, 3000);
});


  /* ----------------------------------------------------------------------
     8. ANO ATUAL NO RODAPÉ
     ---------------------------------------------------------------------- */
  document.getElementById('footer-year').textContent =
    `© ${new Date().getFullYear()} © Kauan Victor — feito com café, MUITO energético e código`;


  /* ----------------------------------------------------------------------
     9. MUSIC PLAYER
     ---------------------------------------------------------------------- */
  const player  = document.getElementById('music-player');
  const audio   = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volume  = document.getElementById('volume');

  // Volume inicial
  audio.volume = 0.5;

  // Expandir ao passar o mouse
  player.addEventListener('mouseenter', () => player.classList.add('expanded'));
  player.addEventListener('mouseleave', () => player.classList.remove('expanded'));

  // Play / Pause
  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        player.classList.add('playing');
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      } else {
        audio.pause();
        player.classList.remove('playing');
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    } catch {
      // O arquivo de música pode não existir — falha em silêncio
      player.classList.remove('playing');
    }
  });

  // Slider de volume
  volume.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
    audio.muted  = false;
    muteBtn.innerHTML = audio.volume === 0
      ? '<i class="bi bi-volume-mute"></i>'
      : '<i class="bi bi-volume-up"></i>';
  });

  // Botão de mute
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted
      ? '<i class="bi bi-volume-mute"></i>'
      : '<i class="bi bi-volume-up"></i>';
  });
});
// fecha o menu mobile ao clicar em qualquer link dele
const mobileMenu = document.getElementById('mobile-menu');
const bsCollapse = new bootstrap.Collapse(mobileMenu, { toggle: false });

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    bsCollapse.hide();
  });
});