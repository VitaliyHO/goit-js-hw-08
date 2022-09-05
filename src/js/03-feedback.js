'use strict'

import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const feedbackFormData = checkStorage();

function checkStorage() {
    if(localStorage.getItem(FEEDBACK_KEY)){
        return JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    }
    return {};
}

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
    feedbackFormData.email = value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackFormData));
    console.log(feedbackFormData);

};

function onMessageInput(event) {
    const messageKey = event.target.name;
    const value = event.target.value;
    feedbackFormData[messageKey] = value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackFormData));
    console.log(feedbackFormData);
};

function fillEmailField() {
    const savedValue = JSON.parse(localStorage.getItem(FEEDBACK_KEY))

    if(savedValue){
        if(savedValue.email){
            email.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).email;
        }}else{
            email.value = '';
        };
};

function fillMessageField() {
    const savedValue = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    if(savedValue){
        if(savedValue.message){
            message.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).message;
        }}else{
            message.value = '';
        };
};

