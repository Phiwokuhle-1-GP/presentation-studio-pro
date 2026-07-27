const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fonts=['Arial','Aptos','Calibri','Georgia','Trebuchet MS','Verdana','Times New Roman','Courier New'];
const icons={strategy:'🎯',operations:'⚙️',governance:'🛡️',people:'👥',calendar:'📅',production:'🎬',screen:'🖥️',camera:'📷',facility:'🏢',audio:'🎙️',chart:'📊',cloud:'☁️',workflow:'🔁',edit:'✏️',star:'★',check:'✓',arrow:'➜',lightning:'⚡',globe:'🌐',database:'🗄️'};
function shape(x,y,w,h,fill='#0d2942',border='#22d3ee',borderWidth=2,radius=3){return{id:uid(),type:'shape',x,y,w,h,fill,border,borderWidth,radius,locked:false}}
function label(text,x,y,w,h,size=24,color='#ffffff',align='center',bold=true){return txt(text,x,y,w,h,size,color,align,bold)}
function arrow(text,x,y,w=4,h=5,size=32,color='#67e8f9'){return txt(text,x,y,w,h,size,color,'center',true)}
function card(title,body,x,y,w,h,accent='#22d3ee',icon=''){
  const parts=[shape(x,y,w,h,'#0b2238',accent,2,14)];
  if(icon)parts.push(label(icon,x+1,y+2,w-2,8,34,accent,'center',false));
  parts.push(label(title,x+2,y+(icon?10:3),w-4,8,22,'#ffffff','center',true));
  if(body)parts.push(label(body,x+2,y+(icon?18:12),w-4,h-(icon?20:14),15,'#dbeafe','left',false));
  return parts;
}
const templates=[
 {group:'Core layouts',name:'Blank',description:'Start with an empty 16:9 canvas.',bg:'#061426',elements:[]},
 {group:'Core layouts',name:'Title slide',description:'Executive title and subtitle.',bg:'linear-gradient(135deg,#061426,#12335a)',elements:[txt('Presentation title',10,28,80,18,72,'#fff','center',true),txt('Subtitle or executive message',18,52,64,10,28,'#7dd3fc','center',false)]},
 {group:'Core layouts',name:'Section divider',description:'Numbered chapter divider.',bg:'linear-gradient(135deg,#07111f,#0e7490)',elements:[txt('01',7,16,15,20,110,'#67e8f9','left',true),txt('Section title',7,44,76,18,68,'#fff','left',true),txt('A concise description of this section',8,65,60,8,24,'#dbeafe','left',false)]},
 {group:'Core layouts',name:'Four pillars',description:'Four-column operating model.',bg:'#061426',elements:[txt('Operating model',6,5,88,10,54,'#fff','center',true),...['People','Processes','Facilities','Systems'].flatMap((t,i)=>[shape(5+i*24,28,21,52,'#0d2942','#22d3ee',2,12),label(t,7+i*24,36,17,10,29,'#fff','center',true)])]},
 {group:'Core layouts',name:'Process flow',description:'Four-stage horizontal workflow.',bg:'#061426',elements:[txt('End-to-end workflow',5,5,90,10,52,'#fff','center',true),...['Plan','Book','Execute','Deliver'].flatMap((t,i)=>[shape(5+i*24,35,18,27,'#0d2942','#22d3ee',2,12),label(t,6+i*24,43,16,8,28,'#fff','center',true),...(i<3?[arrow('➜',23+i*24,43,5,8,34)]:[])])]},
 {group:'Core layouts',name:'Image focus',description:'Full-slide visual placeholder.',bg:'#061426',elements:[shape(5,5,90,90,'#0d2942','#334155',2,10),txt('Import an image and position it here',18,44,64,10,26,'#94a3b8','center',false)]},

 {group:'Shared Services models',name:'Shared Services Operating Model',description:'Complete strategy, planning, execution and delivery model.',bg:'linear-gradient(135deg,#061426,#081b33)',elements:[
   label('SVP INTEGRATION & SHARED SERVICES',8,2,84,8,48,'#ffffff','center',true),
   ...card('OPERATIONS','Operational execution and delivery of the shared service centre.',18,12,28,13,'#0ea5e9','⚙️'),
   ...card('GOVERNANCE AND PLANNING','Risk / Compliance\nPMO / Support systems',54,12,28,13,'#2dd4bf','🛡️'),
   arrow('↓',31,25,4,5,34,'#22d3ee'),arrow('↓',67,25,4,5,34,'#2dd4bf'),
   shape(12,30,73,24,'#071d33','#0ea5e9',2,14),label('SHARED RESOURCES MANAGEMENT OFFICE',15,30.5,67,5,24,'#38bdf8','center',true),
   ...['TALENT\nSHARED SERVICE','PRODUCTION\nSHARED SERVICE','PRODUCTION EVENTS\n& FACILITIES','POST\nPRODUCTION','PHYSICAL\nPRODUCTION'].flatMap((t,i)=>[shape(14+i*14,37,12.5,14,'#0c2943','#38bdf8',1,10),label('SNR MANAGER\n'+t,14.5+i*14,38,11.5,12,16,'#ffffff','center',true)]),
   ...card('SYSTEMS SUPPORT OFFICE','Product Owner\nOperational systems\nSupport systems\nTechnology enablement',86,30,12,24,'#a78bfa','🖥️'),
   arrow('↓',47,54,5,4,30,'#2dd4bf'),arrow('↓',90,54,5,4,30,'#a78bfa'),
   shape(12,58,86,14,'#082b35','#2dd4bf',2,14),label('CENTRAL BOOKINGS OFFICE',20,58.5,70,4,23,'#5eead4','center',true),
   ...['Talent Bookings\nManager','Production Bookings\nCo-ordinators','Production Facilities\n& Resources','Post Production','Physical Production'].flatMap((t,i)=>[label(t,14+i*16.5,63,15,7,15,'#ffffff','center',true)]),
   arrow('↓',49,72,4,4,28,'#a78bfa'),shape(12,76,86,6,'#17163c','#8b5cf6',2,10),label('SUPERVISORS AND TEAM LEADERS',22,76,66,6,22,'#c4b5fd','center',true),
   ...[['PEOPLE TALENT','Presenters\nJournalists\nAnalysts\nCommentators\nOn-Air Talent'],['PEOPLE PRODUCTION','Director\nProducer\nProduction Assistant\nVision Mixer'],['FACILITIES AND CREW','Camera Crew\nVision Mixer\nEVS Operators\nAudio\nLighting'],['POST PRODUCTION','Graphics\nEditors\nFinal Mix\nDubbing\nSpecialists']].flatMap((a,i)=>card(a[0],a[1],12+i*22,84,20,14,'#facc15',i===0?'👤':i===1?'🎬':i===2?'📷':'🖥️'))
 ]},
 {group:'Shared Services models',name:'Operating Foundation',description:'People, processes, facilities and systems foundation.',bg:'linear-gradient(135deg,#061426,#0b2038)',elements:[
   label('OPERATING FOUNDATION',10,4,80,9,50,'#ffffff','center',true),label('Four connected capabilities enabling shared resource delivery',18,12,64,5,20,'#9bd7e8','center',false),
   shape(22,24,30,30,'rgba(14,165,233,.22)','#38bdf8',3,999),shape(48,24,30,30,'rgba(45,212,191,.22)','#2dd4bf',3,999),shape(22,49,30,30,'rgba(139,92,246,.22)','#a78bfa',3,999),shape(48,49,30,30,'rgba(250,204,21,.18)','#facc15',3,999),
   label('PEOPLE',26,30,20,7,26,'#ffffff','center',true),label('Skills • Leadership',27,38,18,5,16,'#dbeafe','center',false),
   label('PROCESSES',54,30,20,7,26,'#ffffff','center',true),label('Governance • Workflows',55,38,18,5,16,'#dbeafe','center',false),
   label('FACILITIES',26,57,20,7,26,'#ffffff','center',true),label('Studios • OB vans • Spaces',25,65,22,5,15,'#dbeafe','center',false),
   label('SYSTEMS',54,57,20,7,26,'#ffffff','center',true),label('Technology • Platforms',55,65,18,5,16,'#dbeafe','center',false),
   shape(39,42,22,20,'#102e48','#facc15',3,999),label('OPERATIONAL\nSYNERGY',41,47,18,10,23,'#facc15','center',true),
 ]},
 {group:'Shared Services models',name:'Operational Synergy',description:'Hub-and-spoke model linking four operating capabilities.',bg:'linear-gradient(135deg,#061426,#0d2740)',elements:[
   label('OPERATIONAL SYNERGY',8,4,84,9,50,'#ffffff','center',true),
   shape(38,34,24,27,'#102e48','#facc15',3,999),label('OPERATIONAL\nSYNERGY',41,41,18,12,27,'#facc15','center',true),
   ...card('PEOPLE','Skills\nLeadership\nCapability',7,20,22,20,'#38bdf8','👥'),...card('PROCESSES','Governance\nWorkflows\nContinuous improvement',71,20,22,20,'#2dd4bf','🔁'),...card('FACILITIES','Studios\nOB vans\nOperational spaces',7,65,22,20,'#a78bfa','🏢'),...card('SYSTEMS','Technology\nIntegrated platforms\nOperational data',71,65,22,20,'#facc15','🖥️'),
   arrow('➜',29,31,9,8,38,'#38bdf8'),arrow('←',62,31,9,8,38,'#2dd4bf'),arrow('➜',29,68,9,8,38,'#a78bfa'),arrow('←',62,68,9,8,38,'#facc15')
 ]},
 {group:'Shared Services models',name:'Shared Resource Systems Office',description:'Systems office mandate, team and supported platforms.',bg:'linear-gradient(135deg,#061426,#12233f)',elements:[
   label('SHARED RESOURCE SYSTEMS OFFICE',8,4,84,9,48,'#ffffff','center',true),label('Support Shared Resources through customised systems and operational intelligence',12,13,76,6,21,'#a5d8ee','center',false),
   ...card('CORE MANDATE','Customised operational systems\nPlatform support and adoption\nOperational data for performance measurement\nContinuous improvement',7,24,40,51,'#38bdf8','🎯'),
   ...card('TEAM','Product Owners\nProject Managers\nSpecialists',53,24,40,22,'#a78bfa','👥'),
   ...card('SYSTEMS WE SUPPORT','SOBER Booking System\nMediaHUB / Local Lesson\nData Analytics\nSynergy',53,51,40,24,'#2dd4bf','🖥️'),
   shape(7,81,86,8,'#0c2943','#22d3ee',2,10),label('Technology enablement • system governance • operational intelligence',12,82,76,6,21,'#dbeafe','center',true)
 ]},

 {group:'SOBER and workflow models',name:'SOBER Operations Platform',description:'Contracted production to reconciliation workflow.',bg:'linear-gradient(135deg,#061426,#0b233a)',elements:[
   label('SOBER OPERATIONS PLATFORM',8,4,84,9,50,'#ffffff','center',true),label('One platform. Shared resources. Smarter operations.',20,13,60,5,20,'#7dd3fc','center',false),
   ...['PROCESS START','CONTRACTED\nPRODUCTIONS','SYNERGY\nIMPORT','SOBER','OPERATIONS TEAM\nEXECUTE','PLANNING &\nLOGISTICS','SCHEDULING &\nCREWING','RECONCILIATION'].flatMap((t,i)=>[shape(3+i*12,37,10.5,22,i===3?'#123b55':'#0b2942',i===3?'#facc15':'#22d3ee',2,12),label(['▶','📋','🔁','S','⚙️','🗺️','📅','✓'][i],5+i*12,39,6.5,6,28,i===3?'#facc15':'#67e8f9','center',true),label(t,3.5+i*12,47,9.5,9,15,'#ffffff','center',true),...(i<7?[arrow('➜',13+i*12,44,2,6,26,'#67e8f9')]:[])]),
   shape(12,69,76,10,'#0d2942','#38bdf8',2,12),label('Operational data source for Data Analytics',18,71,64,6,24,'#ffffff','center',true)
 ]},
 {group:'SOBER and workflow models',name:'Post Production SOBER Workflow',description:'Scheduling, booking, editing and delivery workflow.',bg:'linear-gradient(135deg,#061426,#0a1e34)',elements:[
   label('POST PRODUCTION SOBER WORKFLOW',7,4,86,9,48,'#ffffff','center',true),label('Scheduling • Resource Booking • Editing • Delivery',20,13,60,5,20,'#7dd3fc','center',false),
   ...card('1  SCHEDULING','System: Synergy\nCreate production schedules\nCreate events and highlights\nPublish schedules',4,27,20,42,'#38bdf8','📅'),arrow('➜',24,43,5,8,38,'#67e8f9'),
   ...card('2  SOBER','Booking & Resource Management\nImport schedules\nCreate work orders\nAllocate editors, graphics, Final Mix and facilities',29,27,20,42,'#2dd4bf','🗄️'),arrow('➜',49,43,5,8,38,'#67e8f9'),
   ...card('3  EDIT OPERATIONS','System: Avid Media Composer\nOpen work order\nAccess and edit media\nMatch media to schedule',54,27,20,42,'#a78bfa','✏️'),arrow('➜',74,43,5,8,38,'#67e8f9'),
   ...card('4  DELIVERY','Interplay / MediaCentral\nPublish to Viz One\nPrepare for transmission\nArchive content',79,27,17,42,'#facc15','☁️'),
   shape(15,77,70,9,'#0b2942','#22d3ee',2,10),label('Operational Systems: Synergy • SOBER • Avid Media Composer • Interplay / MediaCentral • Viz One',18,78,64,7,18,'#dbeafe','center',true)
 ]},
 {group:'SOBER and workflow models',name:'Shared Resource Onboarding Workflow',description:'Business request to contract renewal or exit.',bg:'linear-gradient(135deg,#061426,#10243a)',elements:[
   label('SHARED RESOURCE ONBOARDING WORKFLOW',7,4,86,9,46,'#ffffff','center',true),label('From business need to operational deployment',20,13,60,5,20,'#7dd3fc','center',false),
   ...['BUSINESS NEED','REQUEST RAISED','BUDGET APPROVAL','RECRUITMENT /\nSOURCING','CONTRACT\nCREATION','HR ONBOARDING','SYSTEM ACCESS','BOOKING & SHIFT\nALLOCATIONS','CONTRACT\nMANAGEMENT','RENEWAL / EXIT'].flatMap((t,i)=>{const row=i<5?0:1, col=i%5, x=4+col*19, y=row?58:27;return[shape(x,y,16,19,'#0b2942',row?'#a78bfa':'#22d3ee',2,10),label(t,x+1,y+5,14,9,16,'#ffffff','center',true),...(col<4?[arrow('➜',x+16,y+7,3,5,25,row?'#a78bfa':'#67e8f9')]:[]),...(i===4?[arrow('↓',89,47,4,9,30,'#a78bfa')]:[])]}),
   label('Hiring Manager + Legal',77,48,18,5,14,'#facc15','center',true)
 ]},

 {group:'Organisation models',name:'Editing, Graphics and Final Mix Organogram',description:'Editable post-production team hierarchy.',bg:'linear-gradient(135deg,#061426,#0c2037)',elements:[
   label('EDITING, GRAPHICS AND FINAL MIX',8,4,84,9,48,'#ffffff','center',true),
   ...card('MANAGER','Editing • Graphics • Final Mix',35,16,30,14,'#38bdf8','👤'),arrow('↓',48,30,4,5,30,'#67e8f9'),
   ...card('EDITING','Edit Supervisor\nHighlights Editors (8)\nData / Media Support',5,39,27,33,'#22d3ee','✏️'),...card('GRAPHICS','Graphic Designers\nGraphics Operators\nProduction support',36.5,39,27,33,'#a78bfa','🎨'),...card('FINAL MIX','Final Mix Operators\nAudio finishing\nDelivery support',68,39,27,33,'#2dd4bf','🎙️'),
   shape(18,80,64,8,'#0d2942','#facc15',2,10),label('Shared planning • central bookings • consistent service delivery',22,81,56,6,20,'#ffffff','center',true)
 ]}
];

// Self-service BI templates designed for managers who only need to replace titles, values and commentary.
templates.push(
 {group:'Self-service BI',name:'Executive KPI Dashboard',description:'Four headline metrics with a management summary.',bg:'linear-gradient(135deg,#061426,#0b2740)',elements:[
   label('EXECUTIVE PERFORMANCE OVERVIEW',6,5,88,8,46,'#ffffff','left',true),
   label('Replace the values and commentary with your latest business results',6,13,78,5,18,'#9bd7e8','left',false),
   ...[['UTILISATION','82%','#38bdf8'],['DELIVERY','96%','#2dd4bf'],['COST','R 0.0M','#a78bfa'],['QUALITY','4.6 / 5','#facc15']].flatMap((a,i)=>[shape(6+i*23,23,20,20,'#0b2238',a[2],2,12),label(a[0],8+i*23,27,16,5,16,a[2],'left',true),label(a[1],8+i*23,34,16,7,34,'#ffffff','left',true)]),
   shape(6,49,55,35,'#0b2238','#38bdf8',2,12),label('PERFORMANCE STORY',9,53,48,5,21,'#38bdf8','left',true),label('Use this area to explain what changed, why it changed and what management should do next.',9,61,47,17,20,'#dbeafe','left',false),
   shape(65,49,29,35,'#0b2238','#2dd4bf',2,12),label('MANAGEMENT ACTIONS',68,53,23,5,20,'#2dd4bf','left',true),label('1. Replace this action\n2. Add an owner\n3. Add a due date',68,61,22,17,19,'#ffffff','left',false)
 ]},
 {group:'Self-service BI',name:'Monthly Performance Scorecard',description:'Manager-friendly RAG scorecard for monthly reporting.',bg:'linear-gradient(135deg,#061426,#10243a)',elements:[
   label('MONTHLY PERFORMANCE SCORECARD',6,5,88,8,46,'#ffffff','left',true),label('Reporting period: Month YYYY',6,13,45,5,18,'#9bd7e8','left',false),
   ...[['Service delivery','Green','On target'],['Resource utilisation','Amber','Needs attention'],['Cost control','Green','On target'],['People capacity','Red','Action required']].flatMap((a,i)=>[shape(7,24+i*15,86,12,'#0b2238','#31536d',1,8),label(a[0],9,27+i*15,34,5,20,'#ffffff','left',true),label(a[1],48,27+i*15,14,5,20,i===0||i===2?'#4ade80':i===1?'#facc15':'#fb7185','center',true),label(a[2],66,27+i*15,24,5,18,'#dbeafe','left',false)])
 ]},
 {group:'Self-service BI',name:'Insight and Recommendation',description:'Turn one data insight into a clear executive decision.',bg:'linear-gradient(135deg,#061426,#0c2943)',elements:[
   label('INSIGHT TO ACTION',7,5,86,9,48,'#ffffff','center',true),
   ...card('WHAT THE DATA SHOWS','Replace this text with the most important finding from your dashboard.',7,24,27,42,'#38bdf8','📊'),
   arrow('➜',35,40,6,8,38,'#67e8f9'),
   ...card('WHY IT MATTERS','Explain the operational, financial or customer impact.',41,24,27,42,'#a78bfa','🎯'),
   arrow('➜',69,40,6,8,38,'#67e8f9'),
   ...card('RECOMMENDED ACTION','State the decision, owner and timing required.',75,24,18,42,'#2dd4bf','✓')
 ]},
 {group:'Self-service BI',name:'Utilisation Overview',description:'Simple utilisation report with editable values and commentary.',bg:'linear-gradient(135deg,#061426,#0d2740)',elements:[
   label('RESOURCE UTILISATION OVERVIEW',6,5,88,8,46,'#ffffff','left',true),label('Reporting period and business area',6,13,55,5,18,'#9bd7e8','left',false),
   shape(6,23,29,22,'#0b2238','#38bdf8',2,12),label('OVERALL UTILISATION',9,27,23,5,18,'#38bdf8','left',true),label('78%',9,34,20,7,38,'#ffffff','left',true),
   shape(39,23,26,22,'#0b2238','#2dd4bf',2,12),label('PEAK PERIOD',42,27,20,5,18,'#2dd4bf','left',true),label('Month',42,34,20,7,30,'#ffffff','left',true),
   shape(69,23,25,22,'#0b2238','#facc15',2,12),label('OPPORTUNITY',72,27,19,5,18,'#facc15','left',true),label('22%',72,34,18,7,34,'#ffffff','left',true),
   shape(6,51,58,33,'#0b2238','#31536d',2,12),label('UTILISATION BY AREA',9,55,50,5,20,'#ffffff','left',true),label('Area A   ████████  82%\nArea B   ███████   74%\nArea C   █████     55%',9,63,48,16,22,'#dbeafe','left',false),
   shape(68,51,26,33,'#0b2238','#a78bfa',2,12),label('MANAGER NOTE',71,55,20,5,20,'#a78bfa','left',true),label('Add a short explanation and next action.',71,63,19,14,18,'#ffffff','left',false)
 ]}
);
function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now()+Math.random().toString(16).slice(2)}
function txt(text,x,y,w,h,size,color,align,bold){return{id:uid(),type:'text',text,x,y,w,h,fontSize:size,color,align,bold,fill:'transparent',border:'transparent',borderWidth:0,locked:false}}
let state={title:'Presentation',theme:{fontFamily:'Arial',accent:'#22d3ee'},slides:[]}, currentSlideId=null, selectedId=null, zoom=.62, previewIndex=0, drag=null;
const canvas=$('#slideCanvas');
async function load(){const r=await fetch('/api/presentation');state=await r.json();currentSlideId=state.slides[0]?.id;populateFonts();renderAll()}
function populateFonts(){fonts.forEach(f=>$('#fontFamily').add(new Option(f,f)));$('#fontFamily').value=state.theme.fontFamily||'Arial'}
function slide(){return state.slides.find(s=>s.id===currentSlideId)}
function renderAll(){renderSlides();renderTemplates();renderIcons();renderCanvas();renderSlideProps();applyZoom();updateNavigation()}
function bgCss(bg){if(!bg)return '#061426';if(bg.type==='image')return `url('${bg.value}') center/cover no-repeat`;return bg.value}
function renderSlides(){const list=$('#slidesList');list.innerHTML='';state.slides.forEach((s,i)=>{const d=document.createElement('div');d.className='slide-thumb'+(s.id===currentSlideId?' active':'');d.innerHTML=`<div class="thumb-preview" style="background:${bgCss(s.background)}"></div><div class="thumb-title">${i+1}. ${escapeHtml(s.name||'Untitled')}</div>`;d.addEventListener('click',()=>{currentSlideId=s.id;selectedId=null;renderAll()});list.appendChild(d)})}
function renderTemplates(){
 const g=$('#templateGrid');g.innerHTML='';
 const groups=[...new Set(templates.map(t=>t.group||'Other'))];
 groups.forEach((groupName,groupIndex)=>{
   const section=document.createElement('section');section.className='template-group';
   const header=document.createElement('button');header.className='template-group-header';header.type='button';header.innerHTML=`<span>${escapeHtml(groupName)}</span><span class="group-count">${templates.filter(t=>(t.group||'Other')===groupName).length}</span>`;
   const body=document.createElement('div');body.className='template-group-body'+(groupIndex===0?' open':'');
   templates.filter(t=>(t.group||'Other')===groupName).forEach(t=>{
     const b=document.createElement('div');b.className='template-card';
     b.innerHTML=`<strong>${escapeHtml(t.name)}</strong><small>${escapeHtml(t.description||'Add this slide')}</small><div class="template-actions"><button class="use-market">Use</button><button class="import-market">Import to My Templates</button></div>`;
     b.querySelector('.use-market').addEventListener('click',()=>addSlideFromTemplate(t));
     b.querySelector('.import-market').addEventListener('click',()=>importMarketplaceTemplate(t));body.appendChild(b)
   });
   header.addEventListener('click',()=>body.classList.toggle('open'));
   section.append(header,body);g.appendChild(section)
 })
}
function renderIcons(filter=''){const g=$('#iconGrid');g.innerHTML='';Object.entries(icons).filter(([k])=>k.includes(filter.toLowerCase())).forEach(([name,glyph])=>{const b=document.createElement('button');b.className='icon-btn';b.innerHTML=`<span style="font-size:30px">${glyph}</span><small>${name}</small>`;b.addEventListener('click',()=>addIcon(glyph));g.appendChild(b)})}
function renderCanvas(target=canvas, s=slide(), interactive=true){if(!s)return;target.innerHTML='';target.style.background=bgCss(s.background);target.style.fontFamily=state.theme.fontFamily||'Arial';s.elements.forEach((e,idx)=>{const el=document.createElement('div');el.className='slide-element '+e.type+'-element'+(interactive&&e.id===selectedId?' selected':'');el.dataset.id=e.id;Object.assign(el.style,{left:e.x+'%',top:e.y+'%',width:e.w+'%',height:e.h+'%',zIndex:idx+1,color:e.color||'#fff',fontSize:(e.fontSize||24)+'px',fontWeight:e.bold?'700':'400',textAlign:e.align||'left',display:e.type==='text'?'flex':'block',alignItems:e.type==='text'?'center':'',justifyContent:e.type==='text'?({left:'flex-start',center:'center',right:'flex-end'}[e.align||'left']):'',padding:e.type==='text'?'8px':'0',background:e.fill||'transparent',border:`${e.borderWidth||0}px solid ${e.border||'transparent'}`,borderRadius:(e.radius||0)+'px'});
 if(e.type==='text'){el.textContent=e.text||'';if(interactive){el.contentEditable='true';el.spellcheck=false;el.addEventListener('input',()=>{e.text=el.textContent;syncProps()})}}
 if(e.type==='image'){const img=document.createElement('img');img.src=e.src;img.alt='Slide asset';img.style.objectFit=e.fit||'contain';el.appendChild(img)}
 if(interactive){el.addEventListener('mousedown',ev=>startDrag(ev,e,el));el.addEventListener('click',ev=>{ev.stopPropagation();selectedId=e.id;renderCanvas();syncProps()});const h=document.createElement('span');h.className='resize-handle';h.addEventListener('mousedown',ev=>startResize(ev,e));el.appendChild(h)}
 target.appendChild(el)});if(interactive)canvas.onclick=()=>{selectedId=null;renderCanvas();syncProps()}}
function renderSlideProps(){const s=slide();if(!s)return;$('#slideName').value=s.name||'';$('#backgroundType').value=s.background?.type||'color';$('#backgroundValue').value=s.background?.value||'#061426';if((s.background?.value||'').startsWith('#'))$('#backgroundColor').value=s.background.value;syncProps()}
function syncProps(){const e=slide()?.elements.find(x=>x.id===selectedId);$('#elementProperties').classList.toggle('hidden',!e);if(!e)return;$('#propText').value=e.text||'';['X','Y','W','H'].forEach(k=>$('#prop'+k).value=e[k.toLowerCase()]??0);$('#propFontSize').value=e.fontSize||24;$('#propColor').value=toColor(e.color,'#ffffff');$('#propFill').value=toColor(e.fill,'#0d2942');$('#propBorder').value=toColor(e.border,'#22d3ee');$('#propAlign').value=e.align||'left';$('#propBold').checked=!!e.bold;$('#propLocked').checked=!!e.locked}
function toColor(v,f){return /^#[0-9a-f]{6}$/i.test(v||'')?v:f}
function applyZoom(){state.zoom=Number($('#zoomRange').value)/100;$('#stageScaler').style.width=1600*state.zoom+'px';$('#stageScaler').style.height=900*state.zoom+'px';canvas.style.transform=`scale(${state.zoom})`}
function addSlideFromTemplate(t){const s={id:uid(),name:t.name,background:{type:t.bg.startsWith('linear')?'gradient':'color',value:t.bg},elements:JSON.parse(JSON.stringify(t.elements)).map(e=>({...e,id:uid()}))};state.slides.push(s);currentSlideId=s.id;selectedId=null;renderAll()}
function addIcon(glyph){const e=txt(glyph,42,38,16,20,88,'#67e8f9','center',false);slide().elements.push(e);selectedId=e.id;renderAll()}
function addText(){const e=txt('Double-click to edit',30,35,40,12,42,'#ffffff','center',true);slide().elements.push(e);selectedId=e.id;renderAll()}
function addShape(){const e={id:uid(),type:'shape',x:30,y:30,w:40,h:25,fill:'#0d2942',border:'#22d3ee',borderWidth:2,radius:3,locked:false};slide().elements.push(e);selectedId=e.id;renderAll()}
async function upload(file){const fd=new FormData();fd.append('file',file);const r=await fetch('/api/upload',{method:'POST',body:fd});const j=await r.json();if(!r.ok)throw new Error(j.error||'Upload failed');return j.url}
async function addImageFile(file,full=false){const url=await upload(file);const e={id:uid(),type:'image',src:url,x:full?0:20,y:full?0:20,w:full?100:60,h:full?100:60,fit:full?'cover':'contain',locked:false};slide().elements.push(e);selectedId=e.id;renderAll()}
function startDrag(ev,e,el){if(ev.target.classList.contains('resize-handle')||e.locked)return;selectedId=e.id;const rect=canvas.getBoundingClientRect();drag={mode:'move',e,startX:ev.clientX,startY:ev.clientY,x:e.x,y:e.y,rect};document.addEventListener('mousemove',onDrag);document.addEventListener('mouseup',endDrag,{once:true})}
function startResize(ev,e){ev.stopPropagation();if(e.locked)return;const rect=canvas.getBoundingClientRect();drag={mode:'resize',e,startX:ev.clientX,startY:ev.clientY,w:e.w,h:e.h,rect};document.addEventListener('mousemove',onDrag);document.addEventListener('mouseup',endDrag,{once:true})}
function onDrag(ev){if(!drag)return;const dx=(ev.clientX-drag.startX)/drag.rect.width*100,dy=(ev.clientY-drag.startY)/drag.rect.height*100;if(drag.mode==='move'){drag.e.x=Math.max(0,Math.min(100-drag.e.w,drag.x+dx));drag.e.y=Math.max(0,Math.min(100-drag.e.h,drag.y+dy))}else{drag.e.w=Math.max(2,Math.min(100-drag.e.x,drag.w+dx));drag.e.h=Math.max(2,Math.min(100-drag.e.y,drag.h+dy))}renderCanvas();syncProps()}
function endDrag(){document.removeEventListener('mousemove',onDrag);drag=null}
async function save(){setStatus('Saving…');const r=await fetch('/api/presentation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});setStatus(r.ok?'Saved':'Save failed')}
async function export4k(){setStatus('Rendering 4K PNG…');selectedId=null;renderCanvas();const old=canvas.style.transform;canvas.style.transform='none';const shot=await html2canvas(canvas,{width:1600,height:900,scale:2.4,backgroundColor:null,useCORS:true,logging:false});canvas.style.transform=old;const a=document.createElement('a');a.download=(slide().name||'slide').replace(/[^a-z0-9]+/gi,'_')+'_4K.png';a.href=shot.toDataURL('image/png');a.click();setStatus('4K PNG exported (3840 × 2160)')}
function preview(){previewIndex=Math.max(0,state.slides.findIndex(s=>s.id===currentSlideId));$('#previewModal').classList.remove('hidden');renderPreview()}
function renderPreview(){const p=$('#previewCanvas');const s=state.slides[previewIndex];p.style.width='min(90vw,1600px)';p.style.height='auto';renderCanvas(p,s,false);const scale=p.clientWidth/1600;p.style.fontFamily=state.theme.fontFamily;[...p.children].forEach(el=>{el.style.fontSize=(parseFloat(el.style.fontSize||24)*scale)+'px'})}
function setStatus(t){$('#statusBar').textContent=t}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

$$('.tab').forEach(b=>b.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.remove('active'));$$('.tab-pane').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.tab+'Tab').classList.add('active')}));
$('#zoomRange').oninput=applyZoom;$('#newSlideBtn').onclick=()=>addSlideFromTemplate(templates[0]);$('#duplicateSlideBtn').onclick=()=>{const c=JSON.parse(JSON.stringify(slide()));c.id=uid();c.name+=' Copy';c.elements.forEach(e=>e.id=uid());state.slides.splice(state.slides.findIndex(s=>s.id===currentSlideId)+1,0,c);currentSlideId=c.id;renderAll()};$('#deleteSlideBtn').onclick=()=>{if(state.slides.length<2)return alert('A presentation must contain at least one slide.');const i=state.slides.findIndex(s=>s.id===currentSlideId);state.slides.splice(i,1);currentSlideId=state.slides[Math.max(0,i-1)].id;selectedId=null;renderAll()};$('#addTextBtn').onclick=addText;$('#addShapeBtn').onclick=addShape;$('#addImageBtn').onclick=()=>$('#assetInput').click();$('#saveBtn').onclick=save;$('#exportBtn').onclick=export4k;$('#previewBtn').onclick=preview;$('#closePreviewBtn').onclick=()=>$('#previewModal').classList.add('hidden');$('#prevPreviewBtn').onclick=()=>{previewIndex=(previewIndex-1+state.slides.length)%state.slides.length;renderPreview()};$('#nextPreviewBtn').onclick=()=>{previewIndex=(previewIndex+1)%state.slides.length;renderPreview()};$('#iconSearch').oninput=e=>renderIcons(e.target.value);
$('#slideName').oninput=e=>{slide().name=e.target.value;renderSlides()};$('#backgroundType').onchange=e=>{slide().background.type=e.target.value;renderCanvas()};$('#backgroundValue').oninput=e=>{slide().background.value=e.target.value;renderCanvas();renderSlides()};$('#backgroundColor').oninput=e=>{slide().background={type:'color',value:e.target.value};$('#backgroundType').value='color';$('#backgroundValue').value=e.target.value;renderCanvas();renderSlides()};$('#fontFamily').onchange=e=>{state.theme.fontFamily=e.target.value;renderCanvas()};
['Text','X','Y','W','H','FontSize','Color','Fill','Border','Align'].forEach(k=>$('#prop'+k).addEventListener('input',e=>{const el=slide().elements.find(x=>x.id===selectedId);if(!el)return;const map={Text:'text',X:'x',Y:'y',W:'w',H:'h',FontSize:'fontSize',Color:'color',Fill:'fill',Border:'border',Align:'align'};el[map[k]]=['x','y','w','h','fontSize'].includes(map[k])?Number(e.target.value):e.target.value;renderCanvas()}));$('#propBold').onchange=e=>{const el=slide().elements.find(x=>x.id===selectedId);if(el){el.bold=e.target.checked;renderCanvas()}};$('#propLocked').onchange=e=>{const el=slide().elements.find(x=>x.id===selectedId);if(el)el.locked=e.target.checked};$('#removeElementBtn').onclick=()=>{slide().elements=slide().elements.filter(e=>e.id!==selectedId);selectedId=null;renderCanvas();syncProps()};
$('#bringForwardBtn').onclick=()=>{const a=slide().elements,i=a.findIndex(e=>e.id===selectedId);if(i>=0&&i<a.length-1){[a[i],a[i+1]]=[a[i+1],a[i]];renderCanvas()}};$('#sendBackwardBtn').onclick=()=>{const a=slide().elements,i=a.findIndex(e=>e.id===selectedId);if(i>0){[a[i],a[i-1]]=[a[i-1],a[i]];renderCanvas()}};
$('#assetInput').onchange=e=>e.target.files[0]&&addImageFile(e.target.files[0]);$('#slideImageInput').onchange=async e=>{const f=e.target.files[0];if(!f)return;addSlideFromTemplate(templates[0]);await addImageFile(f,true)};$('#jsonInput').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(!Array.isArray(j.slides))throw 0;state=j;currentSlideId=state.slides[0].id;selectedId=null;renderAll()}catch{alert('Invalid presentation JSON')}};r.readAsText(f)};$('#exportJsonBtn').onclick=()=>{const a=document.createElement('a');a.download='presentation.json';a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.click();URL.revokeObjectURL(a.href)};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save();return}if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)||document.activeElement.isContentEditable)return;const el=slide()?.elements.find(x=>x.id===selectedId);if(!el)return;if(e.key==='Delete'){slide().elements=slide().elements.filter(x=>x.id!==selectedId);selectedId=null;renderCanvas();syncProps()}const step=e.shiftKey?1:0.2;if(e.key==='ArrowLeft')el.x-=step;if(e.key==='ArrowRight')el.x+=step;if(e.key==='ArrowUp')el.y-=step;if(e.key==='ArrowDown')el.y+=step;if(e.key.startsWith('Arrow')){e.preventDefault();renderCanvas();syncProps()}});

function updateNavigation(){
 const index=Math.max(0,state.slides.findIndex(s=>s.id===currentSlideId));
 const counter=$('#slideCounter');
 if(counter)counter.textContent=`Slide ${index+1} of ${state.slides.length}`;
 const prev=$('#previousSlideBtn'),next=$('#nextSlideBtn');
 if(prev)prev.disabled=index<=0;
 if(next)next.disabled=index>=state.slides.length-1;
}
function goToSlide(offset){
 const index=state.slides.findIndex(s=>s.id===currentSlideId);
 const next=Math.max(0,Math.min(state.slides.length-1,index+offset));
 if(next===index)return;
 currentSlideId=state.slides[next].id;selectedId=null;renderAll();
}
function openPanelTab(name){
 $$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));
 $$('.tab-pane').forEach(x=>x.classList.remove('active'));
 $('#'+name+'Tab')?.classList.add('active');
 document.querySelector('.app-shell')?.classList.remove('left-collapsed');
}
function toggleLeftPanel(){document.querySelector('.app-shell')?.classList.toggle('left-collapsed')}
function toggleRightPanel(){document.querySelector('.app-shell')?.classList.toggle('right-collapsed')}
function fitSlide(){
 const wrap=document.querySelector('.stage-wrap');
 if(!wrap)return;
 const availableW=Math.max(320,wrap.clientWidth-56),availableH=Math.max(180,wrap.clientHeight-56);
 const pct=Math.max(35,Math.min(100,Math.floor(Math.min(availableW/1600,availableH/900)*100)));
 $('#zoomRange').value=pct;applyZoom();setStatus(`Slide fitted at ${pct}%`);
}
function closeMenus(){$$('.menu-item').forEach(item=>{item.classList.remove('open');item.querySelector('.menu-trigger')?.setAttribute('aria-expanded','false')})}
function performMenuAction(action){
 const actions={
  new:()=>$('#newSlideBtn').click(),save:()=>$('#saveBtn').click(),duplicate:()=>$('#duplicateSlideBtn').click(),delete:()=>$('#deleteSlideBtn').click(),
  'import-json':()=>$('#jsonInput').click(),'export-json':()=>$('#exportJsonBtn').click(),'export-png':()=>$('#exportBtn').click(),
  'add-text':()=>$('#addTextBtn').click(),'add-shape':()=>$('#addShapeBtn').click(),'insert-image':()=>$('#assetInput').click(),
  'open-icons':()=>openPanelTab('icons'),'open-templates':()=>openPanelTab('templates'),preview:()=>$('#previewBtn').click(),
  'toggle-left':toggleLeftPanel,'toggle-right':toggleRightPanel,fit:fitSlide,
  shortcuts:()=>alert('Keyboard shortcuts\n\nCtrl/Cmd + S  Save\nCtrl/Cmd + N  New slide\nCtrl/Cmd + D  Duplicate slide\nPage Up / Page Down  Previous / next slide\nArrow keys  Navigate slides when nothing is selected\nDelete  Remove selected element\nShift + Arrow  Nudge selected element by 1 unit')
 };
 actions[action]?.();closeMenus();
}
$('#previousSlideBtn')?.addEventListener('click',()=>goToSlide(-1));
$('#nextSlideBtn')?.addEventListener('click',()=>goToSlide(1));
$('#toggleLeftPanelBtn')?.addEventListener('click',toggleLeftPanel);
$('#toggleRightPanelBtn')?.addEventListener('click',toggleRightPanel);
$$('.menu-trigger').forEach(trigger=>trigger.addEventListener('click',e=>{e.stopPropagation();const item=trigger.closest('.menu-item');const wasOpen=item.classList.contains('open');closeMenus();if(!wasOpen){item.classList.add('open');trigger.setAttribute('aria-expanded','true')}}));
$$('[data-menu-action]').forEach(btn=>btn.addEventListener('click',()=>performMenuAction(btn.dataset.menuAction)));
document.addEventListener('click',e=>{if(!e.target.closest('.menu-item'))closeMenus()});
window.addEventListener('resize',()=>{if(window.innerWidth<900)document.querySelector('.app-shell')?.classList.add('right-collapsed')});
document.addEventListener('keydown',e=>{
 const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)||document.activeElement.isContentEditable;
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='n'){e.preventDefault();$('#newSlideBtn').click();return}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='d'&&!typing){e.preventDefault();$('#duplicateSlideBtn').click();return}
 if(typing)return;
 if(e.key==='PageUp'){e.preventDefault();goToSlide(-1);return}
 if(e.key==='PageDown'){e.preventDefault();goToSlide(1);return}
 if(!selectedId&&e.key==='ArrowLeft'){e.preventDefault();goToSlide(-1)}
 if(!selectedId&&e.key==='ArrowRight'){e.preventDefault();goToSlide(1)}
 if(e.key==='Escape')closeMenus();
});

load();


async function importMarketplaceTemplate(t){
 const payload={name:t.name,description:t.description||'',group:t.group||'Marketplace',bg:t.bg,elements:t.elements};
 const r=await fetch('/api/my-templates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:t.name,category:t.group||'Marketplace',source:'marketplace',payload})});
 if(r.ok){setStatus(`${t.name} imported to My Templates`);await loadMyTemplates();openPanelTab('mytemplates')}else alert('Template import failed.');
}
async function loadMyTemplates(){
 const grid=document.getElementById('myTemplatesGrid'); if(!grid)return;grid.innerHTML='<p class="muted">Loading…</p>';
 const r=await fetch('/api/my-templates'); if(!r.ok){grid.innerHTML='<p>Could not load templates.</p>';return}
 const items=await r.json(); grid.innerHTML='';
 if(!items.length){grid.innerHTML='<div class="help-card"><strong>No templates yet</strong><p>Import a template from the Marketplace or from your computer.</p></div>';return}
 items.forEach(item=>{const c=document.createElement('div');c.className='template-card my-template-card';c.dataset.search=(item.name+' '+item.category).toLowerCase();c.innerHTML=`<strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} · ${escapeHtml(item.source)}</small><div class="template-actions"><button class="use-market">Use</button><button class="delete-my">Delete</button></div>`;c.querySelector('.use-market').onclick=()=>addSlideFromTemplate(item.payload);c.querySelector('.delete-my').onclick=async()=>{if(confirm('Delete this template from My Templates?')){await fetch('/api/my-templates/'+item.id,{method:'DELETE'});loadMyTemplates()}};grid.appendChild(c)});
}
async function importLocalTemplate(file){
 if(!file)return;const status=document.getElementById('templateImportStatus');status.textContent='Reading template…';
 try{const data=JSON.parse(await file.text());let payload=data;
  if(Array.isArray(data.slides)){const first=data.slides[0];payload={name:first.name||file.name.replace(/\.json$/i,''),description:'Imported presentation template',group:'Imported Templates',bg:first.background?.value||'#061426',elements:first.elements||[]}}
  if(!payload.elements||!payload.bg)throw new Error('Unsupported template format');
  const r=await fetch('/api/my-templates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:payload.name||file.name,category:payload.group||'Imported Templates',source:'file',payload})});if(!r.ok)throw new Error('Upload failed');status.textContent='Imported successfully into My Templates.';await loadMyTemplates();setTimeout(()=>{document.getElementById('templateImportModal').classList.add('hidden');openPanelTab('mytemplates')},700)
 }catch(e){status.textContent='Could not import: '+e.message}
}
document.getElementById('myTemplateSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('#myTemplatesGrid .my-template-card').forEach(c=>c.style.display=c.dataset.search.includes(q)?'flex':'none')});
loadMyTemplates();

// Premium full-screen marketplace
let marketplaceCategory='All', marketplaceSelected=null;
function marketplaceInfo(t){
 const n=(t.name||'').toLowerCase(), g=t.group||'Templates';
 let explanation='A ready-made visual structure that helps managers communicate one clear business message with consistent branding.';
 let uses=['Executive updates','Team meetings','Monthly reporting'];
 let type='Executive template';
 if(n.includes('kpi')){type='KPI dashboard';explanation='Summarises the most important measures at a glance, then pairs the numbers with a management narrative and clear next actions.';uses=['Executive scorecards','Monthly reviews','Board packs']}
 else if(n.includes('scorecard')){type='RAG scorecard';explanation='Uses red, amber and green status cues to show which areas are on target, require attention or need immediate action.';uses=['Performance reviews','Governance meetings','Department reporting']}
 else if(n.includes('utilisation')){type='Utilisation chart';explanation='Compares capacity used across areas and highlights the remaining opportunity, making resource allocation discussions easier.';uses=['Resource planning','Capacity reviews','Operations reporting']}
 else if(n.includes('insight')){type='Insight-to-action visual';explanation='Connects a data finding to its business impact and the recommended action, helping decision-makers move from analysis to execution.';uses=['BI storytelling','Decision papers','Leadership meetings']}
 else if(n.includes('process')||n.includes('workflow')){type='Process flow';explanation='Shows the order of activities from start to finish so users can understand ownership, hand-offs and delivery steps.';uses=['Process design','Onboarding','Operating procedures']}
 else if(n.includes('organogram')||n.includes('operating model')){type='Operating model';explanation='Clarifies reporting lines, capability ownership and how teams work together to deliver shared outcomes.';uses=['Organisation design','Transformation programmes','Operating model reviews']}
 else if(n.includes('pillars')){type='Strategic pillars';explanation='Groups a strategy into a small number of memorable themes, making priorities easier to explain and track.';uses=['Strategy presentations','Leadership alignment','Transformation roadmaps']}
 return {type,explanation,uses,category:g};
}
function templateSlideObject(t){return {id:'preview',name:t.name,background:{type:(t.bg||'').startsWith('linear')?'gradient':'color',value:t.bg||'#061426'},elements:JSON.parse(JSON.stringify(t.elements||[]))}}
function mountTemplatePreview(host,t,detail=false){host.innerHTML='';const inner=document.createElement('div');inner.className='product-preview-inner';host.appendChild(inner);renderCanvas(inner,templateSlideObject(t),false);if(detail)inner.style.transform='scale(.3875)'}
function marketplaceToast(message){let toast=document.querySelector('.marketplace-toast');if(!toast){toast=document.createElement('div');toast.className='marketplace-toast';document.body.appendChild(toast)}toast.textContent=message;toast.classList.remove('hidden');clearTimeout(toast._timer);toast._timer=setTimeout(()=>toast.classList.add('hidden'),2400)}
function openMarketplace(){
 const modal=document.getElementById('marketplaceModal');modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderMarketplace();
}
function closeMarketplace(){const modal=document.getElementById('marketplaceModal');modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.style.overflow='hidden';document.getElementById('marketplaceDetail').classList.add('hidden')}
function renderMarketplaceCategories(){
 const holder=document.getElementById('marketplaceCategories');if(!holder)return;const cats=['All',...new Set(templates.map(t=>t.group||'Other'))];holder.innerHTML='';cats.forEach(cat=>{const b=document.createElement('button');b.className='marketplace-category'+(cat===marketplaceCategory?' active':'');b.textContent=cat;b.onclick=()=>{marketplaceCategory=cat;renderMarketplaceCategories();renderMarketplace()};holder.appendChild(b)})
}
function renderMarketplace(){
 renderMarketplaceCategories();const grid=document.getElementById('marketplaceGrid');if(!grid)return;const query=(document.getElementById('marketplaceSearch')?.value||'').trim().toLowerCase();const sort=document.getElementById('marketplaceSort')?.value||'featured';let items=templates.filter(t=>(marketplaceCategory==='All'||(t.group||'Other')===marketplaceCategory)&&(`${t.name} ${t.description||''} ${t.group||''}`.toLowerCase().includes(query)));
 if(sort==='name')items.sort((a,b)=>a.name.localeCompare(b.name));if(sort==='category')items.sort((a,b)=>(a.group||'').localeCompare(b.group||'')||a.name.localeCompare(b.name));
 document.getElementById('marketplaceCount').textContent=items.length;grid.innerHTML='';document.getElementById('marketplaceEmpty').classList.toggle('hidden',items.length>0);
 items.forEach((t,index)=>{const info=marketplaceInfo(t),card=document.createElement('article');card.className='marketplace-product';card.innerHTML=`<div class="product-preview"><span class="product-badge">${escapeHtml(info.type)}</span></div><div class="product-info"><span class="market-badge">${escapeHtml(info.category)}</span><h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.description||'Editable presentation template.')}</p><div class="visual-note"><strong>What it shows</strong>${escapeHtml(info.explanation)}</div><div class="product-footer"><small>Editable • 4K • 16:9</small><div class="product-actions"><button class="preview-product">Preview</button><button class="import-product">Import</button></div></div></div>`;mountTemplatePreview(card.querySelector('.product-preview'),t);card.querySelector('.preview-product').onclick=()=>openMarketplaceDetail(t);card.querySelector('.product-preview').onclick=()=>openMarketplaceDetail(t);card.querySelector('.import-product').onclick=async()=>{await importMarketplaceTemplateQuiet(t);};grid.appendChild(card)})
}
async function importMarketplaceTemplateQuiet(t){
 const payload={name:t.name,description:t.description||'',group:t.group||'Marketplace',bg:t.bg,elements:t.elements};const r=await fetch('/api/my-templates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:t.name,category:t.group||'Marketplace',source:'marketplace',payload})});if(r.ok){await loadMyTemplates();marketplaceToast(`${t.name} added to My Templates`)}else marketplaceToast('Import failed. Please try again.');
}
function openMarketplaceDetail(t){
 marketplaceSelected=t;const info=marketplaceInfo(t),panel=document.getElementById('marketplaceDetail');panel.classList.remove('hidden');mountTemplatePreview(document.getElementById('marketplaceDetailPreview'),t,true);document.getElementById('marketplaceDetailCategory').textContent=info.category+' · '+info.type;document.getElementById('marketplaceDetailName').textContent=t.name;document.getElementById('marketplaceDetailDescription').textContent=t.description||'Editable presentation template.';document.getElementById('marketplaceDetailExplanation').textContent=info.explanation;document.getElementById('marketplaceDetailUses').innerHTML=info.uses.map(x=>`<span>${escapeHtml(x)}</span>`).join('');
}
document.getElementById('closeMarketplace')?.addEventListener('click',closeMarketplace);
document.getElementById('closeMarketplaceDetail')?.addEventListener('click',()=>document.getElementById('marketplaceDetail').classList.add('hidden'));
document.getElementById('marketplaceSearch')?.addEventListener('input',renderMarketplace);
document.getElementById('marketplaceSort')?.addEventListener('change',renderMarketplace);
document.getElementById('marketplaceImportFile')?.addEventListener('click',()=>document.getElementById('templateImportModal').classList.remove('hidden'));
document.getElementById('marketplaceMyTemplates')?.addEventListener('click',()=>{closeMarketplace();openPanelTab('mytemplates')});
document.getElementById('marketplaceUseNow')?.addEventListener('click',()=>{if(!marketplaceSelected)return;addSlideFromTemplate(marketplaceSelected);closeMarketplace();marketplaceToast(`${marketplaceSelected.name} added to your presentation`)});
document.getElementById('marketplaceImportToMine')?.addEventListener('click',()=>marketplaceSelected&&importMarketplaceTemplateQuiet(marketplaceSelected));
document.querySelector('.tab[data-tab="templates"]')?.addEventListener('click',openMarketplace);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('marketplaceModal')?.classList.contains('hidden')){if(!document.getElementById('marketplaceDetail').classList.contains('hidden'))document.getElementById('marketplaceDetail').classList.add('hidden');else closeMarketplace()}});
