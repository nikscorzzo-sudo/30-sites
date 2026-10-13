const config=JSON.parse(document.getElementById('site-config').textContent);
const selections=new Map();
const drawer=document.querySelector('.drawer');
const backdrop=document.querySelector('.drawer-backdrop');
const list=document.querySelector('.selection-list');
const date=document.querySelector('#preferred-date');
const note=document.querySelector('#request-note');
let returnFocus=null;
function makeMessage(){
 const lines=[`Olá, ${config.name}! Vim pelo site.`];
 if(selections.size){lines.push(config.food?'Gostaria de consultar estas opções:':'Gostaria de consultar estes serviços:');for(const [id,q]of selections){const item=config.catalog.find(i=>i.id===id);lines.push(`• ${q>1?q+' × ':''}${item.name}`);}}
 else lines.push(config.food?'Gostaria de consultar o cardápio e os valores.':config.arrival?'Gostaria de consultar o atendimento por ordem de chegada.':'Gostaria de consultar os serviços e horários disponíveis.');
 if(date?.value)lines.push('Preferência de data: '+date.value.split('-').reverse().join('/'));
 if(note.value.trim())lines.push('Observações: '+note.value.trim());
 lines.push(config.food?'Podem confirmar disponibilidade, valores e atendimento?':'Podem confirmar os valores e a disponibilidade?');return lines.join('\n');
}
function update(){
 const total=[...selections.values()].reduce((a,b)=>a+b,0);
 document.querySelectorAll('[data-count]').forEach(e=>e.textContent=total);
 document.querySelectorAll('.choose').forEach(b=>{const active=selections.has(b.dataset.item);b.setAttribute('aria-pressed',String(active));b.querySelector('span').textContent=active?'Selecionado':'Selecionar';});
 list.replaceChildren();
 if(!total){const li=document.createElement('li');li.className='empty-selection';li.textContent='Você pode escolher no catálogo ou conversar diretamente com a equipe.';list.append(li);}
 for(const [id,q]of selections){const item=config.catalog.find(x=>x.id===id),li=document.createElement('li'),label=document.createElement('span');label.textContent=item.name;li.append(label);const group=document.createElement('div');group.className='quantity';for(const [symbol,delta]of [['−',-1],['+',1]]){const button=document.createElement('button');button.type='button';button.textContent=symbol;button.setAttribute('aria-label',(delta<0?'Remover uma unidade de ':'Adicionar uma unidade de ')+item.name);button.addEventListener('click',()=>{const next=(selections.get(id)||0)+delta;if(next<=0)selections.delete(id);else selections.set(id,Math.min(next,99));update();});if(delta===1){const quantity=document.createElement('span');quantity.textContent=q;group.append(quantity);}group.append(button);}li.append(group);list.append(li);}
 const url='https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(makeMessage());document.querySelector('#send-request').href=url;document.querySelectorAll('.compose-link').forEach(a=>a.href=url);document.getElementById('selection-live').textContent=total+' opções selecionadas';
 document.querySelector('[data-selection-summary]').textContent=total?`${total} ${config.food?'item(ns)':'serviço(s)'} selecionado(s)`:'Converse com a equipe';
}
function openDrawer(){returnFocus=document.activeElement;drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';update();document.querySelector('[data-close-drawer]').focus();}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow='';returnFocus?.focus();}
document.querySelectorAll('[data-open-drawer]').forEach(b=>b.addEventListener('click',openDrawer));document.querySelector('[data-close-drawer]').addEventListener('click',closeDrawer);backdrop.addEventListener('click',closeDrawer);
document.querySelectorAll('.choose').forEach(b=>b.addEventListener('click',()=>{if(selections.has(b.dataset.item))selections.delete(b.dataset.item);else selections.set(b.dataset.item,1);update();}));
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.catalog-card').forEach(c=>c.hidden=b.dataset.filter!=='Todos'&&c.dataset.category!==b.dataset.filter);}));
document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const carousel=document.querySelector('.carousel');carousel.scrollBy({left:Number(b.dataset.slide)*(carousel.querySelector('.slide').getBoundingClientRect().width+20),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
const toggle=document.querySelector('.mobile-toggle'),nav=document.querySelector('.navlinks');toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
const lightbox=document.querySelector('.lightbox');document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{const target=lightbox.querySelector('img');target.src=b.dataset.lightbox;target.alt=b.querySelector('img').alt;lightbox.showModal();}));lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))closeDrawer();if(e.key==='Tab'&&drawer.classList.contains('open')){const els=[...drawer.querySelectorAll('button,a[href],input,textarea')].filter(x=>!x.disabled&&x.offsetParent!==null),first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
if(date){const now=new Date();date.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');date.addEventListener('input',update);}note.addEventListener('input',update);update();
