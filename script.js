const skillsData =[
    {
        id:'software',
        title:'Software & Programming',
        icon:'fas fa-code',
        gradient: 'var(--gradient-3)',
        skills:['Python','JavaScript']
    },
    {
        id:'robotics',
        title:'Robotics & Embedded Systems',
        icon:'fas fa-code',
        gradient: 'var(--gradient-2)',
        skills:['','']
    },
    {
        id:'hardware',
        title:'Hardware & Electronics',
        icon:'fas fa-wrench',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        skills:['','']
    },
    {
        id:'cad',
        title:'Mechanical & CAD',
        icon:'fas fa-gears',
        gradient: 'var(--gradient-1)',
        skills:['','']
    },
    {
        id:'specialized',
        title:'Specialized Skills',
        icon:'fas fa-bolt',
        gradient: 'var(--gradient-4)',
        skills:['','']
    }
];

const projectsData = [
    {
        id: '1',
        title: 'Portfolio',
        description: 'A portfolio that displays skills and projects thanks to html, css and js.',
        skills:['Pythons','JavaScript'],
        category: 'software',
        image: 'https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_1280.jpg',
        github:'',
        demo:''
    }
]

function renderSkills() {
    const skillsGrid =document.getElementById('skills_grid');
    skillsGrid.innerHTML='';

    skillsData.forEach((category,index)=>{
        const skillCard = document.createElement('div');
        skillCard.className = 'skill_category';
        skillCard.style.transitionDelay = `${index * 0.1}s`;

        const skillsHTML = category.skills.map(skill =>
            `<span class="skill_tag">${skill}</span>`
        ).join('');

        skillCard.innerHTML = `
            <div class="skill_header">
                <div class="skill_icon" style="background: ${category.gradient}">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3>${category.title}</h3>
                </div>
                <div class="skill_tags">
                    ${skillsHTML}
                </div>
            `;
            
        skillsGrid.appendChild(skillCard);

    });
}

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project_card';
        projectCard.style.transitionDelay = `${index * 0.1}s`;

        const skillsHTML = project.skills.slice(0, 3).map(skill =>
            `<span class="project_skill_tag">${skill}</span>`
        ).join('');

        const moreSkills = project.skills.length > 3
            ? `<span class="project_skill_tag">+${project.skills.length - 3} more</span>`
            : '';

        const githubLink = project.github
            ? `<a href="${project.github}" target="_blank" class="project_link">
                <i class="fab fa-github"></i> Code
                </a>`
            : '';

        const demoLink = project.demo
            ? `<a href="${project.demo}" target="_blank" class="project_link">
                <i class="fas fa-external-link-alt"></i> Demo
                </a>`
            : '';

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project_image">
            <div class="project_content">
                <h3>${project.title}</h3>
                <p class="project_description">${project.description}</p>
                <div class="project_skills">
                    ${skillsHTML}
                    ${moreSkills}
                </div>
                <div class="project_links">
                    ${githubLink}
                    ${demoLink}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill_category, .project_card').forEach(el => {
        observer.observe(el);
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navi');
    if (window.scrollY > 50) {
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.add('transparent');
    }
});

document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    const navLinks = document.getElementById('naviLinks');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.navi_links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('naviLinks').classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.filter_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter_btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        renderProjects(filter);
        observeElements();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    observeElements();

     document.getElementById('navi').classList.add('transparent');
});

