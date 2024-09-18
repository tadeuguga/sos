const circulosMenores = [];
const raio = 25; // Distância percentual dos círculos menores ao círculo grande
let canvas = document.getElementById('canvasLinhas');
let ctx = canvas.getContext('2d');
let circuloGrande = document.getElementById('circulo-grande');
let container = document.querySelector('.container');
let circulosVisiveis = false; // Variável para controlar a visibilidade dos círculos menores

// Ajustar tamanho do canvas dinamicamente
function ajustarCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Chamar ajuste de canvas ao carregar a página e ao redimensionar a janela
ajustarCanvas();
window.addEventListener('resize', () => {
    ajustarCanvas();
    if (circulosVisiveis) {
        desenharCirculosMenores();
    }
});

function mostrarCirculosMenores() {
    if (circulosVisiveis) {
        esconderCirculosMenores(); // Se os círculos já estão visíveis, ocultar
        circulosVisiveis = false;
    } else {
        desenharCirculosMenores(); // Se os círculos estão ocultos, desenhar e mostrar
        circulosVisiveis = true;
    }
}

function desenharCirculosMenores() {
    // Limpa os círculos anteriores para evitar duplicações ao clicar novamente
    while (container.querySelectorAll('.circulo-menor').length > 0) {
        container.querySelectorAll('.circulo-menor').forEach(circulo => circulo.remove());
    }

    circulosMenores.length = 0; // Limpa o array de círculos menores

    const anguloPasso = (2 * Math.PI) / 8;
    const raioDinamico = Math.min(container.clientWidth, container.clientHeight) * (raio / 100); // Distância adaptada ao tamanho da tela

    // Ícones e textos a serem usados nos círculos menores
    const icones = ['fas fa-home', 'fas fa-user', 'fas fa-envelope', 'fas fa-cog', 'fas fa-phone', 'fas fa-camera', 'fas fa-heart', 'fas fa-globe'];
    const textos = ['Início', 'Usuário', 'Email', 'Configurações', 'Telefone', 'Câmera', 'Favorito', 'Mundo'];

    for (let i = 0; i < 8; i++) {
        const angulo = i * anguloPasso;
        const circuloMenor = document.createElement('div');
        circuloMenor.classList.add('circulo-menor');
        container.appendChild(circuloMenor);

        // Pega as dimensões do círculo grande dinamicamente
        const larguraCirculoGrande = circuloGrande.offsetWidth;
        const alturaCirculoGrande = circuloGrande.offsetHeight;

        // Calcula a posição dinâmica dos círculos menores em torno do círculo grande
        const x = circuloGrande.offsetLeft + larguraCirculoGrande / 2 + raioDinamico * Math.cos(angulo) - circuloMenor.offsetWidth / 2;
        const y = circuloGrande.offsetTop + alturaCirculoGrande / 2 + raioDinamico * Math.sin(angulo) - circuloMenor.offsetHeight / 2;

        circuloMenor.style.left = `${x}px`;
        circuloMenor.style.top = `${y}px`;
        circuloMenor.style.display = 'block';

        // Adiciona o ícone dentro do círculo menor
        const icone = document.createElement('i');
        icone.className = icones[i]; // Define a classe do ícone
        circuloMenor.appendChild(icone);

        // Adiciona o texto acima do círculo menor
        const texto = document.createElement('span');
        texto.className = 'texto-circulo';
        texto.innerText = textos[i];
        circuloMenor.appendChild(texto);

        // Adicionando funcionalidade de clique para redirecionar para outra página
        circuloMenor.addEventListener('click', () => {
            window.location.href = `pagina${i + 1}.html`;
        });

        circulosMenores.push({ x: x + circuloMenor.offsetWidth / 2, y: y + circuloMenor.offsetHeight / 2 });
    }

    desenharLinhas();
}

function esconderCirculosMenores() {
    // Remove os círculos menores da tela
    while (container.querySelectorAll('.circulo-menor').length > 0) {
        container.querySelectorAll('.circulo-menor').forEach(circulo => circulo.remove());
    }

    // Limpa as linhas desenhadas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharLinhas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const xCirculoGrande = circuloGrande.offsetLeft + circuloGrande.offsetWidth / 2;
    const yCirculoGrande = circuloGrande.offsetTop + circuloGrande.offsetHeight / 2;

    circulosMenores.forEach(circulo => {
        ctx.beginPath();
        ctx.moveTo(xCirculoGrande, yCirculoGrande);
        ctx.lineTo(circulo.x, circulo.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}
