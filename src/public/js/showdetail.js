console.log(window.shop_id);
console.log(apikey.value);

window.onload = search_detail();

async function search_detail(){
	const shop_id = window.shop_id;	// 店舗のID
	const key = apikey.value;	// APIキー
	
	// クエリをFormDataに格納する
	const postData = new FormData(); // フォーム方式で送る場合
	postData.set("key", key)
	postData.set("shop_id", shop_id); // set()で格納する
	
	const data = {
		method: "POST",
		body: postData,
	};
	// FetchApiを使ってグルメサーチAPIからjsonを取得するリクエストをする
	const res = await fetch('/php/id_search_query.php', data);
	const d = await res.json();
	const json = await JSON.parse(d);
	
	console.log(json);
	renderJson(json);
}

function renderJson(json) {
	document.querySelector(
		".name"
	).textContent = json.results.shop[0].name;
	document.querySelector(
		".access"
	).textContent = json.results.shop[0].address;
	document.querySelector(
		".open"
	).textContent = json.results.shop[0].open;
	document.querySelector(
		".photo"
	).src = json.results.shop[0].photo.pc.l;
}