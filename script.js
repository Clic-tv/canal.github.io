const player = document.getElementById('player');
const audioToast = document.getElementById('audio-toast');
let stories = [];
let currentIndex = 0;

async function startClicTV() {
    const res = await fetch('data.json');
    stories = await res.json();
    const barArea = document.getElementById('progress-area');
    stories.forEach((_, i) => {
        barArea.innerHTML += `<div class="bar"><div class="fill" id="f-${i}"></div></div>`;
    });
    loadStory(0);
    renderSavedComments();
}

function loadStory(index) {
    if (index >= stories.length) index = 0;
    currentIndex = index;
    player.src = stories[index].url;
    stories.forEach((_, i) => {
        document.getElementById(`f-${i}`).style.width = i < index ? '100%' : '0%';
    });
    player.play();
    updateLikeVisuals();
    renderSavedComments();
}

function handleInteraction(e) {
    if (player.muted) { player.muted = false; audioToast.style.opacity = 0; }
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w * 0.7) loadStory(currentIndex + 1);
    else if (x < w * 0.3 && currentIndex > 0) loadStory(currentIndex - 1);
}

player.ontimeupdate = () => {
    const fill = document.getElementById(`f-${currentIndex}`);
    if (fill && player.duration) fill.style.width = (player.currentTime / player.duration) * 100 + "%";
};

player.onended = () => loadStory(currentIndex + 1);

function toggleLike() {
    let likes = JSON.parse(localStorage.getItem('clictv_likes')) || {};
    const vid = stories[currentIndex].url;
    likes[vid] = !likes[vid];
    localStorage.setItem('clictv_likes', JSON.stringify(likes));
    updateLikeVisuals();
}

function updateLikeVisuals() {
    const likes = JSON.parse(localStorage.getItem('clictv_likes')) || {};
    const isLiked = likes[stories[currentIndex].url];
    const icon = document.getElementById('like-icon');
    icon.className = isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    icon.style.color = isLiked ? '#ff3040' : '#fff';
    document.getElementById('like-count').innerText = isLiked ? '1' : '0';
}

function sendComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;
    let chats = JSON.parse(localStorage.getItem('clictv_chats')) || [];
    chats.push({ vid: stories[currentIndex].url, text: input.value, date: new Date().toLocaleTimeString() });
    localStorage.setItem('clictv_chats', JSON.stringify(chats));
    input.value = '';
    renderSavedComments();
}

function renderSavedComments() {
    const chats = JSON.parse(localStorage.getItem('clictv_chats')) || [];
    const filtered = chats.filter(c => c.vid === stories[currentIndex].url);
    document.getElementById('comment-list').innerHTML = filtered.map(c => `<div style="margin-bottom:10px;"><b>Tú:</b> ${c.text}</div>`).join('');
}

function openComments() { document.getElementById('comment-panel').classList.add('open'); }
function closeComments() { document.getElementById('comment-panel').classList.remove('open'); }

startClicTV();