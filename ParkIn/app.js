const venues = [
  {name:'Pavilion Kuala Lumpur', area:'Bukit Bintang · 3 min walk', price:'RM 8', spots:'12 spaces left', art:'#e7dfce', shape:'#e9a36a'},
  {name:'The Exchange TRX', area:'Tun Razak Exchange · On-site', price:'RM 10', spots:'8 spaces left', art:'#dce7dc', shape:'#83b393'},
  {name:'Suria KLCC', area:'Kuala Lumpur City Centre · On-site', price:'RM 9', spots:'21 spaces left', art:'#dbe3ed', shape:'#819fc7'}
];
const grid = document.querySelector('#venueGrid');
grid.innerHTML = venues.map((v, i) => `<article class="venue"><div class="venue-art" style="--art:${v.art};--shape:${v.shape}"><span class="tag">${v.spots}</span></div><div class="venue-info"><div class="venue-title"><h3>${v.name}</h3><span>↗</span></div><p>${v.area}</p><div class="venue-footer"><strong>${v.price} <small>/ hour</small></strong><button class="book-btn" data-venue="${i}">Reserve spot</button></div></div></article>`).join('');

const date = document.querySelector('#arrival');
const now = new Date();
date.value = now.toISOString().slice(0,10);
date.min = date.value;
document.querySelector('#time').value = String(now.getHours()+1).padStart(2,'0') + ':00';
const toast = document.querySelector('#toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3200)}
document.querySelector('#searchForm').addEventListener('submit', event => {event.preventDefault();document.querySelector('#venues').scrollIntoView({behavior:'smooth'});showToast('3 nearby venues have spaces for your selected time.');});
grid.addEventListener('click', event => {const btn=event.target.closest('.book-btn');if(!btn)return;const v=venues[btn.dataset.venue];showToast(`Spot reserved at ${v.name}. Confirmation sent!`);btn.textContent='Reserved ✓';btn.disabled=true;});
document.querySelector('#locate').addEventListener('click',()=>showToast('Location set to your current area.'));
