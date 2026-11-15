// رابط Apps Script Web App (ينتهي بـ /exec). إذا كان فارغاً، يُرسل النموذج التسجيل عبر واتساب لفريق المبيعات.
window.SAFANA_ENDPOINT = "https://script.google.com/macros/s/AKfycbxBAbuuTX4qUGgrQjL6BcuzU4p3iuXBnkZtWRB7gTzaX2fa1ls2Cg9C_7KlK8PycDqqeA/exec";

// عرض الجذب الظاهر بجانب السعر وفي نموذج التسجيل. عدّل السطرين التاليين فقط عند تغيّر خطة الدفعات.
window.SAFANA_OFFER = {
  headline: "دفعات مرنة",
  note: ""
};

// نص الترخيص كما يعتمده المطوّر. فارغ = لا يظهر شي. لا تكتب [ناقص] هنا.
window.VERA_LICENSE = "";

// بكسلات الإعلانات: تشتغل فقط إذا وُضع المعرّف، وتُطلق حدث التسجيل بعد الحفظ الفعلي في الشيت.
window.VERA_PIXELS = { snap: "", meta: "" };
(function(p){
  p.snap=(p.snap||"").trim();p.meta=(p.meta||"").trim();
  if(p.snap){(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s="script";var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u)})(window,document,"https://sc-static.net/scevent.min.js");snaptr("init",p.snap);snaptr("track","PAGE_VIEW")}
  if(p.meta){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init",p.meta);fbq("track","PageView")}
})(window.VERA_PIXELS||{});
