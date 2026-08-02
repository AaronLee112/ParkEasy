const backLink=document.querySelector('.back-link');
backLink.href='index.html#venues';
backLink.textContent='← Back to home';

const venue=new URLSearchParams(location.search).get('venue')||'Pavilion Kuala Lumpur';
const rates={'The Exchange TRX':'RM 10','Suria KLCC':'RM 9','Mid Valley Megamall':'RM 7','1 Utama Shopping Centre':'RM 6','Sunway Pyramid':'RM 7','IOI City Mall':'RM 5','Paradigm Mall Petaling Jaya':'RM 6','AEON Mall Shah Alam':'RM 4','Queensbay Mall':'RM 5','Gurney Plaza':'RM 6','Gurney Paragon':'RM 6','Johor Bahru City Square':'RM 5','The Mall, Mid Valley Southkey':'RM 5','Imago Shopping Mall':'RM 5','Suria Sabah':'RM 4','1Borneo Hypermall':'RM 4','The Spring Shopping Mall':'RM 4','Vivacity Megamall':'RM 5','CityONE Megamall':'RM 4','Bintang Megamall':'RM 4'};
const locations={'Pavilion Kuala Lumpur':'Bukit Bintang, Kuala Lumpur','The Exchange TRX':'Tun Razak Exchange, Kuala Lumpur','Suria KLCC':'Kuala Lumpur City Centre'};
const mallThemes={'Pavilion Kuala Lumpur':['#e9b274','#874c36','CITY STYLE'],'Suria KLCC':['#78b6ca','#234e74','CITY CENTRE'],'The Exchange TRX':['#8ab79c','#294d42','THE EXCHANGE'],'Mid Valley Megamall':['#c88976','#672f32','MID VALLEY CITY'],'1 Utama Shopping Centre':['#77b0a5','#205c57','BANDAR UTAMA'],'Sunway Pyramid':['#d2a15e','#7e4c22','SUNWAY CITY'],'IOI City Mall':['#6facad','#264f5c','PUTRAJAYA'],'Paradigm Mall Petaling Jaya':['#9398c4','#454879','KELANA JAYA'],'AEON Mall Shah Alam':['#cb9b65','#6e442c','SHAH ALAM'],'Queensbay Mall':['#6aaac3','#264d72','PENANG SEAFRONT'],'Gurney Plaza':['#c88873','#703d45','GURNEY DRIVE'],'Gurney Paragon':['#99ae76','#3d5e3d','GEORGE TOWN'],'Johor Bahru City Square':['#6e9fb7','#345576','JOHOR BAHRU'],'The Mall, Mid Valley Southkey':['#c7956d','#6c4430','SOUTHKEY']};
const [sun,sky,caption]=mallThemes[venue]||['#91b5a1','#3f6958','PARK EASY'];
const mallImages={'Pavilion Kuala Lumpur':'assets/pavilion-kuala-lumpur.jpg','The Exchange TRX':'assets/the-exchange-trx.jpg','Suria KLCC':'assets/suria-klcc.jpg'};
document.head.insertAdjacentHTML('beforeend',`<style>.mall-visual{height:185px;border-radius:14px;overflow:hidden;position:relative;margin:21px 0 34px;background:linear-gradient(130deg,${sun},${sky});color:#fff}.mall-visual:before{content:'';position:absolute;width:200px;height:200px;border-radius:50%;right:10%;top:-95px;background:#ffffff38}.mall-visual:after{content:'';position:absolute;left:0;right:0;bottom:0;height:67px;background:linear-gradient(#ffffff16,#09241c5e)}.mall-visual__caption{position:absolute;z-index:2;left:22px;top:21px;font:500 10px 'DM Mono';letter-spacing:1.5px;background:#ffffff26;padding:6px 8px;border-radius:4px}.mall-visual__name{position:absolute;z-index:2;left:22px;bottom:19px;margin:0;font-size:24px;letter-spacing:-1.2px}.mall-facade{position:absolute;z-index:1;right:12%;bottom:38px;width:46%;height:92px;border:3px solid #ffffffbf;border-bottom-width:10px;background:repeating-linear-gradient(90deg,#ffffff24 0 27px,#ffffff80 28px 31px);box-shadow:20px -18px 0 -8px #ffffff70}.mall-facade:before{content:'';position:absolute;left:13%;right:13%;top:-22px;height:20px;background:#ffffffb5;clip-path:polygon(5% 100%,18% 5%,82% 5%,95% 100%)}@media(max-width:560px){.mall-visual{height:145px;margin-bottom:26px}.mall-facade{right:4%;width:57%;height:73px}.mall-visual__name{font-size:19px}}</style>`);
document.querySelector('.spaces-heading').insertAdjacentHTML('beforebegin',`<section class="mall-visual" aria-label="Visual for ${venue}"><span class="mall-visual__caption">${caption}</span><div class="mall-facade"></div><h2 class="mall-visual__name">${venue}</h2></section>`);
if(mallImages[venue]){const visual=document.querySelector('.mall-visual');visual.style.backgroundImage=`linear-gradient(90deg,rgba(12,36,28,.6),rgba(12,36,28,.08)),url('${mallImages[venue]}')`;visual.style.backgroundPosition='center';visual.style.backgroundSize='cover';visual.querySelector('.mall-facade').style.display='none'}
const mallVisual=document.querySelector('.mall-visual');mallVisual.dataset.mallImage=venue;
if(window.MallImages)MallImages.apply(document);else{const imageScript=document.createElement('script');imageScript.src='mall-images.js';imageScript.onload=()=>MallImages.apply(document);document.head.append(imageScript)}
document.querySelector('#mallName').innerHTML=`${venue}<br><em>has a space for you.</em>`;
document.querySelector('#mallLocation').textContent=locations[venue]||'Select a numbered bay and floor before completing your reservation.';

const floors=['P1','P2','P3'];
const floorButtons=document.querySelector('#floorButtons');
const grid=document.querySelector('#spacesGrid');
let floor='P1';
let selected=null;

function draw(){
  floorButtons.innerHTML=floors.map(x=>`<button class="floor ${x===floor?'active':''}" data-floor="${x}">Level ${x}<small>${x==='P1'?8:x==='P2'?11:6} free</small></button>`).join('');
  const bays=Array.from({length:24},(_,i)=>{const zone=['A','A','A','A','B','B','B','B','C','C','C','C'][i%12];const num=String(i+1).padStart(2,'0');const code=`${floor}-${zone}${num}`;return{code,zone,taken:(i+floor.charCodeAt(1))%5===0}});
  grid.innerHTML=bays.map(b=>`<button class="bay ${b.taken?'taken':''} ${selected===b.code?'chosen':''}" data-code="${b.code}" data-zone="${b.zone}" ${b.taken?'disabled':''}><span>${b.code}</span><i>${b.taken?'×':'P'}</i></button>`).join('');
  document.querySelector('#levelTitle').textContent=`LEVEL ${floor}`;
  document.querySelector('#availability').textContent=`${bays.filter(x=>!x.taken).length} spaces available`;
}

floorButtons.addEventListener('click',e=>{const b=e.target.closest('.floor');if(!b)return;floor=b.dataset.floor;selected=null;document.querySelector('#selectionEmpty').classList.remove('hidden');document.querySelector('#selectionDetail').classList.add('hidden');draw()});
grid.addEventListener('click',e=>{const b=e.target.closest('.bay:not(.taken)');if(!b)return;selected=b.dataset.code;document.querySelector('#selectedCode').textContent=selected;document.querySelector('#selectedFloor').textContent=`Level ${floor}`;document.querySelector('#selectedZone').textContent=`Zone ${b.dataset.zone}`;document.querySelector('#selectedRate').textContent=`${rates[venue]||'RM 8'} / hour`;document.querySelector('#selectionEmpty').classList.add('hidden');document.querySelector('#selectionDetail').classList.remove('hidden');draw()});
document.querySelector('#continueBtn').addEventListener('click',()=>{location.href=`payment.html?venue=${encodeURIComponent(venue)}&space=${encodeURIComponent(selected)}&rate=${encodeURIComponent(rates[venue]||'RM 8')}`});
draw();
