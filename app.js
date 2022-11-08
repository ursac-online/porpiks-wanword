let questions = [{
    question: " Unable to think clearly",
    imageSources: ["images/confused/1.jpg", "images/confused/2.jpg", "images/confused/3.jpg", "images/confused/4.jpg",],
    shuffledWord: ["S", "M", "F", "N", "O", "D", "E", "C", "S", "U"],
    correctWord: "CONFUSED"
},
{
    question: " A body's relative mass",
    imageSources: ["images/weight/1.jpg", "images/weight/2.jpg", "images/weight/3.jpg", "images/weight/4.jpg",],
    shuffledWord: ["K", "L", "T", "E", "W", "H", "I", "G", "M", "O"],
    correctWord: "WEIGHT"
},
{
    question: " A beginning",
    imageSources: ["images/opening/1.jpg", "images/opening/2.jpg", "images/opening/3.jpg", "images/opening/4.jpg",],
    shuffledWord: ["M", "P", "G", "P", "O", "N", "O", "N", "E", "I"],
    correctWord: "OPENING"
},
{
    question: " A supply of materials that can be drawn on by a person in order to function effectively",
    imageSources: ["images/resource/1.jpg", "images/resource/2.jpg", "images/resource/3.jpg", "images/resource/4.jpg",],
    shuffledWord: ["Z", "L", "E", "R", "R", "O", "S", "C", "E", "U",],
    correctWord: "RESOURCE"
},
{
    question: " Necessary course of action",
    imageSources: ["images/indicate/1.jpg", "images/indicate/2.jpg", "images/indicate/3.jpg", "images/indicate/4.jpg",],
    shuffledWord: ["D", "M", "I", "T", "E", "C", "N", "I", "A", "I"],
    correctWord: "INDICATE"
}
];

questions = questions.sort((a, b) => 0.5 - Math.random());

const questionsUI = document.querySelector('h4');
const answers = document.getElementById('answers');
const images = document.getElementById('images');
const scoreDisplay = document.getElementById('score');
const names = document.getElementById('name');
const form = document.getElementById('form');
const startBtn = document.getElementById('btn');
const error = document.getElementsByTagName('h6');
const item = document.getElementsByClassName('item');
const preview = document.getElementById('previewAnwser');
const previewError = document.getElementById('previewError');
const toggleOn = document.getElementById('toggleOn');
const toggleOff = document.getElementById('toggleOff');
const dragContainer = document.getElementById('dragContainer');
const clrBtn = document.getElementById('clrBtn');
const gstBtn = document.getElementById('gstBtn');
const overallScore = document.getElementById('finalScore');
const email = document.getElementById('email');
const password = document.getElementById('password');

// DARKMODE
const html = document.documentElement;
const body = document.body;
const title = document.getElementById('title');
const gameContainer = document.getElementById('gameContainer');
const li = document.getElementsByTagName('li');
const subjectTitle = document.getElementById('subjectTitle');
const leaderboardContainer = document.getElementById('leaderboardContainer');
const leaderboardTitle = document.getElementById('leaderboard-title');
const gameName = document.getElementById('gameName');
const firstPlaceNumber = document.getElementById('first-place-number');
const firstPlaceName = document.getElementById('firstPlaceName');
const firstPlace = document.getElementById('firstPlace');
const remainingPlace = document.getElementById('remainingPlace');


const dialog = document.getElementById('dialog');

let countNumber = 0;
let questionNumber = 1;
let score = 1;
let nameSubmitted = '';
let emailSubmitted = '';
let passwordSubmitted = '';
let toggled = true;


const nextButton = (isCorrect) => {

    wordSubmit = '';

    if (isCorrect) {
        score += 1;
    }


    if (countNumber < questions.length - 1) {
        countNumber += 1;
        questionNumber += 1;
        questionsUI.textContent = `${questionNumber}. ${questions[countNumber].question}. `;
        dragContainer.innerHTML = "";
        preview.innerHTML = "";
        images.innerHTML = "";

        questions[countNumber].shuffledWord.map(letter => {
            dragContainer.innerHTML += `
            <div class="drag-item">
                <p class="item">${letter}</p>
            </div>`;
        });
        for (let i = 0; i < item.length; i++) {

            item[i].addEventListener("mouseover", () => {
                item[i].style.cursor = 'pointer';
                // item[i].style.background = '#17529b';
            })
            item[i].addEventListener("mouseout", () => {
                item[i].style.cursor = 'pointer';
                // item[i].style.background = '#1e6dce';
            })




            item[i].addEventListener("click", () => {
                if (item[i].style.border === '1px solid green') {
                    previewError.style.display = 'none';
                    // preview.style.border = '1px solid #333';
                    // preview.style.color = 'black';
                    item[i].style.fontWeight = 'lighter';
                    item[i].style.border = '1px solid #1e6dce';
                    item[i].style.color = 'white';
                    item[i].style.background = '#1e6dce';
                    item[i].onmouseover = true;


                    let change = preview.innerHTML;
                    let letter = item[i].innerHTML;
                    let latestLetter = change.lastIndexOf(letter);
                    const removeString = (str, i) => {
                        const part1 = str.substring(0, i);
                        const part2 = str.substring(i + 1, str.length);
                        return part1 + part2;
                    }
                    change = removeString(change, latestLetter);

                    preview.innerHTML = change;
                    wordSubmit = change;
                } else {
                    previewError.style.display = 'none';
                    // preview.style.border = '1px solid #333';
                    // preview.style.color = 'black';
                    item[i].style.color = 'white';
                    item[i].style.background = 'green';
                    item[i].style.border = '1px solid green';
                    item[i].style.fontWeight = 'bolder';
                    item[i].onmouseover = false;
                    preview.innerHTML += item[i].innerHTML;
                    wordSubmit = preview.innerHTML;
                }
            })

            clrBtn.addEventListener("click", () => {
                previewError.style.display = 'none';
                // preview.style.border = '1px solid #333';
                // preview.style.color = 'black';
                preview.innerHTML = '';
                item[i].style.fontWeight = 'lighter';
                item[i].style.border = '1px solid #1e6dce';
                item[i].style.color = 'white';
                item[i].style.background = '#1e6dce';
                item[i].onmouseover = true;


                wordSubmit = '';

            })


        }


        images.innerHTML = "<div style='height: 410px; width: 400px; color: #1e6dce; display: flex; justify-content: center; align-items: center;'><p>Loading...</p></div>";

        setTimeout(() => {
            images.innerHTML = "";
            questions[countNumber].imageSources.map(image => {
                images.innerHTML += `<div><img src='${image}'/></div>`;
            });

        }, 500);



    } else {
        answers.innerHTML = "";
        overallScore.innerHTML = "<div class='btn-container'><button class='rst-btn' onclick='reset()'>Reset</button></div>";
        overallScore.style.textAlign = 'center';
        leaderboardContainer.style.display = 'block';
        subjectTitle.innerHTML = "CONGRATULATIONS!"
        firstPlaceName.innerHTML = "You are Amazing, " + nameSubmitted.toUpperCase();
    }

}
gstBtn.addEventListener('click', () => {



    if (wordSubmit === questions[countNumber].correctWord) {
        nextButton(true);
    } else {

        previewError.style.display = 'block';
        preview.style.border = '1px solid red';
        preview.style.color = 'red';
        preview.style.animation = 'shake 0.82s cubic-bezier(.36, .07, .19, .97) both';
        preview.style.transform = 'translate3d(0, 0, 0)';
        preview.style.backfaceVisibility = 'hidden';
        preview.style.perspective = '1000px';

        let timerFailed = setInterval(errorIndicator, 1700);

        function errorIndicator() {
            previewError.style.display = 'none';
            if (toggled) {
                preview.style.border = '1px solid black';
                preview.style.color = 'black';
            } else {
                preview.style.border = '1px solid white';
                preview.style.color = 'white';
            }
            // preview.style.border = '1px solid black';
            // preview.style.color = 'black';
            preview.innerHTML = "";
            preview.style.animation = 'none';
            preview.style.transform = 'none';
            preview.style.backfaceVisibility = 'none';
            preview.style.perspective = 'none';

            for (let i = 0; i < item.length; i++) {
                item[i].style.border = '1px solid #1e6dce';
                item[i].style.backgroundColor = '#1e6dce';
                item[i].style.fontWeight = 'normal';

            }
            clearInterval(timerFailed);
        }
    }
})

const reset = () => {
    location.reload();
}

names.addEventListener("keyup", (e) => {
    let name = e.target.value;

    error[0].style.display = "none";
    error[1].style.display = "none";
    names.style.border = "1px solid #1e6dce"
    startBtn.style.marginTop = "10px"


    nameSubmitted = name;

})
email.addEventListener("keyup", (e) => {
    let emails = e.target.value;

    error[2].style.display = "none";
    error[3].style.display = "none";
    
    email.style.border = "1px solid #1e6dce"
    startBtn.style.marginTop = "10px"

    emailSubmitted = emails;

})
password.addEventListener("keyup", (e) => {
    let passwords = e.target.value;

    error[4].style.display = "none";
    error[5].style.display = "none";

    password.style.border = "1px solid #1e6dce"
    startBtn.style.marginTop = "10px"


    passwordSubmitted = passwords;

})

startBtn.addEventListener('mousedown', () => {
    startBtn.style.boxShadow = "none";
})
startBtn.addEventListener('mouseup', () => {
    startBtn.style.boxShadow = "1px 1px 3px rgba(0, 0, 0, 0.5)";
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let regexName = /^[a-zA-Z]{3,}/g.exec(nameSubmitted);
    let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.exec(emailSubmitted);
    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g.exec(passwordSubmitted);
// atlest 3letters with uupercase chracters and numbers

    // if (regexPassword) {
    //     console.log(regexPassword);
    // } else {
    //     console.log('false');
    // }

    if (nameSubmitted === '') {
        error[0].style.display = "block";
        names.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    } else if (!regexName) {
        error[1].style.display = "block";
        names.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    } else if (emailSubmitted === '') {
        error[2].style.display = "block";
        email.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    } else if (!regexEmail) {
        error[3].style.display = "block";
        email.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    } else if (passwordSubmitted === '') {
        error[5].style.display = "block";
        password.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    }  else if (!regexPassword) {
        error[4].style.display = "block";
        password.style.border = "1px solid red"
        startBtn.style.marginTop = "20px"
    } else {
        dialog.style.display = 'none';
    }
})


questionsUI.textContent = `${questionNumber}.${questions[countNumber].question}. `;

questions[countNumber].shuffledWord.map(letter => {
    dragContainer.innerHTML += `
    <div class="drag-item">
        <p class="item">${letter}</p>
    </div>`;
});

questions[countNumber].imageSources.map(image => {
    images.innerHTML += `<div><img src='${image}'/></div>`;

});



let wordSubmit = '';
for (let i = 0; i < item.length; i++) {

    item[i].addEventListener("mouseover", () => {
        item[i].style.cursor = 'pointer';
        // item[i].style.background = '#17529b';
    })
    item[i].addEventListener("mouseout", () => {
        item[i].style.cursor = 'pointer';
        // item[i].style.background = '#1e6dce';
    })




    item[i].addEventListener("click", () => {

        if (item[i].style.border === '1px solid green') {
            previewError.style.display = 'none';
            // preview.style.border = '1px solid #333';
            // preview.style.color = 'black';
            item[i].style.fontWeight = 'lighter';
            item[i].style.border = '1px solid #1e6dce';
            item[i].style.color = 'white';
            item[i].style.background = '#1e6dce';
            item[i].onmouseover = true;


            let change = preview.innerHTML;
            let letter = item[i].innerHTML;
            let latestLetter = change.lastIndexOf(letter);
            const removeString = (str, i) => {
                const part1 = str.substring(0, i);
                const part2 = str.substring(i + 1, str.length);
                return part1 + part2;
            }
            change = removeString(change, latestLetter);

            preview.innerHTML = change;
            wordSubmit = change;
        } else {
            previewError.style.display = 'none';
            // preview.style.border = '1px solid #333';
            // preview.style.color = 'black';
            item[i].style.color = 'white';
            item[i].style.background = 'green';
            item[i].style.border = '1px solid green';
            item[i].style.fontWeight = 'bolder';
            item[i].onmouseover = false;
            preview.innerHTML += item[i].innerHTML;
            wordSubmit = preview.innerHTML;
        }
    })

    clrBtn.addEventListener("click", () => {
        previewError.style.display = 'none';
        // preview.style.border = '1px solid #333';
        // preview.style.color = 'black';
        preview.innerHTML = '';
        item[i].style.fontWeight = 'lighter';
        item[i].style.border = '1px solid #1e6dce';
        item[i].style.color = 'white';
        item[i].style.background = '#1e6dce';
        item[i].onmouseover = true;


        wordSubmit = '';

    })


}

var deleteNameBtn = document.getElementById("deleteNameBtn");
deleteNameBtn.addEventListener('click', () => {
    names.value = '';

    error[0].style.display = "none";
    error[1].style.display = "none";
    names.style.border = "1px solid black"
    startBtn.style.marginTop = "10px"
})

var deleteNameBtn = document.getElementById("deleteEmailBtn");
deleteNameBtn.addEventListener('click', () => {
    email.value = '';

    error[2].style.display = "none";
    error[3].style.display = "none";
    email.style.border = "1px solid black"
    startBtn.style.marginTop = "10px"
})

var deleteNameBtn = document.getElementById("deletePasswordBtn");
deleteNameBtn.addEventListener('click', () => {
    password.value = '';

    error[4].style.display = "none";
    error[5].style.display = "none";
    password.style.border = "1px solid black"
    startBtn.style.marginTop = "10px"
})

const toggleBtnOn = () => {
    html.style.backgroundColor = "#181818";
    body.style.backgroundColor = "#181818";
    questionsUI.style.color = "white";
    preview.style.border = '1px solid white';
    preview.style.color = 'white';
    leaderboardTitle.style.color = "white"
    firstPlaceName.style.color = "white"
    firstPlaceNumber.style.color = "white"
    // title.style.color = "black";
    // title.style.backgroundColor = "#B1D4E0";
    gameContainer.style.backgroundColor = "#3d3d3d";
    for (const i of li) {
        i.style.backgroundColor = "#fefefe";
    }
    subjectTitle.style.color = "#fefefe";
    leaderboardContainer.style.backgroundColor = "#3d3d3d";
    gameName.style.color = "#ccc";
    firstPlace.style.backgroundColor = "#212121";
    // remainingPlace.style.backgroundColor = "#212121";
    toggleOn.style.display = 'none';
    toggleOff.style.display = 'block';
    toggled = false;

}

const toggleBtnOff = () => {
    html.style.backgroundColor = "#e2e0e0";
    body.style.backgroundColor = "#e2e0e0";
    questionsUI.style.color = "#333";
    preview.style.border = '1px solid black';
    preview.style.color = 'black';
    leaderboardTitle.style.color = "black"
    firstPlaceName.style.color = "black"
    firstPlaceNumber.style.color = "black"

    // title.style.color = "white";
    // title.style.backgroundColor = "#0C2D48";
    gameContainer.style.backgroundColor = "#f5f5f5";
    for (const i of li) {
        i.style.backgroundColor = "#e2e0e0";
    }
    subjectTitle.style.color = "#333";
    leaderboardContainer.style.backgroundColor = "#f5f5f5";
    gameName.style.color = "#333";
    firstPlace.style.backgroundColor = "#e2e0e0";
    // remainingPlace.style.backgroundColor = "#e2e0e0";
    toggleOn.style.display = 'block';
    toggleOff.style.display = 'none';
    toggled = true;

}