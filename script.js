const slider = document.getElementById('story-slider');
const audioHint = document.getElementById('audio-status');

async function initApp() {
    const res = await fetch('data.json');
    const stories = await res.json();
    
    stories.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.innerHTML = `
            <div class="interface">
                <div class="header">
                    <div class="progress-bar-group">
                        <div class="progress-bg"><div class="progress-fill" id="fill-${index}"></div></div>
                    </div>
                    <div class="user-row">
                        <img src="Logo.png" class="brand-logo">
                    </div>
                </div>
            </div>
            <video id="vid-${index}" playsinline muted autoplay>
                <source src="${item.url}" type="video/mp4">
            </video>
        `;
        
        const video = card.querySelector('video');
        
        // Al tocar el video: activar/desactivar audio
        video.onclick = () => {
            video.muted = !video.muted;
            audioHint.innerText = video.muted ? "🔇" : "🔊";
            audioHint.style.opacity = 1;
            setTimeout(() => audioHint.style.opacity = 0, 600);
        };

        // Progreso y Salto automático
        video.ontimeupdate = () => {
            const fill = document.getElementById(`fill-${index}`);
            if(fill) fill.style.width = (video.currentTime / video.duration) * 100 + "%";
        };

        video.onended = () => {
            slider.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        };

        slider.appendChild(card);
    });
}

initApp();