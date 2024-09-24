// Hàm mở/đóng sub-menu với hiệu ứng
function toggleSubMenu(menu, action) {
    if (action === 'open') {
        menu.style.maxHeight = '500px';
        menu.style.opacity = '1';
        menu.classList.add('active');
        const items = menu.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            item.style.opacity = '1';
        });
    } else {
        menu.style.maxHeight = '0';
        menu.style.opacity = '0';
        menu.classList.remove('active');
        const items = menu.querySelectorAll('li');
        items.forEach(item => {
            item.style.transitionDelay = '0s';
            item.style.opacity = '0';
        });
    }
}

// Xử lý click cho menu item
const menuItems = document.querySelectorAll('.side-menu > li');
menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        if (e.target.classList.contains('arrow-2')) return;

        e.preventDefault();
        const isActive = this.classList.contains('active');

        // Đóng các menu khác
        menuItems.forEach(i => {
            i.classList.remove('active');
            const subMenu = i.querySelector('.side-sub-menu');
            const subMenu2 = i.querySelector('.side-sub-menu-2');
            const arrowIcon = i.querySelector('.arrow');
            if (subMenu) toggleSubMenu(subMenu, 'close');
            if (subMenu2) toggleSubMenu(subMenu2, 'close');
            if (arrowIcon) arrowIcon.classList.remove('active');
        });

        // Mở menu hiện tại nếu chưa mở
        if (!isActive) {
            this.classList.add('active');
            const subMenu = this.querySelector('.side-sub-menu');
            const arrowIcon = this.querySelector('.arrow');
            if (subMenu) toggleSubMenu(subMenu, 'open');
            if (arrowIcon) arrowIcon.classList.add('active');
        }
    });
});

// Xử lý click cho arrow-2 (submenu cấp 2)
const arrow2Items = document.querySelectorAll('.arrow-2');
arrow2Items.forEach(arrow => {
    arrow.addEventListener('click', function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click trên cha
        e.preventDefault(); // Ngăn chặn hành vi mặc định

        const subMenu2 = this.closest('li').querySelector('.side-sub-menu-2');
        const isActive = subMenu2.classList.contains('active');

        // Đóng menu con cấp 1 nếu menu con cấp 2 đang mở
        const subMenu = this.closest('li').querySelector('.side-sub-menu');
        if (subMenu && subMenu.classList.contains('active')) {
            toggleSubMenu(subMenu, 'close');
        }

        // Mở hoặc đóng sub-menu2
        if (isActive) {
            toggleSubMenu(subMenu2, 'close');
            this.querySelector('.arrow-3').classList.remove('active');
        } else {
            toggleSubMenu(subMenu2, 'open');
            this.querySelector('.arrow-3').classList.add('active');
        }
    });
});

// Thu nhỏ sidebar
document.querySelector('.side-menu-btn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarLogo = sidebar.querySelector('.sidebar-logo');
    const sideTexts = sidebar.querySelectorAll('.side-text');
    const arrows = sidebar.querySelectorAll('.arrow');
    
    // Thêm/loại bỏ class 'collapsed'
    sidebar.classList.toggle('collapsed');

    if (!sidebar.classList.contains('collapsed')) {
        sidebarLogo.style.display = 'block';
        sidebarLogo.style.opacity = '0';

        setTimeout(() => {
            sidebarLogo.style.opacity = '1';
            sidebarLogo.style.transition = 'opacity 0.5s ease';
        }, 200);

        setTimeout(() => {
            sideTexts.forEach((text, index) => {
                text.style.opacity = '1';
                text.style.transition = `opacity 0.6s ease ${index * 0.15}s`;
            });
            arrows.forEach(arrow => {
                arrow.style.opacity = '1';
                arrow.style.transition = 'opacity 0.6s ease';
            });
        }, 400);
    } else {
        sidebarLogo.style.opacity = '0';
        sideTexts.forEach(text => {
            text.style.opacity = '0';
            text.style.transition = 'opacity 0.6s ease';
        });
        arrows.forEach(arrow => {
            arrow.style.opacity = '0';
            arrow.style.transition = 'opacity 0s';
            sidebarLogo.style.display = 'none';
        });

        sideTexts.forEach(text => {
            text.style.opacity = '1';
        });
    }
});

// Đóng sub-menu khi nhấn ra ngoài sidebar
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const sideSubMenus = sidebar.querySelectorAll('.side-sub-menu, .side-sub-menu-2');

    // Kiểm tra xem nhấn ra ngoài sidebar
    if (!sidebar.contains(event.target)) {
        let anySubMenu2Open = false;
        sideSubMenus.forEach(menu => {
            if (menu.classList.contains('side-sub-menu-2') && menu.classList.contains('active')) {
                anySubMenu2Open = true; 
            }
        });

        if (!anySubMenu2Open) {
            sideSubMenus.forEach(menu => toggleSubMenu(menu, 'close'));
        }
    }
});


// Banner Home
const nextBtn = document.querySelector('.banner-next-btn');
const prevBtn = document.querySelector('.banner-prev-btn');
const slides = document.querySelectorAll('.bannerHome');
const numberOfSlides = slides.length;
let slideNumber = 0;

nextBtn.onclick = () => {
    slides.forEach((slide) => {
        slide.classList.remove('slideActive'); // Gỡ class slideActive khỏi tất cả các slide
    });
    slideNumber++;
    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
    }
    slides[slideNumber].classList.add('slideActive'); // Thêm class slideActive cho slide hiện tại
};

prevBtn.onclick = () => {
    slides.forEach((slide) => {
        slide.classList.remove('slideActive'); // Gỡ class slideActive khỏi tất cả các slide
    });
    slideNumber--;
    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }
    slides[slideNumber].classList.add('slideActive'); // Thêm class slideActive cho slide hiện tại
};