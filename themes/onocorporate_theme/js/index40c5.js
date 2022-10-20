

'use strict';

/**
 * 変数
*****************************************************/
var lastScrollPos = 0;
const html = document.querySelector('html');
const ua = navigator.userAgent;

var globalHeightObj = [];
var gnav = convertArray(document.querySelectorAll('.js-dropdown-anchor'));

for (var index = 0; index < gnav.length; index++) {
	var globalMenuId = gnav[index].nextElementSibling.dataset.menu;
	var globalMenuHeight = gnav[index].nextElementSibling.clientHeight;

	globalHeightObj[globalMenuId] = globalMenuHeight;
	gnav[index].nextElementSibling.style.height = 0;
	gnav[index].nextElementSibling.style.opacity = 1;
	gnav[index].nextElementSibling.style.visibility = 'visible';
}



/**
 * 処理
*****************************************************/
window.onload = function () {
	changeLayoutLowerPage();
	closestPolyfill();
}
window.addEventListener("load", function () {
	fixedSidenav();
	change_breadcrumbColor();
	change_contents_padding();
	change_margin_noSidenav();
	create_movieModal();
	create_adModal();
	create_external();
	if (isMobile()) {
		change_action_column();
	}
	current_location();
	tileAnimation();
	pr_form();
	stock_form_pc();
	stock_form_sp();
});
document.addEventListener("DOMContentLoaded", function () {
	showFourthLayer();
	isPc() ? showDropdownMenu() : "";
	isTab() ? showTabDropDown() : "";
	dropdownClosePc();
	showSpDropDown();
	showRolloverMenu();
	topButton('pagetop', 300);
	showSpNav();
	showSpNewsTab();
	showSearchBoxSp();
	showSearchBoxPc();
	// notSp() ? closeActiveMenu() : "";
	toggleAccordion();
	toggleAccordion_open();
	change_indexLayout();
	change_formTargetAd();
	if (isMobile()) {
		change_action_column();
	}
	change_news_detail();
	change_storyLayout();
	setFullpage();
	createGoogleMap();
	change_padding404();
	pr_form();
	dammySelectBox();
});

document.addEventListener("scroll", function () {
	controlHeader();
	changeHeaderStyle();
	changeContentsMargin();
	fixedSidenav();
});

window.addEventListener("resize", function () {
	changeLayoutLowerPage();
	change_contents_padding();
	change_news_detail();
	if (isMobile()) {
		change_action_column();
	}
	pr_form();
	stock_form_pc();
	stock_form_sp();
	change_padding404();
});


/**
* 関数
*****************************************************/
function notSp() {
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		return false;
	} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
		return true;
	} else {
		return true;
	}
}
function isPc() {
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		return false;
	} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
		return false;
	} else {
		return true;
	}
}
function isTab() {
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		return false;
	} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
		return true;
	} else {
		return false;
	}
}
//スマホ判定
function isMobile() {
	if (window.matchMedia && window.matchMedia('screen and (max-width: 767px)').matches) {
		return true;
	} else {
		return false;
	}
}
// iOS Android判定
function getSpDevice () {
	var flg = true;
	if (ua.search('iPhone') > 0 || ua.search('iPad') > 0 || ua.search('iPod') > 0) {
		return flg;
	} else if (ua.indexOf('Android') > 0) {
		flg = false;
		return flg
	}
}
// Activeクラス保持判定
function isActive(element) {
	return element.classList.contains('active');
}
// headerの高さ取得
function getHeaderHeight () {
	var headerHeight = document.getElementById("header").clientHeight;
	return headerHeight;
}
//スクロール量取得
function getWindowScroll () {
	var scroll = window.pageYOffset;
	return scroll;
}
// 配列に変換
function convertArray(node) {
	const convertResult = Array.prototype.slice.call(node)
	return convertResult;
}
// スクロール止め
function addStopScroll() {
	if (isMobile()) {
		if (getSpDevice()) {
			html.classList.add("is-noscroll-ip");
		} else {
			html.classList.add("is-noscroll-ad");
		}
	}
}
// スクロール許可
function removeStopScroll() {
	if (isMobile()) {
		if (getSpDevice()) {
			html.classList.remove("is-noscroll-ip");
		} else {
			html.classList.remove("is-noscroll-ad");
		}
	}
}

function getOffsetTop(elem) {
	const position = elem.getBoundingClientRect();
	const offsetTop = position.top;
	return offsetTop
}

function getOffsetLeft(elem) {
	const position = elem.getBoundingClientRect();
	const offsetLeft = position.left;
	return offsetLeft
}
function closestPolyfill() {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			var el = this;

			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}
}



//ヘッダー動的制御
function controlHeader() { 
	const header = document.getElementById("header");
	const wS = getWindowScroll();
	const hH = getHeaderHeight();
	
	if (wS > hH && wS > lastScrollPos) {
		header.classList.add('header-unpinned');
	}
	if (wS < hH || wS < lastScrollPos) {
		header.classList.remove('header-unpinned');
	}
	lastScrollPos = wS;
}

// PCヘッダー スクロール量が0以外のとき
function changeHeaderStyle() {
	const header = document.getElementById("header");
	const wS = getWindowScroll();
	
	if( wS > 0) {
		header.classList.add('no-position-top');
	} else {
		header.classList.remove('no-position-top');
	}
}

// PCヘッダー に応じてmarginを調整
function changeContentsMargin() {
	const contents = document.getElementById("contents");
	const wS = getWindowScroll();
	if (wS > 0) {
		contents.classList.add('no-position-top');
	} else {
		contents.classList.remove('no-position-top');
	}
}


function showDropdownMenu() {
	const r = document.querySelectorAll(".js-dropdown-anchor");
	const tArr = convertArray(r);
	const bg = document.getElementById('dropdownBg');

	var index;

	for (var i = 0; i < r.length; i++) {
		
		r[i].addEventListener("click", function (e) {
			e.preventDefault();
			index = tArr.indexOf(this);
			const target = this.nextElementSibling;
			const targetId = this.nextElementSibling.dataset.menu;
			const pcSearchBtn = document.getElementById("pcSearchBtn");
			const pcSearchBox = document.getElementById("pcSearchBox");
			
			for (var i = 0; i < r.length; i++) {
				if (r[i] == r[index]) {
					if (r[i].classList.contains('active')) {
						this.classList.remove("active");
						target.style.height = 0;
						target.classList.remove('is-show');
						bg.classList.remove("active");
					} else {
						this.classList.add("active");
						target.style.height = globalHeightObj[targetId] + "px";
						target.classList.add('is-show');
						bg.classList.add("active");
					}
				} else {
					r[i].classList.remove("active");
					if (r[i].nextElementSibling) {
						r[i].nextElementSibling.style.height = 0;
						r[i].nextElementSibling.classList.remove('is-show');
					}
				}
			}

			if ( pcSearchBtn.classList.contains("active") ) {
				pcSearchBtn.classList.remove("active");
				pcSearchBox.classList.remove("active");
			}

		});
	}

	bg.addEventListener("click", function () {
		for (var i = 0; i < tArr.length; i++) {
			if (tArr[i].classList.contains("active")) {
				tArr[i].classList.remove("active");
				tArr[i].nextElementSibling.style.height = 0;
				bg.classList.remove("active");
			}
		}
	});
}

/*
* PCヘッダー ドロップダウン第4階層表示
*/
function showFourthLayer () {

	if (document.querySelectorAll('.js-lower').length == 0) { return false }

	var obj = [];
	var displayHeightObj = {};
	var hasLower_element = convertArray(document.querySelectorAll('.js-lower'));
	var fourthLower = convertArray(document.querySelectorAll('.js-fourthLower'));
	var fourthWrap = convertArray(document.querySelectorAll('.js-fourthWrap'));
	var thirdLower = convertArray(document.querySelectorAll('.js-thirdLower'));
	var limitHeight = 475;

	for (var k = 0; k < thirdLower.length; k++) {
		var thirdLowerListLength = thirdLower[k].querySelectorAll('li').length;
		if (thirdLowerListLength > 13) {
			thirdLower[k].style.maxHeight = limitHeight + 'px';
			thirdLower[k].style.overflowY = 'scroll';
		}
		
	}

	for (var h = 0; h < fourthLower.length; h++) {
		var id = fourthLower[h].dataset.menuid;
		var initialHeight = fourthLower[h].clientHeight;
		displayHeightObj[id] = initialHeight;

		fourthLower[h].style.height = 0;

		var fourthLowerInner = fourthLower[h].querySelector('.inner');
		var fourthLowerList = fourthLower[h].querySelectorAll('.common-header__dropdown__list--fourth > li').length;
		if (fourthLowerList > 13) {
			fourthLowerInner.style.maxHeight = limitHeight + 'px'
			fourthLowerInner.style.overflowY = 'scroll';
		}
	}

	for (var y = 0; y < hasLower_element.length; y++) {
		obj.push({
			'hook': hasLower_element[y],
			'item': fourthLower[y],
			'wrap;': fourthWrap[y]
		});
	}

	for (var i in obj) {
		obj[i].hook.addEventListener('mouseover', function () {
			var dropdownHeight = this.closest('.common-header__dropdown__inner').clientHeight;
			var menuid = this.dataset.menuid;
			var target = document.querySelector('.js-fourthLower[data-menuid="' + menuid + '"]');
			this.classList.add('active');


			if (displayHeightObj[menuid] > dropdownHeight ) {
				target.style.height = displayHeightObj[menuid] + 'px';
				target.classList.add('is-show');
			} else {
				target.style.height = dropdownHeight + 'px';
				target.classList.add('is-show');
			}
		});

		obj[i].item.addEventListener('mouseover', function () {
			var dropdownHeight = this.closest('.common-header__dropdown__inner').clientHeight;
			var menuid = this.dataset.menuid;
			var target = document.querySelector('.js-lower[data-menuid="' + menuid + '"]');
			target.classList.add('active');

			if (displayHeightObj[menuid] > dropdownHeight) {
				this.style.height = displayHeightObj[menuid] + 'px';
				this.classList.add('is-show');
			} else {
				this.style.height = dropdownHeight + 'px';
				this.classList.add('is-show');
			}
		});

		obj[i].hook.addEventListener('mouseout', function () {
			var parentId = this.closest('.common-header__dropdown__list--third').dataset.menu;
			var dropdownHeight = this.closest('.common-header__dropdown__inner').clientHeight;
			var menuid = this.dataset.menuid;
			var target = document.querySelector('.js-fourthLower[data-menuid="' + menuid + '"]');
			this.classList.remove('active');
			target.style.height = 0;
			target.classList.remove('is-show');
			this.closest('.js-dropdown-menu').style.height = globalHeightObj[parentId] + "px";
		});

		obj[i].item.addEventListener('mouseout', function () {
			var parentId = this.closest('.js-layor-fourth').dataset.menu;
			var menuid = this.dataset.menuid;
			var target = document.querySelector('.js-lower[data-menuid="' + menuid + '"]');
			this.style.height = 0;
			this.classList.remove('is-show');
			target.classList.remove('active');
			this.closest('.js-dropdown-menu').style.height = globalHeightObj[parentId] + "px";
		});
	}

}

/*
* PCヘッダー ドロップダウン内「Close」クリック処理
*/
function dropdownClosePc() {

	if (document.querySelectorAll('.js-dropdownclose').length == 0) { return false }

	var closeBtn = convertArray(document.querySelectorAll('.js-dropdownclose'));
	var bg = document.getElementById('dropdownBg');
	var anchor = convertArray(document.querySelectorAll('.js-dropdown-anchor')); 
	var contents = convertArray(document.querySelectorAll('.js-dropdown-menu'));

	for (var i = 0; i < closeBtn.length; i++) {
		closeBtn[i].addEventListener("click", function (e) {
			e.preventDefault();

			for (var k = 0; k < anchor.length; k++) {
				if (anchor[k].classList.contains('active')) {
					anchor[k].classList.remove('active');
				}
			}

			for (var y = 0; y < contents.length; y++) {
				contents[y].style.height = 0;
			}

			bg.classList.remove('active');
		});
	}
}

// function showDropdownMenu() {
// 	const r = document.querySelectorAll(".js-dropdown");

// 	const tArr = convertArray(r);
// 	const bg = document.getElementById('dropdownBg');

// 	var index;

// 	for (var i = 0; i < r.length; i++) {

// 		r[i].addEventListener("mouseover", function () {
// 			index = tArr.indexOf(this);
// 			const target = this.querySelector(".js-dropdown-menu");
// 			const anc = this.querySelector(".js-dropdown-anchor");
// 			const pcSearchBtn = document.getElementById("pcSearchBtn");
// 			const pcSearchBox = document.getElementById("pcSearchBox");

// 			for (var i = 0; i < r.length; i++) {
// 				if (r[i] == r[index]) {
// 					this.classList.add("active");
// 					target.classList.add("active");
// 					anc.classList.add("active");
// 				} else {
// 					r[i].classList.remove("active");
// 					r[i].querySelector(".js-dropdown-menu").classList.remove("active");
// 					r[i].querySelector('.js-dropdown-anchor').classList.remove("active");
// 				}
// 				bg.classList.add("active");
// 			}

// 			if (pcSearchBtn.classList.contains("active")) {
// 				pcSearchBtn.classList.remove("active");
// 				pcSearchBox.classList.remove("active");
// 			}

// 		});

// 		r[i].addEventListener("mouseout", function () {
// 			const target = this.querySelector(".js-dropdown-menu");
// 			const anc = this.querySelector(".js-dropdown-anchor");
// 			for (var i = 0; i < r.length; i++) {
// 				this.classList.remove("active");
// 				target.classList.remove("active");
// 				anc.classList.remove("active");
// 				bg.classList.remove("active");
// 			}
// 		});
// 	}
// }

function showTabDropDown() {

	const t = document.querySelectorAll(".js-dropdown");
	const bg = document.getElementById('dropdownBg');
	const tArr = convertArray(t);
	var index;

	for (var i = 0; i < t.length; i++) {
		t[i].addEventListener("touchstart", function (e) {
			e.preventDefault();
			index = tArr.indexOf(this);
			const target = this.querySelector(".js-dropdown-menu");
			const anc = this.querySelector(".js-dropdown-anchor");

			for (var i = 0; i < t.length; i++) {
				
				if (t[i] == t[index]) {
					if (isActive(t[index])) {
						this.classList.remove("active");
						target.classList.remove("active");
						anc.classList.remove("active");
						bg.classList.remove("active");
					} else {
						this.classList.add("active");
						target.classList.add("active");
						anc.classList.add("active");
						bg.classList.add("active");
					}
				} else {
					t[i].classList.remove("active");
					t[i].querySelector(".js-dropdown-menu").classList.remove("active");
					t[i].querySelector('.js-dropdown-anchor').classList.remove("active");
				}
			}
			
		});
	}
}



function showSpDropDown() {
	const a = document.querySelectorAll(".js-dropdown-anchor-sp");
	const d = document.querySelectorAll(".js-dropdown-menu");
	
	var index;
	var aArr;

	for (var i = 0; i < a.length; i = (i + 1) | 0) {
		a[i].addEventListener("click", function (e) {
			e.preventDefault();
			aArr = convertArray(a);
			index = aArr.indexOf(this);

			for (var i = 0; i < a.length; i = (i + 1) | 0) {
				if (a[i] == a[index]) {
					if(isActive(a[index])) {
						a[index].classList.remove("active");
						a[index].nextElementSibling.classList.remove("active");
					} else {
						a[index].classList.add("active");
						a[index].nextElementSibling.classList.add("active");
					}
				} else {
					a[i].classList.remove("active");
					a[i].nextElementSibling.classList.remove("active");
				}
			}
		})
	}
}

// 
function showSearchBoxSp () {
	const b = document.getElementById("spSearchBtn");
	const c = document.getElementById("spSearchBox");
	const nav = document.getElementById("spMenu");
	const navContents = document.getElementById("navContents");
	const openIcon = document.getElementById("spOpenIcon");
	const closeIcon = document.getElementById("spCloseIcon");
	const bg = document.getElementById('dropdownBg');

	b.addEventListener("click", function () {
		if (!isActive(this)) {
			this.classList.add("active");
			c.classList.add("active");
			openIcon.classList.add("active");
			bg.classList.add("active");
		} else {
			this.classList.remove("active");
			c.classList.remove("active");
			closeIcon.classList.remove("active");
			bg.classList.remove("active");
		}

		if (isActive(nav)) {
			nav.classList.remove("active");
			navContents.classList.remove("active");
		}
	});
}

function showSearchBoxPc() {
	const b = document.getElementById("pcSearchBtn");
	const c = document.getElementById("pcSearchBox");
	const openIcon = document.getElementById("pcOpenIcon");
	const closeIcon = document.getElementById("pcCloseIcon");
	const bg = document.getElementById('dropdownBg');
	const dropdown = convertArray(document.querySelectorAll('.js-dropdown-anchor'));

	b.addEventListener("click", function () {
		if (!isActive(this)) {
			this.classList.add("active");
			c.classList.add("active");
			openIcon.classList.add("active");
			closeIcon.classList.add("active");
			bg.classList.add("active");
		} else {
			this.classList.remove("active");
			c.classList.remove("active");
			openIcon.classList.remove("active");
			closeIcon.classList.remove("active");
			bg.classList.remove("active");
		}

		for (var i = 0; i < dropdown.length; i++) {
			if (dropdown[i].classList.contains('active')) {
				dropdown[i].classList.remove('active');
				dropdown[i].nextElementSibling.classList.remove('active');
			}
		}
	});

	bg.addEventListener("click", function () {
		if (isActive(this)) {
			this.classList.remove("active");
			c.classList.remove("active");
			openIcon.classList.remove("active");
			closeIcon.classList.remove("active");
			b.classList.remove("active");
		}
	});
}

function showSpNav() {
	const b = document.getElementById("spMenu");
	const c = document.getElementById("navContents");
	const search = document.getElementById("spSearchBtn");
	const searchContents = document.getElementById("spSearchBox");
	const bg = document.getElementById('dropdownBg');
	const headerInner = document.querySelector('.common-header__inner');
	const navContents = document.querySelectorAll('.js-dropdown-anchor-sp');
	const navborder = b.querySelectorAll(".js-spMenu-border");
	const rollOver = document.querySelector('.js-roll-over-sp');
	

	b.addEventListener("click", function () {

		if (!isActive(this)) {
			this.classList.add("active");
			c.classList.add("active");
			search.classList.add('is-none');
			addStopScroll();
			for (var i = 0; i < navborder.length; i++) {
				navborder[i].classList.add("active");
			}
		} else {
			this.classList.remove("active");
			c.classList.remove("active");
			search.classList.remove('is-none');
			removeStopScroll();
			for (var i = 0; i < navborder.length; i++) {
				navborder[i].classList.remove("active");
			}

			for (var i = 0; i < navContents.length; i++) {
				if (navContents[i].classList.contains("active")) {
					navContents[i].classList.remove("active");
					navContents[i].nextElementSibling.classList.remove("active");
				}
			}

			if (rollOver.classList.contains("active")) {
				rollOver.classList.remove("active");
				rollOver.nextElementSibling.classList.remove("active");
			}
		}
		if (isActive(search)) {
			search.classList.remove("active");
			searchContents.classList.remove("active");
			bg.classList.remove("active");
		}
	});
}

// SPトップページ 選択されているタブを初期化
function spTabInit() {
	const tab = document.querySelectorAll('.js-tab');
	const content = document.querySelectorAll('.js-tab-content');
	const tabArr = convertArray(tab);
	const contentArr = convertArray(content);

	tabArr.forEach(function (l) {
		if (l.classList.contains('current')) {
			l.classList.remove('current');
		}
	});
	contentArr.forEach(function (c) {
		if (c.classList.contains('current')) {
			c.classList.remove('current');
		}
	});
}


// SPトップページ タップされたタブとコンテンツを表示
function showSpNewsTab() {
	
	const tab = document.querySelectorAll('.js-tab');
	const content = document.querySelectorAll('.js-tab-content');
	const tabArr = convertArray(tab);
	const contentArr = convertArray(content);
	
	tabArr.forEach(function (list) {
		list.addEventListener('click', function () {

			spTabInit(); // 一旦タブを初期化

			const Index = tabArr.indexOf(this);
			tabArr[Index].classList.add('current');
			contentArr[Index].classList.add('current');
			
		})
	}) 
}

//画面をクリックした時に開いているメニューを閉じる
function closeActiveMenu() {
	const bg = document.getElementById("dropdownBg");
	const spNav = 'js-dropdown-anchor-sp'
	
	window.addEventListener("click", function (e) {
		var openItem = document.querySelectorAll(".active");
		if (openItem.length) {
			const openitemArr = convertArray(openItem);

			for (var i = 0; i < openItem.length; i++) {
				
				if (openitemArr.indexOf(e.target) == -1) {
					if (!e.target.classList.contains(spNav)) {
						openitemArr.forEach(function (el) {
							el.classList.remove("active");
						});
					}
				}
			}
		}
	});

	bg.addEventListener("touchstart", function (e) {

		var openItem = document.querySelectorAll(".active");

		if (openItem.length) {
			const openitemArr = convertArray(openItem);
			openitemArr.forEach(function (el) {
				el.classList.remove("active");
			});
		}
	});
}



function showRolloverMenu() {
	const hook = document.querySelectorAll('.js-roll-over');
	const hookList = convertArray(hook);
	hookList.forEach(function (item) {
		item.addEventListener("click", function (e) {
			e.preventDefault();
			const target = this.nextElementSibling;

			if (!isActive(target)) {
				this.classList.add("active");
				target.classList.add("active");
			} else {
				this.classList.remove("active");
				target.classList.remove("active");
			}
		});
	})

	window.addEventListener("click", function (e) {
		if (!e.target.closest('.js-roll-over')) {
			hookList.forEach(function (item) {
				var rollOver = item.nextElementSibling;
				item.classList.remove("active");
				rollOver.classList.remove("active");
			});
		} else {
			return false;
		}
	});
}

function fixedSidenav() {

	if (document.getElementById("sidenav") != null) {
		
		const body = document.body;
		const bodyHeight = body.clientHeight;
		const article = document.querySelector('.contents-lower__article_inner');
		const articleOffset = getOffsetTop(article);
		const sidenav = document.getElementById('sidenav-inner');
		const sidenavHeight = sidenav.clientHeight;
		const header = document.getElementById('header');
		const headerHeight = header.clientHeight;
		const footer = document.getElementById('footer');
		const footerHeight = footer.clientHeight;
		const heading = document.getElementById("heading");
		const headingHeight = heading.clientHeight;
		const headingwrapper = document.querySelector('.mod__page-heading_wrapper');
		const headingwrapperHeight = headingwrapper.clientHeight;
		const sidenavMarginTop = 90;
		const scroll = getWindowScroll();

		if (scroll > (bodyHeight - footerHeight - sidenavHeight)) {
			sidenav.classList.remove("fixed-start");
			sidenav.classList.remove("no-fixed");
			sidenav.classList.add("fixed-end");
		} else if (scroll > (articleOffset + headerHeight + headingwrapperHeight + sidenavMarginTop)) {
			sidenav.classList.remove("fixed-end");
			sidenav.classList.remove("no-fixed");
			sidenav.classList.add("fixed-start");
		} else {
			sidenav.classList.remove("fixed-end");
			sidenav.classList.remove("fixed-start");
			sidenav.classList.add("no-fixed");
		}
		if (isMobile()) {
			sidenav.classList.remove("fixed-start");
			sidenav.classList.remove("no-fixed");
			sidenav.classList.remove("fixed-end");
		}
	}
}
// ページトップボタン
function topButton(elmId, duration) {

	if (document.getElementById('pagetop')) {
		var topButton = document.getElementById(elmId);

		topButton.addEventListener("click", function (e) {

			e.preventDefault();

			var begin = new Date() - 0;
			var yOffset = window.pageYOffset;
			var timer = setInterval(function () {
				var current = new Date() - begin;
				if (current > duration) {
					clearInterval(timer);
					current = duration;
				}
				window.scrollTo(0, yOffset * (1 - current / duration))
			}, 10);
		}, false)
	}
}

// 下層ページ デザインで余白を変更
function changeLayoutLowerPage() {
	if (document.getElementById("article") != null && document.querySelector(".mod__page-heading_wrapper") != null) {
		const target = document.getElementById("article");
		const client_H = document.querySelector(".mod__page-heading_wrapper").clientHeight;

		target.style.paddingTop = client_H + "px"
	}
}

function change_padding404() {
	if (document.getElementById("page-404")) {
		const article = document.getElementById('article');
		if (isMobile()) {
			article.style.paddingTop = 24 + 'px';
		} else {
			article.style.paddingTop = 90 + 'px';
		}
	}
}

/* 下層ページ Ono's Actionコラムページの余白を無くす
* /about/action/column%%.html
*/
function change_action_column() {
	const targetArr = ['column', 'story'];
	// const breadcrumb = document.querySelector('.mod__breadcrumb').children;
	for (var i = 0; i < targetArr.length; i++) {
		if (document.getElementById('page-' + targetArr[i])) {
			const article = document.getElementById("article");
			const articleArea = document.querySelector(".mod__article_area");
			articleArea.style.paddingRight = 0;
			articleArea.style.paddingLeft = 0;
			article.style.paddingTop = 0;
		}
	}
}
/* 下層ページ ニュース詳細ページの余白を無くす
* /news/20190514.html
*/
function change_news_detail() {
	const targetArr = ['news', 'story'];
	// const breadcrumb = document.querySelector('.mod__breadcrumb').children;
	for (var i = 0; i < targetArr.length; i++) {
		if (document.getElementById('page-' + targetArr[i])) {
			const article = document.getElementById("article");
			article.style.paddingTop = 0;
		}
	}
}

// アコーディオンモジュール 開閉
function toggleAccordion() {
	const hook = document.querySelectorAll(".js-accordion-hook");
	var index;
	var hookArr;

	for (var i = 0; i < hook.length; i = (i + 1) | 0) {
		hook[i].addEventListener("click", function (e) {
			e.preventDefault();
			hookArr = convertArray(hook);
			index = hookArr.indexOf(this);
			
			for (var i = 0; i < hook.length; i = (i + 1) | 0) {
				if (hook[i] == hook[index]) {
					if (isActive(hook[index])) {
						hook[index].classList.remove("active");
						hook[index].nextElementSibling.classList.remove("active");
					} else {
						hook[index].classList.add("active");
						hook[index].nextElementSibling.classList.add("active");
					}
				} else {
					hook[i].classList.remove("active");
					hook[i].nextElementSibling.classList.remove("active");
				}
			}
		})
	}
}

function toggleAccordion_open() {
	const hook = document.querySelectorAll(".js-accordion-hook-open");
	var index;
	var hookArr;

	for (var i = 0; i < hook.length; i = (i + 1) | 0) {
		hook[i].addEventListener("click", function (e) {
			e.preventDefault();
			hookArr = convertArray(hook);
			index = hookArr.indexOf(this);

			for (var i = 0; i < hook.length; i = (i + 1) | 0) {
				if (hook[i] == hook[index]) {
					if (isActive(hook[index])) {
						hook[index].classList.remove("active");
						hook[index].nextElementSibling.classList.remove("active");
					} else {
						hook[index].classList.add("active");
						hook[index].nextElementSibling.classList.add("active");
					}
				}
			}
		})
	}
}

//対象indexページで横幅100%に調整
function change_indexLayout() {
	const targetArr = ['ir', "about" ,'story'];
	for (var i = 0; i < targetArr.length; i++) {
		if (document.getElementById('page-' + targetArr[i])) {
			const article = document.getElementById("article");
			const articleArea = document.querySelector(".mod__article_area");
			const articleInner = document.querySelector(".contents-lower__article_inner");
			article.style.maxWidth = 100 + "%";
			article.style.minWidth = 100 + "%";
			articleArea.style.marginRight = 0;
			articleArea.style.paddingRight = 0;
			articleArea.style.paddingLeft = 0;
			articleInner.style.paddingRight = 0;
			articleInner.style.paddingLeft = 0;
		}
	}
}
// サイドナビが無いページのmargin-rightを削除
function change_margin_noSidenav() {
	const sidenav = document.getElementById('sidenav');
	if (!sidenav) {
		if (document.querySelector(".mod__article_area") !== null) {
			const articleArea = document.querySelector(".mod__article_area");
			articleArea.style.marginRight = 0;
		}
	}
}
// ページタイトルに背景画像ありの時、パンくずの文字色を白に
function change_breadcrumbColor() {
	const targetArr = ['ir', 'action', '300th'];
	if (document.querySelector('.mod__breadcrumb') !== null) {
		const breadcrumb = document.querySelector('.mod__breadcrumb').children;
		for (var i = 0; i < targetArr.length; i++) {
			if (document.getElementById('page-' + targetArr[i])) {
				const breadcrumbArray = [].slice.call(breadcrumb)
				for (var c = 0; c < breadcrumbArray.length; c++) {
					breadcrumbArray[c].style.color = '#fff'
				}
			}
		}
	}
}

// 特定ページのpaddingを調整
function change_contents_padding() {
	const targetArr = ['rd', 'action', 'column', 'news', '300th'];
	const contentsInner = document.querySelector('.contents-lower__article_inner'); 
	for (var i = 0; i < targetArr.length; i++) {
		if (document.getElementById('page-' + targetArr[i])) {
			if (isMobile()) {
				if (document.getElementById('page-column')) {
					contentsInner.style.paddingTop = 0;
				} else if (document.getElementById('page-news')) {
					contentsInner.style.paddingTop = 30 + "px";
				} else if (document.getElementById('page-300th')) {
					contentsInner.style.paddingTop = 40 + "px";
				} else {
					contentsInner.style.paddingTop = 60 + "px";
				}
			} else {
				if (document.getElementById('page-news')) {
					contentsInner.style.paddingTop = 70 + "px";
				} else {
					contentsInner.style.paddingTop = 90 + "px";
				}
			}
		}
	}
}
function change_storyLayout() {
	const targetArr = ['story'];
	const contents  = document.getElementById('contents');
	const breadcrumb = document.getElementById('heading');
	for (var i = 0; i < targetArr.length; i++) {
		if (document.getElementById('page-' + targetArr[i])) {
			contents.style.marginTop = 0;
			breadcrumb.style.marginTop = 100 + "px";
		}
	}
}

// 汎用ページ内リンク
var Ease = {
	easeInOut: function easeInOut(t) {
		return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	}
};
var duration = 500;

window.addEventListener('DOMContentLoaded', function () {
	var headerHeight=document.querySelector('.common-header').clientHeight;
	var hash=location.hash.replace('#','');
	if(hash){
		anchorAnimate(hash)
	}
	var smoothScrollTriggers = convertArray(document.querySelectorAll('a[href^="#"]'));
	smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
		smoothScrollTrigger.addEventListener('click', function (e) {
			var href = smoothScrollTrigger.getAttribute('href');
			e.preventDefault();
			e.stopPropagation();
			anchorAnimate(href);
			
		});
	});
	function anchorAnimate(href){
		var currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
		var targetElement = document.getElementById(href.replace('#', ''));
		

		if (targetElement) {
			
			var targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top-headerHeight;
			var startTime = performance.now();

			var loop = function loop(nowTime) {
				var time = nowTime - startTime;
				var normalizedTime = time / duration;

				if (normalizedTime < 1) {
					window.scrollTo(0, currentPostion + (targetPosition - currentPostion) * Ease.easeInOut(normalizedTime));
					requestAnimationFrame(loop);
				} else {
					window.scrollTo(0, targetPosition);
				}
			};

			requestAnimationFrame(loop);
		}
	}
});

// topページ ピックアップエリアスライダー
var pickUpSwiper = new Swiper( '.js-future-swiper', {
	loop: true,
	slidesPerView: 3,
	spaceBetween: 42,
	centeredSlides: false,
	initialSlide: 0,
	loopAdditionalSlides: 1,
	
	pagination: {
		el: '.future-swiper',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1.25,
			centeredSlides: true,
			spaceBetween: 20,
			initialSlide: 0,
		}
	}
});

var kvSwiper = new Swiper('.js-kv-swiper', {
	effect: 'fade',
	loop: true,
	speed: 0,
	autoplay: {
		delay: 3000	
	},

	pagination: {
		el: '.kv-swiper',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	on: {
		init: function () {
			const slide = convertArray(document.querySelectorAll('.kv-slide'));
			for (var i = 0; i < slide.length; i++) {
				slide[i].classList.add('is-transition-1s');
			}
		}
	}
});


/*
* スクロールタイルアニメーション
******************************/
function tileAnimation () {
	jQuery('.tile-scroll-animation').waypoint(function(direction) {
		var activePoint = jQuery(this.element);
		if(direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '55%' });
	
	jQuery('.opacity-scroll-animation').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '55%' });
	jQuery('.fadeup-scroll-animation').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '80%' });
	
	// アニメーション発火調整
	jQuery('.tile-scroll-animation-corp, .tile-scroll-animation-library, .tile-scroll-animation-policy, .tile-scroll-animation-stock').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '100%' });
	jQuery('.opacity-scroll-animation-corp, .opacity-scroll-animation-library, .opacity-scroll-animation-policy, .opacity-scroll-animation-stock').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '100%' });
	
	// 小野薬品についてページ
	jQuery('.tile-scroll-animation-company').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '80%' });
	jQuery('.opacity-scroll-animation-company').waypoint(function (direction) {
		var activePoint = jQuery(this.element);
		if (direction === 'down') {
			activePoint.addClass('animated');
		}
	}, { offset: '80%' });
}
/*
* CM・動画 「感想を送る」ボタン押下でフォームの「対象動画・広告」を変更
* /company/pr.html
******************************/
function change_formTargetAd() {
	const send_impression = document.querySelectorAll('.js-uservoice');
	if (document.getElementById('formFrame')) {
		const iframe = document.getElementById('formFrame');
		const target_impression = iframe.contentDocument.getElementById('edit-voice-target');
		for (var i = 0; i < send_impression.length; i = (i + 1) | 0) {
			send_impression[i].addEventListener('click', function () {
				const sendVal = this.dataset.target;
				for (var f = 0; f < target_impression.length; f = (f + 1) | 0) {
					if (sendVal == target_impression[f].value) {
						target_impression.selectedIndex = f;
					}
				}
			});
		}
	}
}

/*
* CM・動画 モーダル表示
* /company/pr.html
******************************/
var myPlayer;
var playerData = {
	"movieList": [
		// 小野薬品の企業紹介ビデオ
		{ "accountId": "6117764555001", "playerId": "default", "videoId": "6148212541001", "title": "小野薬品の企業紹介ビデオ" },

		// Only Ono篇 30秒
		{ "accountId": "6117764555001", "playerId": "default", "videoId": "6244106986001", "title": "Only Ono篇 30秒" },

		// Only Ono篇 60秒
		{ "accountId": "6117764555001", "playerId": "default", "videoId": "6244107592001", "title": "Only Ono篇 60秒" },

		// メイキングビデオ
		{ "accountId": "6117764555001", "playerId": "default", "videoId": "6244104617001", "title": "メイキングビデオ" }
	]
}

function create_movieModal() {
	const target = document.querySelectorAll('.js-modal-link');
	const targetArr = convertArray(target)
	const body = document.getElementsByTagName('body');
	if (target.length !== 0) {
		targetArr.forEach (function (item, i) {
			target[i].addEventListener('click', function (e) {
				e.preventDefault()

				var modalHtml = document.createElement('div');
				modalHtml.setAttribute('data-num', i);
				modalHtml.setAttribute('id', 'modal-content');
				modalHtml.setAttribute('class', 'modal-content');

				modalHtml.innerHTML = '<div class="modal-content-inner">' + '<div id="modal-close" class="movie-close"></div>' + '<div class="movie">' + '<video-js id="myPlayerID" data-video-id=\"' + playerData["movieList"][i]["videoId"] + '\" data-account=\"' + playerData["movieList"][i]["accountId"] + '\" data-player=\"' + playerData["movieList"][i]["playerId"] + '\" data-embed=\"default\" class=\"video-js\" controls></video>' + '</div>' + '<p class="movie-ttl">' + playerData["movieList"][i]["title"] + '</p>' + '</div>';
				document.body.appendChild(modalHtml);

				myPlayer = bc("myPlayerID");
				myPlayer.play(playerData);

				var modalClose = document.getElementById("modal-close");
				modalClose.addEventListener("click", function () {
					if (myPlayer !== null) {
						myPlayer.dispose();
						const modalContent = document.getElementById("modal-content")
						if (modalContent) {
							modalContent.parentNode.removeChild(modalContent);
						}
					}
				});
			});
		});
	}
}
var adData = {
	"adList": [
		// 企業広告
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr05.jpg" },
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr05.jpg" },

		// 挑戦篇（30秒）
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr06.jpg" },
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr06.jpg" },

		// 挑戦篇（60秒）
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr07.jpg" },
		{ "adImage": "/themes/onocorporate_theme/img/about/img_pr07.jpg" },
	]
}
function create_adModal() {
	const target = document.querySelectorAll('.js-ad-modal');
	const targetArr = convertArray(target)
	const body = document.getElementsByTagName('body');

	if (target.length !== 0) {
		targetArr.forEach(function (item, i) {
			target[i].addEventListener('click', function (e) {
				e.preventDefault()

				var modalHtml = document.createElement('div');
				modalHtml.setAttribute('data-num', i);
				modalHtml.setAttribute('id', 'modal-content');
				modalHtml.setAttribute('class', 'modal-content');

				modalHtml.innerHTML = '<div class="modal-content-inner">' + '<div id="ad-close" class="ad-close"></div>' + '<div class="ad">' + '<img src="' + adData['adList'][i]['adImage'] + '">' + '</div>' + '</div>';
				document.body.appendChild(modalHtml);

				var modalClose = document.getElementById("ad-close");
				modalClose.addEventListener("click", function () {
					if (myPlayer !== null) {
						const modalContent = document.getElementById("modal-content")
						if (modalContent) {
							modalContent.parentNode.removeChild(modalContent);
						}
					}
				});
			});
		});
	}
}
// 外部リンクモーダル
function create_external() {
	const external = document.querySelectorAll('.js-external');
	const externalArr = convertArray(external);
	const domain = document.domain;

	// 現在ページのURLパス
	const current_url = location.pathname;
	// 現在ページのURLをパスごとに分割
	var splited_current_url = current_url.split('/');
	// 表示言語のプレフィックスはパスの最上位にある
	const current_language_pfx = splited_current_url[1];

	if (external.length !== 0) {
		externalArr.forEach(function (item, i) {
			externalArr[i].addEventListener("click", function(e) {

				e.preventDefault();
				var linkTarget = this.href;
				var externalHtml = document.createElement('div');
				externalHtml.setAttribute('id', 'external');
				externalHtml.setAttribute('class', 'external');

				if (current_language_pfx == "en") {
					externalHtml.innerHTML = '<div class="external-contents">' + '<div class="close-btn js-external-close">close</div>' + '<div class="external-contents-logo"><img src="/themes/onocorporate_theme/img/common/img_header_logo_en.png" alt="ONO PHARMACEUTICAL CO.,LTD."></div>' + '<div class="external-contents-ttl">You’re leaving ONO PHARMACEUTICAL website</div>' + '<div class="external-contents-detail">' + '<p class="external-contents-detail-txt">Thank you for visiting the ONO PHARMACEUTICAL CO., LTD. website.</br>This link will take you to an external website.</p>' + '<div class="external-contents-detail-btn"><a href="' + linkTarget + '" target="_blank" id="externalLink">PROCEED</a></div>' + '</div>' + '<div class="external-contents-close">' + '<span class="js-external-close">CLOSE</span>' + '</div>' + '</div>';
				} else {
					externalHtml.innerHTML = '<div class="external-contents">' + '<div class="close-btn js-external-close">close</div>' + '<div class="external-contents-logo"><img src="/themes/onocorporate_theme/img/common/img_external_logo.png" alt="小野薬品工業株式会社"></div>' + '<div class="external-contents-ttl">外部サイトを開きます</div>' + '<div class="external-contents-detail">' + '<p class="external-contents-detail-txt">小野薬品工業株式会社のウェブサイトをご覧いただきありがとうございます。<br>これより先は外部サイトとなります。</p>' + '<div class="external-contents-detail-btn"><a href="' + linkTarget + '" target="_blank" id="externalLink">外部サイトへ移動する</a></div>' + '</div>' + '<div class="external-contents-close">' + '<span class="js-external-close">閉じる</span>' + '</div>' + '</div>';
				}

				document.body.appendChild(externalHtml);

				var externallink = document.getElementById('externalLink');
				externallink.addEventListener("click", function () {
					document.getElementById("external").remove();
				});

				var externalClose = document.querySelectorAll('.js-external-close');
				var externalCloseArray = convertArray(externalClose);
				externalCloseArray.forEach(function (item, i) {
					externalCloseArray[i].addEventListener("click", function () {
						document.getElementById("external").parentNode.removeChild(document.getElementById("external"));
					});
				});
			});
		});
	}
}
// グロナビ 現在地
function current_location() {
	const locationParam = location.pathname.substring(1).split("/");
	const gnav_anchors = document.querySelectorAll(".js-current");
	const domain = document.domain;
	var tempDir;
	if(locationParam[0]=='company'){
		if(locationParam[1]=='rd'){
			tempDir='/company/rd/index.html';
		}
		else if(locationParam[1]=='overseas.html'){
			if(domain == 'www.ono-pharma.com' || domain == 'prd.ono-pharma.com' || domain == 'stg.ono-pharma.com' || domain == 'dev.ono-pharma.com'){
				tempDir='/company/overseas.html';
			}
			else{
				tempDir='/company/index.html';
			}
		}
		else{
			tempDir='/company/index.html';
		}
	}
	else{
		tempDir='/'+locationParam[0]+'/index.html';
	}
	currntChanger();
	function currntChanger(){
		Array.prototype.forEach.call(gnav_anchors,function(gnav_anchor){
			var anchor_url=gnav_anchor.parentNode.getAttribute('href');
			if(anchor_url.indexOf(tempDir)!=-1){
				gnav_anchor.classList.add('current');
			}
			else{
				gnav_anchor.classList.remove('current');
			}
		
		})
	}
}

// CM・動画広告ページ iframe高さ調整
function pr_form() {
	if (document.getElementById("formFrame")) {
		var elm = document.getElementById("formFrame");
		elm.style.height = elm.contentWindow.document.body.scrollHeight + "px";
	}
}
function stock_form_pc() {
	if (document.getElementById("stockForm_pc")) {
		var elm = document.getElementById("stockForm_pc");
		elm.style.height = elm.contentWindow.document.body.scrollHeight + "px";
	}
}
function stock_form_sp() {
	if (document.getElementById("stockForm_sp")) {
		var elm = document.getElementById("stockForm_sp");
		elm.style.height = elm.contentWindow.document.body.scrollHeight + "px";
	}
}

function setFullpage() {
	if (document.getElementById('pagepiling')) {
		const pagepiling = document.getElementById('pagepiling');
		const pageTop = document.getElementById('story_pageTop');
		const html = document.querySelector('html');
		const body = document.querySelector('body');
		const header = document.getElementById('header');
		const breadcrumb = document.querySelector('.mod__breadcrumb');
		html.style.height = 100 + '%';
		body.style.height = 100 + '%';

		jQuery('#pagepiling').pagepiling({
			sectionSelector: '.section',
			easing: 'swing',
			scrollingSpeed: 1000,
			navigation: false,
			afterRender: function () {
				window.setTimeout(function () {
					const firstSection = document.getElementById('story_section01');
					const item = convertArray(firstSection.querySelectorAll('.anime-contents'));
					for (var y = 0; y < item.length; y++) {
						item[y].classList.add('start');
					}
				}, 1500);
			},
			afterLoad: function (anchorLink, index) {
				const section = convertArray(document.querySelectorAll('.section'));
				const loadSection = 'story_section0' + index;
				for (var i = 0; i < section.length; i++) {
					if ( section[i].id !== loadSection ) {
						const elem = section[i].querySelectorAll('.anime-contents');
						const addTarget = convertArray(elem);
						const scrollClass = convertArray(section[i].querySelectorAll('.change-scroll'));
						for (var h = 0; h < addTarget.length; h++) {
							addTarget[h].classList.remove('start');
						}
						for (var c = 0; c < scrollClass.length; c++) {
							scrollClass[c].classList.remove('scroll');
						}
					}
				}
			},
			onLeave: function (index, nextIndex, direction) {
				const section = convertArray(document.querySelectorAll('.section'));
				const nextSection = 'story_section0' + nextIndex;
				if (index == 1 && direction == 'down') {
					header.style.opacity = 0;
					breadcrumb.style.opacity = 0;
				} else if (index == 2 && direction == 'up') {
					header.style.opacity = 1;
					breadcrumb.style.opacity = 1;
				}

				for (var i = 0; i < section.length; i++) {
					if (section[i].id == nextSection) {
						const elem = section[i].querySelectorAll('.anime-contents');
						const addTarget = convertArray(elem);
						for (var k = 0; k < addTarget.length; k++) {
							addTarget[k].classList.add('start');
						}
					}
				}

				if (nextSection !== 'story_section01') {
					var scrollTarget = document.getElementById(nextSection).querySelectorAll('.change-scroll');
					var scrollTargetArr = convertArray(scrollTarget);
					window.setTimeout(function() {
						for (var s = 0; s < scrollTargetArr.length; s++) {
							scrollTargetArr[s].classList.add('scroll');
						}
					},3000);
				}
			},
		});

		var hSize = jQuery(window).height();
		jQuery('.control-height').height(hSize); // アドレスバーを除いたサイズを付与

		pagepiling.addEventListener("touchstart", function () {

		});

		jQuery(window).resize(function () { // ページをリサイズした時の処理
			var hSize = jQuery(window).height();
			jQuery('.section-first').height(hSize); // アドレスバーを除いたサイズを付与
		});



		pageTop.addEventListener("click", function () {
			jQuery.fn.pagepiling.moveTo(1);
			header.style.opacity = 1;
			breadcrumb.style.opacity = 1;
		});
	}
}

function createGoogleMap() {

	// <![CDATA[
	if (!document.querySelectorAll('.jigyousyo__detail--map').length == 0) {
		// 本社 Googlemap
		var opHeadquarters = {
			zoom: 14,
			center: new google.maps.LatLng(34.680692, 135.506755),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapHeadquarters = new google.maps.Map(document.getElementById("map_canvas_Headquarters"), opHeadquarters);

		var imageHeadquarters = new google.maps.MarkerImage(
			"../../themes/onocorporate_theme/img/common/map_icon.png",
			new google.maps.Size(45.0, 53.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(21.0, 50.0)
		);
		var objHeadquarters = {
			position: new google.maps.LatLng(34.680692, 135.506755),
			map: mapHeadquarters,
			icon: imageHeadquarters
		};


		// 本店 GoogleMap
		var opHeadOffice = {
			zoom: 14,
			center: new google.maps.LatLng(34.688772, 135.506278),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapHeadOffice = new google.maps.Map(document.getElementById("map_canvas_HeadOffice"), opHeadOffice);

		var imageHeadOffice = new google.maps.MarkerImage(
			"../../themes/onocorporate_theme/img/common/map_icon.png",
			new google.maps.Size(45, 53),
			new google.maps.Point(0, 0),
			new google.maps.Point(21, 50)
		);
		var objHeadOffice = {
			position: new google.maps.LatLng(34.688772, 135.506278),
			map: mapHeadOffice,
			icon: imageHeadOffice
		};

		// 東京ビル GoogleMap
		var opTokyo = {
			zoom: 16,
			center: new google.maps.LatLng(35.689906, 139.776425),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapTokyo = new google.maps.Map(document.getElementById("map_canvas_Tokyo"), opTokyo);

		var imageTokyo = new google.maps.MarkerImage(
			"../../themes/onocorporate_theme/img/common/map_icon.png",
			new google.maps.Size(45.0, 53.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(21.0, 50.0)
		);
		var objTokyo = {
			position: new google.maps.LatLng(35.689906, 139.776425),
			map: mapTokyo,
			icon: imageTokyo
		};
		var markerHeadquarters = new google.maps.Marker(objHeadquarters);
		var markerHeadOffice = new google.maps.Marker(objHeadOffice);
		var markerTokyo = new google.maps.Marker(objTokyo);
	}
	// ]]>
}

function dammySelectBox(){
	var selectBoxes=document.querySelectorAll('.js-dammySelectBox');
	if(selectBoxes){
		Array.prototype.forEach.call(selectBoxes,function(selectBox){
			initialize(selectBox);
			selectBox.addEventListener('click',function(){
				
				var status=this.getAttribute('data-status');
				if(status=='true'){
					this.setAttribute('data-status','false');
				}
				else{
					this.setAttribute('data-status','true');
				}
				
			})
			var selectItems=selectBox.querySelectorAll('li');
			Array.prototype.forEach.call(selectItems,function(item,index){
				if(index==0){
					//item.setAttribute('area-checked','true');
				}
				var status=item.getAttribute('area-checked');
				if(status=='true'){
					var text=selectBox.querySelector('p');
					text.innerText=item.innerText;
					item.setAttribute('area-checked',true);
				}
				item.addEventListener('click',function(){
					Array.prototype.forEach.call(selectItems,function(item02){
						item02.setAttribute('area-checked','false');
					})
					//setValue(selectBox,this);
					this.setAttribute('area-checked',true);
					dispNews(selectBox, this);
				})
			})
		})
	
		function initialize(selectBox){
			var list=selectBox.querySelector('ul');
			var items=list.querySelectorAll('li');
			var text=selectBox.querySelector('p');
			var input=selectBox.querySelector('input');
			//text.innerText=items[0].innerText;
			//input.value=items[0].innerText;
		}
		function setValue(selectBox,item){
			var list=selectBox.querySelector('ul');
			var text=selectBox.querySelector('p');
			var input=selectBox.querySelector('input');
			var val=item.getAttribute('data-value')
			text.innerText=val;
			input.value=val;
		}
		function dispNews(selectBox,item){
			var input=selectBox.querySelector('input');
			var val=item.getAttribute('data-value')
			if (input.value != val) {
				input.value=val;
				var text=selectBox.querySelector('p');
				text.innerText=item.textContent;
				var curForm=item.closest('form');
				var hids = curForm.querySelectorAll('input[type="hidden"]');
				var para = "";
				Array.prototype.forEach.call(hids,function(t,index){
					var joinchr = "&";
					if (index == 0) {joinchr = "?";}
					para = para + joinchr + t.name + "=" + t.value;
				});
				var url = curForm.action + para;
				window.location = url;
			}
		}

		jQuery(document).on('click',function(e) {
			if(!jQuery(e.target).closest('.js-dammySelectBox').length) {
				jQuery('.js-dammySelectBox').attr('data-status','false');
			} 
		 });
	}
}


// ONOMEDICAL_IN-1292
// ONOHPドメイン変更対応
// ページ内aタグのhref属性がURLパスだけの時、
// 最上位のパスが/jpまたは/en出ない場合、
// 今いるサイトの言語のプレフィックスを付与する
(function($){
	// 日本語サイトプレフィックス
	const PREFIX_JAPANESE = "ja";

	// 英語サイトプレフィックス
	const PREFIX_ENGLISH = "en";

	function setPrefixToUrl(tag) {
		// 現在ページのURLパス
		const current_url = location.pathname;

		// 現在ページのURLをパスごとに分割
		var splited_current_url = current_url.split('/');

		// 表示言語のプレフィックスはパスの最上位にある
		const current_language_pfx = splited_current_url[1];

		// ページ内すべてのaタグを取得
		$(tag).each(function() {
		
			// aタグのhref属性を取得
			var link = $(this).attr('href');

			// href属性のパスを取得
			var splited_link = link.split('/');

			// パスの先頭に言語のプレフィックスが無い場合
			if(
				(link!="" && (splited_link[0]=="" && splited_link[1]!="")) && 
				(splited_link[1]!=PREFIX_JAPANESE && splited_link[1]!=PREFIX_ENGLISH) && 
				(splited_link[1]!="sites" && splited_link[2]!="default" && splited_link[3]!="files") && 
				(splited_link[1]!="themes" && splited_link[2]!="onocorporate_theme")
			) {
			
				// プレフィックスが日本語の場合
				if(current_language_pfx == PREFIX_JAPANESE) {
					// href属性にjpつける
					$(this).attr('href',"/"+PREFIX_JAPANESE+link);
			
				// プレフィックスが英語の場合
				} else {
					// href属性にenつける
					$(this).attr('href',"/"+PREFIX_ENGLISH+link);
			
				}
			}
		});

	}

	// HTML流し込み
	// ニュース_お知らせ/プレスリリース
	if ($('.field--name-body').length > 0) {
		setPrefixToUrl(".field--name-body a");

	// パーツ組み上げ 回遊リンク
	} else if ($('.field--name-field-link-othar-page').length > 0) {
		setPrefixToUrl(".field--name-field-link-othar-page a");
	}

}(jQuery));