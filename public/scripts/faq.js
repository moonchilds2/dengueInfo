document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Alterna a classe "active" no item clicado
            item.classList.toggle('active');
            
            // Fecha as outras respostas ao abrir uma nova
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});

