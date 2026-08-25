const state={courses:[],completed:new Set(JSON.parse(localStorage.getItem('cyb-plan-completed')||'[]'))};
const $=s=>document.querySelector(s);

async function init(){
  const res=await fetch('data/courses.json');
  const data=await res.json();
  state.courses=data.courses;
  const termSelect=$('#term');
  for(let i=1;i<=10;i++) termSelect.insertAdjacentHTML('beforeend',`<option value="${i}">Term ${i}</option>`);
  render();
}

function save(){localStorage.setItem('cyb-plan-completed',JSON.stringify([...state.completed]));}
function filtered(){
  const q=$('#search').value.toLowerCase().trim();
  const term=$('#term').value;
  const status=$('#status').value;
  return state.courses.filter(c=>{
    const matchesQ=!q||`${c.code} ${c.name}`.toLowerCase().includes(q);
    const matchesTerm=term==='all'||String(c.term)===term;
    const done=state.completed.has(c.code);
    const matchesStatus=status==='all'||(status==='completed'&&done)||(status==='remaining'&&!done);
    return matchesQ&&matchesTerm&&matchesStatus;
  });
}

function render(){
  const courses=filtered();
  $('#courseCount').textContent=state.courses.length;
  $('#creditCount').textContent=state.courses.reduce((s,c)=>s+c.credits,0);
  $('#progress').textContent=`${Math.round(state.completed.size/state.courses.length*100)||0}%`;
  const root=$('#terms');
  root.innerHTML='';
  for(let term=1;term<=10;term++){
    const list=courses.filter(c=>c.term===term);
    if(!list.length) continue;
    const credits=list.reduce((s,c)=>s+c.credits,0);
    const section=document.createElement('section');
    section.className='term';
    section.innerHTML=`<div class="term-head"><h2>Term ${term}</h2><span>${credits} credits shown</span></div><div class="courses"></div>`;
    const grid=section.querySelector('.courses');
    list.forEach(c=>grid.appendChild(courseCard(c)));
    root.appendChild(section);
  }
  if(!root.children.length) root.innerHTML='<div class="empty">No courses match your filters.</div>';
}

function courseCard(c){
  const done=state.completed.has(c.code);
  const b=document.createElement('button');
  b.className=`course ${done?'done':''}`;
  b.innerHTML=`<span class="code">${c.code}</span><span class="badge">${done?'COMPLETED':c.type}</span><h3>${c.name}</h3><div class="meta"><span>${c.credits} credits</span><span>${done?'✓ Done':'Click for details'}</span></div>`;
  b.addEventListener('click',()=>openCourse(c));
  return b;
}

function openCourse(c){
  const prereqs=c.prerequisites||[];
  $('#courseDetails').innerHTML=`<div class="detail"><span class="detail-code">${c.code}</span><h2>${c.name}</h2><div class="detail-row"><strong>Term</strong> ${c.term}</div><div class="detail-row"><strong>Credits</strong> ${c.credits}</div><div class="detail-row"><strong>Type</strong> ${c.type}</div><div class="detail-row"><strong>Prerequisites</strong> ${prereqs.length?prereqs.join(', '):'Not yet verified'}</div><div class="detail-row"><strong>Status</strong> ${state.completed.has(c.code)?'Completed':'Not completed'}</div><div class="detail-row"><button id="toggleDone" type="button">${state.completed.has(c.code)?'Mark as remaining':'Mark as completed'}</button></div></div>`;
  $('#toggleDone').onclick=()=>{state.completed.has(c.code)?state.completed.delete(c.code):state.completed.add(c.code);save();$('#courseDialog').close();render();};
  $('#courseDialog').showModal();
}

$('#search').addEventListener('input',render);
$('#term').addEventListener('change',render);
$('#status').addEventListener('change',render);
$('#reset').addEventListener('click',()=>{state.completed.clear();save();render();});
$('#closeDialog').addEventListener('click',()=>$('#courseDialog').close());
init().catch(err=>{$('#terms').innerHTML=`<div class="empty">Could not load curriculum data.</div>`;console.error(err)});
