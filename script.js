const video = document.getElementById('main-video');
const progressContainer = document.getElementById('progress-container');
const audioStatus = document.getElementById('audio-status');

let currentStory = 0;
let stories = [];

// 1. Cargar Datos
async function initApp() {
    try {
        const response = await fetch('data.json');
        stories = await response.json();
        
        // Crear barras de progreso
        stories.forEach((_, i) => {
            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
            progressContainer.appendChild(bar);
        });

        loadStory(0);
    } catch (e) {
        console.error("Error inicializando ClicTV:", e);
    }
}

// 2. Cargar Historia específica
function loadStory(index) {
    if (index >= stories.length) {
        currentStory = 0; // Reiniciar al terminar todas
        loadStory(0);
        return;
    }

    currentStory = index;
    video.src = stories[index].url;
    
    // Resetear barras anteriores y siguientes
    stories.forEach((_, i) => {
        const f = document.getElementById(`fill-${i}`);
        if (i < index) f.style.width = '100%';
        else if (i > index) f.style.width = '0%';
    });

    video.play().catch(() => console.log("Esperando interacción para audio"));
}

// 3. Manejo de Tap (Lado derecho siguiente, Lado izquierdo previa)
function handleTap(e) {
    const screenWidth = window.innerWidth;
    if (e.clientX > screenWidth / 2) {
        loadStory(currentStory + 1);
    } else {
        if (currentStory > 0) loadStory(currentStory - 1);
    }
    
    // Activar audio en el primer toque
    if (video.muted) {
        video.muted = false;
        showAudioFeedback("🔊");
    }
}

function showAudioFeedback(icon) {
    audioStatus.innerText = icon;
    audioStatus.style.opacity = 1;
    setTimeout(() => audioStatus.style.opacity = 0, 800);
}

// 4. Eventos de Video
video.ontimeupdate = () => {
    const fill = document.getElementById(`fill-${currentStory}`);
    if (fill && video.duration) {
        fill.style.width = (video.currentTime / video.duration) * 100 + "%";
    }
};

video.onended = () => {
    loadStory(currentStory + 1);
};

// Iniciar aplicación
initApp();