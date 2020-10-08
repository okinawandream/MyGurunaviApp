'use strict';

{
  // //} DOM の取得
  const button = document.getElementById('btn');
  const result = document.getElementById('result');
  const text = document.getElementById('text');


  //} リクエスト URL の作成
  function createURL() {
    const API_KEY = 'caf8f8eb38c05d9f89272fbd15317042';
    const baseUrl = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=' + API_KEY;
    const option = '&hit_per_page=10'; // メニュー名 を入力
    const keyword = '&freeword=' + text.value; 
    const URL = baseUrl + option + keyword;
    
    return URL;
  }
  
  //} 非同期処理 
  async function getImages() {
    const res = await fetch(createURL())
    const users = await res.json();

    if (users.totalHits === 0) {
      alert('該当する写真はありません');
      reset();
    }

    users.rest.forEach(addList)
    return users;
  }

  //}  DOM 生成 => 追加
  function addList(user) {
    const dl = document.createElement('dl');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dd.textContent = user.name                

    const img = document.createElement('img');
    img.src = user.image_url.shop_image1;       
    
    const a = document.createElement('a');
    a.href = user.url;
    a.target = '_blank';  
    
    dl.appendChild(dt);                          
    dl.appendChild(dd);                         
    dt.appendChild(img)                          
    a.appendChild(dl)
    result.appendChild(a)
  }

  function reset() {
    text.value = '';
    text.focus();
  }

  button.addEventListener('click', async () => {
    
    while (result.firstChild) {
      result.removeChild(result.firstChild)
    }

    getImages();
    reset();
  });
}