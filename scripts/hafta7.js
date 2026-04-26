/* ════════════════════════════════════════════════════════════════
   hafta7.js  –  Tema değiştirme & Form özeti
   ════════════════════════════════════════════════════════════════ */

// ── 1. TEMA DEĞİŞTİRME ───────────────────────────────────────────
const themeBtn = document.getElementById('themeToggleBtn');
let darkMode = false;

themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  themeBtn.textContent = darkMode ? 'Açık Temaya Geç' : 'Koyu Temaya Geç';
});

// ── 2. FORM ÖZET ÜRETİMİ ─────────────────────────────────────────
const form = document.getElementById('applicationForm');
const resultArea = document.getElementById('resultArea');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name    = document.getElementById('fullName').value.trim();
  const email   = document.getElementById('email').value.trim();
  const dept    = document.getElementById('department').value;
  const why     = document.getElementById('whyJoin').value.trim();
  const agree   = document.getElementById('agreeTerms').checked;

  // Doğrulama
  if (!name || !email || !dept || !why) {
    showAlert('danger', 'Lütfen tüm zorunlu alanları doldurun.');
    return;
  }
  if (!agree) {
    showAlert('danger', 'Katılım koşullarını kabul etmeniz gerekmektedir.');
    return;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    showAlert('danger', 'Geçerli bir e-posta adresi giriniz.');
    return;
  }

  // Başarılı → özet göster
  resultArea.innerHTML = `
    <div class="alert alert-success fade show" role="alert">
      <h5 class="alert-heading">✓ Başvurunuz Alındı!</h5>
      <p class="mb-0">Aşağıda başvuru özetinizi görebilirsiniz.</p>
    </div>
    <div class="summary-card p-4 rounded mt-3">
      <h6 class="summary-title mb-3">Başvuru Özeti</h6>
      <div class="summary-row"><span class="summary-label">Ad Soyad</span><span class="summary-value">${escHtml(name)}</span></div>
      <div class="summary-row"><span class="summary-label">E-posta</span><span class="summary-value">${escHtml(email)}</span></div>
      <div class="summary-row"><span class="summary-label">Bölüm</span><span class="summary-value">${escHtml(dept)}</span></div>
      <div class="summary-row"><span class="summary-label">Katılım Sebebi</span><span class="summary-value">${escHtml(why)}</span></div>
      <div class="summary-row"><span class="summary-label">Koşullar</span><span class="summary-value text-success fw-semibold">Kabul Edildi ✓</span></div>
    </div>`;
  resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.reset();
});

function showAlert(type, message) {
  resultArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
