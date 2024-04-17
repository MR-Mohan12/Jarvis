
// Selecting the button element with the class 'talk'
const btn = document.querySelector('.talk');

// Selecting the element with the class 'content'
const content = document.querySelector('.content');

// Function to speak out the provided text
function speak(text) {
    // Creating a SpeechSynthesisUtterance object with the provided text
    const text_speak = new SpeechSynthesisUtterance(text);

    // Setting the rate, volume, and pitch of the speech
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    // Using the SpeechSynthesis API to speak the text
    window.speechSynthesis.speak(text_speak);
}

// Function to greet the user based on the current time
function wishMe() {
    // Getting the current date and time
    var day = new Date();
    var hour = day.getHours();

    // Greeting the user based on the time of the day
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Event listener for the 'load' event to initialize JARVIS and greet the user
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

// Initializing SpeechRecognition API for speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Event listener for when speech recognition produces a result
recognition.onresult = (event) => {
    // Getting the index of the current result and the transcripted speech
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;

    // Setting the content of the 'content' element to the recognized speech
    content.textContent = transcript;

    // Passing the recognized speech to the function to process the command
    takeCommand(transcript.toLowerCase());
};

// Event listener for when the button is clicked to start speech recognition
btn.addEventListener('click', () => {
    // Setting the content of the 'content' element to indicate listening
    content.textContent = "Listening...";
    // Starting the speech recognition
    recognition.start();
});

// Function to process the recognized speech command
function takeCommand(message) {
    // Checking for specific commands and executing corresponding actions
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
