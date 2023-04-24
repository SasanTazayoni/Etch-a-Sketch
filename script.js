const boardSizeAdjuster = document.querySelector('[data-board-size');
const boardSizeRange = document.querySelector('input[type="range"]');
const boardContainer = document.querySelector('[data-board]');
const colorPicker = document.querySelector('[data-color]');
const filler = document.querySelector('[data-filler]');
const randomColor = document.querySelector('[data-random-color]');
const eraser = document.querySelector('[data-eraser]');
const reset = document.querySelector('[data-reset]');
const gridlines = document.querySelector('[data-gridline]');
let isDragging = false;
let currentColor = colorPicker.value;
let colorRandomiser = false;

document.addEventListener('DOMContentLoaded', () => createBoard(16));

boardSizeAdjuster.addEventListener('input', () => {
    const boardSize = parseInt(boardSizeAdjuster.value);
    createBoard(boardSize);
});

function createBoard(size) {
    boardContainer.innerHTML = '';

    boardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.setAttribute('data-square', '');
            square.classList.add('square');
            square.style.backgroundColor = 'white';
            boardContainer.appendChild(square);
        }
    }
}

boardSizeRange.addEventListener('input', () => {
    const tooltip = `${boardSizeRange.value} x ${boardSizeRange.value}`;
    boardSizeRange.setAttribute('title', tooltip);
});

document.addEventListener('mousedown', () => isDragging = true);

document.addEventListener('mousemove', e => {
    if (isDragging) {
        const div = e.target;
        if (div && div.classList.contains('square')) {
            if (colorRandomiser) {
                div.style.backgroundColor = getRandomColor();
            } else {
                div.style.backgroundColor = currentColor;
            }
            e.preventDefault();
        }
    }
});

document.addEventListener('mouseup', () => isDragging = false);

document.querySelectorAll('button:not([data-random-color])').forEach(button => {
    button.addEventListener('click', () => {
        colorRandomiser = false;
    });
});

boardContainer.addEventListener('mouseleave', () => isDragging = false);

colorPicker.value = currentColor;

colorPicker.addEventListener('input', e => {
    currentColor = e.target.value;
    colorRandomiser = false;
});

filler.addEventListener('click', () => {
    currentColor = colorPicker.value;
    colorRandomiser = false;
});

randomColor.addEventListener('click', () => {
    colorRandomiser = true;
});

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}`;
}

eraser.addEventListener('click', () => currentColor = `rgb(255, 255, 255)`);

reset.addEventListener('click', () => {
    document.querySelectorAll('[data-square]').forEach(square => 
        square.style.backgroundColor = `rgb(255, 255, 255)`);
});

gridlines.addEventListener('click', () => {
    document.querySelectorAll('[data-square]').forEach(div => div.classList.toggle('borderless'));
});