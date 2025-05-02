    const toggle = document.getElementById('menu-toggle'); // Botão do menu hambúrguer
    const navMobile = document.getElementById('box_nav_mobile'); // Menu mobile
    const overlay = document.getElementById('overlay'); // Fundo escuro
    const menuIcon = toggle.querySelector('i'); // Ícone dentro do botão

    toggle.addEventListener('click', () => {
        const isOpen = navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isOpen); // Ativa/desativa o bloqueio de rolagem

        // Alterna o ícone entre fa-bars e fa-xmark
        if (isOpen) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    document.addEventListener('click', function (e) {
        // Se clicar fora do menu e do botão, fecha o menu
        if (!navMobile.contains(e.target) && !toggle.contains(e.target)) {
            navMobile.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll'); // Libera o scroll
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });