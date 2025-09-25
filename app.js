const toggles = document.querySelectorAll('.js-toggle');

function togglePanel(h2, open) {
    const panel = h2.nextElementSibling;
    if (!panel || !panel.classList.contains('acc-panel')) return;

    // open が渡されていればその値を使う、なければ現在の状態を反転
    const currentlyOpen = h2.getAttribute('aria-expanded') === 'true';
    const willOpen = (open !== undefined) ? open : !currentlyOpen;

    h2.setAttribute('aria-expanded', String(willOpen));
    panel.classList.toggle('is-hidden', !willOpen);
};


toggles.forEach(h2 => {
    h2.addEventListener('click', () => togglePanel(h2));
    h2.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            togglePanel(h2);}
    });
});

document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const h2 = document.getElementById(id);
        if(!h2) return;

        togglePanel(h2,true);

        const offset = 80;
        const y = window.scrollY + h2.getBoundingClientRect().top - offset;
        window.scrollTo({top: Math.max(0,y), behavior: 'smooth'});
    });
});

window.addEventListener('load',() => {
    const id = location.hash?.slice(1);
    const h2 = id ? document.getElementById(id) : null;
    if(h2) togglePanel(h2,true);
});

const backBtn = document.getElementById('back-to-top')
const THRESHOLD = 300; //300px下げたら表示

function onScroll () {
    const y = window.scrollY || document.documentElement.scrollTop;
    backBtn.classList.toggle('is-visible',y > THRESHOLD);
}
window.addEventListener('scroll',onScroll);
onScroll();//初回判定

//クリックでトップへ戻る(スムーズスクロールをJSでも保管)
backBtn.addEventListener('click',(e) => {
    //a要素のデフォルトのジャンプを抑制（CSSのsmoothが効くが念のため）
    e.preventDefault();
    window.scrollTo({top:0 , behavior: 'smooth'});
});