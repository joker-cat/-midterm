// alert("請複製網址，當作圖片來源來新增套票 : https://github.com/joker-cat/-/blob/main/image/%E4%BC%81%E9%B5%9D.gif?raw=true")
// https://github.com/joker-cat/-/blob/main/image/%E4%BC%81%E9%B5%9D.gif?raw=true
let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感。",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];
  let searchGetCount = document.querySelector('.search-getCount');
  const sec2Container = document.querySelector('.sec2-container');
  const filterArea = document.querySelector('.filter-area');
  const newTicketBtn = document.querySelector('.btn');
  let isImg = document.querySelector('.is-img');
  function isImage(url) {
    return new Promise((resolve, reject) => {

      // 建立一個 Image 物件
      var img = new Image();

      // 設定圖片的來源為要檢查的網址
      img.src = url;

      // 設定圖片載入完成的處理函式
      img.onload = function() {
        console.log('這是一張圖片！');
        resolve(true)
      };
    
      // 設定圖片載入失敗的處理函式
      img.onerror = function() {
        console.log('這不是一張圖片。');
        resolve(false)
      };
    })
  }

  newTicketBtn.addEventListener('click',()=>{
    isImage(isImg.value)
      .then((bool)=>{
        let allFiled = bool;
        const valueSet = document.querySelectorAll('.is-null');
        valueSet.forEach((e)=>e.value.trim()===''?allFiled=false:'');
        console.log(allFiled);
        if (allFiled) {
          let inputValuesObject = Array.from(valueSet).reduce((acc, input)=>{
            acc[input.name] = input.value;
            return acc;
          }, {});
          data.push({...inputValuesObject,"id":data.length});
          showTicket(data);
        }else{
          let inputValuesObject = Array.from(valueSet).reduce((acc, input)=>{
            acc[input.name] = input.value;
            return acc;
          }, {});
          inputValuesObject.imgUrl = "./image/img_no_found.png";
          data.push({...inputValuesObject,"id":data.length});
          showTicket(data);
        }
      }).catch((err)=>{
         console.log(err);
      })
  });

  filterArea.addEventListener('change', (e) => {
      const getValue = e.target.value;
      (getValue === "全部地區") ? showTicket(data) : getChange(getValue);

  });
  function getChange(value) {
      const filterData = data.filter((e) => e.area === value);
      showTicket(filterData);
  };
  function showTicket(arr) {
    console.log(arr);
      let strTemplate = '';
      for (const i of arr) {
          strTemplate +=
              `
              <div class="ticket-card">
                  <mark>${i.area}</mark>
                  <div class="ticket-cart-content">
                      <span class="scroe">${i.rate}</span>
                      <img class="img-set" src="${i.imgUrl}" alt="">
                      <h3>${i.name}</h3>
                      <p class="describe">${i.description}</p>
                      <div class="remaining">
                          <div class="remaining-count">剩下最後 ${i.group} 組</div>
                          <div style="display: flex;align-items: center;">
                              <span class="twd">TWD</span>
                              <p class="ticket-price">$${i.price.toLocaleString()}</p>
                          </div>
                      </div>
                  </div>
              </div>
              `
      }
      sec2Container.innerHTML = strTemplate;
      searchGetCount.textContent = `本次搜尋共 ${arr.length} 筆資料`
  };