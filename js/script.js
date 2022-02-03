var menuIcon = document.getElementById('bar');
var listLinks = document.getElementById('list-inks');
var header = document.getElementById('header');
var listLinksLi = document.querySelectorAll('ul li');
var link = document.querySelector('.h');


/* Add & remove Active Class */

listLinksLi.forEach((li) => {
    li.onclick = function() {
        listLinksLi.forEach((li) => {
            li.classList.remove('active');
            this.classList.add('active');
        })
    }
})

/* toggle Active Class */

menuIcon.addEventListener('click', function() {

    listLinks.classList.toggle('active');

});


/* fixed nav */

window.addEventListener('scroll', function() {

    if(window.scrollY > 100) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

});


/* Hadith */

var hadithContainer = document.querySelector('.hadith-container'),
    prevBtn = document.querySelector('.btns .prev'),
    number = document.querySelector('.btns .number'),
    nextBtn = document.querySelector('.btns .next');
var hadithIndex = 0;


fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')
.then(res => res.json())
.then(data  => {
    var hadiths = data.data.hadiths;
    

    nextBtn.addEventListener('click', () => {

        hadithIndex == 299 ?  hadithIndex = 0 : hadithIndex++;

        viewHadith();
    });
    

    viewHadith = () => {

        hadithContainer.innerHTML = hadiths[hadithIndex].arab;
        number.innerHTML = `300 - ${hadithIndex + 1}`;

    }

    viewHadith();

    prevBtn.addEventListener('click', () => {

        hadithIndex == 0 ?  hadithIndex = 299 : hadithIndex--;

        viewHadith();
    });
    

    viewHadith = () => {

        hadithContainer.innerHTML = hadiths[hadithIndex].arab;
        number.innerHTML = `300 - ${hadithIndex + 1}`;
        viewHadith();

    }


});

/* Quran */

// http://api.alquran.cloud/v1/meta

var surhasContainer = document.querySelector('.surh-container');


viewsurh = () => {
    fetch('http://api.alquran.cloud/v1/meta').then(res => res.json())
    .then(data => {
        var surh = data.data.surahs.references;
        var numberOfSurh = 114;
        for(var i = 0; i < numberOfSurh;i++) {
            surhasContainer.innerHTML += `
                <div class="surh">
                    <p>${surh[i].name}</p>
                    <p>${surh[i].englishName}</p>
                </div>
            `;
        }

        let surhasTitles = document.querySelectorAll('.surh');
        let popup = document.querySelector('.popup-surah');
        let ayatContainer = document.querySelector('.ayat');

        surhasTitles.forEach((title, index) => {
            title.addEventListener('click', () => {
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(res => res.json())
                .then(data => {
                    ayatContainer.innerHTML = ''
                        let Ayat = data.data.ayahs;
                        Ayat.forEach(aya => {
                            popup.classList.add('show');
                            ayatContainer.innerHTML += `
                                <p>(${aya.numberInSurah}) - ${aya.text}</p>
                                
                            `
                        })
                })
            })
        })

        var closeBtn = document.querySelector('.popup-surah #close');

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
        })
        
    });
    
    
}

viewsurh()


/* Pray */

var cards = document.querySelector('.cards');

console.log(cards)

function getcard() {
    fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
    .then(res => res.json())
    .then(data => {
    cards.innerHTML = '';
        var timePray = data.data.timings;
        for(var time in timePray) {
            cards.innerHTML += `
            <div class="card">
                <div class="circle">
                    <svg>
                        <Circle cx="100" cy = "100" r ="100"></Circle>
                    </svg>
                <div class="pray-time">${timePray[time]}</div>
            </div>
                <p>${time}</p>
            </div>
            `
        }
    })
}

getcard();

var loadingPage = document.querySelector('.loading-page');


setInterval( () => {
    loadingPage.remove();
},800)
