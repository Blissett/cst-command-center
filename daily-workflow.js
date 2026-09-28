// Read-only, in-memory review checklist. Never approves or submits anything.
(()=>{
 const $=id=>document.getElementById(id);
 const panel=document.createElement('section');
 panel.id='daily-workflow';panel.className='card s12';panel.hidden=true;
 panel.innerHTML=`<div class="playbook-heading"><div><span class="eyebrow" id="daily-count"></span><h2 id="daily-title"></h2></div><button id="daily-close" class="theme-toggle">Close workflow</button></div>
 <p id="daily-instruction"></p><div id="daily-evidence" class="gap-note"></div><p id="daily-warning"></p>
 <div id="daily-links" class="section-nav"></div><div id="daily-choices" class="section-nav"></div>
 <label class="daily-check"><input type="checkbox" id="daily-confirm"><span id="daily-confirm-text"></span></label>
 <div class="tour-controls"><button id="daily-back">Back</button><button id="daily-next" class="primary">Continue</button><button id="daily-pause">Something is unclear: stop here</button></div>
 <p class="view-note">Your checkmarks guide this visit only. They do not verify the broker, authorize a trade or change any settings. Reloading starts a new review.</p>`;
 $('start-here').after(panel);
 const launch=document.createElement('button');launch.id='start-daily';launch.className='primary';launch.textContent='Start daily workflow';
 $('start-tour').before(launch);$('start-tour').className='theme-toggle';$('start-tour').textContent='Tour the dashboard';
 $('start-here').querySelector('.owner-title p').textContent='Follow your daily workflow. Each step explains what to check and what comes next.';
 const returnDaily=document.createElement('button');returnDaily.id='return-daily';returnDaily.className='primary return-tour';returnDaily.textContent='Return to daily workflow';returnDaily.hidden=true;document.body.append(returnDaily);
 let stage=0,branch=null,outcome=null,paused=false,active=false,snapshot=null,reviewedVersion=null,ack=[];
 const names=['Confirm account and freshness','Review existing exposure','Choose today’s path','Review the proposal','Confirm the outcome','Close your daily review'];
 function data(){return typeof D==='object'&&D?D:{}}
 function version(d){return JSON.stringify([d.state_published_at,d.state,d.broker,d.pending,(d.pending||[]).map(p=>Date.parse(p.expires_at)>Date.now()),d.positions,d.orders,d.verdicts,(d.events||[]).map(e=>[e.seq,e.kind,e.text])])}
 function text(el,value){$(el).textContent=value}
 function facts(rows){const box=$('daily-evidence');box.replaceChildren();for(const [k,v] of rows){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=k+': ';p.append(strong,document.createTextNode(String(v??'Unavailable')));box.append(p)}}
 function utc(v){if(!v)return 'Unavailable';const date=new Date(v);return Number.isNaN(+date)?'Unavailable':date.toLocaleString('en-US',{timeZone:'America/Chicago'})+' CT'}
 function hasPaperEvidence(d){return d.state?.paper===true&&d.broker?.paper===true&&d.state?.chain?.ok===true&&d.state?.account_id&&d.broker?.account_number&&[d.state_published_at,d.state?.last_scan?.created_at,d.state?.chain?.verified_at].every(v=>!!v&&Number.isFinite(Date.parse(v)))}
 function jump(target){reveal(target);returnDaily.hidden=false}
 function links(items){$('daily-links').replaceChildren();for(const [label,id]of items){const b=document.createElement('button');b.textContent=label;b.onclick=()=>jump(id);$('daily-links').append(b)}}
 function choice(label,fn){const b=document.createElement('button');b.textContent=label;b.onclick=fn;$('daily-choices').append(b)}
 function openStage(){
  snapshot=data();reviewedVersion=version(snapshot);paused=false;
  closeTour();active=true;panel.hidden=false;returnDaily.hidden=true;
  text('daily-count',`DAILY WORKFLOW · STEP ${stage+1} OF 6`);text('daily-title',names[stage]);
  $('daily-confirm').checked=!!ack[stage];$('daily-confirm').disabled=false;$('daily-confirm').parentElement.hidden=false;
  $('daily-next').hidden=false;$('daily-next').disabled=!ack[stage];$('daily-next').textContent=stage===5?'Finish review':'Continue';
  $('daily-back').disabled=stage===0;$('daily-pause').hidden=false;$('daily-warning').textContent='';
  $('daily-choices').replaceChildren();links([]);
  const d=snapshot,st=d.state||{},pending=(d.pending||[]).filter(p=>!p.expired&&Number.isFinite(Date.parse(p.expires_at))&&Date.parse(p.expires_at)>Date.now());
  if(stage===0){
   text('daily-instruction','Confirm this is the intended paper account. Read all three timestamps below and decide whether they are current enough for your planned review. A page refresh alone does not prove a new scan.');
   facts([['Ledger account',st.account_id],['Broker account',d.broker?.account_number],['Environment',st.paper===true&&d.broker?.paper===true?'Paper reported by both records':'Paper environment not established'],['State published',utc(d.state_published_at)],['Last scan',utc(st.last_scan?.created_at)],['Ledger verified',utc(st.chain?.verified_at)]]);
   text('daily-confirm-text','I matched the intended account and checked the evidence timestamps.');links([['Show System details','syscard']]);
   if(!hasPaperEvidence(d)){text('daily-warning','STOP: paper environment, ledger check or required timestamps are missing or not confirmed. Resolve the missing evidence before continuing.');$('daily-confirm').disabled=true;$('daily-next').disabled=true;}
  }else if(stage===1){
   text('daily-instruction','Review what is already held and what is still waiting. Compare quantities and actual protective orders with your broker screen; a planned stop on this dashboard is not proof of a working broker order.');
   facts([['Displayed positions',(d.positions||[]).length],['Displayed resting orders',(d.orders||[]).length],['Scope','Counts are from this dashboard snapshot, not an independent broker check.']]);
   text('daily-confirm-text','I checked existing positions and orders, including protection or any discrepancies.');links([['Show positions and orders','poscard'],['Show Engine log','feedcard']]);
  }else if(stage===2){
   text('daily-instruction','Choose the path that matches your current evidence. Do not create a trade just to complete this workflow.');
   facts([['Unexpired displayed proposals',pending.length],['Next decision','A phone request and this display must agree before you treat a proposal as current.']]);
   $('daily-confirm').parentElement.hidden=true;$('daily-next').hidden=true;
   choice('No proposal: review and learn',()=>{branch='none';outcome=null;ack=[];stage=3;openStage()});
   if(pending.length)choice('Review current proposal',()=>{branch='proposal';outcome=null;ack=[];stage=3;openStage()});
   else text('daily-warning','No current proposal is available here. If your phone shows one, use “Something is unclear” and reconcile the mismatch rather than bypassing it.');
   links([['Show Today','today']]);
  }else if(stage===3&&branch==='proposal'){
   text('daily-instruction','Match every proposal with the authorized phone request: account, symbol, side, quantity, limit, stop, target, estimated risk and expiry. Check the approved policy outside this checklist. Only decide on your phone when the request is current and understood.');
   facts(pending.length?pending.map(p=>[p.symbol||'Proposal',`Side: ${p.side??'not provided'} · Quantity: ${p.quantity??'not provided'} · Limit: ${p.limit_price??'not provided'} · Stop: ${p.stop_price??'not provided'} · Target: ${p.target_price??'not provided'} · Estimated risk: ${p.est_max_loss??'not provided'} · Expires: ${utc(p.expires_at)}${p.legs?.length?' · Option legs: '+p.legs.map(l=>`${l.side??''} ${l.occ_symbol??'contract unavailable'}`).join('; '):''}`]):[['Status','Proposal expired or disappeared. Stop and reconcile.']]);
   text('daily-confirm-text','I reviewed the current terms and recorded my decision through the existing phone workflow, or chose not to act.');
   text('daily-warning','This screen does not approve, decline or submit anything. Estimated stop-distance risk is not a guaranteed maximum loss.');
   if(!pending.length){$('daily-confirm').disabled=true;$('daily-next').disabled=true;}
   links([['Show setup','signal'],['Show chart','chartcard'],['Show Today','today']]);
  }else if(stage===3){
   text('daily-title','No proposal: protect the routine');
   text('daily-instruction','No new entry is required. Review any existing positions, then read one lesson. Leave the scan schedule and trading rules unchanged; watch for the next genuine alert.');
   facts([['Path','Review and learn; no new proposal decision'],['If a new alert arrives','Restart this review against the new evidence.']]);
   text('daily-confirm-text','I understand there is no proposal to act on and have reviewed my existing obligations.');
   links([['Review positions','poscard'],['Read a lesson','learn']]);
  }else if(stage===4){
   text('daily-instruction',branch==='proposal'?'After your phone decision, match any submission or fill with the broker and Engine log. Approval is not a fill. Choose the actual outcome; do not guess or resubmit.':'Recheck positions and resting orders for anything unresolved. Choose whether the review is reconciled or needs a later check.');
   facts([['Evidence','Use the broker record and Engine log. This workflow does not certify either.']]);
   $('daily-confirm').parentElement.hidden=true;$('daily-next').hidden=true;
   choice('Records agree / no new action',()=>{outcome='reconciled';stage=5;openStage()});
   choice('Waiting for broker evidence',()=>{outcome='waiting';stage=5;openStage()});
   links([['Show Engine log','feedcard'],['Show positions and orders','poscard']]);
  }else{
   text('daily-instruction','Write the setup or “no proposal,” your decision, any broker outcome and your next check in your existing journal. Read one lesson if you have not already. This dashboard does not save a trade journal or create a reminder.');
   facts([['Path',branch==='proposal'?'Proposal review':'No-proposal review'],['Outcome',outcome==='waiting'?'OPEN FOLLOW-UP: broker evidence still pending':'You reported records agree / no new action'],['Next step',outcome==='waiting'?'Keep the follow-up open, return after evidence arrives, and do not resubmit.':'Return at your next planned check or when a genuine alert arrives.']]);
   text('daily-confirm-text',outcome==='waiting'?'I recorded the unresolved follow-up and when I will check again.':'I recorded the review and my next check.');
   links([['Open lesson','learn'],['Open daily playbook','owner-playbook']]);
  }
  panel.scrollIntoView({block:'start',behavior:'smooth'});
 }
 function pause(reason){
  paused=true;ack[stage]=false;$('daily-confirm').checked=false;$('daily-next').disabled=true;
  text('daily-warning',reason||'STOP: do not make a new decision based on unclear evidence. Compare System timestamps, the current phone request, broker records and Engine log. Resolve the discrepancy, then restart the workflow.');
  $('daily-choices').replaceChildren();choice('Restart after resolving the issue',start);
  panel.scrollIntoView({block:'start',behavior:'smooth'});returnDaily.hidden=true;
 }
 function start(){stage=0;branch=null;outcome=null;ack=[];openStage()}
 $('daily-confirm').onchange=()=>{if(paused||$('daily-confirm').disabled)return;ack[stage]=$('daily-confirm').checked;$('daily-next').disabled=!ack[stage]};
 $('daily-next').onclick=()=>{
  if(paused||!ack[stage])return;
  if(version(data())!==reviewedVersion){pause('The displayed evidence changed while you reviewed it. Restart against the refreshed record; earlier checkmarks are not current verification.');return}
  if(stage===5){
   text('daily-count','DAILY WORKFLOW · REVIEW RECORDED BY YOU');
   text('daily-title',outcome==='waiting'?'Review paused with follow-up open':'Daily review finished');
   text('daily-instruction',outcome==='waiting'?'Your broker follow-up remains unresolved. Return when evidence arrives; do not repeat the order.':'Your review checklist is complete for this visit. Wait for the next planned check or genuine alert; no trade is required.');
   text('daily-warning','This is your checklist acknowledgment, not automated account verification or trading authorization.');
   $('daily-confirm').parentElement.hidden=true;$('daily-next').hidden=true;$('daily-pause').hidden=true;
   $('daily-choices').replaceChildren();choice('Start a fresh review',start);
   return;
  }
  stage++;openStage();
 };
 $('daily-back').onclick=()=>{if(stage>0){stage--;ack[stage]=false;openStage()}};
 $('daily-pause').onclick=()=>pause();
 function close(){active=false;panel.hidden=true;returnDaily.hidden=true;clearHighlight()}
 $('daily-close').onclick=close;$('signout').addEventListener('click',close);
 launch.onclick=start;returnDaily.onclick=()=>{returnDaily.hidden=true;panel.scrollIntoView({block:'start',behavior:'smooth'})};
 $('start-tour').addEventListener('click',close);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)close()});
 // Revalidate decision-branch clicks as well as checkbox progression.
 $('daily-choices').addEventListener('click',e=>{
  if(!e.target.closest('button')||paused)return;
  if(version(data())!==reviewedVersion){e.stopImmediatePropagation();e.preventDefault();pause('The evidence changed. Restart the workflow against the refreshed record.')}
 },true);
})();
