const menu = document.querySelector('.menu');
const sidelinks = document.querySelectorAll('.menu a[href^="#"]');

const observer = new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
       const id =  entry.target.getAttribute("id");
       const sideLink = document.querySelector(`.menu a[href="#${id}"]`);
       if(entry.isIntersecting)
       {
        sideLink.classList.add("selected");
       } else {

        sideLink.classList.remove("selected");
       }
    });
}, {rootMargin:"-300px 0px -300px 0px"});

sidelinks.forEach((sideLink) => 
    {   
        const hash = sideLink.getAttribute("href");
        const target = document.querySelector(hash);
        if(target)
        {
            observer.observe(target);
        }
    })

const mostrar = document.getElementById('mostrar-btn');
const mostar_texto = document.getElementById('mostrar');

mostrar.addEventListener('click',toggleText);
function toggleText()
{
    mostar_texto.classList.toggle('mostrar');
    if(mostar_texto.classList.contains('mostrar'))
    {
        mostrar.innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
    }else{
        mostrar.innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
    }
}




