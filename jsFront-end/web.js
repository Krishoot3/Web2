document.addEventListener('DOMContentLoaded', () => {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
});

// document.addEventListener('scroll', () => {
//     let navId = document.getElementById("navId");
//     let headerId = document.getElementById("headerId");
//     if (window.pageYOffset > 120) {
//         navId.classList.remove("transparent");
//         navId.classList.add("blue");
//         headerId.classList.add("navbar-fixed");
//     } else {
//         navId.classList.add("transparent");
//         navId.classList.remove("blue");
//         headerId.classList.remove("navbar-fixed");
//     }
// });

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const textArea = document.getElementById('textArea');

form.addEventListener('submit', (e) => {
    let errorName;
    let errorEmail;
    let errorSubject;
    let errorText;
    let letters = /^[A-Za-z]+$/;
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const textAreaValue = textArea.value.trim();

    if (nameValue === '' || nameValue.length < 3 || !nameValid(nameValue)) {
        setErrorFor(name, 'Vyplnte meno s min. 3 znakmi.');
        errorName = true;
    } else {
        setSuccessFor(name);
        errorEmail = false;
    }

    
    if (emailValue === '' || emailValue.length < 3 || !emailIsValid(emailValue)) {
        setErrorFor(email, 'Vyplnte e-mail v spravnom tvare s min. 3 znakmi.');
        errorEmail = true;
    } else {
        setSuccessFor(email);
        errorEmail = false;
    }


    if (subjectValue === '' || subjectValue.length < 3) {
        setErrorFor(subject, 'Vyplnte predmet s min. 3 znakmi.');
        errorSubject = true;
    } else {
        setSuccessFor(subject);
        errorSubject = false;
    }


    if (textAreaValue === '' || textAreaValue.length < 10) {
        setErrorFor(textArea, 'Vyplnte text s min. 10 znakmi.');
        errorText = true;
    } else {
        setSuccessFor(textArea);
        errorText = false;
    }


    if (errorName === true || errorEmail === true || errorSubject === true || errorText === true) {
        e.preventDefault();
    }

});

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const smallTag = formControl.querySelector('small');

    smallTag.innerText = message;
    formControl.className = 'formControl errorCls'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'formControl successCls'
}

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function nameValid (name) {
    if (name.match(/^[a-zA-Z\\áéíóúôďťňľčžšdž]+$/)) {
        return true;
    } else {
        return false;
    }
}