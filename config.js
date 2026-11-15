// رابط Apps Script Web App (ينتهي بـ /exec). إذا كان فارغاً، يُرسل النموذج التسجيل عبر واتساب لفريق المبيعات.
window.SAFANA_ENDPOINT = "https://script.google.com/macros/s/AKfycbxBAbuuTX4qUGgrQjL6BcuzU4p3iuXBnkZtWRB7gTzaX2fa1ls2Cg9C_7KlK8PycDqqeA/exec";

// عرض الجذب الظاهر بجانب السعر وفي نموذج التسجيل. عدّل السطرين التاليين فقط عند تغيّر خطة الدفعات.
window.SAFANA_OFFER = {
  headline: "دفعات مرنة",
  note: ""
};

// نص الترخيص كما يعتمده المطوّر. فارغ = لا يظهر شي. لا تكتب [ناقص] هنا.

// خطة بديلة: نموذج Google احتياطي يستقبل التسجيل لو الشيت الأساسي ما رد مرتين.
// url = رابط formResponse للنموذج، وكل حقل = رقم entry في النموذج (مثال "entry.123456"). فاضي = يتخطاه ويطلع زر واتساب.
window.VERA_BACKUP = { url: "https://docs.google.com/forms/d/e/1FAIpQLSfrFYCfrrPG0acJT7rK_6WKq-QDAKROyfq2WVvkmxvGvDFMdw/formResponse", fields: { name: "entry.2087367412", phone: "entry.114449328", email: "entry.1092771775", area: "entry.2123327843", notes: "entry.1829428642", source: "entry.1858767041" } };
window.VERA_LICENSE = "رقم ترخيص البيع على الخارطة: 987";

// بكسلات الإعلانات: تشتغل فقط إذا وُضع المعرّف، وتُطلق حدث التسجيل بعد الحفظ الفعلي في الشيت.
window.VERA_PIXELS = { snap: "", meta: "" };
(function(p){
  p.snap=(p.snap||"").trim();p.meta=(p.meta||"").trim();
  if(p.snap){(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s="script";var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u)})(window,document,"https://sc-static.net/scevent.min.js");snaptr("init",p.snap);snaptr("track","PAGE_VIEW")}
  if(p.meta){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init",p.meta);fbq("track","PageView")}
})(window.VERA_PIXELS||{});

// أدوات القياس (مجانية): ga4 = معرّف Google Analytics مثل "G-AB12CD34EF"، clarity = معرّف مشروع Microsoft Clarity مثل "abcd123xyz". فاضي = ما تشتغل.
window.VERA_ANALYTICS = { ga4: "G-720Y8CDGGW", clarity: "ze7n1xptxt" };
(function(a){
  a.ga4=(a.ga4||"").trim();a.clarity=(a.clarity||"").trim();
  if(/^G-[A-Z0-9]+$/.test(a.ga4)){var g=document.createElement("script");g.async=true;g.src="https://www.googletagmanager.com/gtag/js?id="+a.ga4;document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",a.ga4,{allow_google_signals:false,allow_ad_personalization_signals:false})}
  if(/^[a-z0-9]+$/.test(a.clarity)){(function(c,l,r,i,t,y){c[r]=c[r]||function(){(c[r].q=c[r].q||[]).push(arguments)};t=l.createElement(i);t.async=1;t.src="https://www.clarity.ms/tag/"+a.clarity;y=l.getElementsByTagName(i)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script")}
})(window.VERA_ANALYTICS||{});
