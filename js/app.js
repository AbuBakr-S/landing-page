/*
1. Write a function to loop through all of the sections and retrieve the data-nav attribute. 
2. Create li elements, with anchors and add the data-nav value as text content.
3. Append these li elements to the navbar_list ID.
*/

//  Ensure the DOM has fully loaded and parsed
window.addEventListener('DOMContentLoaded', () => {

    // Store each <section> in a nodeList
    const sections = document.querySelectorAll('section');    // Note: Cannot have a single observer on a nodelist
    const navbarList = document.getElementById('navbar_list');

    //  Add all section names to navigation, including future added sections with set data-nav attribute
    const buildNav = () => {

        const myDocFrag = document.createDocumentFragment(); 
        for (const section of sections) {
            const sectionName = section.dataset.nav;
            const navItem = document.createElement('li');
            const navContent = `<a>${sectionName}</a>`;
            navItem.insertAdjacentHTML('afterbegin', navContent);            
            myDocFrag.appendChild(navItem);
        }

        navbarList.appendChild(myDocFrag);
    }

    buildNav();



    const getSectionPosition = () => {
        // y, x positions of section
        const yPosition = [];
        const xPosition = [];

        // Loop through each section and store the y, x positions in the variables declared above
        for (const section of sections) {            
            const position = section.getBoundingClientRect();
            console.log(position);
            yPosition.push(position.y);
            xPosition.push(position.x);
        }

        // TODO: Target all anchors
        const anchor = document.querySelector('a');
        // TODO: Separate out function
        anchor.addEventListener('click', function() {
        // TODO: Dynamically access corresponding yPosition and xPosition
        window.scrollTo({top: yPosition[0], x: xPosition[0], behavior: 'smooth'});
        });

    }


    getSectionPosition();



    // Hide navigation bar when scrolling
    let timer = null;
    let nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {

    // TODO: Look for a more performant solution.    
    console.log(this.window.scrollY);

        if(timer !== null) {
            clearTimeout(timer);  
            nav.style.display = 'block';      
        }
 
        timer = setTimeout(function() {
            // Ensure navigation is permanently visible when scrolled to top of page
            if (this.window.scrollY === 0){
                nav.style.display = 'block';
            } else {
                nav.style.display = 'none';
              }
        }, 375);
    }, false);

    

    // Intersection Observer - Is a given section visible in the viewport? If so, make it stand out with an active class.
    const options = {
    root: null,   // This is the viewport
    threshold: 1,   // 0 value will fire for any part of the target. 1 value will fire if 100% of the target is visible inside the viewport  
    rootMargin: "10% 0px 10% 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // If target is not intersecting, exit this function
            if (!entry.isIntersecting) {
                entry.target.classList.remove('active');
                return;
            }
            entry.target.classList.toggle('active');
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

});