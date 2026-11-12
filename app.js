(function(){
const nodes=[
 {id:"公共服務",short:"公",desc:"行政、安全與緊急應變",color:"#264e65"},
 {id:"健康就醫",short:"醫",desc:"健康評估與就醫銜接",color:"#28768f"},
 {id:"用藥安全",short:"藥",desc:"藥事諮詢與安全服藥",color:"#4d8679"},
 {id:"長照照顧",short:"照",desc:"日常照顧與長照服務",color:"#b35c47"},
 {id:"福利支持",short:"福",desc:"福利、物資與關懷",color:"#8b667f"},
 {id:"社區關懷",short:"社",desc:"據點、志工與鄰里支持",color:"#688057"},
 {id:"生活場域",short:"里",desc:"宮廟、市場與日常接觸",color:"#b17c2e"},
 {id:"活力參與",short:"動",desc:"運動休閒與社會參與",color:"#49739a"}
];
const situations=[
 {id:"start",code:"",icon:"問",label:"我不確定該選哪一項",sub:"用兩個步驟找到合適方向",kicker:"不確定怎麼選",title:"先確認：現在有立即危險嗎？",description:"有立即危險請直接撥打緊急電話；若沒有，請再選一項最接近目前的困難。",steps:[],nodes:[]},
 {id:"memory",code:"H02",icon:"憶",label:"長者最近常忘事、迷路或判斷變差",sub:"記憶、方向感或判斷已影響生活",kicker:"衛生所諮詢或鄰近醫院就醫",title:"可先洽衛生所，也可直接詢問鄰近醫院",description:"若不確定該掛哪一科，可先聯絡后里區衛生所說明情況；若認知變化已明顯影響生活，也可直接聯絡下方鄰近醫院，先電話確認神經內科、記憶或認知評估門診及掛號方式。",steps:["記下何時開始、發生頻率及一至兩個具體事件。","不確定就醫方向時，可先詢問后里區衛生所。","想直接就醫時，先電話確認鄰近醫院的門診科別與掛號方式。","就醫時攜帶目前藥袋、疾病資料及家人觀察到的具體變化。"],nodes:["健康就醫","公共服務"]},
 {id:"care",code:"H03",icon:"照",label:"長者洗澡、吃飯或行動需要幫忙",sub:"需要居家、白天或住宿照顧",kicker:"日常照顧需要人力",title:"撥1966，申請長照需要評估",description:"把需要協助的事情與時段說清楚，長照專線會依功能與家庭狀況說明可申請的服務，再由家庭比較居家、社區或住宿照顧方式。",steps:["列出洗澡、穿衣、移位、用餐與外出等需要協助的項目。","撥1966申請長照需要評估。","收到評估與服務建議後，再聯絡合適的后里服務單位。"],nodes:["長照照顧"]},
 {id:"safety",code:"H04",icon:"安",label:"我擔心長者走失、跌倒或發生意外",sub:"需要處理迷路、受傷或居家危險",kicker:"先處理當下安全",title:"正在發生危險時，直接撥110或119",description:"走失與人身安全問題請撥110；受傷、急性不適或需要救護請撥119。平時可準備近期照片、緊急聯絡人及居家安全措施。",steps:["正在走失或有人身危險時立即撥110。","受傷、急性不適或需要救護時立即撥119。","平時準備近期照片、衣著特徵與緊急聯絡人。"],nodes:["公共服務","社區關懷"]},
 {id:"caregiver",code:"H05",icon:"伴",label:"我是照顧者，已經很累、需要人分擔",sub:"長期沒人替手、睡不好或無法外出",kicker:"照顧者也需要服務",title:"先說出最需要有人替手的工作與時段",description:"請把最吃力的照顧工作說具體，例如洗澡、夜間照顧或無法外出。可先撥1966詢問喘息及長照服務，再了解住家附近可參加的據點活動。",steps:["寫下最累的照顧工作與最需要休息的時段。","撥1966詢問喘息、居家照顧及其他長照服務。","再依長者能力，詢問住家附近據點活動或共餐。"],nodes:["長照照顧","社區關懷"]},
 {id:"medicine",code:"H06",icon:"藥",label:"長者吃藥或看診的事情弄不清楚",sub:"忘記吃藥、重複服藥或不知道看哪科",kicker:"先分清楚用藥與健康問題",title:"有藥物問題，把藥袋帶去問藥師",description:"忘記吃藥、重複服藥或不清楚服法，可先向在地藥局詢問；持續不舒服或需要醫師判斷時，再聯絡診所。突然意識改變或嚴重不適請立即就醫。",steps:["把全部藥袋、藥盒與用藥清單帶在身邊。","先向藥師確認服藥時間、劑量與是否重複。","身體症狀持續或惡化時聯絡診所；緊急狀況撥119。"],nodes:["用藥安全","健康就醫"]},
 {id:"welfare",code:"H07",icon:"福",label:"家中需要補助、物資或生活協助",sub:"經濟、餐食、物資或獨居關懷需求",kicker:"從實際生活困難開始",title:"先向區公所或福利單位說明需要什麼",description:"福利服務會依身分、家庭狀況與實際需要而異。請說明目前最缺少的是補助、餐食、物資或關懷，再由承辦單位確認資格與申請方式。",steps:["整理目前的生活困難、家庭支持與已使用的補助。","先洽后里區公所社會課或適合的福利單位。","詢問需要準備的文件、資格與後續聯絡窗口。"],nodes:["福利支持","公共服務"]},
 {id:"activity",code:"H08",icon:"動",label:"想找長者活動、共餐或社區據點",sub:"希望增加陪伴、運動或社交機會",kicker:"把生活重新接回社區",title:"從有辦活動的關懷據點開始找",description:"先看長者的行動、認知、陪同與交通需求，再選住家附近的關懷據點、共餐、學習或運動活動。參加前請先確認時間與資格。",steps:["確認長者能否自行外出，以及是否需要陪同。","查找住家附近的關懷據點、學習或運動場域。","參加前電話確認時間、資格、交通與陪同安排。"],nodes:["社區關懷","活力參與"]}
];
const mobileLabels={start:"不確定是哪一類？幫我判斷",memory:"常忘事、迷路或判斷改變",care:"洗澡、吃飯或走路需要幫忙",safety:"擔心走失、跌倒或發生意外",caregiver:"照顧者太累，需要有人替手",medicine:"吃藥或看診的事情弄不清楚",welfare:"需要補助、物資或生活協助",activity:"想找活動、共餐或社區據點"};
const situationColors={memory:"#3f6f8a",care:"#2f7966",safety:"#a8403e",caregiver:"#805b7d",medicine:"#33757b",welfare:"#93652e",activity:"#587342",start:"#68777a"};
const directContacts={
 start:[
  {name:"正在走失或有人身危險",phone:"110",note:"由警察協助走失協尋與人身安全。"},
  {name:"受傷、急性不適或需要救護",phone:"119",note:"由消防救護處理緊急健康與救護需求。"},
  {name:"需要照顧人力或喘息服務",phone:"1966",note:"申請長照需要評估及居家、社區或住宿服務。"},
  {name:"記憶或判斷改變影響生活",phone:"04-2556-2048",note:"聯絡后里區衛生所，詢問功能與認知評估方向。"},
  {name:"需要補助、物資或生活協助",phone:"04-2556-2116",note:"聯絡后里區公所社會課，確認資格與申請方式。"}
],
 memory:[{name:"后里區衛生所",phone:"04-2556-2048",note:"不知道該掛哪一科時，可先說明記憶、方向感或判斷改變，以及對生活造成的影響。"}],
 care:[{name:"長照服務專線",phone:"1966",note:"申請長照需要評估，了解居家、社區或住宿服務。"}],
 safety:[{name:"警察服務",phone:"110",note:"正在走失或有人身安全疑慮時立即撥打。"},{name:"消防救護",phone:"119",note:"受傷、急性不適或需要緊急救護時立即撥打。"}],
 caregiver:[{name:"長照服務專線",phone:"1966",note:"詢問喘息服務、居家照顧與照顧人力。"}],
 medicine:[],
 welfare:[],
 activity:[]
};
const sourceOrder=["公部門","基金會及福利","社區發展協會","關懷據點","藥局","診所","合作醫院","機構","志工團隊","宮廟","市場","運動","私部門"];
const $=id=>document.getElementById(id);let resources=[],activeSituation="",activeNode="all",activeScenarioFilter="all",shown=15;
const nodeMap=Object.fromEntries(nodes.map(n=>[n.id,n]));
function phoneHref(v){return "tel:"+String(v||"").replace(/[^0-9]/g,"")}
function mapHref(address,name){return "https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(address||name+" 臺中市后里區")+"&travelmode=driving&dir_action=navigate"}
function markFor(node){return nodeMap[node]?.short||"里"}
function nodeColor(node){return nodeMap[node]?.color||"#5e806f"}
function scrollToPanel(el){if(!el)return;const header=document.querySelector(".site-header");const offset=(header?.offsetHeight||0)+12;const top=el.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo(0,Math.max(0,top))}
function selectSituation(id,historyMode="auto"){
 activeSituation=id;
 const mode=historyMode==="auto"?(history.state?.helpScenario?"replace":"push"):historyMode;
 if(mode==="push")history.pushState({helpScenario:id},"",`#help-${id}`);
 if(mode==="replace")history.replaceState({helpScenario:id},"",`#help-${id}`);
 renderSituations();renderResult();requestAnimationFrame(()=>scrollToPanel($("line")));
}
function returnToSituations(){
 if(history.state?.helpScenario){history.back();return}
 activeSituation="";history.replaceState(null,"","#line");renderSituations();renderResult();requestAnimationFrame(()=>scrollToPanel($("line")));
}
function syncSituationFromHistory(){
 const match=location.hash.match(/^#help-([a-z]+)$/);const id=match?.[1]||"";
 activeSituation=situations.some(s=>s.id===id)?id:"";renderSituations();renderResult();requestAnimationFrame(()=>scrollToPanel($("line")));
}
const fontLevels=[.9,1,1.15,1.3];
let fontIndex=1;
try{const saved=Number(localStorage.getItem("houli-font-scale"));const index=fontLevels.indexOf(saved);if(index>=0)fontIndex=index}catch(e){}
function applyFontSize(){
 const scale=fontLevels[fontIndex];
 document.documentElement.style.setProperty("--font-scale",scale);
 [11,12,13,14,15,16,17,18,19,20,21,24,27,29,31,32,34,39,46,53].forEach(size=>document.documentElement.style.setProperty(`--fs-${size}`,`${Math.round(size*scale*100)/100}px`));
 $("font-status").textContent=`${Math.round(scale*100)}%`;
 $("font-smaller").disabled=fontIndex===0;
 $("font-larger").disabled=fontIndex===fontLevels.length-1;
 try{localStorage.setItem("houli-font-scale",String(scale))}catch(e){}
 requestAnimationFrame(()=>document.documentElement.style.setProperty("--header-height",`${document.querySelector(".site-header").offsetHeight}px`));
}
function changeFontSize(direction){fontIndex=Math.max(0,Math.min(fontLevels.length-1,fontIndex+direction));applyFontSize()}
function renderSituations(){const box=$("situation-list");box.replaceChildren();const ordered=[...situations].sort((a,b)=>Number(a.id==="start")-Number(b.id==="start"));ordered.forEach(s=>{const b=document.createElement("button");b.type="button";b.dataset.situation=s.id;b.style.setProperty("--situation-color",situationColors[s.id]);b.className="situation"+(s.id===activeSituation?" active":"");b.setAttribute("aria-pressed",String(s.id===activeSituation));b.innerHTML=`<span class="situation-icon" aria-hidden="true">${s.icon}</span><span><strong><span class="label-full">${s.label}</span><span class="label-mobile">${mobileLabels[s.id]}</span></strong><small>${s.sub}</small></span>`;b.onclick=()=>selectSituation(s.id);box.append(b)})}
function renderTriage(){const box=$("triage-options");box.replaceChildren();situations.filter(s=>s.id!=="start").forEach(s=>{const b=document.createElement("button");b.type="button";b.style.setProperty("--situation-color",situationColors[s.id]);b.innerHTML=`<span class="situation-icon" aria-hidden="true">${s.icon}</span><strong>${mobileLabels[s.id]}</strong><b aria-hidden="true">›</b>`;b.onclick=()=>selectSituation(s.id,"replace");box.append(b)})}
function miniCard(r){const d=document.createElement("div");d.className="mini-resource";const copy=document.createElement("div");copy.innerHTML=`<strong>${r.name}</strong><small>${r.accessNote||r.role}${r.address?"｜"+r.address:""}</small>`;const actions=document.createElement("div");actions.className="mini-actions";if(r.phone){const a=document.createElement("a");a.href=phoneHref(r.phone);a.textContent="撥打";actions.append(a)}if(r.address){const a=document.createElement("a");a.href=mapHref(r.address,r.name);a.target="_blank";a.rel="noopener noreferrer";a.className="map";a.textContent="導航";actions.append(a)}d.append(copy,actions);return d}
function directCard(c){const a=document.createElement("a");a.className="direct-card";a.href=phoneHref(c.phone);a.innerHTML=`<span><strong>${c.name}</strong><small>${c.note}</small></span><b>立即撥打 ${c.phone}</b>`;return a}
function recommendationScore(r,sid){if(sid==="medicine")return r.sourceTypes.includes("藥局")?0:1;if(sid==="memory")return ({"衛生福利部豐原醫院":0,"大甲光田醫院":1,"大甲李綜合醫院":2}[r.name]??9);if(sid==="caregiver")return r.sourceTypes.includes("機構")?(r.priority??1):(r.carePoint?2:3);if(sid==="activity")return r.carePoint?0:1;if(sid==="safety")return r.sourceTypes.includes("公部門")?0:1;if(sid==="welfare")return r.name==="后里區公所"?0:1;return r.priority??9}
function matchedResources(sid){return resources.filter(r=>r.publicAccess!==false&&(r.useFor||[]).includes(sid)).sort((a,b)=>recommendationScore(a,sid)-recommendationScore(b,sid)||Number(Boolean(b.phone))-Number(Boolean(a.phone))||a.name.localeCompare(b.name,"zh-Hant"))}
function renderResult(){const result=$("route-result");const s=situations.find(x=>x.id===activeSituation);document.body.classList.toggle("showing-result",Boolean(s));result.dataset.situation=s?.id||"";if(!s){result.hidden=true;$("quick-strip").hidden=false;return}result.hidden=false;$("quick-strip").hidden=s.id==="start";$("result-code").textContent=s.code;$("result-code").hidden=true;$("result-kicker").textContent=s.kicker;$("result-title").textContent=s.title;$("result-description").textContent=s.description;$("result-resource-heading").textContent=s.id==="memory"?"鄰近可洽詢的醫院":"可直接聯絡的單位";$("result-steps").replaceChildren(...s.steps.map(x=>{const li=document.createElement("li");li.textContent=x;return li}));document.querySelector(".result-columns").hidden=s.id==="start";$("result-nodes").replaceChildren(...s.nodes.map(x=>{const span=document.createElement("span");span.className="node-pill";span.style.background=nodeColor(x);span.textContent=x;return span}));const triage=$("result-triage");triage.hidden=s.id!=="start";if(s.id==="start")renderTriage();const direct=$("result-direct");const contacts=s.id==="start"?[]:(directContacts[s.id]||[]);direct.hidden=!contacts.length;direct.replaceChildren(...contacts.map(directCard));const matched=s.id==="start"?[]:matchedResources(s.id);const box=$("result-resources");box.hidden=!matched.length;box.replaceChildren();matched.slice(0,3).forEach(r=>box.append(miniCard(r)));const head=$("show-all-matched").parentElement;head.hidden=!matched.length;$("show-all-matched").textContent=s.id==="memory"?`查看全部 ${matched.length} 家鄰近醫院`:`查看全部 ${matched.length} 個單位`;$("show-all-matched").onclick=()=>{activeNode="all";activeScenarioFilter=s.id;shown=15;renderNodeFilters();renderDirectory();$("directory").scrollIntoView({behavior:"smooth",block:"start"})};$("back-to-situations").onclick=returnToSituations;$("back-to-situations-bottom").onclick=returnToSituations}
function renderNodeLine(){const box=$("node-line");box.replaceChildren();nodes.forEach(n=>{const b=document.createElement("button");b.type="button";b.className="node-stop";b.innerHTML=`<span class="node-dot" style="--node-color:${n.color}">${n.short}</span><strong>${n.id}</strong><small>${n.desc}</small>`;b.onclick=()=>{activeNode=n.id;activeScenarioFilter="all";shown=15;renderNodeFilters();renderDirectory();$("directory").scrollIntoView({behavior:"smooth"})};box.append(b)})}
function renderSourceFilter(){const select=$("source-filter");sourceOrder.forEach(s=>{const count=resources.filter(r=>r.sourceTypes.includes(s)).length;if(!count)return;const o=document.createElement("option");o.value=s;o.textContent=s;select.append(o)})}
function renderNodeFilters(){const box=$("node-filter");box.replaceChildren();const all=document.createElement("button");all.type="button";all.className=activeNode==="all"?"active":"";all.innerHTML=`<span>全部生活節點</span>`;all.onclick=()=>{activeNode="all";activeScenarioFilter="all";shown=15;renderNodeFilters();renderDirectory()};box.append(all);nodes.forEach(n=>{const b=document.createElement("button");b.type="button";b.className=activeNode===n.id?"active":"";b.innerHTML=`<span>${n.id}</span>`;b.onclick=()=>{activeNode=n.id;activeScenarioFilter="all";shown=15;renderNodeFilters();renderDirectory()};box.append(b)})}
function resourceRow(r){const row=document.createElement("article");row.className="resource-row";const mark=document.createElement("span");mark.className="resource-mark";mark.style.setProperty("--mark",nodeColor(r.node));mark.textContent=markFor(r.node);const copy=document.createElement("div");copy.className="resource-copy";const title=document.createElement("h3");title.textContent=r.name;const meta=document.createElement("p");meta.textContent=[r.role,r.address].filter(Boolean).join("｜");const tags=document.createElement("div");tags.className="resource-tags";r.sourceTypes.forEach(x=>{const s=document.createElement("span");s.textContent=x;tags.append(s)});if(r.carePoint){const s=document.createElement("span");s.className="care-badge";s.textContent="關懷據點";tags.append(s)}if(r.accessType==="direct"){const s=document.createElement("span");s.className="direct-badge";s.textContent="可直接聯絡";tags.append(s)}else if(r.accessType==="community"){const s=document.createElement("span");s.className="community-badge";s.textContent="社區支持";tags.append(s)}else if(r.accessType==="network"){const s=document.createElement("span");s.className="network-badge";s.textContent="協力網絡｜非求助窗口";tags.append(s)}copy.append(title,meta,tags);const actions=document.createElement("div");actions.className="resource-actions";if(r.phone){const a=document.createElement("a");a.className="phone";a.href=phoneHref(r.phone);a.textContent="☎ "+r.phone;actions.append(a)}if(r.address){const a=document.createElement("a");a.className="map";a.href=mapHref(r.address,r.name);a.target="_blank";a.rel="noopener noreferrer";a.textContent="地圖導航";actions.append(a)}if(r.officialUrl){const a=document.createElement("a");a.href=r.officialUrl;a.target="_blank";a.rel="noopener noreferrer";a.textContent="官方網站";actions.append(a)}row.append(mark,copy,actions);return row}
function filtered(){const q=$("search").value.trim().toLowerCase();const source=$("source-filter").value;const list=resources.filter(r=>(activeNode==="all"||(r.nodes||[r.node]).includes(activeNode))&&(activeScenarioFilter==="all"||(r.useFor||[]).includes(activeScenarioFilter))&&(source==="all"||r.sourceTypes.includes(source))&&(!q||[r.name,r.address,r.role,r.accessNote,r.contact,...(r.nodes||[r.node]),...r.sourceTypes].join(" ").toLowerCase().includes(q)));if(activeScenarioFilter!=="all")list.sort((a,b)=>recommendationScore(a,activeScenarioFilter)-recommendationScore(b,activeScenarioFilter)||Number(Boolean(b.phone))-Number(Boolean(a.phone))||a.name.localeCompare(b.name,"zh-Hant"));return list}
function renderDirectory(){const data=filtered();$("resource-count").textContent=data.length?`找到 ${data.length} 個符合條件的單位`:"目前沒有符合條件的單位";const active=[];if(activeScenarioFilter!=="all"){const s=situations.find(x=>x.id===activeScenarioFilter);if(s)active.push("情境："+mobileLabels[s.id])}if(activeNode!=="all")active.push(activeNode);if($("source-filter").value!=="all")active.push($("source-filter").value);if($("search").value.trim())active.push("關鍵字："+$("search").value.trim());$("active-filter").hidden=!active.length;$("active-filter").textContent=active.length?"目前篩選｜"+active.join("・"):"";const list=$("resource-list");list.replaceChildren();data.slice(0,shown).forEach(r=>list.append(resourceRow(r)));$("load-more").hidden=shown>=data.length;$("empty").hidden=data.length>0}
function clearFilters(){activeNode="all";activeScenarioFilter="all";shown=15;$("search").value="";$("source-filter").value="all";renderNodeFilters();renderDirectory()}
fetch("houli_resources.json?v=20261112-6").then(r=>{if(!r.ok)throw Error("資源檔載入失敗");return r.json()}).then(data=>{resources=data;const match=location.hash.match(/^#help-([a-z]+)$/);if(match&&situations.some(s=>s.id===match[1]))activeSituation=match[1];renderSituations();renderResult();renderNodeLine();renderSourceFilter();renderNodeFilters();renderDirectory()}).catch(e=>{$("resource-count").textContent="資源資料暫時無法載入，請稍後再試。";console.error(e)});
window.addEventListener("popstate",syncSituationFromHistory);
window.addEventListener("resize",()=>document.documentElement.style.setProperty("--header-height",`${document.querySelector(".site-header").offsetHeight}px`));
$("font-smaller").addEventListener("click",()=>changeFontSize(-1));
$("font-larger").addEventListener("click",()=>changeFontSize(1));
applyFontSize();
$("search").addEventListener("input",()=>{shown=15;renderDirectory()});$("source-filter").addEventListener("change",()=>{shown=15;renderDirectory()});$("load-more").addEventListener("click",()=>{shown+=15;renderDirectory()});$("clear-filter").addEventListener("click",clearFilters);
})();

