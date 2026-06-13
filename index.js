// ── THEME TOGGLE ──
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
    const curr = html.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── YEAR ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
    }
    });
}, { threshold: 0.08 });
reveals.forEach(r => observer.observe(r));

// ── GITHUB CONTRIBUTION GRAPH ──
function renderContribGraph() {
    const username = 'vanshbaranwal';
    const gridEl = document.getElementById('contrib-grid');
    const totalEl = document.getElementById('contrib-total');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const bg      = isDark ? '0e1012' : 'F8F9FA';
    const border  = isDark ? '212529' : 'DEE2E6';
    const text    = isDark ? 'ADB5BD' : '495057';
    const title   = isDark ? 'F8F9FA' : '212529';
    const c0      = isDark ? '1c2125' : 'eaedef';
    const c1      = isDark ? '2d3b44' : 'c5ced4';
    const c2      = isDark ? '3d5563' : '9aaab3';
    const c3      = isDark ? '4d6f7f' : '6b8391';
    const c4      = isDark ? 'ADB5BD' : '495057';

    // Update legend boxes to match theme
    const legendColors = [`#${c1}`, `#${c2}`, `#${c3}`, `#${c4}`];
    ['l1','l2','l3','l4'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.style.background = legendColors[i];
    });

    totalEl.textContent = 'github.com/vanshbaranwal';

    // github-readme-stats contribution graph — reliable, no CORS issues
    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&hide_title=false&hide_border=true&bg_color=${bg}&text_color=${text}&icon_color=${c3}&title_color=${title}&ring_color=${c3}&hide=prs,issues,contribs&show=reviews,discussions_started&custom_title=Contribution+Overview`;

    // streak stats for the calendar heatmap feel
    const streakUrl = `https://streak-stats.demolab.com?user=${username}&theme=transparent&hide_border=true&background=${bg}&ring=${c3}&fire=${c4}&currStreakLabel=${text}&sideLabels=${text}&dates=${text}&stroke=${border}&currStreakNum=${title}&sideNums=${title}`;

    gridEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
        <img
        src="${streakUrl}"
        alt="GitHub streak stats"
        style="width:100%; border-radius:4px; display:block;"
        onerror="this.style.display='none'"
        />
        <img
        src="${statsUrl}"
        alt="GitHub stats"
        style="width:100%; border-radius:4px; display:block;"
        onerror="this.style.display='none'"
        />
    </div>
    `;
}

renderContribGraph();

toggle.addEventListener('click', () => {
    setTimeout(renderContribGraph, 50);
});