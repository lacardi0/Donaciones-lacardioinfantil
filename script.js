const form=document.getElementById('donationForm');
const formWrap=document.getElementById('formWrap');
const openForm=document.getElementById('openForm');
const closeForm=document.getElementById('closeForm');
const submitButton=document.getElementById('submitButton');
const message=document.getElementById('formMessage');
const amountInput=document.getElementById('amount');

function gaEvent(name,params={}){if(typeof gtag==='function')gtag('event',name,params)}

document.querySelectorAll('.donation-button').forEach(btn=>btn.addEventListener('click',()=>gaEvent('donacion_click',{valor_donacion:btn.dataset.donationValue,metodo:'ePayco'})));

openForm.addEventListener('click',()=>{
  gaEvent('otro_valor_click',{metodo:'formulario'});
  formWrap.hidden=false;
  openForm.hidden=true;
  setTimeout(()=>formWrap.scrollIntoView({behavior:'smooth',block:'center'}),20);
});
closeForm.addEventListener('click',()=>{
  formWrap.hidden=true;
  openForm.hidden=false;
  openForm.scrollIntoView({behavior:'smooth',block:'center'});
});

function digits(v){return v.replace(/\D/g,'')}
amountInput.addEventListener('input',()=>{
  const d=digits(amountInput.value);
  amountInput.value=d?Number(d).toLocaleString('es-CO'):'';
});
function show(t,ok=false){message.textContent=t;message.style.color=ok?'#18794e':'#b42318'}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  show('');
  const name=document.getElementById('name').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const email=document.getElementById('email').value.trim();
  const d=digits(amountInput.value);
  const amount=Number(d);
  if(!name||name.length<2)return show('Escribe tu nombre completo.');
  if(phone.replace(/\D/g,'').length<7)return show('Escribe un número de celular válido.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return show('Escribe un correo electrónico válido.');
  if(!amount||amount<=0)return show('Escribe un valor de donación válido.');
  if(!document.getElementById('consent').checked)return show('Debes aceptar el aviso de uso de datos.');
  if(form.querySelector('[name="_honey"]').value)return;

  const data=new FormData(form);
  data.set('Valor solicitado',amount.toLocaleString('es-CO'));
  submitButton.disabled=true;
  submitButton.textContent='Enviando...';
  try{
    const r=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
    if(!r.ok)throw new Error();
    gaEvent('solicitud_enlace_pago',{valor_donacion:amount.toLocaleString('es-CO')});
    form.reset();
    show('Solicitud enviada. Te enviaremos el enlace de pago.',true);
  }catch(err){
    show('No pudimos enviar la solicitud. Intenta nuevamente.');
  }finally{
    submitButton.disabled=false;
    submitButton.innerHTML='Solicitar enlace de pago <span>→</span>';
  }
});
