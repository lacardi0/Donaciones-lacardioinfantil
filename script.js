const form=document.getElementById("donationForm");
const formWrap=document.getElementById("formWrap");
const openForm=document.getElementById("openForm");
const submitButton=document.getElementById("submitButton");
const message=document.getElementById("formMessage");
const amountInput=document.getElementById("amount");


// Google Analytics: track each donation button by amount.
// No name, phone, email, or other personal data is sent to Analytics.
document.querySelectorAll(".donation-button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (typeof gtag !== "function") return;
    gtag("event", "donacion_click", {
      valor_donacion: btn.textContent.trim(),
      url_checkout: btn.href
    });
  });
});

openForm.addEventListener("click", () => {
  if (typeof gtag !== "function") return;
  gtag("event", "otro_valor_click");
});

openForm.addEventListener("click",()=>{
  formWrap.hidden=false;
  openForm.hidden=true;
  formWrap.scrollIntoView({behavior:"smooth",block:"start"});
  document.getElementById("name").focus();
});

function cleanAmount(value){
  // Accepts 750000, 750.000, 750,000 or $750.000 and converts to 750000.
  return value.replace(/[^0-9]/g,"");
}

amountInput.addEventListener("input",()=>{
  const digits=cleanAmount(amountInput.value);
  amountInput.value=digits ? Number(digits).toLocaleString("es-CO") : "";
});

form.addEventListener("submit",async e=>{
  e.preventDefault();
  message.textContent="";
  message.style.color="";

  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const email=document.getElementById("email").value.trim();
  const amountDigits=cleanAmount(amountInput.value);
  const amount=Number(amountDigits);
  const consent=document.getElementById("consent").checked;
  const honey=form.querySelector('[name="_honey"]').value.trim();

  if(honey)return;
  const phoneDigits=phone.replace(/\D/g,"");

  if(name.length<2)return show("Escribe tu nombre completo.");
  if(phoneDigits.length<7||phoneDigits.length>15)return show("Escribe un número de celular válido.");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return show("Escribe un correo electrónico válido.");
  if(!Number.isFinite(amount)||amount<=0)return show("Escribe un valor de donación válido.");
  if(!consent)return show("Debes aceptar el aviso de uso de datos.");

  // Send the clean numeric value instead of the formatted display value.
  const data=new FormData(form);
  data.set("Valor solicitado", amount.toLocaleString("es-CO"));

  submitButton.disabled=true;
  submitButton.textContent="Enviando...";

  try{
    const r=await fetch(form.action,{method:"POST",body:data,headers:{Accept:"application/json"}});
    if(!r.ok)throw new Error("send");
    form.reset();
    if (typeof gtag === "function") {
      gtag("event", "solicitud_enlace_pago", {
        valor_donacion: amount.toLocaleString("es-CO")
      });
    }
    message.textContent="Gracias por tu interés en apoyar esta causa. Hemos recibido tu solicitud y te enviaremos el enlace de pago.";
    message.style.color="#18794e";
  }catch(err){
    message.textContent="No pudimos enviar la solicitud. Por favor intenta nuevamente.";
    message.style.color="#b42318";
  }finally{
    submitButton.disabled=false;
    submitButton.textContent="Solicitar enlace de pago";
  }
});

function show(text){
  message.textContent=text;
  message.style.color="#b42318";
}
