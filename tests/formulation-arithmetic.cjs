#!/usr/bin/env node
// Pure arithmetic regression: research-only formulations, NOT clinical dosing.
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('clinical-review/candidates.json','utf8'));
function get(id){return data.candidates.find(c=>c.id===id);}
function mgPerMl(product,ingredient){
  assert.ok(Number.isFinite(product.ml)&&product.ml>0,'invalid volume');
  if(ingredient){
    assert.ok(Array.isArray(product.ingredients),'missing ingredients');
    const match=product.ingredients.find(x=>x.name===ingredient);
    assert.ok(match,'missing '+ingredient);
    return match.mg/product.ml;
  }
  assert.ok(!product.ingredients,'combination requires ingredient selection');
  return product.mg/product.ml;
}
function volumeForMg(product,mg,ingredient){
  assert.ok(Number.isFinite(mg)&&mg>0,'positive input mg required');
  return mg/mgPerMl(product,ingredient);
}
const sef=get('sefaleksin');
const bactrim=get('trimetoprim-sulfametoksazol');
assert.ok(sef&&bactrim);
const sefProduct=sef.products.find(p=>p.name.includes('SEF 250'));
const bactrimProduct=bactrim.products.find(p=>p.name.startsWith('Bactrim'));
const trimoksProduct=bactrim.products.find(p=>p.name.includes('TRİMOKS'));
assert.ok(sefProduct&&bactrimProduct&&trimoksProduct);
assert.equal(mgPerMl(sefProduct),50);
assert.equal(volumeForMg(sefProduct,250),5);
for(const product of [bactrimProduct,trimoksProduct]){
  assert.equal(mgPerMl(product,'trimetoprim'),8);
  assert.equal(mgPerMl(product,'sulfametoksazol'),40);
  assert.equal(volumeForMg(product,40,'trimetoprim'),5);
  assert.equal(volumeForMg(product,200,'sulfametoksazol'),5);
  assert.throws(()=>mgPerMl(product),/ingredient selection/);
  assert.throws(()=>volumeForMg(product,0,'trimetoprim'),/positive/);
  assert.throws(()=>volumeForMg(product,-1,'trimetoprim'),/positive/);
  assert.throws(()=>volumeForMg(product,NaN,'trimetoprim'),/positive/);
  assert.throws(()=>mgPerMl(product,'cefaleksin'),/missing/);
}
const oseltamivir=get('oseltamivir');
assert.ok(oseltamivir && oseltamivir.products.length===2);
const concentrations=oseltamivir.products.map(p=>mgPerMl(p)).sort((a,b)=>a-b);
assert.deepEqual(concentrations,[6,12]);
assert.equal(volumeForMg(oseltamivir.products.find(p=>mgPerMl(p)===6),30),5);
assert.equal(volumeForMg(oseltamivir.products.find(p=>mgPerMl(p)===12),30),2.5);
assert.notEqual(volumeForMg(oseltamivir.products[0],30),volumeForMg(oseltamivir.products[1],30));
// Verified product concentrations; unit normalization is NOT clinical dosing.
const budesonid=get('budesonid-nebul').products;
assert.deepEqual(budesonid.map(p=>mgPerMl(p)),[0.25,0.5]);
assert.deepEqual(budesonid.map(p=>p.mg),[0.5,1]);
assert.ok(budesonid.every(p=>p.route==='inhalation'));
const xyzal=get('levosetirizin').products[0];
assert.equal(mgPerMl(xyzal),0.5);
assert.equal(xyzal.route,'oral');
const atrovent=get('ipratropium-bromur').products[0];
assert.equal(atrovent.mg,0.25);
assert.equal(atrovent.labelQuantity,250);
assert.equal(atrovent.labelUnit,'mcg');
assert.equal(mgPerMl(atrovent),0.125);
assert.equal(atrovent.mg*1000,atrovent.labelQuantity);
assert.equal(atrovent.route,'inhalation');
assert.notEqual(atrovent.route,xyzal.route);
for(const c of data.candidates){
  assert.equal(c.calculatorEnabled,false);
  assert.equal(c.clinicalValidated,false);
}
console.log('PASS: 15+ formulation arithmetic and fail-closed checks; NO clinical dosing rules enabled.');
