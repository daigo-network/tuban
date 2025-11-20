
document.addEventListener('DOMContentLoaded', function() {

    initMap();


    loadComments();


    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('comment-name');
            const textInput = document.getElementById('comment-text');

            const name = nameInput.value.trim();
            const text = textInput.value.trim();

            if (name && text) {
                addComment(name, text);
                nameInput.value = '';
                textInput.value = '';
            } else {
                alert('Harap isi nama dan komentar!');
            }
        });
    }


    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }


    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
});


function addComment(name, text) {
    const comment = {
        id: Date.now(),
        name: name,
        text: text,
        date: new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };


    let comments = JSON.parse(localStorage.getItem('tuban-comments')) || [];
    comments.unshift(comment); 
    localStorage.setItem('tuban-comments', JSON.stringify(comments));


    displayComments();


    alert('Komentar berhasil ditambahkan!');
}


function loadComments() {
    const comments = JSON.parse(localStorage.getItem('tuban-comments')) || [];
    displayComments(comments);
}


function displayComments(comments = null) {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;

    const storedComments = comments || JSON.parse(localStorage.getItem('tuban-comments')) || [];

    if (storedComments.length === 0) {
        commentsList.innerHTML = '<div class="comment-item"><div class="comment-content">Belum ada komentar. Jadilah yang pertama berkomentar!</div></div>';
        return;
    }

    commentsList.innerHTML = storedComments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${comment.text}</div>
        </div>
    `).join('');
}


function initMap() {

    const tubanCoords = [-6.897, 112.064];


    const map = L.map('interactive-map').setView(tubanCoords, 12);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    L.marker(tubanCoords).addTo(map)
        .bindPopup('<b>Kabupaten Tuban</b><br>Jawa Timur, Indonesia')
        .openPopup();


    const pointsOfInterest = [
        { coords: [-6.897, 112.064], name: "Kota Tuban" },
        { coords: [-6.889, 112.055], name: "Pantai Kelapa" },
        { coords: [-6.893, 112.048], name: "Makam Sunan Bonang" },
        { coords: [-6.908, 112.042], name: "Goa Akbar" }
    ];

    pointsOfInterest.forEach(point => {
        L.marker(point.coords).addTo(map)
            .bindPopup(`<b>${point.name}</b>`);
    });
}