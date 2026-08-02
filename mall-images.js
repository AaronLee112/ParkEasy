document.head.insertAdjacentHTML('beforeend','<style>.venue-art.has-photo:before,.venue-art.has-photo:after{display:none}.venue-art.has-photo{background-position:center;background-size:cover}</style>');
window.MallImages=(()=>{
  const local={
    'Pavilion Kuala Lumpur':'assets/pavilion-kuala-lumpur.jpg',
    'The Exchange TRX':'assets/the-exchange-trx.jpg',
    'Suria KLCC':'assets/suria-klcc.jpg'
  };
  const cache=new Map();
  async function findPhoto(name){
    if(local[name]) return local[name];
    if(cache.has(name)) return cache.get(name);
    const request=fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(name+' shopping mall Malaysia')}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1100&format=json&origin=*`)
      .then(response=>response.json())
      .then(data=>Object.values(data.query?.pages||{})[0]?.imageinfo?.[0]?.thumburl||null)
      .catch(()=>null);
    cache.set(name,request);return request;
  }
  function setPhoto(element,url){
    if(!url)return;
    element.style.backgroundImage=`linear-gradient(180deg,rgba(8,31,23,.05),rgba(8,31,23,.34)),url("${url}")`;
    element.style.backgroundPosition='center';element.style.backgroundSize='cover';
    element.classList.add('has-photo');
    const facade=element.querySelector('.mall-facade');if(facade)facade.style.display='none';
  }
  async function apply(root=document){
    const targets=[...root.querySelectorAll('[data-mall-image]')];
    await Promise.all(targets.map(async element=>setPhoto(element,await findPhoto(element.dataset.mallImage))));
  }
  return {apply,findPhoto};
})();
