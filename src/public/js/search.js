// グルメサーチAPIから取得したjsonの内容をjavascriptでhtmlに反映させる関数
function renderJson(json) {
	document.querySelector(".main").innerHTML = "";
	document.querySelector("span").innerHTML = "";
	document.querySelector(
		"h2"
	).textContent = `${json.results.results_available}件見つかりました。距離の近い順に表示しています。`;
	const fragment = document.createDocumentFragment();
	const template = document.getElementById("template");
	for (let i = 0; i < json.results.shop.length; i++) {
		const clone = template.content.cloneNode(true);

		clone.querySelector(
      ".name a"
    ).textContent = `店名：${json.results.shop[i].name}`;
    clone.querySelector(".name a").href = json.results.shop[i].urls.pc;
    clone.querySelector(
      ".access a"
    ).textContent = `住所：${json.results.shop[i].address}`;
    clone.querySelector(".access a").href = json.results.shop[i].coupon_urls.pc;
    clone.querySelector(
      ".average"
    ).textContent = `予算：${json.results.shop[i].budget.average}`;
    clone.querySelector(
      ".open"
    ).textContent = `営業時間：${json.results.shop[i].open}`;

    fragment.appendChild(clone);
  }
  document.querySelector(".main").appendChild(fragment);

  // お店が10件以上見つかったらページネーションをする
  if (json.results.results_available > 10) {
    const i = Math.floor(json.results.results_available / 10) + 1;
    for (let j = 0; j < i; j++) {
      const span = document.createElement("a");
      span.textContent = j + 1;
      span.dataset.page = j + 1;
      span.value = 10 * j + 1;
      span.addEventListener("click", getPosition);
      fragment.appendChild(span);
    }
    document.querySelector("span").appendChild(fragment);
  }
}