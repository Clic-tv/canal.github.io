// CONFIGURACIÓN: Solo edita esta lista
const videos = [
    { url: "videos/video1.mp4", desc: "Bienvenidos a ClicTV" },
    { url: "videos/video2.mp4", desc: "Sigue nuestra programación" }
];

const container = document.getElementById('video-container');

function load() {
    videos.forEach((vid) => {
        const section = document.createElement('section');
        section.className = 'video-card';
        section.innerHTML = `
            <video loop playsinline muted autoplay onclick="this.muted = !this.muted">
                <source src="${vid.url}" type="video/mp4">
            </video>
            <div class="info">
                <strong>@ClicTV</strong>
                <p>${vid.desc}</p>
            </div>
        `;
        container.appendChild(section);
    });
}

// Observador para que el video en pantalla se reproduzca y los demás se pausen
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const v = entry.target.querySelector('video');
        if (entry.isIntersecting) v.play();
        else { v.pause(); v.currentTime = 0; }
    });
}, { threshold: 0.8 });

window.onload = () => {
    load();
    document.querySelectorAll('.video-card').forEach(c => observer.observe(c));
};