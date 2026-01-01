const player = document.getElementById('player');
const audioToast = document.getElementById('audio-toast');
let stories = [];
let currentIndex = 0;

async function startClicTV() {
    try {
        const response = await fetch('data.json');
        stories = await response.json();
        
        // Inicializar barras de progreso según cantidad de videos
        const barArea = document.getElementById('progress-area');
        stories.forEach((_, i) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.innerHTML = `<div class="fill" id="f-${i}"></div>`;
            barArea.appendChild(bar);
        });

        loadStory(0);
    } catch (e) { console.error("Error en base de datos"); }
}

function loadStory(index) {
    if (index >= stories.length) index = 0; // Bucle infinito de programación
    currentIndex = index;
    
    player.src = stories[index].url;
    
    // Sincronizar estado visual de las barras
    stories.forEach((_, i) => {
        const fill = document.getElementById(`f-${i}`);
        if (i < index) fill.style.width = '100%';
        else if (i > index) fill.style.width = '0%';
    });

    player.play();
}

function handleInteraction(e) {
    // Activar audio en el primer clic (Requerido por Navegadores)
    if (player.muted) {
        player.muted = false;
        audioToast.style.opacity = 0;
    }

    const x = e.clientX;
    const width = window.innerWidth;
    // Navegación Manual: Derecha (Siguiente) / Izquierda (Atrás)
    if (x > width * 0.7) loadStory(currentIndex + 1);
    else if (x < width * 0.3 && currentIndex > 0) loadStory(currentIndex - 1);
}

// ACTUALIZACIÓN DE TIEMPO REAL: No resume el video, usa la duración exacta del archivo
player.ontimeupdate = () => {
    const fill = document.getElementById(`f-${currentIndex}`);
    if (fill && player.duration) {
        const progress = (player.currentTime / player.duration) * 100;
        fill.style.width = progress + "%";
    }
};

// SALTO AUTOMÁTICO: Solo cuando el video llega al 100% de su duración
player.onended = () => {
    loadStory(currentIndex + 1);
};

// Funciones Sociales
function toggleLike() {
    const icon = document.getElementById('like-icon');
    const count = document.getElementById('like-count');
    const isLiked = icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
    icon.style.color = isLiked ? '#ff3040' : '#fff';
    count.innerText = isLiked ? '1' : '0';
}

function openComments() { document.getElementById('comment-panel').classList.add('open'); }
function closeComments() { document.getElementById('comment-panel').classList.remove('open'); }

function sendComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;
    const list = document.getElementById('comment-list');
    const div = document.createElement('div');
    div.style.padding = "8px 0";
    div.innerHTML = `<span style="color:var(--accent); font-weight:bold;">Usuario:</span> ${input.value}`;
    list.prepend(div);
    input.value = '';
}

startClicTV();