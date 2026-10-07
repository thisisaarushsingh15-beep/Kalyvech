const WAITLIST_URL=""; /* paste your free Formspree link here */
const $=i=>document.getElementById(i);
const C={
pay:{n:"💰 Payment reminder",ph:"$450 for invoice #12",s:"Payment reminder",b:["Just a quick reminder that payment for {d} is still open. Could you let me know when it will go through?","This is a reminder that payment for {d} is outstanding. Please arrange payment at your earliest convenience.","Payment for {d} is overdue. Please pay within 3 days or tell me today if there is a problem."]},
fol:{n:"🔁 Follow-up",ph:"the proposal I sent last week",s:"Following up",b:["Just checking in on {d}. No rush, but I'd love to hear your thoughts!","I'm following up on {d}. Please let me know if you need anything more from me.","Following up on {d}. Can you reply by the end of this week?"]},
thx:{n:"🙏 Thank you",ph:"your help with the project",s:"Thank you",b:["Thank you so much for {d}. It really made a difference!","Thank you for {d}. I appreciate your time and support.","Thanks for {d}. Much appreciated."]},
dly:{n:"⏳ Delay notice",ph:"the logo files, now due Friday",s:"A quick update on timing",b:["Sorry, but there's a small delay with {d}. Thank you for being patient with me!","I apologise for the delay regarding {d}. I'm working to finish it as soon as I can.","Update: {d}. Sorry for the inconvenience."]},
mtg:{n:"📅 Meeting reminder",ph:"Tuesday 4 pm at the cafe",s:"Reminder: our meeting",b:["Friendly reminder about our meeting: {d}. See you there!","This is a reminder of our meeting: {d}. Please let me know if you need to reschedule.","Reminder: {d}. Please confirm you can make it."]},
fb:{n:"⭐ Feedback request",ph:"the website I built for you",s:"Could I ask for your feedback?",b:["Would you share quick feedback on {d}? Even one line helps me a lot!","I would value your feedback on {d}. It will help me improve my work.","Please send me 2 lines of feedback on {d}."]},
inv:{n:"🎉 Invitation",ph:"cricket practice, Sunday 7 am, city ground",s:"You're invited",b:["You're invited to {d}! It would be great to see you there.","I'd like to invite you to {d}. Please let me know if you can attend.","Invite: {d}. Reply yes or no please."]},
hi:{n:"👋 Introduction",ph:"I help small shops get online",s:"A quick hello",b:["I wanted to say hello! {d}. Would you like a quick chat?","I'm getting in touch to introduce myself. {d}. I'd be glad to talk if it would be useful.","{d}. Interested? Reply and I'll send details."]}};
let cat="pay",S=[];try{S=JSON.parse(localStorage.getItem("kvs")||"[]")}catch(e){}
const chips=$("chips");
Object.keys(C).forEach(k=>{const b=document.createElement("button");b.textContent=C[k].n;b.setAttribute("role","tab");b.onclick=()=>{cat=k;mark();make()};b.dataset.k=k;chips.append(b)});
function mark(){chips.querySelectorAll("button").forEach(b=>b.setAttribute("aria-selected",b.dataset.k==cat));$("det").placeholder=C[cat].ph;$("detl").textContent="Details (e.g. "+C[cat].ph+")"}
let txt="";
function make(){const c=C[cat],t=+$("tone").value,to=$("to").value||"there",me=$("me").value,d=$("det").value||c.ph,core=c.b[t].replaceAll("{d}",d);
const body=`Hi ${to},\n\n${core}\n\n${["Thanks,","Kind regards,","Regards,"][t]}\n${me}`;
txt=$("ch").value=="email"?`Subject: ${c.s}\n\n${body}`:`Hi ${to}! ${core}${me?" - "+me:""}`;
$("out").textContent=txt;
$("em").href="mailto:?subject="+encodeURIComponent(c.s)+"&body="+encodeURIComponent(body);
$("wa").href="https://wa.me/?text="+encodeURIComponent(`Hi ${to}! ${core}${me?" - "+me:""}`)}
["to","det","me","tone","ch"].forEach(i=>$(i).oninput=make);
$("cp").onclick=()=>{const b=$("cp");(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",1500)}).catch(()=>{b.textContent="Press and hold to copy"})};
function lib(){const el=$("lib");el.textContent="";if(!S.length){el.innerHTML='<p class="m" style="margin:0">Nothing saved yet. Write a message and press Save.</p>';return}
S.forEach((m,i)=>{const r=document.createElement("div");r.className="item";const p=document.createElement("p");p.textContent=m;const d=document.createElement("div");
const c=document.createElement("button");c.className="btn o";c.textContent="Copy";c.onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(m);
const x=document.createElement("button");x.className="btn o";x.textContent="Delete";x.onclick=()=>{S.splice(i,1);sv();lib()};d.append(c,x);r.append(p,d);el.append(r)})}
function sv(){try{localStorage.setItem("kvs",JSON.stringify(S))}catch(e){}}
$("sv").onclick=()=>{S.unshift(txt);S=S.slice(0,20);sv();lib()};
function fee(){const a=+$("la").value||0,p=+$("lp").value||0,d=+$("ld").value||0,f=a*p/100*d/30;$("fee").textContent=`Late fee: ${f.toFixed(2)}. Total to ask for: ${(a+f).toFixed(2)}. Check your contract first.`}
["la","lp","ld"].forEach(i=>$(i).oninput=fee);
$("wf").onsubmit=e=>{if(!WAITLIST_URL){e.preventDefault();$("wm").textContent="The waitlist isn't connected yet. Check back soon.";return}$("wf").action=WAITLIST_URL};
mark();make();lib();fee();

/* ---- Who owes me tracker ---- */
let T=[];try{T=JSON.parse(localStorage.getItem("kvt")||"[]")}catch(e){}
const tsave=()=>{try{localStorage.setItem("kvt",JSON.stringify(T))}catch(e){}};
const days=d=>{const n=new Date();n.setHours(0,0,0,0);return Math.round((n-new Date(d+"T00:00"))/864e5)};
const money=n=>n.toLocaleString(undefined,{maximumFractionDigits:2});
function track(){const el=$("tl");el.textContent="";let owed=0,over=0;
const L=T.map((x,i)=>({x,i})).sort((a,b)=>a.x.p-b.x.p||(a.x.d>b.x.d?1:-1));
if(!L.length)el.innerHTML='<p class="m">No one yet. Add a client above to start.</p>';
L.forEach(({x,i})=>{const n=days(x.d);if(!x.p){owed+=x.a;if(n>0)over+=x.a}
const r=document.createElement("div");r.className="row"+(x.p?" pd":"");
const w=document.createElement("div");w.className="who";const b=document.createElement("b");b.textContent=`${x.c}: ${money(x.a)}`;
const s=document.createElement("span");s.className="st "+(x.p?"pdn":n>0?"od":"ok");
s.textContent=x.p?"Paid":n>0?`Overdue by ${n} day${n>1?"s":""}`:n==0?"Due today":`Due in ${-n} day${n<-1?"s":""}`;w.append(b,s);
const a=document.createElement("div");a.className="acts";
const mk=(t,f)=>{const k=document.createElement("button");k.className="btn o sm";k.textContent=t;k.onclick=f;a.append(k)};
if(!x.p)mk("Write reminder",()=>{cat="pay";$("to").value=x.c;$("det").value=`${money(x.a)} (due ${x.d})`;$("tone").value=n>14?2:n>0?1:0;mark();make();$("app").scrollIntoView({behavior:"smooth"})});
mk(x.p?"Undo":"Mark paid",()=>{x.p=!x.p;tsave();track()});
mk("Delete",()=>{T.splice(i,1);tsave();track()});
r.append(w,a);el.append(r)});
$("s1").textContent=money(owed);$("s2").textContent=money(over)}
$("ta").onclick=()=>{const c=$("tc").value.trim(),a=+$("tm").value,d=$("td").value;if(!c||!a||!d){$("td").focus();return}
T.push({c,a,d,p:false});tsave();$("tc").value=$("tm").value=$("td").value="";track()};
track();
