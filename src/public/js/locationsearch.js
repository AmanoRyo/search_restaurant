document.querySelector("button").addEventListener("click", getPosition);

var search_flag = false;  // サーチ中にtrueになる

function getPosition(event) {
  const PAGE_ITEM_LIMIT = 10; // 1ページに表示されるお店数の限度
  var CURRENT_PAGE; // 現在ページ

  const status = document.querySelector(".status");
  const p = document.querySelector(".page");
  const key = apikey.value;
  const range = ranges.value;
  var parking = "0";
  var wifi = "0";
  var pet ="0";
  var lunch = "0";
  var non_smoking = "0";
  const start = event.target.value;
  const page = event.target.dataset.page;

  // ブラウザがGeolocation APIに対応しているかをチェック
  if (!navigator.geolocation) {
    status.textContent = "ブラウザがGeolocationに対応していません";
    // 対応している → 位置情報取得開始
    // 位置情報取得成功時にsuccess()、そして取得失敗時にerror()がコールされる
    // optionsはgetCurrentPosition()に渡す設定値
  }
  else if (!search_flag) {
    search_flag = true;
    const loadicon = document.createElement("i");
    loadicon.className = "fa-solid fa-utensils fa-flip fa-4x"; //ロードスピナー表示
    status.append(loadicon);
    navigator.geolocation.getCurrentPosition(success, error);
  }
  // 位置情報取得処理が成功した時にコールされる関数
  // 引数として、coords(coordinates。緯度・経度など)とtimestamp(タイムスタンプ)の2つを持ったpositionが渡される
  async function success(position) {
    search_flag = false;
    status.textContent = "";
    const latitude = position.coords.latitude; // 緯度取得
    const longitude = position.coords.longitude; // 経度取得
    if(page === undefined){
      p.textContent = `1ページ目を表示しています。`;
      CURRENT_PAGE = 1;
    }
    else{
      p.textContent = `${page}ページ目を表示しています。`;
      CURRENT_PAGE = page;
    }

    if (parkings.checked) {
      parking = "1";
    } else {
      parking = "0";
    }
    if (wifis.checked) {
      wifi = "1";
    } else {
      wifi = "0";
    }
    if (pets.checked) {
      pet = "1";
    } else {
      pet = "0";
    }
    if (lunchs.checked) {
      lunch = "1";
    } else {
      lunch = "0";
    }
    if (non_smokings.checked) {
      non_smoking = "1";
    } else {
      non_smoking = "0";
    }

    // クエリをFormDataに格納する
    const postData = new FormData();
    postData.set("key", key)
    postData.set("latitude", latitude);
    postData.set("longitude", longitude);
    postData.set("range", range);
    postData.set("parking", parking);
    postData.set("wifi", wifi);
    postData.set("pet", pet);
    postData.set("lunch", lunch);
    postData.set("non_smoking", non_smoking);
    postData.set("start", start);

    const data = {
      method: "POST",
      body: postData,
    };
    // FetchApiを使ってグルメサーチAPIからjsonを取得するリクエストをする
    const res = await fetch('/php/location_search_query.php', data);
    const d = await res.json();
    const json = await JSON.parse(d);

    renderJson(json);
  }

  // 位置情報取得処理が失敗した時にコールされる関数
  // 引数として、code(コード)とmessage(メッセージ)の2つを持ったpositionErrorが渡される
  function error(positionError) {
    search_flag = false;
    switch (positionError.code) {
      case 0: // 0:UNKNOWN_ERROR
        status.textContent = "原因不明のエラーが発生しました。";
        break;
        
      case 1: // 1:PERMISSION_DENIED
        status.textContent = "	位置情報の取得が許可されませんでした。";
        break;

      case 2: // 2:POSITION_UNAVAILABLE
        status.textContent = "電波状況などで位置情報が取得できませんでした。";
        break;

      case 3: // 3:TIMEOUT
        status.textContent =
          "位置情報の取得に時間がかかり過ぎてタイムアウトしました。";
        break;
    }
  }

  // グルメサーチAPIから取得したjsonの内容をjavascriptでhtmlに反映させる関数
  function renderJson(json) {
    document.querySelector(".next").innerHTML = "";
    document.querySelector(".main").innerHTML = "";

    var msg;
    if (json.results.results_available > 0) {
      msg = `${json.results.results_available}件見つかりました。距離の近い順に表示しています。`;
      p.style.display = "block"
    }
    else {
      msg = "申し訳ございませんが、条件にあう店舗が見つかりませんでした。";
      p.style.display = "none"
    }
    document.querySelector(
      "h2"
    ).textContent = msg;
    var fragment = document.createDocumentFragment();
    const template = document.getElementById("template");
    for (let i = 0; i < json.results.shop.length; i++) {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".show-photo img").src = json.results.shop[i].photo.pc.m;
      clone.querySelector(
        ".show-name a"
      ).textContent = ` ${json.results.shop[i].name}`;
      clone.querySelector(
        ".show-access a"
      ).textContent = json.results.shop[i].address;
      clone.querySelector(
        ".show-genre a"
      ).textContent = ` ${json.results.shop[i].genre.name}`;

      clone.querySelector(
        ".name"
      ).value = `${json.results.shop[i].name}`;
      clone.querySelector(
        ".shop_id"
      ).value = `${json.results.shop[i].id}`;

      fragment.appendChild(clone);
    }
    document.querySelector(".main").appendChild(fragment);

    // ページネーションをする
    const page_ary = [];
    const i = Math.floor(json.results.results_available / 10) + 1;
    for (let j = 0; j < i; j++) {
      const span = document.createElement("a");
      span.textContent = j + 1;
      span.dataset.page = j + 1;
      span.value = PAGE_ITEM_LIMIT * j + 1;
      span.addEventListener("click", getPosition);
      span.className = "pagination";
      page_ary.push(span);
    }

    const last_page_num = page_ary.length; // 最後のページ番号
    const page_delta = 2; // ページナンバリングの表示範囲（「現在のページ数-delta」 ~ 「現在のページ数+delta」）
    fragment = pagination(fragment, page_ary, CURRENT_PAGE, last_page_num, page_delta); // ページネーション作成
    document.querySelector(".next").appendChild(fragment);  // ページリンクを反映
  }

  // 省略記号の生成
  function makeEllipsis(){
    const ellipsis = document.createElement("a");
    const ellipsis_icon = document.createElement("i");
    ellipsis_icon.className = "fa-solid fa-ellipsis";
    ellipsis_icon.style = "color: white;";
    ellipsis.appendChild(ellipsis_icon);
    ellipsis.className = "ellipsis";
    return ellipsis;
  }

  // ページネーションの生成
  function pagination(fragment, page_ary, c, m, d) {
    var current = Number(c),
        last = Number(m),
        delta = Number(d),
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
    for (let i = 0; i < rangeWithDots.length; i++) {
      if (rangeWithDots[i] === "...") {
        fragment.appendChild(makeEllipsis());
      }
      else {
        if (Number(rangeWithDots[i]) == CURRENT_PAGE) {  // 現在のページ番号要素の処理
          let current_span = page_ary[Number(rangeWithDots[i])-1];
          current_span.className = "pagination-current";  // 現在のページ番号はクラスを変える
        }
        fragment.appendChild(page_ary[Number(rangeWithDots[i])-1]);
      }
    }

    return fragment;
  }
}
