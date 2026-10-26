(function(){
  'use strict';
  const el=id=>document.getElementById(id);
  const api=window.PediatricKUBReference;
  const panel=el('kubPanel');
  if(!panel || !api) return;
  const selection=el('kubDrug');
  const result=el('kubResult');
  const fmt=(n,decimal=2)=>n.toLocaleString('tr-TR',{maximumFractionDigits:decimal});
  function show(message,error){
    result.replaceChildren();
    const div=document.createElement('div');
    div.className=error?'msg bad':'hint';
    div.textContent=message;
    result.appendChild(div);
  }
  function add(text,cls){
    const p=document.createElement('p');
    if(cls) p.className=cls;
    p.textContent=text;
    result.appendChild(p);
  }
  el('kubCalc').addEventListener('click',()=>{
    const w=el('kilo').value, age=el('yas').value;
    if(w.trim()==='' || age.trim()===''){
      show('Önce yukarıdan ölçülmüş kilo ve yaşı (ay) seçin.',true);return;
    }
    const input={
      id:selection.value,weightKg:Number(w),ageMonths:Number(age),
      allergyChecked:el('kubAllergy').checked,
      renalChecked:el('kubRenal').checked,
      indicationChecked:el('kubIndication').checked,
      packageChecked:el('kubPackage').checked
    };
    let x;
    try{x=api.calculate(input);}catch(e){show(e.message,true);return;}
    result.replaceChildren();
    add(x.name+' · '+x.indication,'lbl');
    add('Ürün etiketindeki mL ile mutlaka karşılaştırın. KÜB kaynak karşılığıdır; bireysel reçete veya uzman onayı değildir.','hint');
    const v=x.perDoseMl,mg=x.perDoseMg;
    const p= v[0]===v[1]
      ?fmt(v[0])+' mL / doz · '+fmt(mg[0])+' mg / doz'
      :fmt(v[0])+'–'+fmt(v[1])+' mL / doz · '+fmt(mg[0])+'–'+fmt(mg[1])+' mg / doz';
    add(p,'big');
    add(x.dosingBasis,'lbl');
    if(x.additionalPerDoseMg) add('Ayrıca '+fmt(x.additionalPerDoseMg.sulfametoksazol)+' mg sülfametoksazol / doz (TMP ve SMZ ayrı hesaplanmıştır).');
    add(x.note);
    const a=document.createElement('a');
    a.href=x.source;a.target='_blank';a.rel='noopener noreferrer';
    a.textContent='Ürün KÜB kaynağını aç';
    result.appendChild(a);
  });
  selection.addEventListener('change',()=>show('İlaç değişti. Ürün ve hastaya özel klinik kontrolleri yeniden gözden geçirin.',false));
  ['kubAllergy','kubRenal','kubIndication','kubPackage'].forEach(id=>el(id).addEventListener('change',()=>show('Klinik kontroller değişti; yeniden hesaplayın.',false)));
  ['kilo','yas'].forEach(id=>el(id).addEventListener('input',()=>show('Hasta verisi değişti; yeniden hesaplayın.',false)));
})();