const main=document.getElementById('main');
main.insertAdjacentHTML('afterbegin',`
<section class="preview-banner s12" aria-label="Read-only boundary"><strong>READ-ONLY WORKSPACE</strong><span>Check the account, environment and evidence timestamps before acting. Decisions remain on your phone.</span></section>
<section class="card s12 owner-start" id="start-here">
 <div class="owner-title"><div><span class="eyebrow">YOUR DAILY WORKSPACE</span><h1>A clearer view. A guided next step.</h1><p>Start with status, understand the setup, then review the record.</p></div><button id="start-tour" class="primary">Start guided tour</button></div>
 <nav class="section-nav" aria-label="Dashboard sections">
  <button data-section="today">01 · Status</button><button data-section="signal">02 · Market setup</button><button data-section="poscard">03 · Positions</button><button data-section="wealthcard">04 · Planning</button><button data-section="owner-orientation">05 · Training</button><button data-section="owner-playbook">06 · Playbook</button><button data-section="syscard">07 · System details</button>
 </nav>
 <p class="view-note"><strong>Missing a card?</strong> Plain view hides Indicators and System details. Detailed view reveals both. Section links reveal the card you select.</p>
 <div id="tour-panel" hidden aria-live="polite">
  <div><span id="tour-count" class="eyebrow"></span><h2 id="tour-title"></h2><p id="tour-text"></p></div>
  <div class="tour-controls"><button id="tour-back">Back</button><button id="tour-show">Show this card</button><button id="tour-next" class="primary">Next</button><button id="tour-close">Close tour</button></div>
 </div>
</section>`);
main.querySelector('.foot').insertAdjacentHTML('beforebegin',`
<section class="card s12" id="owner-playbook">
 <div class="playbook-heading"><div><span class="eyebrow">YOUR DAILY PLAYBOOK</span><h2>What do I do next?</h2></div><a href="CST-Owner-Playbook.md" download>Download playbook</a></div>
 <div class="playbook-grid">
  <details open><summary>Before you review a trade</summary><ol><li>Confirm the environment says Paper.</li><li>Read the update time. Old data is not current evidence.</li><li>Read Today and System. A halt or missing evidence means stop.</li><li>Check positions and resting orders before considering another entry.</li></ol></details>
  <details><summary>When a proposal arrives</summary><ol><li>Match symbol, account, side and quantity.</li><li>Read the limit, stop, target and estimated risk.</li><li>Check expiry and intended strategy.</li><li>Use the existing authorized phone workflow, not this dashboard. Decline if unclear.</li><li>Wait for broker evidence. Approval is not a fill.</li></ol></details>
  <details><summary>After an order or fill</summary><ol><li>Compare the broker order with the Engine log.</li><li>Distinguish waiting orders, partial fills and positions.</li><li>Check actual exit orders; a green badge does not prove protection.</li><li>Record discrepancies before taking further action.</li></ol></details>
  <details><summary>At the end of your day</summary><ol><li>Review fills, positions and remaining orders.</li><li>Note the setup, decision, outcome and lesson in your existing journal.</li><li>Read one training lesson.</li><li>Do not change risk rules to chase a loss.</li></ol></details>
 </div>
 <div class="gap-note"><strong>Not an account-control screen.</strong> The wealth illustration is not a Fidelity balance or a deposit scheduler. This dashboard does not add a funding tracker, account selector, trade journal, options approvals or a live-trading switch.</div>
</section>`);
main.querySelector('.foot').textContent='Read-only account display. Confirm account, environment and timestamps. Nothing here approves, places or cancels an order. Training is guidance, not trading authorization.';
const notes={
 focus:'Blue · Choose a symbol and check the quote timestamp.',
 signal:'Violet · Rule checks, not a confidence score. A last-scan verdict is not proof of a current approval request or fill.',
 feedcard:'Teal · Read the sequence: proposal, decision, order, fill.',
 wealthcard:'Gold · Planning illustration, not a funded account.',
 poscard:'Teal · Positions and orders are different things.',
 learn:'Violet · Your existing strategy lessons are preserved. Historical examples and percentages are not the current approved policy.',
 indcard:'Coral · Extra indicators revealed in Detailed view.',
 syscard:'Slate blue · Inspect environment and evidence timestamps.'
};
Object.entries(notes).forEach(([id,text])=>{
 const p=document.createElement('p');p.className='hint-strip';p.textContent=text;
 document.getElementById(id).querySelector('h2').after(p);
});
// Explanatory text only. No change to decisions, data fetching or execution.
HELP.risk=['Risk at stops','Estimated stop-distance loss for the displayed long stock positions with stop data. Not a guaranteed maximum loss, total account risk, or proof that exit orders are active. Gaps and slippage can increase losses.'];
HELP.chain=['Chain check','A reported check of linked ledger records. It does not independently prove completeness, correct fills, broker protection or operational readiness.'];
const steps=[
 ['today','Read the status first','Look for anything needing attention. Check the account, environment and freshness before acting. A status message is not permission to trade.'],
 ['signal','Understand the setup','The ring counts conditions. Three of three is not a probability of success and is not an instruction to buy.'],
 ['chartcard','Review the chart','Choose a symbol in Focus, then a time range. Plain shows a simple line; Detailed adds candles and moving averages.'],
 ['poscard','Separate orders from positions','A submitted order is not a fill. Compare broker evidence with the Engine log; do not repeat an order because a message is delayed.'],
 ['syscard','Reveal the hidden details','Plain view hides this card. The tour opens Detailed for you. Read the account, environment, last scan and state publication on the actual dashboard.'],
 ['wealthcard','Keep planning separate','The gold card is a compounding illustration. It does not show your Fidelity Foundation balance or schedule deposits.'],
 ['owner-orientation','Take one short lesson','Open an orientation topic below. Your existing strategy lessons and their browser checkmarks remain in the original Learn card.'],
 ['owner-playbook','Use your daily playbook','Follow the four checklists. Stop when evidence is missing. The real trading controls and approved risk policy are unchanged.']
];
let step=0,touring=false;
const el=id=>document.getElementById(id);
const returnButton=document.createElement('button');returnButton.className='primary return-tour';returnButton.textContent='Return to tour';returnButton.hidden=true;document.body.append(returnButton);
function clearHighlight(){document.querySelectorAll('.tour-target').forEach(e=>e.classList.remove('tour-target'))}
function reveal(id){
 const target=el(id);
 if(target.classList.contains('pro'))setMode('pro');
 clearHighlight();target.classList.add('tour-target');target.scrollIntoView({block:'start',behavior:'smooth'});
 if(touring)returnButton.hidden=false;
}
function updateTour(){
 el('tour-panel').hidden=false;el('tour-count').textContent=`STEP ${step+1} OF ${steps.length}`;
 el('tour-title').textContent=steps[step][1];el('tour-text').textContent=steps[step][2];
 el('tour-back').disabled=step===0;el('tour-next').textContent=step===steps.length-1?'Finish tour':'Next';
 returnButton.hidden=true;el('start-here').scrollIntoView({block:'start',behavior:'smooth'});
}
function closeTour(){touring=false;el('tour-panel').hidden=true;returnButton.hidden=true;clearHighlight()}
el('start-tour').onclick=()=>{step=0;touring=true;updateTour()};
el('tour-next').onclick=()=>{if(step===steps.length-1)closeTour();else{step++;updateTour()}};
el('tour-back').onclick=()=>{step=Math.max(0,step-1);updateTour()};
el('tour-show').onclick=()=>reveal(steps[step][0]);
el('tour-close').onclick=closeTour;
returnButton.onclick=updateTour;
document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>reveal(b.dataset.section));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTour()});
let theme='dark';
function applyTheme(){
 document.documentElement.dataset.theme=theme;
 el('theme-toggle').textContent=theme==='dark'?'Light mode':'Dark mode';
 el('theme-toggle').setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} mode`);
 if(chart)chart.applyOptions({layout:{textColor:theme==='dark'?'#a5b5c9':'#475b72'},grid:{vertLines:{color:theme==='dark'?'#26374c':'#cbd8e9'},horzLines:{color:theme==='dark'?'#26374c':'#cbd8e9'}}});
}
el('theme-toggle').onclick=()=>{theme=theme==='dark'?'light':'dark';applyTheme()};
applyTheme();
// Keep the original sign-out handler, token storage and lesson history intact.
el('signout').addEventListener('click',closeTour);
const orientation=document.createElement('section');
orientation.id='owner-orientation';orientation.className='card s12';
orientation.innerHTML='<div class="playbook-heading"><div><span class="eyebrow">DASHBOARD ORIENTATION</span><h2>Learn your workspace</h2></div><button class="primary" id="existing-lessons">Open existing strategy lessons</button></div><p>Eight short topics for using this dashboard. These do not change your trading policy.</p><div class="playbook-grid"></div>';
const topics=orientation.querySelector('.playbook-grid');
(window.CST_ORIENTATION?.lessons||[]).forEach(l=>{
 const details=document.createElement('details'),summary=document.createElement('summary'),body=document.createElement('div');
 summary.textContent=l.n+'. '+l.title;body.innerHTML=l.html;details.append(summary,body);topics.append(details);
});
el('owner-playbook').before(orientation);
el('existing-lessons').onclick=()=>reveal('learn');
if(!window.LightweightCharts)el('chart-nodata').textContent='Chart library unavailable. Other cards and the guide remain usable.';
