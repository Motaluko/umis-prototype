window.UMISPages = (() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const titleCase = s => s.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  function tools(title, tab = title) {
    return `<div class="tab-strip"><span class="tab active">${tab}</span></div><section class="data-panel"><div class="panel-heading"><h1><span>☷</span> ${title}</h1><div class="panel-tools"><button class="tool-button" data-refresh>⟳ Refresh</button><button class="tool-button" data-export>▧ Export</button><button class="tool-button" data-export>▧ Excel</button><button class="tool-button" data-export>▣ Pdf</button><button class="expand-button" aria-label="Expand">↗</button></div></div>`;
  }
  function grid(headers, rows, selected, key) {
    return `<div class="grid-scroll"><table><thead><tr><th class="check-col"><input type="checkbox" data-select-all aria-label="Select all rows"></th>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><td class="check-col"><input type="checkbox" name="row-select" value="${esc(row.id)}" ${selected.has(row.id)?'checked':''} aria-label="Select ${esc(row.name||row.title||row.id)}"></td>${row.cells.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function searchbar(fields) {
    return `<div class="searchbar"><select aria-label="Search field">${fields.map(x=>`<option>${esc(x)}</option>`).join('')}</select><select aria-label="Search match"><option>Contains (case insensitive)</option><option>Equals</option><option>Starts with</option></select><input type="search" aria-label="Search records"><label><input type="checkbox"> And</label><label><input type="checkbox"> Or</label><button class="search-button">Search</button></div>`;
  }
  function selectionPage({route,title,headers,rows,selectionLabel,field,fields,action}) {
    const stored=UMISStore.get(); const saved = field==='courses' ? stored.courses : (stored[field] ? [stored[field]] : []);
    const selected=new Set(saved); const data=rows.map(r=>({...r,cells:r.cells}));
    let body=tools(title);
    body+=grid(headers,data,selected,field);
    body+=`<div class="actionbar"><select id="bulk-action" aria-label="Select action"><option value="">Select</option><option value="${action}">${action}</option></select><button class="action-button" id="confirm-action">Action</button></div>`;
    body+=searchbar(fields); body+=`<div class="panel-bottom"></div></section>`;
    return body;
  }
  function meal() {
    const rows=UMISData.meals.map(m=>({id:m.id,name:m.name,cells:[m.name,m.detail]}));
    return selectionPage({route:'meal',title:'Select Meal',headers:['Selection','Details'],rows,field:'meal',fields:['Selection'],action:'Confirm Selection'});
  }
  function residence() {
    const rows=UMISData.residences.map(r=>({id:r.id,name:r.name,cells:[r.id,r.name,r.capacity,r.space,r.min,r.max]}));
    return selectionPage({route:'residence',title:'Residence Selection',headers:['Residence ID','Residence Name','Capacity','Available Space','Minimum Level','Maximum Level'],rows,field:'residence',fields:['Residence ID','Residence Name'],action:'Confirm Selection'});
  }
  function worship() {
    const rows=UMISData.worship.map(r=>({id:r.id,name:r.name,cells:[r.name,r.location,r.pastor,r.space]}));
    return selectionPage({route:'worship',title:'Worship Center',headers:['Worship Center','Location On Campus','Pastor In Charge','Space Left'],rows,field:'worship',fields:['Worship Center'],action:'Confirm Selection'});
  }
  function courses() {
    const rows=UMISData.courses.map(r=>({id:r.id,title:r.title,cells:[r.year,r.id,r.title,r.instructor,r.option,r.credit,r.noGpa?'Yes':'No']}));
    return selectionPage({route:'courses',title:'Select Courses',headers:['Year Taken','Course ID','Course Title','Instructor','Option','Credit','No GPA'],rows,field:'courses',fields:['Year Taken','Course ID','Course Title'],action:'Confirm Courses'});
  }
  function notice() {
    return `<section class="notice-card"><h2>NOTIFICATION</h2><div class="notice-table"><b>Title</b><b>Notice</b><span>Greetings!</span><div><strong>Welcome to your UMIS page!</strong><p>It is recommended to use Laptop, or Desktop to do your registration.</p><p>To complete your registration, you must complete the following:</p><p>Step 1: Course Selection</p><p>Step 2: <a href="#/commence">Commence Registration</a></p><p>Follow on-screen passing (Meal, Residence, Worship center, and Courses).</p><p>Do not jump the processes.</p><p>Step 3: Finance Statement</p><p>Step 4: Select Payments</p><p>Step 5: Current Charges</p><p>DO NOT be a victim of fraud while paying your school fees.</p><em>-- from BU UMIS Office.</em></div></div><div class="quick-links"><a class="primary-button" href="#/courses">Select Courses</a><a class="primary-button" href="#/commence">Commence Registration</a></div></section>`;
  }
  function login() {
    return `<section class="login-screen"><div class="login-box"><div class="login-form"><h1>Student Login</h1><p>Sign In to your account</p><label class="login-field"><span>♙</span><input value="${esc(UMISData.student.matric)}" aria-label="Student ID" autocomplete="username"></label><label class="login-field"><span>♙</span><input id="login-password" type="password" value="umisstudent" aria-label="Password" autocomplete="current-password"></label><label class="show-password"><input id="show-password" type="checkbox"> Show Password</label><div class="login-actions"><button class="login-button" id="login-submit">⇥ &nbsp; Login</button><button class="forgot-button" id="forgot-password">Forgot password?</button></div></div><div class="login-brand"><div class="university"><span class="crest">BU<br><small>UNIVERSITY</small><br>⌂</span><span><u>BABCOCK UNIVERSITY</u><br><span>UMIS</span></span></div><p>We want to make it easy for our lecturers, students, alumnae and employers to access information as securely and accurately as possible.</p><a class="home-button" href="#/dashboard">⌂ &nbsp; Home</a></div></div></section>`;
  }
  function commence() {
    const s=UMISStore.get();
    return `<section class="welcome-card"><div class="welcome-icon">▦</div><div><span class="eyebrow">2026/2027 · Semester 1</span><h1>Commence Registration</h1><p>Begin your semester registration. Your choices are saved to this browser as you confirm each step.</p><div class="student-summary"><span><small>Student</small>${UMISData.student.name}</span><span><small>Matriculation no.</small>${UMISData.student.matric}</span><span><small>Programme</small>${UMISData.student.programme}</span></div><button class="primary-button" id="start-registration">${s.commenced?'Continue Registration':'Commence Registration'} <span>→</span></button></div></section>`;
  }
  function statusPage() {
    const s=UMISStore.get(); const display={semester:UMISData.student.semester,'study level':UMISData.student.level,residence:s.residence?UMISData.residences.find(x=>x.id===s.residence)?.name:'Not selected','submitted registration':'No',finance:'Yes',overload:'No','course advisor':'No','student development':'No',registry:'No','registration printed':'No','reason for no approved':''};
    const rows=Object.entries(display).map(([k,v])=>`<tr><td>${titleCase(k)}</td><td>${esc(v)}</td></tr>`).join('');
    return `${tools('Current Registration Status')}<div class="grid-scroll status-grid"><table><tbody>${rows}</tbody></table></div><div class="panel-bottom"></div></section>`;
  }
  function selectedList() {
    const s=UMISStore.get(), courses=UMISData.courses.filter(c=>s.courses.includes(c.id));
    const rows=courses.length?courses.map((c,i)=>`<tr><td>${i+1}</td><td>${esc(c.id)}</td><td>${esc(c.title)}</td><td>${esc(c.instructor)}</td><td>${esc(c.option)}</td><td>${c.credit}</td><td>${c.noGpa?'Yes':'No'}</td></tr>`).join(''):'<tr><td colspan="7" class="empty-state">No courses confirmed yet.</td></tr>';
    return `${tools('Selected Course List')}<div class="grid-scroll"><table><thead><tr><th>Year Taken</th><th>Course ID</th><th>Course Title</th><th>Instructor</th><th>Option</th><th>Credit</th><th>No GPA</th></tr></thead><tbody>${rows}</tbody></table></div><div class="panel-bottom"></div></section>`;
  }
  function placeholder(title, content='This section is shown in the supplied portal navigation. Its full workflow is outside the registration prototype.') {
    return `<section class="placeholder-card"><h2>${title}</h2><p>${content}</p></section>`;
  }
  function bind(route) {
    document.querySelectorAll('[data-refresh]').forEach(b=>b.onclick=()=>{renderRoute(route); UMISToast.show('The latest sample records are displayed.');});
    document.querySelectorAll('[data-export]').forEach(b=>b.onclick=()=>UMISToast.show('Export is simulated for this research prototype.'));
    const all=document.querySelector('[data-select-all]'); if(all) all.onchange=()=>document.querySelectorAll('[name="row-select"]').forEach(c=>c.checked=all.checked);
    const search=document.querySelector('.search-button'); if(search) search.onclick=()=>{
      const q=document.querySelector('.searchbar input[type=search]').value.toLowerCase(); let count=0;
      document.querySelectorAll('tbody tr').forEach(tr=>{const show=tr.textContent.toLowerCase().includes(q); tr.hidden=!show; if(show)count++;});
      UMISToast.show(q?`${count} matching record${count===1?'':'s'} found.`:'Search cleared.');
    };
    const action=document.getElementById('confirm-action'); if(action) action.onclick=()=>{
      const selected=[...document.querySelectorAll('[name="row-select"]:checked')].map(c=>c.value);
      if(!selected.length){UMISToast.show('Select at least one option before confirming.','error');return;}
      if(route!=='courses'&&selected.length>1){UMISToast.show('Select one option only for this step.','error');return;}
      const value=route==='courses'?selected:selected[0]; UMISStore.confirm(route,value);
      UMISToast.show(route==='courses'?`${selected.length} course${selected.length===1?'':'s'} confirmed.`:`${titleCase(route)} selection confirmed.`);
      renderRoute(route);
    };
    const start=document.getElementById('start-registration'); if(start)start.onclick=()=>{UMISStore.commence();location.hash='#/meal';};
    const showPassword=document.getElementById('show-password'); if(showPassword)showPassword.onchange=()=>{document.getElementById('login-password').type=showPassword.checked?'text':'password';};
    const loginButton=document.getElementById('login-submit'); if(loginButton)loginButton.onclick=()=>{location.hash='#/dashboard';};
    const forgot=document.getElementById('forgot-password'); if(forgot)forgot.onclick=()=>UMISToast.show('For this prototype, contact the student portal administrator to reset access.','error');
  }
  function renderRoute(route) {
    const map={dashboard:notice,login,commence,meal,residence,worship,courses,selected:selectedList,status:statusPage,school:()=>placeholder('School'),personal:()=>placeholder('Personal Details',`${UMISData.student.name} · ${UMISData.student.matric}`),academic:()=>placeholder('Academic Details',`${UMISData.student.programme} · Level ${UMISData.student.level}`),timetable:()=>placeholder('Selected Timetable'),outstanding:()=>placeholder('Outstanding Courses'),submit:()=>placeholder('Submit Registration','Course selection, meal, residence, and worship centre choices are retained in your browser for this prototype.')};
    const content=(map[route]||notice)(); UMISShell.render(route,content); bind(route);
  }
  return { renderRoute };
})();
