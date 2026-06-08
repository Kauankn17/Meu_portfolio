# Portfólio — Kauan Victor (HTML + CSS + JS + Bootstrap)

Versão 100% estática do portfólio, escrita em **HTML5**, **CSS3**, **JavaScript puro** e **Bootstrap 5**. Sem build, sem framework — abra `index.html` direto no navegador.

## Estrutura

```
portfolio-kauan/
├─ index.html      ← Marcação semântica de todas as seções (com comentários explicativos)
├─ styles.css      ← Design system, animações e responsividade (organizado por seção)
├─ script.js       ← Interações: loading, navbar, estrelas, skills, player, formulário
├─ assets/         ← Imagens (hero + 3 projetos)
└─ music/          ← (opcional) coloque aqui matchmakers.mp3 para o player tocar
```

## Como rodar

1. Baixe a pasta inteira.
2. Abra `index.html` no navegador — pronto.
   - Para o player de música funcionar, crie `music/matchmakers.mp3` com a faixa.
   - Para evitar bloqueio de `file://` em alguns navegadores, sirva com:
     ```bash
     python3 -m http.server 8080
     ```
     e acesse `http://localhost:8080`.

## Onde editar cada coisa

| O quê                  | Onde                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| Nome / textos do hero  | `index.html` → seção `(5) HERO`                                      |
| Lista de skills        | `script.js` → array `skills`                                         |
| Lista de projetos      | `script.js` → array `projects`                                       |
| Linha do tempo         | `script.js` → array `timelineItems`                                  |
| Cores / fontes         | `styles.css` → bloco `:root` (tokens de design)                      |
| Links de redes sociais | `index.html` → seção `(10) CONTATO`, blocos `<a class="social-chip">` |

## Bibliotecas externas (via CDN)

- Bootstrap 5.3.3 (grid + utilitários)
- Bootstrap Icons 1.11.3 (ícones)
- Google Fonts: Space Grotesk, Inter, Instrument Serif
