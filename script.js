//*==================== Hero Slider ===================*\\
const heroTrack = document.getElementById('heroTrack');
const heroSlides = heroTrack.querySelectorAll('img');
const heroDotsWrap = document.getElementById('heroDots');
let heroIndex = 0;
let heroTimer;

heroSlides.forEach((_,i)=>{
    const dot = document.createElement('button');
    dot.className = 'dot-btn' + (i === 0 ? ' active ': '');
    dot.addEventListener('click', () => goToHero(i));
    heroDotsWrap.appendChild(dot);
});

function updateHero(){
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
    heroDotsWrap.querySelectorAll('.dot-btn').forEach((d, i)=>{
        d.classList.toggle('active', i === heroIndex);
    });
}

function changeHero(dir){
    heroIndex = (heroIndex + dir + heroSlides.length) % heroSlides.length;
    updateHero();
    resetHeroAutoplay();
}

function goToHero(i){
    heroIndex = i;
    updateHero();
    resetHeroAutoplay();
}

function resetHeroAutoplay(){
    clearInterval(heroTimer);
    heroTimer = setInterval(() => changeHero(1), 4500);
}

updateHero();
resetHeroAutoplay();

const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', ()=> clearInterval(heroTimer));
heroSection.addEventListener('mouseleave', resetHeroAutoplay);

// * ==================== Review Slider Susu ==================== * \\
const reviews = [
    { initial: 'S', color: 'pink', name:'Sheilaita Hartono', stars:5, comment:'Karena dokter gigi spesialis anak, tentunya beliau telaten sekali dengan anak kecil dan tau caranya mengalihkan perhatian anak agar tidak takut. Tempatnya juga bersih dan nyaman. Harga terjangkau dibanding klinik-klinik gigi lain 👌 Saat pulang juga anak diberi mainan. Sukses selalu. …'},
    { initial: 'R', color: 'purple', name:'Riana Margono',   stars:5, comment:'Senang akhirnya dihandle oleh Dokter Gigi Vincentius dan Dokter Yemy. Anak saya sangat nyaman ditanggani selama perawatan disana. Apalagi dokternya sabar dan cekatan'},
    { initial: 'S', color: 'pink', name:'Stephen Quadinata', stars:5, comment:''},
    { initial: 'J', color: 'muted', name:'Johannes Hartono', stars:5, comment:''},
    { initial: 'B', color: 'muted', name:'Bubbles',          stars:5, comment:''}
];

const reviewCardsWrap = document.getElementById('reviewCards');
reviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="avatar ${r.color}">${r.initial}</div>
        <h4>${r.name}</h4>
        <div class = "stars">${'⭐'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
    `;
    reviewCardsWrap.appendChild(card);
});



const reviewCards = reviewCardsWrap.querySelectorAll('.review-card');
let reviewIndex = 0;
let reviewTimer;

function updateReview(){
    const viewport = document.querySelector('.review-viewport');
    const viewportWidth = viewport.offsetWitdth;
    const card = reviewCards[reviewIndex];
    const cardCenter = card.offsetLeft + card.offsetWitdth / 2;
    const offset = viewportWidth / 2 - cardCenter;
    reviewCardsWrap.style.transform = `translateX(${offset}px)`;
    reviewCards.forEach((c ,i)=> c.classList.toggle('active', i === reviewIndex));
}

function changeReview(dir){
    reviewIndex = (reviewIndex + dir + reviewCards.length) % reviewCards.length;
    updateReview();
    updateReviewAutoplay();
}

function resetReviewAutoplay(){
    clearInterval(reviewTimer);
    reviewTimer = setInterval(()=> changeReview(1),50);
}

window.addEventListener('load',updateReview);
window.addEventListener('resize',updateReview);
resetReviewAutoplay();

const reviewSection = document.querySelector('.review-section');
reviewSection.addEventListener('mouseenter', ()=> clearInterval(reviewTimer));
reviewSection.addEventListener('mouseleave', ()=> resetReviewAutoplay);

