const container = document.getElementById('video-container');

// Función para cargar datos desde el archivo externo JSON
async function loadVideoData() {
    try {
        const response = await fetch('data.json');
        const videoData = await response.json();
        renderVideos(videoData);
    } catch (error) {
        console.error("Error cargando los videos:", error);
    }
}

function renderVideos(videoData) {
    videoData.forEach(video => {
        const section = document.createElement('section');
        section.className = 'video-card';
        section.innerHTML = `
            <video loop playsinline preload="auto" onclick="this.paused ? this.play() : this.pause()">
                <source src="${video.url}" type="video/mp4">
            </video>
            <div class="video-info">
                <h3>@ClicTV_Oficial</h3>
                <p>${video.desc}</p>
            </div>
        `;
        container.appendChild(section);
    });
    setupObserver();
}

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const v = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                v.play().catch(() => {});
            } else {
                v.pause();
                v.currentTime = 0;
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

window.onload = loadVideoData;