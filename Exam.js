const URL = "";

let model, webcam, labelContainer, maxPredictions;
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();


    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for(let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for(let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    }
}
window.onload = () => {
    init();
}
document.addEventListener("visibilitychange", () => {
    if(document.visibilityState == "visible") {
        console.log("tab is active")
    } else {
        console.log("tab is inactive")
    }
});

let list = [
    { question: 'Which one of the following river flows between Vindhyan and Satpura ranges?', opt1: 'Narmada', opt2: 'Mahanadi', opt3: 'Son', opt4: 'Netravati' },

    { question: ' The Central Rice Research Station is situated in?', opt1: 'Chennai', opt2: 'Cuttack', opt3: 'Bangalore', opt4: 'Quilon' },

    { question: 'Who among the following wrote Sanskrit grammar?', opt1: ' Kalidasa', opt2: 'Charak', opt3: 'Panini', opt4: 'Aryabhatt' },

    { question: 'Which among the following headstreams meets the Ganges in last?', opt1: 'Alaknanda', opt2: 'Pindar', opt3: 'Mandakini', opt4: 'Bhagirathi' },

    { question: 'The metal whose salts are sensitive to light is?', opt1: ' Zinc', opt2: 'Silver', opt3: 'Copper', opt4: 'Aluminum' },

    { question: 'Patanjali is well known for the compilation of –', opt1: 'Yoga Sutra', opt2: 'Panchatantra', opt3: 'Brahma Sutra', opt4: 'Ayurveda'},

    { question: 'River Luni originates near Pushkar and drains into which one of the following?', opt1: 'Rann of Kachchh', opt2: 'Arabian Sea', opt3: 'Gulf of Cambay', opt4: 'Lake Sambhar' },

    { question: 'Which one of the following rivers originates in Brahmagiri range of Western Ghats?', opt1: 'Pennar', opt2: 'Cauvery', opt3: 'Krishna', opt4: 'Tapti' },

    { question: 'The country that has the highest in Barley Production?', opt1: 'China', opt2: 'India', opt3: 'Russia', opt4: 'France' },

    { question: 'Tsunamis are not caused by', opt1: 'Hurricanes', opt2: 'Earthquakes', opt3: 'ndersea landslides', opt4: 'Volcanic eruptions' },

    { question: 'Chambal river is a part of –', opt1: ' Sabarmati basin', opt2: 'Ganga basin', opt3: 'Narmada basin', opt4: 'Godavari basin' },

    { question: 'D.D.T. was invented by?', opt1: 'Mosley', opt2: 'Rudolf', opt3: 'Karl Benz', opt4: 'Dalton' },

    { question: 'Indus river originates in –', opt1: 'Kinnaur', opt2: 'Ladakh', opt3: 'Nepal', opt4: 'Tibet' },

    { question: 'The hottest planet in the solar system?', opt1: 'Mercury', opt2: 'Venus', opt3: 'Mars', opt4: 'Jupiter' },

    { question: 'Where was the electricity supply first introduced in India –', opt1: 'Mumbai', opt2: 'Dehradun', opt3: 'Darjeeling', opt4: 'Chennai' }
]

let para = document.getElementById('para');
let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');
let radio3 = document.getElementById('radio3');
let radio4 = document.getElementById('radio4');

let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let time = document.getElementById('time');
let visited = 0;

const timeFunction = () => {
    var countDownDate = (new Date().getTime()) / 1000 + 7200;
    console.log(countDownDate);

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("time").innerText = hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if(distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerText = "EXPIRED";
        }
    }, 1000);
}

timeFunction();


Array.from(document.getElementsByClassName('btn-get')).forEach((element) => {
    element.addEventListener('click', () => {
        visited++;
        document.getElementById("question").innerText = `Question:${element.innerText}`
        box1.innerText = `Visited:${visited}`;
        box2.innerText = `NotVisited:${list.length - visited}`;
        para.innerText = list[element.innerText - 1].question;

        radio1.innerHTML = `<input type="radio" class="form-check-input" name="optradio" value="${list[element.innerText - 1].opt1}">${list[element.innerText - 1].opt1}`;

        radio2.innerHTML = `<input type="radio" class="form-check-input" name="optradio" value="${list[element.innerText - 1].opt2}">${list[element.innerText - 1].opt2}`;

        radio3.innerHTML = `<input type="radio" class="form-check-input" name="optradio" value="${list[element.innerText - 1].opt3}">${list[element.innerText - 1].opt3}`;

        radio4.innerHTML = `<input type="radio" class="form-check-input" name="optradio" value="${list[element.innerText - 1].opt4}">${list[element.innerText - 1].opt4}`;

        element.style.backgroundColor = 'red';
    })
})

