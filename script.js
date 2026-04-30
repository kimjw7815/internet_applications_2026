document.addEventListener('DOMContentLoaded', () => {
  // 1. 헤더와 푸터 로드
  loadComponent('header-root', 'header.html', initTheme);
  loadComponent('footer-root', 'footer.html', updateYear);

  function loadComponent(id, file, callback) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (callback) callback();
      })
      .catch(err => console.error(`${file} 로드 실패:`, err));
  }

  // 2. 테마 전환 로직
  function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // 저장된 테마 확인 (없으면 기본 dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }

  // 3. 푸터 연도 업데이트[cite: 6]
  function updateYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
});
