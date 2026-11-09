window.UMISShell = (() => {
  const icons = { Dashboard:'⌂', 'School Info':'♜', 'Personal Details':'♙', 'Academic Details':'▤', Registration:'☷', Finance:'▣', 'Commence Registration':'▦', 'Select Courses':'▤', 'Select Meal Type':'▧', 'Select Residence':'▦', 'Worship Center':'▦', 'Selected Course List':'▤', 'Selected Timetable':'▦', 'Outstanding Courses':'▤', 'Submit Registration':'➤' };
  const registration = [
    ['Commence Registration','commence'], ['Select Courses','courses'], ['Select Meal Type','meal'], ['Select Residence','residence'], ['Worship Center','worship'],
    ['Selected Course List','selected'], ['Selected Timetable','timetable'], ['Outstanding Courses','outstanding'], ['Submit Registration','submit']
  ];
  const main = [['Dashboard','dashboard'],['School Info','school'],['Personal Details','personal'],['Academic Details','academic']];
  function link(label, route, active) { return `<a class="side-link ${route===active?'active':''}" href="#/${route}"><span class="side-icon">${icons[label]||'•'}</span><span>${label}</span></a>`; }
  function render(route, content) {
    document.body.classList.toggle('login-route', route === 'login');
    const regOpen = ['commence','courses','meal','residence','worship','selected','timetable','outstanding','submit','status'].includes(route);
    document.getElementById('app').innerHTML = `
      <header class="topbar"><button class="hamburger" id="menu-toggle" aria-label="Toggle menu">☰</button><div class="brand"><span class="brand-mark">✺</span><span><b>open</b>baraza<small>By Dew Cis Solutions</small></span></div><div class="identity"><span>${UMISData.student.campus} &nbsp;|&nbsp; ${UMISData.student.name}</span><span class="avatar">●</span></div></header>
      <aside class="sidebar" id="sidebar"><nav>${main.map(x=>link(x[0],x[1],route)).join('')}
        <button class="side-group ${regOpen?'group-open':''}" id="reg-toggle"><span class="side-icon">☷</span><span>Registration</span><span class="chevron">${regOpen?'⌄':'‹'}</span></button>
        <div class="subnav ${regOpen?'':'hidden'}">${registration.map(x=>link(x[0],x[1],route)).join('')}</div>
        <button class="side-group" id="finance-toggle"><span class="side-icon">▣</span><span>Finance</span><span class="chevron">‹</span></button>
        <div class="online-exam">➤ ONLINE EXAM</div>
      </nav></aside>
      <main class="main-area"><div class="page-content">${content}</div></main>
      <footer>2022 © openBaraza <a>Dew Cis Solutions Ltd</a> All Rights Reserved</footer>`;
    document.getElementById('menu-toggle').onclick = () => document.body.classList.toggle('sidebar-collapsed');
    document.getElementById('reg-toggle').onclick = () => document.querySelector('.subnav').classList.toggle('hidden');
    document.getElementById('finance-toggle').onclick = () => UMISToast.show('Finance pages are outside this registration prototype.', 'error');
    document.querySelectorAll('.side-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); location.hash=a.getAttribute('href');}));
  }
  return { render };
})();
