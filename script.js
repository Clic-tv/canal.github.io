// Simulación de base de datos (puedes mover esto a un data.json externo)
const videoData = [
    {
        url: "https://v16-webapp.tiktok.com/...", // Sustituir por links reales
        desc: "¡Bienvenidos a ClicTV! 📺 #Lanzamiento"
    }
];

const container = document.getElementById('video-container');

function loadVideos() {
    videoData.forEach(video => {
        const section = document.createElement('section');
        section.className = 'video-card';
        section.innerHTML = `
            <video loop onclick="this.paused ? this.play() : this.pause()">
                <source src="${video.url}" type="video/mp4">
            </video>
            <div class="video-info">
                <h3>@ClicTV</h3>
                <p>${video.desc}</p>
            </div>
            <div class="side-actions">
                <i class="fas fa-heart"></i>
                <i class="fas fa-comment-dots"></i>
                <i class="fas fa-share"></i>
            </div>
        `;
        container.appendChild(section);
    });
}

loadVideos();

// Auto-play al entrar en vista
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const v = entry.target.querySelector('video');
        if (entry.isIntersecting) v.play();
        else v.pause();
    });
}, { threshold: 0.8 });

document.querySelectorAll('.video-card').forEach(card => observer.observe(card));