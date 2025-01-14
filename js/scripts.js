/** @type { HTMLCanvasElement} */
const canvas = document.querySelector('.mainCanvas');
const crc = canvas.getContext('2d');
let particlesArray = [];
let hsl = 0;
let progress = document.querySelector(".meter");
progress.max = 1000;



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
}

class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 25 + 2
        this.xSpeed = Math.random() * 3 - 1.5;
        this.ySpeed = Math.random() * 3 - 1.5;
        this.color = `hsl(${hsl}, 100%, 50%)`
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.size > 0.1) this.size -= 0.1
    }
    draw() {
        crc.fillStyle = this.color;
        // crc.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        // crc.strokeStyle = "white";
        crc.lineWidth = 10;
        crc.beginPath();
        crc.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // crc.stroke();
        crc.fill();
    }
}

canvas.addEventListener("click", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle);
    }
})

let handleParticle = () => {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j = i ; j < particlesArray.length ; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100)
            {
                crc.beginPath();
                crc.lineWidth = particlesArray[i].size/5;
                crc.strokeStyle = particlesArray[i].color;
                crc.moveTo(particlesArray[i].x, particlesArray[i].y);
                crc.lineTo(particlesArray[j].x, particlesArray[j].y);
                crc.stroke();
            }
        }

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            i--;
        }

    }
}

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;

    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
    progress.value = particlesArray.length;
})
let messure = document.querySelector(".messure");

let animate = () => {
     crc.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hsl += 1;
    progress.value = particlesArray.length
    messure.innerHTML = particlesArray.length
    // console.log(particlesArray.length)
    requestAnimationFrame(animate);
}

animate();