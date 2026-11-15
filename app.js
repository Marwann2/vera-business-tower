(function(){
  var f=document.getElementById('f'),F=f.elements,done=document.getElementById('done');
  var qs=new URLSearchParams(location.search);
  var utm=['utm_source','utm_medium','utm_campaign','utm_content'].map(function(k){return (qs.get(k)||'').slice(0,60)});
  var variant=(document.body.getAttribute('data-variant')||'');
  var src=(qs.get('src')||(utm.some(Boolean)?utm.join('|'):'direct')).slice(0,120)+(variant?' #'+variant:'');
  var toEn=function(s){return String(s||'').replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)})};
  function normPhone(v){
    v=toEn(v).replace(/[\s\-()]/g,'');
    if(/^\+9665\d{8}$/.test(v)) v='0'+v.slice(4);
    else if(/^009665\d{8}$/.test(v)) v='0'+v.slice(5);
    else if(/^9665\d{8}$/.test(v)) v='0'+v.slice(3);
    else if(/^5\d{8}$/.test(v)) v='0'+v;
    return /^05\d{8}$/.test(v)?v:null;
  }
  function mark(el,bad){
    if(!el) return;
    var l=el.closest('label')||el.closest('fieldset');
    if(l) l.classList.toggle('invalid',bad);
    if(el.setAttribute && el.type!=='hidden') el.setAttribute('aria-invalid', bad?'true':'false');
    if(!bad){
      var n=el.getAttribute('name');
      var err=n?f.querySelector('.err[data-for="'+n+'"]'):null;
      if(err) err.classList.remove('show');
    }
  }
  function clearErrs(){
    f.querySelectorAll('.err').forEach(function(e){e.classList.remove('show');if(e.getAttribute('data-for')==='form')e.textContent=''});
    f.querySelectorAll('.invalid').forEach(function(e){e.classList.remove('invalid')});
    f.querySelectorAll('[aria-invalid]').forEach(function(e){e.setAttribute('aria-invalid','false')});
  }
  function showFieldErr(el,name){
    mark(el,true);
    var err=f.querySelector('.err[data-for="'+name+'"]');
    if(err) err.classList.add('show');
    try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}
    if(el&&el.focus) el.focus();
  }
  function fail(msg){var formErr=f.querySelector('.err[data-for=form]');formErr.textContent=msg;formErr.classList.add('show');try{formErr.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}}
  ['name','phone','email'].forEach(function(n){F[n].addEventListener('input',function(){mark(F[n],false)})});
  F['area'].addEventListener('change',function(){mark(F['area'],false)});
  F['consent'].addEventListener('change',function(){mark(F['consent'],false)});
  function renderOffer(){
    var o=window.SAFANA_OFFER||{};
    var headline=(o.headline||'').trim();
    var note=(o.note||'').trim();
    document.querySelectorAll('[data-offer]').forEach(function(el){
      var h=el.querySelector('[data-offer-headline]');
      var n=el.querySelector('[data-offer-note]');
      if(h) h.textContent=headline;
      if(n){n.textContent=note;n.hidden=!note}
      el.hidden=!headline;
    });
  }
  renderOffer();
  var lic=(window.VERA_LICENSE||'').trim();if(lic.indexOf('[ناقص]')!==-1)lic='';
  document.querySelectorAll('[data-license]').forEach(function(el){el.textContent=lic});
  function track(){var p=window.VERA_PIXELS||{};
    try{if((p.snap||'').trim()&&typeof window.snaptr==='function')window.snaptr('track','SIGN_UP')}catch(e){}
    try{if((p.meta||'').trim()&&typeof window.fbq==='function')window.fbq('track','Lead')}catch(e){}
  }
  var dock=document.querySelector('.dock'),vis={h:true,r:false};
  if(dock && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){vis[e.target.id==='register'?'r':'h']=e.isIntersecting});
      dock.classList.toggle('show',!vis.h&&!vis.r);
    },{threshold:0.08});
    var hero=document.querySelector('.hero');
    if(hero) io.observe(hero);
    var reg=document.getElementById('register');
    if(reg) io.observe(reg);
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();clearErrs();
    var name=F['name'].value.trim(),phone=normPhone(F['phone'].value),email=F['email'].value.trim();
    var method=(f.querySelector('input[name=method]:checked')||{}).value;
    mark(F['phone'],!phone);
    var emailBad=email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);mark(F['email'],emailBad);
    if(!name){showFieldErr(F['name'],'name');return}
    if(!phone){showFieldErr(F['phone'],'phone');return}
    if(emailBad){showFieldErr(F['email'],'email');return}
    if(!F['area'].value){showFieldErr(F['area'],'area');return}
    if(!method){showFieldErr(f.querySelector('input[name=method]'),'method');return}
    if(!F['consent'].checked){showFieldErr(F['consent'],'consent');return}
    if(F['website'].value)return showDone();
    var data={name:name,phone:phone,email:email,area:F['area'].value,method:method,notes:F['notes'].value.trim(),consent:'1',source:src,utm_source:utm[0],utm_medium:utm[1],utm_campaign:utm[2],utm_content:utm[3],page_variant:variant};
    var ep=(window.SAFANA_ENDPOINT||'').trim();
    if(!ep){
      var t='تسجيل اهتمام - برج ڤيرا للأعمال\nالاسم: '+data.name+'\nالجوال: '+data.phone+(data.email?'\nالبريد: '+data.email:'')+'\nالمساحة: '+data.area+'\nطريقة الشراء: '+data.method+(data.notes?'\nملاحظات: '+data.notes:'');
      window.location.href='https://wa.me/966556073377?text='+encodeURIComponent(t);return showDone();
    }
    var btn=f.querySelector('button');btn.disabled=true;btn.textContent='جارٍ الإرسال…';
    var body=new URLSearchParams(data);
    fetch(ep,{method:'POST',body:body}).then(function(r){return r.json()}).then(function(j){
      if(j&&j.ok){track();showDone()}else throw new Error('bad');
    }).catch(function(){
      btn.disabled=false;btn.textContent='إرسال التسجيل';
      fail('تعذّر الإرسال، حاول مرة أخرى أو أرسل التسجيل عبر واتساب:');
      var wt='تسجيل اهتمام - برج ڤيرا للأعمال\nالاسم: '+data.name+'\nالجوال: '+data.phone+(data.email?'\nالبريد: '+data.email:'')+'\nالمساحة: '+data.area+'\nالمصدر: '+data.source;
      var fe=f.querySelector('.err[data-for=form]'),wa=document.createElement('a');wa.className='btn wa';wa.style.marginTop='8px';wa.target='_blank';wa.rel='noopener';
      wa.href='https://wa.me/966556073377?text='+encodeURIComponent(wt);wa.textContent='أرسل التسجيل عبر واتساب';fe.appendChild(document.createElement('br'));fe.appendChild(wa);
    });
  });
  function showDone(){f.hidden=true;done.hidden=false;var rh=document.querySelector('.reg-head');if(rh)rh.hidden=true;done.scrollIntoView({behavior:'smooth',block:'center'})}
  document.querySelectorAll('.mosaic img').forEach(function(img){
    img.addEventListener('click',function(){
      var lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<img alt="">';lb.firstChild.src=img.src;lb.firstChild.alt=img.alt;
      lb.addEventListener('click',function(){lb.remove()});document.body.appendChild(lb);
    });
  });
})();
