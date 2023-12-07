document.querySelector("button").addEventListener("click", getPosition);

var search_flag = false;  // サーチ中にtrueになる

function getPosition(event) {
  const PAGE_ITEM_LIMIT = 10; // 1ページに表示されるお店数の限度
  var CURRENT_PAGE; // 現在ページ

  const status = document.querySelector(".status"); // 状況メッセージ部
  const p = document.querySelector(".page");  // ページネーション部
  const key = apikey.value; // APIキー
  const range = ranges.value; // 検索半径
  const start = event.target.value; // 検索開始位置
  const page = event.target.dataset.page; // ページ

  var parking = "0";      // こだわり条件（駐車場あり：１）
  var wifi = "0";         // こだわり条件（wifiあり：１）
  var pet ="0";           // こだわり条件（ぺットOK：１）
  var lunch = "0";        // こだわり条件（ランチあり：１）
  var non_smoking = "0";  // こだわり条件（全面禁煙：１）

  //ブラウザがGeolocation APIに対応しているかをチェック
  //対応している -> 位置情報取得開始
  //位置情報取得成功時 : success()
  //位置情報取得失敗時 : error()
  if (!navigator.geolocation) {
    status.textContent = "ブラウザがGeolocationに対応していません";
  }
  else if (!search_flag) {  // ロード中に検索ボタンを無効にする
    search_flag = true;
    const loadicon = document.createElement("i");
    loadicon.className = "fa-solid fa-utensils fa-flip fa-4x"; // ロードスピナー表示
    status.append(loadicon);
    navigator.geolocation.getCurrentPosition(success, error);
  }


  /**
   * 位置情報取得処理が成功したときに実行される関数
   * 検索条件を登録し検索結果を表示させる
   * @param position coords(緯度・経度など)とtimestampの2つを持つオブジェクト
   */
  async function success(position) {
    search_flag = false;
    status.textContent = "";
    const latitude = position.coords.latitude; // 緯度取得
    const longitude = position.coords.longitude; // 経度取得

    // テストケース（新宿）
    //const latitude = 35.7015817; // 緯度取得
    //const longitude = 139.6679975; // 経度取得

    // どのページを表示しているかを説明する
    if(page === undefined){
      p.textContent = `1ページ目を表示しています。`;
      CURRENT_PAGE = 1;
    }
    else{
      p.textContent = `${page}ページ目を表示しています。`;
      CURRENT_PAGE = page;
    }

    // こだわり条件の登録
    if (parkings.checked) { // 駐車場あり
      parking = "1";
    } else {
      parking = "0";
    }
    if (wifis.checked) {  // wifiあり
      wifi = "1";
    } else {
      wifi = "0";
    }
    if (pets.checked) { // ぺットOK
      pet = "1";
    } else {
      pet = "0";
    }
    if (lunchs.checked) { // ランチあり
      lunch = "1";
    } else {
      lunch = "0";
    }
    if (non_smokings.checked) { // 全面禁煙
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


  /**
   * 位置情報取得処理が失敗したときに実行される関数
   * 対応したエラーメッセージを表示させる
   * @param positionError code(コード)とmessage(メッセージ)の2つを持つオブジェクト
   */
  function error(positionError) {
    search_flag = false;
    switch (positionError.code) {
      case 0: // 0:UNKNOWN_ERROR
        status.textContent = "原因不明のエラーが発生しました。";
        break;
        
      case 1: // 1:PERMISSION_DENIED
        status.textContent = "位置情報の取得が許可されませんでした。";
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


  /**
   * グルメサーチAPIから取得したjsonの内容をjavascriptでhtmlに反映させる関数
   * @param {JSON} json 検索結果
   */
  function renderJson(json) {
    document.querySelector(".next").innerHTML = "";
    document.querySelector(".main").innerHTML = "";

    var msg;  // 検索結果メッセージ

    // 検索ヒット件数に応じたメッセージを表示
    if (json.results.results_available > 0) {
      msg = `${json.results.results_available}件見つかりました。距離の近い順に表示しています。`;
      p.style.display = "block"
    }
    else {
      msg = "申し訳ありません。条件にあう店舗が見つかりませんでした。";
      p.style.display = "none"
    }
    document.querySelector(
      "h2"
    ).textContent = msg;

    var fragment = document.createDocumentFragment();
    const template = document.getElementById("template");

    // リストに表示させる店舗情報を記載し詳細画面で必要な情報を登録する
    for (let i = 0; i < json.results.shop.length; i++) {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".show-photo img").src = json.results.shop[i].photo.pc.m; // サムネイル
      clone.querySelector(
        ".show-name a"
      ).textContent = ` ${json.results.shop[i].name}`;  // 店舗名
      clone.querySelector(
        ".show-access a"
      ).textContent = json.results.shop[i].address; // アクセス
      clone.querySelector(
        ".show-genre a"
      ).textContent = ` ${json.results.shop[i].genre.name}`;  // ジャンル
      clone.querySelector(
        ".name"
      ).value = `${json.results.shop[i].name}`;  // （詳細ページ用）店舗名
      clone.querySelector(
        ".shop_id"
      ).value = `${json.results.shop[i].id}`; // (詳細ページ用）店舗ID
      fragment.appendChild(clone);
    }
    document.querySelector(".main").appendChild(fragment);

    // １ページに10件以上あればページネーションをする
    const page_ary = [];
    const i = Math.floor(json.results.results_available / PAGE_ITEM_LIMIT) + 1;
    for (let j = 0; j < i; j++) {
      const span = document.createElement("a");
      span.textContent = j + 1;
      span.dataset.page = j + 1;
      span.value = PAGE_ITEM_LIMIT * j + 1;
      span.addEventListener("click", getPosition);
      span.href = "#top";
      span.style = "text-decoration: none;";
      span.className = "pagination";
      page_ary.push(span);
    }

    const last_page_num = page_ary.length; // 最後のページ番号
    const page_delta = 2; // ページナンバリングの表示範囲（「現在のページ数-delta」 ~ 「現在のページ数+delta」）
    fragment = pagination(fragment, page_ary, CURRENT_PAGE, last_page_num, page_delta); // ページネーション作成
    document.querySelector(".next").appendChild(fragment);  // ページリンクを反映
  }


  /**
   * 省略記号の生成
   * @returns {HTMLAnchorElement} ページネーションに追加する省略記号（...）
   */
  function makeEllipsis(){
    const ellipsis = document.createElement("a");
    const ellipsis_icon = document.createElement("i");
    ellipsis_icon.className = "fa-solid fa-ellipsis";
    ellipsis_icon.style = "color: white;";
    ellipsis.appendChild(ellipsis_icon);
    ellipsis.className = "ellipsis";
    return ellipsis;
  }

  /**
   * ページネーションの生成
   * @param {DocumentFragment} fragment ページネーション部の要素
   * @param {HTMLAnchorElement[]} page_ary ページ番号の配列
   * @param {Number} c 現在ページ番号
   * @param {Number} m 最終ページ番号
   * @param {Number} d ページ番号表示範囲
   * @returns ページネーション部の要素
   */
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
