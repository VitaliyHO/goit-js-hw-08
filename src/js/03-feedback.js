'use strict'

import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const feedbackFormData = {};

fillEmailField();
fillMessageField();


form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    const messageFromStorage = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    console.log(messageFromStorage)
    localStorage.removeItem(FEEDBACK_KEY);
};

email.addEventListener('input', throttle(onEmailInput, 500))
message.addEventListener('input', throttle(onMessageInput, 500))

function onEmailInput(event) {
    const emailName = event.target.name;
    const value = event.target.value;
    feedbackFormData[emailName] = value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackFormData));

};

function onMessageInput(event) {
    const messageKey = event.target.name;
    const value = event.target.value;
    feedbackFormData[messageKey] = value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackFormData));
};

function fillEmailField() {
    const savedValue = localStorage.getItem(FEEDBACK_KEY);
    if(savedValue){
        email.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).email;
        };
};

function fillMessageField() {
    const savedValue = localStorage.getItem(FEEDBACK_KEY);
    if(savedValue){
        message.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).message;
        };
}

