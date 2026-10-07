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
hi:{n:"👋 Introduction",ph:"I help small shops get online",s:"A quick hello",b:["I wanted to say hello! {d}. Would you like a quick chat?","I'm getting in touch to introduce myself. {d}. I'd be glad to talk if it would be useful.","{d}. Interested? Reply and I'll send details."]},
quo:{n:"🧾 Send a quote",ph:"website design, $600, ready in 2 weeks",s:"Your quote",b:["Here's your quote for {d}. Let me know if you'd like to go ahead, or if I can change anything!","Please find the quote for {d}. It is valid for 14 days. I'm happy to answer any questions.","Quote: {d}. Valid for 14 days. Reply YES to confirm."]},
bk:{n:"✅ Booking confirmed",ph:"Saturday 10 am, 2 hours",s:"Booking confirmed",b:["You're all booked in: {d}. Can't wait to see you!","This confirms your booking: {d}. Please contact me if anything changes.","Booking confirmed: {d}."]},
rsc:{n:"🔄 Reschedule",ph:"moving from Tuesday to Thursday 4 pm",s:"Need to reschedule",b:["Could we reschedule? I'd like to move us: {d}. Sorry for the change, and thanks for understanding!","I would like to request a change of schedule: {d}. Please let me know if this works for you.","Reschedule: {d}. Does that work?"]},
no:{n:"🚫 Polite no",ph:"the extra project this month",s:"Thank you, but I must decline",b:["Thank you so much for thinking of me for {d}. I can't take it on right now, but I really appreciate it!","Thank you for the offer regarding {d}. Unfortunately I must decline at this time.","I can't take on {d}. Thanks for asking."]},
sry:{n:"😔 Apology",ph:"missing our call yesterday",s:"My apologies",b:["I'm really sorry about {d}. That's on me, and I'll make it right!","I sincerely apologise for {d}. Please let me know how I can put this right.","Sorry for {d}. It won't happen again."]},
rev:{n:"⭐ Ask for a review",ph:"the service you got from us",s:"Would you leave a review?",b:["Thanks for choosing us! If you enjoyed {d}, would you leave a short review? It helps so much.","We would appreciate a short review of {d}. It takes about a minute and helps others find us.","Please review {d}. It takes 1 minute."]},
ref:{n:"🤝 Ask for a referral",ph:"anyone who needs a website",s:"Do you know anyone?",b:["If you know {d}, I'd love an introduction. Thank you so much!","I'm looking to help more clients. If you know {d}, an introduction would be appreciated.","Know {d}? Please introduce us."]},
team:{n:"📣 Team notice",ph:"practice moved to 6 am Sunday",s:"Team notice",b:["Quick update for everyone: {d}. Thanks, see you there!","Notice to all members: {d}. Please confirm your attendance.","Team notice: {d}. Reply to confirm."]},
int:{n:"💼 Interview thank-you",ph:"the designer role",s:"Thank you for the interview",b:["Thank you for taking the time to talk with me about {d}. I really enjoyed it and I'm excited about working with you!","Thank you for speaking with me about {d}. I remain very interested and can share anything more you need.","Thanks for talking about {d}. I'm interested. Any update on next steps?"]},
bday:{n:"🎂 Birthday wishes",ph:"birthday",s:"Happy birthday!",b:["Wishing you a wonderful {d}! Hope it's full of happy moments!","Warm wishes on your {d}. I hope the year ahead brings you every success.","Happy {d}! Have a great one."]}};
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
$("wf").onsubmit=async e=>{e.preventDefault();const f=$("wf"),m=$("wm");
if(!WAITLIST_URL){m.textContent="The waitlist isn't connected yet. Check back soon.";return}
const b=f.querySelector("button");b.disabled=true;m.textContent="Adding you...";
try{const r=await fetch(WAITLIST_URL,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});
if(!r.ok)throw 0;thanks(f)}catch(x){b.disabled=false;m.textContent="That didn't work. Please check your email and try again."}};
function thanks(f){const d=document.createElement("div");d.className="card thx";
d.innerHTML='<h3>You are on the list! 🎉</h3><p>Thank you. We will email you when automatic sending opens. While you wait:</p><div class="acts"><a class="btn" href="#app">Try the message writer</a><a class="btn o" href="blog.html">Read our guides</a><button class="btn o" id="sh">Copy site link</button></div>';
f.replaceWith(d);$("sh").onclick=()=>{const b=$("sh");(navigator.clipboard?navigator.clipboard.writeText(location.href.split("#")[0]):Promise.reject()).then(()=>{b.textContent="Link copied!"}).catch(()=>{b.textContent="Copy it from the address bar"})}}
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
