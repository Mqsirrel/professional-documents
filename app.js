const state={courses:[],completed:new Set(JSON.parse(localStorage.getItem('cyb-plan-completed')||'[]'))};
const $=s=>document.querySelector(s);

async function init(){
  const res=await fetch('data/courses.json');
  if(!res.ok) throw new Error('Curriculum data could not be loaded');
  const data=await res.json();
  state.courses=data.courses||[];
  const terms=[...new Set(state.courses.map(c=>c.term))].sort((a,b)=>a-b);
  const termSelect=$('#term');
  terms.forEach(term=>termSelect.insertAdjacentHTML('beforeend',`<option value="${term}">Term ${term}</option>`));
  render();
}

function save(){localStorage.setItem('cyb-plan-completed',JSON.stringify([...state.completed]));}
function filtered(){
  const q=$('#search').value.toLowerCase().trim(),term=$('#term').value,status=$('#status').value;
  return state.courses.filter(c=>{
    const matchesQ=!q||`${c.code} ${c.name}`.toLowerCase().includes(q);
    const matchesTerm=term==='all'||String(c.term)===term;
    const done=state.completed.has(c.code);
    const matchesStatus=status==='all'||(status==='completed'&&done)||(status==='remaining'&&!done);
    return matchesQ&&matchesTerm&&matchesStatus;
  });
}

function render(){
  const courses=filtered(),total=state.courses.length,completed=state.completed.size,percent=total?Math.round(completed/total*100):0;
  $('#courseCount').textContent=total;
  $('#creditCount').textContent=state.courses.reduce((sum,c)=>sum+Number(c.credits||0),0);
  $('#completedCount').textContent=completed;
  $('#progress').textContent=`${percent}%`;
  $('.progress-ring').style.setProperty('--p',percent);
  $('#progressMeta').textContent=`${completed} course${completed===1?'':'s'} completed`;
  $('#progressLabel').textContent=percent===0?'Just getting started':percent<25?'Building your foundation':percent<50?'Making good progress':percent<75?'More than halfway there':percent<100?'Final stretch':'Degree complete';

  const root=$('#terms');root.innerHTML='';
  const terms=[...new Set(courses.map(c=>c.term))].sort((a,b)=>a-b);
  terms.forEach(term=>{
    const list=courses.filter(c=>c.term===term),credits=list.reduce((sum,c)=>sum+Number(c.credits||0),0),done=list.filter(c=>state.completed.has(c.code)).length;
    const section=document.createElement('section');section.className='term';
    section.innerHTML=`<div class="term-head"><h2>Term ${term}</h2><span>${done}/${list.length} completed · ${credits} credits</span></div><div class="courses"></div>`;
    const grid=section.querySelector('.courses');list.forEach(c=>grid.appendChild(courseCard(c)));root.appendChild(section);
  });
  if(!root.children.length) root.innerHTML='<div class="empty">No courses match your filters.<br>Try a different search or status.</div>';
}

function courseCard(c){
  const done=state.completed.has(c.code),b=document.createElement('button');
  b.className=`course ${done?'done':''}`;b.setAttribute('aria-label',`${c.code} ${c.name}`);
  b.innerHTML=`<span class="code">${escapeHtml(c.code)}</span><span class="badge">${done?'COMPLETED':escapeHtml(c.type||'COURSE')}</span><h3>${escapeHtml(c.name)}</h3><div class="meta"><span>${c.credits} credit${Number(c.credits)===1?'':'s'}</span><span>${done?'Completed':'View details'}</span></div>`;
  b.addEventListener('click',()=>openCourse(c));return b;
}

function openCourse(c){
  const prereqs=c.prerequisites||[],done=state.completed.has(c.code);
  $('#courseDetails').innerHTML=`<div class="detail"><span class="detail-code">${escapeHtml(c.code)}</span><h2>${escapeHtml(c.name)}</h2><div class="detail-row"><strong>Term</strong>${c.term}</div><div class="detail-row"><strong>Credits</strong>${c.credits}</div><div class="detail-row"><strong>Type</strong>${escapeHtml(c.type||'Course')}</div><div class="detail-row"><strong>Prerequisites</strong>${prereqs.length?prereqs.map(escapeHtml).join(', '):'None listed / not yet verified'}</div><div class="detail-row"><strong>Status</strong>${done?'Completed':'Not completed'}</div><div class="detail-row"><button id="toggleDone" type="button">${done?'Mark as remaining':'Mark as completed'}</button></div></div>`;
  $('#toggleDone').onclick=()=>{done?state.completed.delete(c.code):state.completed.add(c.code);save();$('#courseDialog').close();render();};
  $('#courseDialog').showModal();
}

function escapeHtml(value){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));}

$('#search').addEventListener('input',render);$('#term').addEventListener('change',render);$('#status').addEventListener('change',render);
$('#reset').addEventListener('click',()=>{if(confirm('Reset all course progress?')){state.completed.clear();save();render();}});
$('#closeDialog').addEventListener('click',()=>$('#courseDialog').close());
$('#courseDialog').addEventListener('click',e=>{if(e.target===$('#courseDialog'))$('#courseDialog').close();});
init().catch(err=>{$('#terms').innerHTML='<div class="empty">Could not load curriculum data. Please try refreshing the page.</div>';console.error(err)});
