window.onload = search_detail();

const parking = document.getElementById("parking");	// 駐車場アイコン
const wifi = document.getElementById("wifi");	// wifiアイコン
const pet = document.getElementById("pet");	// ペットアイコン
const lunch = document.getElementById("lunch");	// ランチアイコン
const bansmoking = document.getElementById("bansmoking");	// 禁煙アイコン

/**
 * 店舗IDを参照して店舗の詳細情報を記載する
 */
async function search_detail(){
	const shop_id = window.shop_id;	// 店舗のID
	const key = apikey.value;	// APIキー
	
	// クエリをFormDataに格納する
	const postData = new FormData();
	postData.set("key", key)
	postData.set("shop_id", shop_id);
	
	const data = {
		method: "POST",
		body: postData,
	};

	// FetchApiを使ってグルメサーチAPIからjsonを取得するリクエストをする
	const res = await fetch('/php/id_search_query.php', data);
	const d = await res.json();
	const json = await JSON.parse(d);
	
	// 検索結果から情報記載
	renderJson(json);
	showParkingOption(json);
	showWifiOption(json);
	showPetOption(json);
	showLunchOption(json);
	showSmokingOption(json);
	displayUnlock();
}


/**
 * 駐車場項目の表示
 * @param {JSON} json 
 */
function showParkingOption(json) {
	const option = json.results.shop[0].parking;
	const text = document.getElementById("parking-text");	// 駐車場の有無表示
	if(option.indexOf( 'あり' ) !== -1){
		parking.style = "color: #0ebf26;";	// green
		text.textContent = "駐車場あり";
	}
	else{
		parking.style = "color: #d6d6d6;";	// gray
		text.textContent = "駐車場なし";
	}
}


/**
 * wifi項目の表示
 * @param {JSON} json 
 */
function showWifiOption(json) {
	const option = json.results.shop[0].wifi;
	const text = document.getElementById("wifi-text");	// wifiの有無表示
	if(option == "あり"){
		wifi.style = "color: #0ebf26;";	// green
		text.textContent = "Wifiあり";
	}
	else if(option == "未確認"){
		wifi.style = "color: #e39b0a;";	// orange
		text.textContent = "Wifi未確認";
	}
	else{
		wifi.style = "color: #d6d6d6;";	// gray
		text.textContent = "Wifiなし";
	}
}


/**
 * ぺット項目の表示
 * @param {JSON} json 
 */
function showPetOption(json) {
	const option = json.results.shop[0].pet;
	const text = document.getElementById("pet-text");	// ぺットの可否表示
	if(option == "可"){
		pet.style = "color: #0ebf26;";	// green
		text.textContent = "ぺットOK";
	}
	else{
		pet.style = "color: #d6d6d6;";	// gray
		text.textContent = "ぺットNG";
	}
}


/**
 * ランチ項目の表示
 * @param {JSON} json 
 */
function showLunchOption(json) {
	const option = json.results.shop[0].lunch;
	const text = document.getElementById("lunch-text");	// ランチ有無表示
	if(option == "あり"){
		lunch.style = "color: #0ebf26;";	// green
		text.textContent = "ランチあり";
	}
	else{
		lunch.style = "color: #d6d6d6;";	// gray
		text.textContent = "ランチなし";
	}
}


/**
 * 禁煙項目の表示
 * @param {JSON} json 
 */
function showSmokingOption(json) {
	const option = json.results.shop[0].non_smoking;
	const text = document.getElementById("bansmoking-text");	// wifiの有無表示
	if(option == "全面禁煙"){
		bansmoking.style = "color: #0ebf26;";	// green
		text.textContent = "全席禁煙席";
	}
	else if(option == "一部禁煙"){
		bansmoking.style = "color: #e39b0a;";	// orange
		text.textContent = "一部禁煙席";
	}
	else{
		bansmoking.style = "color: #d6d6d6;";	// gray
		text.textContent = "禁煙席なし";
	}
}


/**
 * JSONからデータ抽出
 * @param {JSON} json 
 */
function renderJson(json) {
	const latitude = json.results.shop[0].lat		// 緯度
	const longitude = json.results.shop[0].lng	// 経度
	document.querySelector(
		".name"
	).textContent = json.results.shop[0].name;	// 店舗名
	document.querySelector(
		".name-kana"
	).textContent = json.results.shop[0].name_kana;	// 店舗名のふりがな
	document.querySelector(
		".genre"
	).textContent = `【${json.results.shop[0].genre.name}】 ${json.results.shop[0].genre.catch}`;	// ジャンルとキャッチフレーズ
	document.querySelector(
		".access"
	).textContent = json.results.shop[0].address;	// アクセス
	document.querySelector(
		".map"
	).href = `https://www.google.co.jp/maps?q=${latitude},${longitude}&z=10`;	// 位置情報に対応したGoogleMAP
	document.querySelector(
		".close"
	).textContent = json.results.shop[0].close;	// 定休日
	document.querySelector(
		".photo"
	).src = json.results.shop[0].photo.pc.l;	// 店舗画像
}


/**
 * ローディング画面を解除する
 */
function displayUnlock() {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
}