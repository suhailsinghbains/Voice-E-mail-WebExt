var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var arrayPeople = {
    'Mark': 'suhail.singhyo@gmail.com',
    'mark': 'suhail.singhyo@gmail.com',
    'Test': 'suhail.singhyo@gmail.com',
    'test': 'suhail.singhyo@gmail.com',
    'Dark': 'suhail.singh.bains@hotmail.com',
    'dark': 'suhail.singh.bains@hotmail.com'
}
// document.addEventListener("click", menuOptions)
document.addEventListener("dblclick", goToTest)
// document.addEventListener("")

//Login

// function listenAndShow() {
//     recognition.start();
//     var input = ''
//     return new Promise(recognition.onresult = function (event) {
//         input = event.results[0][0].transcript;
//     })
// }

function goToTest() {
    showAndSpeak("Opening Inbox");
    var arr = document.getElementsByTagName('tbody')[5];
    for (let i = 0; i < 5; i++) {
        let j = i + 1;
        let Name = "Mail " + j + " is from " + arr.children[i].children[4].children[1].children[0].children[0].innerText;
        let Subject = "Subject is " + arr.children[i].children[5].children[0].children[0].children[0].children[0].innerText;
        showAndSpeak(Name)
        showAndSpeak(Subject)
    }
    showAndSpeak("What E-Mail would you like to read?")
    // Ask for Number
}

function showAndSpeak(msg) {
    console.log(msg)
    var speech = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(speech);
}

function menuOptions() {
    showAndSpeak("Option 1. Compose an E-mail")
    showAndSpeak("Option 2. Check your Inbox")
    showAndSpeak("Please speak your choice")

    var victimID = '', message = '';

    setTimeout(function () {
        recognition.start();
        recognition.onresult = function (event) {
            text = event.results[0][0].transcript;
            showAndSpeak(("Your choice is recorded as " + text))
            // console.log(text)
            if (text == '1' || text == 'One' || text == 'one') {
                showAndSpeak("Who do you want to send?")
                var recording1 = new SpeechRecognition();
                setTimeout(function () {
                    recording1.start();
                    recording1.onresult = function (event) {
                        text1 = event.results[0][0].transcript;
                        for (name in arrayPeople) {
                            if (text1 == name) {
                                victimID = arrayPeople[name]
                                speakOnText("Sending to " + victimID)
                            }
                        }
                        showAndSpeak("What is the message?")
                        setTimeout(function () {
                            var recording2 = new SpeechRecognition();
                            recording2.start();
                            recording2.onresult = function (event) {
                                text1 = event.results[0][0].transcript;
                                showAndSpeak("Message to be sent is: " + text1)
                                message = text1
                                showAndSpeak("Do you want to send this E-mail? Please say Yes or No")
                                setTimeout(function () {
                                    var recording3 = new SpeechRecognition();
                                    recording3.start();
                                    recording3.onresult = function (event) {
                                        text = event.results[0][0].transcript;
                                        if (text == 'Yes' || text == 'yes' || text == 'yeah' || text == 'Yeah') {
                                            chrome.runtime.sendMessage({ data: { code: 0, payload: { 'to': victimID, 'msg': message } } });
                                            showAndSpeak("Sending your E-mail")
                                            showAndSpeak("Congrats! Your e-mail has been sent. ")
                                        }
                                        else {
                                            showAndSpeak("Your E-mail has not been sent")
                                        }
                                    }
                                }, 6000);
                            }
                        }, 4000);
                    }
                }, 4000);



            }
            else {
                showAndSpeak("Opening Inbox")
                var arr = document.getElementsByTagName('tbody')[0]
                console.log(arr)
                console.log(arr.children[0].children[4].children[1].children[0].children[0].innerText)
                // temp1.children[0].children[4].children[1].children[0].children[0].innerText
                // temp1.children[0].children[5].children[0].children[0].children[0].children[0].innerText
                // console.log(arr['tr'])
                // And start reading right from the mail box

            }
        }
    }, 8000);

    // listenAndShow().then(input => {
    //     console.log(input)
    // })


}

function composeEmail() {
    recognition.start();


    // chrome.runtime.sendMessage({ gmailUrl: "https://mail.google.com/" });
}

function goToInbox() {
    // chrome.runtime.sendMessage({ gmailUrl: "https://mail.google.com/mail/u/0/#inbox?compose=new" });
}