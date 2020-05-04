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

function getEmailFromName(spokenName) {
    for (name in arrayPeople) {
        if (spokenName == name) {
            victimID = arrayPeople[name]
            return victimID
        }
    }
}
// document.addEventListener("click", menuOptions)
document.addEventListener("dblclick", menuOptions)

async function SpeechReco() {
    let text = '';
    setTimeout(function () {
        recognition.start();
        recognition.onresult = function (event) {
            text = event.results[0][0].transcript;
        }
    }, 1000)
    return text
}

function Option1_ComposeAnEmail() {
    showAndSpeak("Composing E-mail").then(() => {
        showAndSpeak("Who do you want to send?").then(() => {
            var recording1 = new SpeechRecognition();
            recording1.start();
            recording1.onresult = function (event) {
                text1 = event.results[0][0].transcript;
                victimID = getEmailFromName(text1)
                showAndSpeak("What is the message?").then(() => {
                    var recording2 = new SpeechRecognition();
                    recording2.start();
                    recording2.onresult = function (event) {
                        text1 = event.results[0][0].transcript;
                        showAndSpeak("Message to be sent is: " + text1).then(() => {
                            message = text1
                            showAndSpeak("Do you want to send this E-mail? Please say Yes or No").then(() => {
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
                            })

                        })
                    }
                })
            }
        })
    })
}

function Option2_CheckYourInboxOrSent() {
    showAndSpeak("Opening Inbox").then(() => {
        let arr = document.getElementsByTagName('tbody')[5];
        let noOfEmails = 1
        for (let i = 0; i < noOfEmails; i++) {
            let j = i + 1;
            let Name = "Mail " + j + " is from " + arr.children[i].children[4].children[1].children[0].children[0].innerText;
            let Subject = "Subject is " + arr.children[i].children[5].children[0].children[0].children[0].children[0].innerText;
            showAndSpeak(Name)
            showAndSpeak(Subject).then(() => {
                if (j == noOfEmails) {
                    showAndSpeak("What E-Mail would you like to read?").then(() => {
                        recognition.start();
                        recognition.onresult = function (event) {
                            text = event.results[0][0].transcript;
                            showAndSpeak(("Your choice is recorded as " + text)).then(() => {
                                arr.children[text - 1].click()
                                setTimeout(function () {
                                    let emailText = document.getElementsByClassName('ii gt')[0].innerText

                                    showAndSpeak(emailText).then(() => {

                                        showAndSpeak("Do you want to, 1. reply, 2. forward or 3. delete msg?").then(() => {
                                            recognition.start();
                                            recognition.onresult = function (event) {
                                                text = event.results[0][0].transcript;
                                                // console.log(text)
                                                switch (text) {
                                                    case '1':
                                                        let replyButton = document.getElementsByClassName('ams bkH')[0]
                                                        replyButton.click()
                                                        showAndSpeak("What do you want to reply with?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                showAndSpeak(text).then(() => {
                                                                    let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                    document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                    document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                })

                                                            }
                                                        })
                                                        break;
                                                    case '2':
                                                        let forwardButton = document.getElementsByClassName('ams bkG')[0]
                                                        forwardButton.click()
                                                        showAndSpeak("Who do you want send this E-mail to?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                victimID = getEmailFromName(text)
                                                                document.getElementsByTagName('textarea')[0].innerHTML = victimID
                                                                showAndSpeak("What do you add to this forward E-mail?").then(() => {
                                                                    recognition.start();
                                                                    recognition.onresult = function (event) {
                                                                        text = event.results[0][0].transcript;
                                                                        showAndSpeak(text).then(() => {
                                                                            let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                            document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                            document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                        })

                                                                    }
                                                                })

                                                            }
                                                        });
                                                        break;
                                                    case 'Tu':
                                                        let forwardButton1 = document.getElementsByClassName('ams bkG')[0]
                                                        forwardButton1.click()
                                                        showAndSpeak("Who do you want send this E-mail to?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                victimID = getEmailFromName(text)
                                                                document.getElementsByTagName('textarea')[0].innerHTML = victimID
                                                                showAndSpeak("What do you add to this forward E-mail?").then(() => {
                                                                    recognition.start();
                                                                    recognition.onresult = function (event) {
                                                                        text = event.results[0][0].transcript;
                                                                        showAndSpeak(text).then(() => {
                                                                            let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                            document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                            document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                        })

                                                                    }
                                                                })

                                                            }
                                                        });
                                                        break;
                                                    case '3':
                                                        showAndSpeak("Deleting E-mail from Inobx?").then(() => {
                                                            document.getElementsByClassName('hO')[0].click();
                                                        })
                                                        break;

                                                }
                                            }
                                        })

                                    })

                                }, 2000);
                            })
                        }
                    })
                }
            })
        }
    })
}

function Option3_GoToSentEmail() {
    document.getElementsByClassName('aio UKr6le')[4].click()
    setTimeout(function () {
        let arr = document.getElementsByTagName('tbody')[7];
        let noOfEmails = 1
        for (let i = 0; i < noOfEmails; i++) {
            let j = i + 1;
            let Name = "Mail " + j + " is from " + arr.children[i].children[4].children[1].children[0].innerText;
            let Subject = "Subject is " + arr.children[i].children[5].children[0].children[0].children[0].innerText;
            showAndSpeak(Name)
            showAndSpeak(Subject).then(() => {
                if (j == noOfEmails) {
                    showAndSpeak("What E-Mail would you like to read?").then(() => {
                        recognition.start();
                        recognition.onresult = function (event) {
                            text = event.results[0][0].transcript;
                            showAndSpeak(("Your choice is recorded as " + text)).then(() => {
                                arr.children[text - 1].click()
                                setTimeout(function () {
                                    let emailText = document.getElementsByClassName('ii gt')[0].innerText

                                    showAndSpeak(emailText).then(() => {

                                        showAndSpeak("Do you want to, 1. reply, 2. forward or 3. delete msg?").then(() => {
                                            recognition.start();
                                            recognition.onresult = function (event) {
                                                text = event.results[0][0].transcript;
                                                // console.log(text)
                                                switch (text) {
                                                    case '1':
                                                        let replyButton = document.getElementsByClassName('ams bkH')[0]
                                                        replyButton.click()
                                                        showAndSpeak("What do you want to reply with?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                showAndSpeak(text).then(() => {
                                                                    let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                    document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                    document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                })

                                                            }
                                                        })
                                                        break;
                                                    case '2':
                                                        let forwardButton = document.getElementsByClassName('ams bkG')[0]
                                                        forwardButton.click()
                                                        showAndSpeak("Who do you want send this E-mail to?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                victimID = getEmailFromName(text)
                                                                document.getElementsByTagName('textarea')[0].innerHTML = victimID
                                                                showAndSpeak("What do you add to this forward E-mail?").then(() => {
                                                                    recognition.start();
                                                                    recognition.onresult = function (event) {
                                                                        text = event.results[0][0].transcript;
                                                                        showAndSpeak(text).then(() => {
                                                                            let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                            document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                            document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                        })

                                                                    }
                                                                })

                                                            }
                                                        });
                                                        break;
                                                    case 'Tu':
                                                        let forwardButton1 = document.getElementsByClassName('ams bkG')[0]
                                                        forwardButton1.click()
                                                        showAndSpeak("Who do you want send this E-mail to?").then(() => {
                                                            recognition.start();
                                                            recognition.onresult = function (event) {
                                                                text = event.results[0][0].transcript;
                                                                victimID = getEmailFromName(text)
                                                                document.getElementsByTagName('textarea')[0].innerHTML = victimID
                                                                showAndSpeak("What do you add to this forward E-mail?").then(() => {
                                                                    recognition.start();
                                                                    recognition.onresult = function (event) {
                                                                        text = event.results[0][0].transcript;
                                                                        showAndSpeak(text).then(() => {
                                                                            let draftEmail = document.getElementsByClassName('gmail_signature')[0].innerHTML;
                                                                            document.getElementsByClassName('gmail_signature')[0].innerHTML = text + draftEmail
                                                                            document.getElementsByClassName('T-I J-J5-Ji aoO v7 T-I-atl L3')[0].click()
                                                                        })

                                                                    }
                                                                })

                                                            }
                                                        });
                                                        break;
                                                    case '3':
                                                        showAndSpeak("Deleting E-mail from Inobx?").then(() => {
                                                            document.getElementsByClassName('hO')[0].click();
                                                        })
                                                        break;

                                                }
                                            }
                                        })

                                    })

                                }, 2000);
                            })
                        }
                    })
                }
            })
        }
    }, 3000)

}

var showAndSpeak = function (msg) {
    return new Promise(function (resolve, reject) {
        console.log(msg)
        var speech = new SpeechSynthesisUtterance(msg);
        speechSynthesis.speak(speech);
        speech.onend = function (event) {
            resolve()
        }
    });
}

function menuOptions() {
    showAndSpeak("Option 1. Compose an E-mail")
    showAndSpeak("Option 2. Check your Inbox")
    showAndSpeak("Option 3. Go To Sent E-Mails")
    showAndSpeak("Please speak your choice").then(() => {
        recognition.start();
        recognition.onresult = function (event) {
            text = event.results[0][0].transcript;
            showAndSpeak(("Your choice is recorded as " + text)).then(() => {
                if (text == '1' || text == 'One' || text == 'one') {
                    Option1_ComposeAnEmail()
                } else if (text == '2' || text == 'Two' || text == 'two' || text == 'Tu') {
                    Option2_CheckYourInbox()
                }
                else {
                    Option3_GoToSentEmail()
                }
            })
        }
    })
}

function goToInbox() {
    // chrome.runtime.sendMessage({ gmailUrl: "https://mail.google.com/mail/u/0/#inbox?compose=new" });
}