const container = document.getElementById('video-container');
const volIndicator = document.getElementById('volume-indicator');

async function loadVideos() {
    try {
        const res = await fetch('data.json');
        const data = await res.json();
        data.forEach((video, i) => {
            const section = document.createElement('section');
            section.className = 'video-card';
            section.innerHTML = `
                <video loop playsinline muted preload="auto" onclick="toggleAudio(this)">
                    <source src="${video.url}" type="video/mp4">
                </video>
                <div class="video-info">
                    <h3 style="color:var(--primary-orange)">@ClicTV_Oficial</h3>
                    <p>${video.desc}</p>
                </div>`;
            container.appendChild(section);
        });
        setupObserver();
    } catch (e) { console.error("Error:", e); }
}

function toggleAudio(v) {
    v.muted = !v.muted;
    // Mostrar icono dinámico
    volIndicator.innerHTML = v.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    volIndicator.style.opacity = "1";
    setTimeout(() => { volIndicator.style.opacity = "0"; }, 800);
}

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const v = entry.target.querySelector('video');
            if (entry.isIntersecting) v.play();
            else { v.pause(); v.currentTime = 0; }
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

window.onload = loadVideos;