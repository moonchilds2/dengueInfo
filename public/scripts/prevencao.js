document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
});


document.getElementById("card1").addEventListener("click", function() {
    this.classList.toggle("flip");
});

document.getElementById("card2").addEventListener("click", function() {
    this.classList.toggle("flip");
});

document.getElementById("card3").addEventListener("click", function() {
    this.classList.toggle("flip");
});
