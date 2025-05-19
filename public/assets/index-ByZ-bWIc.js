(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();class m{constructor(t){this.parent=t}render(t){this.parent.insertAdjacentHTML("afterbegin",`
        <nav class="navbar navbar-expand-lg mb-4">
          <div class="container-fluid">
            <button class="btn btn-outline-primar home-btn me-2">
              <i class="bi bi-house-door"></i> Домой
            </button>
            <span class="navbar-brand mx-auto">My Singing Monsters</span>
  
            <!-- Пустой блок справа для баланса -->
            <div style="width: 40px"></div>
          </div>
        </nav>
      `),document.querySelector(".home-btn").addEventListener("click",t)}}class u{constructor(t,e){this.parent=t,this.onFilter=e}render(t){const e=`
        <div class="mb-3">
          <select class="form-select filter-select">
            <option value="all">Все категории</option>
            ${t.map(s=>`<option value="${s}">${s}</option>`).join("")}
          </select>
        </div>
      `;this.parent.insertAdjacentHTML("beforeend",e),document.querySelector(".filter-select").addEventListener("change",s=>this.onFilter(s.target.value))}}class p{constructor(t,e){this.parent=t,this.onDelete=e}render(t,e){const s=`
      <div class="card mb-3" style="width: 18rem;">
        <img src="${t.image}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${t.name}</h5>
          <p class="card-text">${t.description}</p>
          <p class="text-muted">${t.type}</p>
          <button class="btn btn-custom-prime details-btn" data-id="${t.id}">Подробнее</button>
          <button class="btn btn-custom-del delete-btn" data-id="${t.id}">Удалить</button>
        </div>
      </div>
    `;this.parent.insertAdjacentHTML("beforeend",s),document.querySelector(`.details-btn[data-id="${t.id}"]`).addEventListener("click",e),document.querySelector(`.delete-btn[data-id="${t.id}"]`).addEventListener("click",()=>this.onDelete(t.id))}}const l=[{id:1,name:"Удудук",description:"С каждым прожитым годом в гибком позвоночнике Удудука вырастает дополнительный позвонок. Однако почти всё тело Удудука скрыто глубоко под землёй: Удудук никогда не раскроет свой настоящий возраст! Можно догадаться о количестве дней рождения, пережитых Монстром, по царапинам и потёртостям на его впечатляющих рогах, но, возможно они указывают лишь на то, как сильно он чесался в этот день.",type:"Магический",image:"mock_msm/Uuduk.png"},{id:2,name:"Завяда",description:"Лёгкая, как пёрышко и изысканно неземная Завяда имеет духовную связь с похожей представительницей эфирных. Но в то время, как её призрачная 'сестра' поёт сладкозвучным голосом, Завяда предпочитает играть на плавниках лиродокус рэкса. Это скелетообразное существо, похожее на диноскопаемое - просто древняя модель из стекловолокна. Оно постоянно забывает об этом факте, когда постукивает хвостом в такт музыке.",type:"Магический",image:"mock_msm/Withur.png"},{id:3,name:"Лаватёка",description:"Древняя Лаватёка считалась давно утраченным загадочным явлением из древних времён. Единственный экземпляр, засохший в янтаре, был найден на Острове Племён, но только недавно появилось новое поколение этих существ, их приманил таинственный зов реликвий, резонирующих глубоко внутри мирового вулканического ядра. Теперь пылкий огненный элементаль готов восстановить былую славу своего могущественного элемента в Мире Монстров.",type:"Огненный",image:"mock_msm/Kayna.png"},{id:4,name:"Смычорог",description:"Смычорог любит стоять в лужах. Через стопы он напитывается мутной водно-земляной жижей, чтобы быстрее росли рожки. На сброшенные же рога Смычорог натягивает струны, настраивает и пускает в дело вместо старого инструмента.",type:"Природный",image:"mock_msm/Bowgart.png"},{id:5,name:"Дендиптица",description:"Мягкий пух Дендиптицы блестит при малейшем дуновении ветерка, пока она грациозно передвигается по Острову. Куда менее охотно она выходит на публику, когда семена обрастают пухом и её шевелюру уносит ветер.",type:"Природный",image:"mock_msm/Dandidoo.png"},{id:6,name:"Шпиоловун",description:"Внешний вид может быть обманчивым... как и Шпиоловун. Этот ботанический зверь растёт в темноте и изо всех сил старается остаться незамеченным для окружающий фауны. Но как только ничего не подозревающие существо оказывается слишком близко, хрясь - оно внезапно попадает в ловушку! И чем ещё заняться, когда ты оказался заключён в акустическую страну чудес пасти Шпиоловуна, как не выстукиванием ритма? В обмен на дружественную компанию и музыкальный талант своего гостя монстр - хозяин с радостью угощает его сладчайшим соком собственного приготовления",type:"Магический",image:"mock_msm/Spytrap.png"},{id:7,name:"Репетило",description:"Репетило умеет сворачиваться в твёрдый бронированный шар, и в таком виде он катится вниз по крутым холмам и долинам. Удивительно, как Репетило удаётся прятать свои многочисленный конечности, хотя у его друзей-Монстров есть несколько идей на этот счёт.",type:"Огненный",image:"mock_msm/Repatillo.png"},{id:8,name:"Напевец",description:"Напевцы, любящие перекусить, обычно глотают лакомства целиком. Их вытянутые пищеводы сокращаются и растягиваются, пока знаменитые напевы этого счастливчика расщепляют сладости. Если же напевать на голодный желудок, в пищеводе Напевцев образуются пузырьки воздуха, вызывающие внезапный приступ хихиканья!",type:"Огненный",image:"mock_msm/Thrumble.png"}];class h{async get(t){try{const e=await fetch(t);return{data:await this._handleResponse(e),status:e.status}}catch(e){throw console.error("GET request failed:",e),e}}async post(t,e){try{const s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return{data:await this._handleResponse(s),status:s.status}}catch(s){throw console.error("POST request failed:",s),s}}async patch(t,e){try{const s=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return{data:await this._handleResponse(s),status:s.status}}catch(s){throw console.error("PATCH request failed:",s),s}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});return{data:await this._handleResponse(e),status:e.status}}catch(e){throw console.error("DELETE request failed:",e),e}}async _handleResponse(t){if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);try{const e=t.headers.get("content-type");return e&&e.includes("application/json")?await t.json():await t.text()}catch(e){return console.error("Ошибка парсинга ответа:",e),null}}}const i=new h;class b{constructor(){this.baseUrl="http://localhost:3000"}getmsm(){return`${this.baseUrl}/msm`}getFilteredmsm(t){return`${this.baseUrl}/msm?type=${t}`}getmsmById(t){return`${this.baseUrl}/msm/${t}`}createmsm(){return`${this.baseUrl}/msm`}removemsmById(t){return`${this.baseUrl}/msm/${t}`}updatemsmById(t){return`${this.baseUrl}/msm/${t}`}}const o=new b;class y{constructor(t,e){this.parent=t,this.id=e,this.isEditing=!1,this.currentCard=null,this.backupCard=null}render(){this.loadCardData()}async loadCardData(){try{const{data:t,status:e}=await i.get(o.getmsmById(this.id));e===200&&t?(this.currentCard=t,this.backupCard={...t}):(console.error("Ошибка загрузки карточки:",e),this.currentCard=null),this.renderCardView()}catch(t){console.error("Ошибка при загрузке данных карточки:",t),this.currentCard=null,this.renderCardView()}}renderCardView(){if(this.parent.innerHTML="",new m(this.parent).render(()=>{new c(this.parent).render()}),!this.currentCard){this.parent.insertAdjacentHTML("beforeend",`
        <div class="alert alert-danger">Карточка не найдена</div>
      `);return}this.isEditing?this.renderEditForm():this.renderCardDetails()}renderCardDetails(){const{image:t,name:e,description:s,type:a}=this.currentCard;this.parent.insertAdjacentHTML("beforeend",`
      <div class="card">
        <img src="${t}" class="card-img-top" style="max-width: 300px; height: auto;">
        <div class="card-body">
          <h2 class="card-title">${e}</h2>
          <p class="card-text">${s}</p>
          <p class="text-muted">Категория: ${a}</p>
          <div class="mt-3">
            <button class="btn btn-primary" id="edit-btn">Редактировать</button>
          </div>
        </div>
      </div>
    `),document.getElementById("edit-btn").addEventListener("click",()=>{this.isEditing=!0,this.renderCardView()})}renderEditForm(){const{image:t,name:e,description:s,type:a}=this.currentCard;this.parent.insertAdjacentHTML("beforeend",`
      <div class="card">
        <div class="card-body">
          <form id="edit-form">
            <div class="mb-3">
              <label class="form-label">Изображение (URL)</label>
              <input type="text" class="form-control" id="image-input" value="${t}">
            </div>
            <div class="mb-3">
              <label class="form-label">Название</label>
              <input type="text" class="form-control" id="name-input" value="${e}">
            </div>
            <div class="mb-3">
              <label class="form-label">Описание</label>
              <textarea class="form-control" id="desc-input" rows="3">${s}</textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Категория</label>
              <input type="text" class="form-control" id="type-input" value="${a}">
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-success">Сохранить</button>
              <button type="button" class="btn btn-secondary" id="cancel-btn">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    `),document.getElementById("edit-form").addEventListener("submit",async r=>{r.preventDefault(),await this.saveChanges()}),document.getElementById("cancel-btn").addEventListener("click",()=>{this.isEditing=!1,this.currentCard={...this.backupCard},this.renderCardView()})}async saveChanges(){const t={...this.currentCard,image:document.getElementById("image-input").value,name:document.getElementById("name-input").value,description:document.getElementById("desc-input").value,type:document.getElementById("type-input").value};try{const{data:e,status:s}=await i.patch(o.updatemsmById(this.id),t);s===200&&e&&(this.currentCard=e,this.backupCard={...e},this.isEditing=!1,this.renderCardView(),this.showNotification("Изменения успешно сохранены"))}catch(e){console.error("Ошибка при сохранении:",e),this.showNotification("Ошибка при сохранении изменений","error")}}showNotification(t,e="success"){const s=e==="success"?"alert-success":"alert-danger",a=document.createElement("div");a.className=`alert ${s} position-fixed top-0 end-0 m-3`,a.textContent=t,document.body.appendChild(a),setTimeout(()=>a.remove(),3e3)}}class c{constructor(t){this.parent=t,this.data=[...l],this.filteredData=[...l]}async getData(){try{const{data:t}=await i.get(o.getmsm());if(t)return this.data=t,this.filteredData=[...t],!0}catch(t){console.error("Ошибка при загрузке данных:",t)}return!1}getCategories(){return[...new Set(this.data.map(t=>t.type))]}async render(){await this.getData(),this.parent.innerHTML="",new m(this.parent).render(()=>{new c(this.parent).render()}),new u(this.parent,this.onFilter_msm_type.bind(this)).render(this.getCategories()),this.parent.insertAdjacentHTML("beforeend",`
      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-success add-btn">Создать копию</button>
        <button class="btn btn-primary create-monster-btn">Создать монстра</button>
      </div>
      <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
      
      <!-- Модальное окно -->
      <div class="modal fade" id="createMonsterModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Создание нового монстра</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="monster-form">
                <div class="mb-3">
                  <label class="form-label">Имя монстра</label>
                  <input type="text" class="form-control" id="monster-name" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Тип</label>
                  <select class="form-select" id="monster-type" required>
                    <option value="Магический">Магический</option>
                    <option value="Природный">Природный</option>
                    <option value="Огненный">Огненный</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Описание</label>
                  <textarea class="form-control" id="monster-desc" rows="3" required></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-primary" id="confirm-create">Создать</button>
            </div>
          </div>
        </div>
      </div>
    `),document.querySelector(".add-btn").addEventListener("click",this.onAddCard_uuduk.bind(this)),document.querySelector(".create-monster-btn").addEventListener("click",()=>{new bootstrap.Modal(document.getElementById("createMonsterModal")).show()}),document.getElementById("confirm-create").addEventListener("click",()=>{this.createNewMonster()}),this.renderCards()}onCard_msm_Click(t){new y(this.parent,t).render()}async onDeleteCard_msm(t){try{await i.delete(o.removemsmById(t)),this.data=this.data.filter(e=>e.id!==t),this.filteredData=this.filteredData.filter(e=>e.id!==t),this.renderCards()}catch(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку")}}onFilter_msm_type(t){this.filteredData=t==="all"?[...this.data]:this.data.filter(e=>e.type===t),this.renderCards()}async onAddCard_uuduk(){if(this.data.length>0){const t=this.data[0],e={...t,id:Date.now(),name:`Копия ${t.name}`};try{const{data:s}=await i.post(o.createmsm(),e);s&&(this.data.push(s),this.filteredData.push(s),this.renderCards())}catch(s){console.error("Ошибка при создании копии карточки:",s),alert("Не удалось создать копию карточки")}}}renderCards(){const t=document.getElementById("cards-container");t&&(t.innerHTML="",this.filteredData.forEach(e=>{new p(t,this.onDeleteCard_msm.bind(this)).render(e,()=>this.onCard_msm_Click(e.id))}))}async createNewMonster(){const t=document.getElementById("monster-name").value,e=document.getElementById("monster-type").value,s=document.getElementById("monster-desc").value;if(!t||!s){alert("Заполните все обязательные поля!");return}const a={name:t,type:e,description:s,image:"Dandidoo.png",level:1,breedingTime:9};try{const{data:r}=await i.post(o.createmsm(),a);bootstrap.Modal.getInstance(document.getElementById("createMonsterModal")).hide(),this.data.unshift(r),this.filteredData.unshift(r),this.renderCards(),document.getElementById("monster-form").reset()}catch(r){console.error("Ошибка при создании монстра:",r),alert("Не удалось создать нового монстра")}}}const f=document.getElementById("root"),g=new c(f);g.render();console.log("main.js.render()");
