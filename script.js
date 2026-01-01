const player = document.getElementById('player');
const app = document.getElementById('app');
const audioToast = document.getElementById('audio-toast');
let stories = [];
let currentIndex = 0;

async function startClicTV() {
    try {
        const response = await fetch('data.json');
        stories = await response.json();
        
        // Crear barras
        const barArea = document.getElementById('progress-area');
        stories.forEach((_, i) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.innerHTML = `<div class="fill" id="f-${i}"></div>`;
            barArea.appendChild(bar);
        });

        loadStory(0);
    } catch (e) { console.error("Error cargando archivos"); }
}

function loadStory(index) {
    if (index >= stories.length) index = 0; // Lista ilimitada (bucle)
    currentIndex = index;
    
    player.src = stories[index].url;
    
    // Actualizar barras
    stories.forEach((_, i) => {
        const fill = document.getElementById(`f-${i}`);
        if (i < index) fill.style.width = '100%';
        else if (i > index) fill.style.width = '0%';
    });

    player.play();
}

// SOLUCIÓN AUDIO: Al primer toque activamos sonido para siempre
function handleInteraction(e) {
    const x = e.clientX;
    const width = window.innerWidth;

    // Activar audio si está muteado
    if (player.muted) {
        player.muted = false;
        audioToast.style.opacity = 0;
    }

    // Navegación tipo Instagram (Izquierda/Derecha)
    if (x > width / 2) loadStory(currentIndex + 1);
    else if (currentIndex > 0) loadStory(currentIndex - 1);
}

player.ontimeupdate = () => {
    const fill = document.getElementById(`f-${currentIndex}`);
    if (fill) fill.style.width = (player.currentTime / player.duration) * 100 + "%";
};

player.onended = () => loadStory(currentIndex + 1);

// Funciones de Like y Comentarios
function toggleLike() {
    const icon = document.getElementById('like-icon');
    const count = document.getElementById('like-count');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
    icon.style.color = icon.classList.contains('fa-solid') ? '#ff3040' : '#fff';
    count.innerText = icon.classList.contains('fa-solid') ? '1' : '0';
}

function openComments() { document.getElementById('comment-panel').classList.add('open'); }
function closeComments() { document.getElementById('comment-panel').classList.remove('open'); }

function sendComment() {
    const input = document.getElementById('comment-input');
    if (!input.value) return;
    const list = document.getElementById('comment-list');
    if (list.querySelector('.empty-msg')) list.innerHTML = '';
    const div = document.createElement('div');
    div.style.marginBottom = "10px";
    div.innerHTML = `<strong>Invitado:</strong> ${input.value}`;
    list.prepend(div);
    input.value = '';
}

startClicTV();