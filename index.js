'use strict';

//REQUIREMENTS 1 + 2

function getDogImage(numberEntry) {
    if (numberEntry === 3) {
        fetch('https://dog.ceo/api/breeds/image/random/3')
            .then(response => response.json())
            .then(responseJson => displayResults(responseJson))
            .catch(error => alert('Something went wrong. Try again later.'));
    } else if (numberEntry > 50 || numberEntry <= 0 ) {
        return alert('Please choose a number between 1 and 50')
    } else {
        fetch(`https://dog.ceo/api/breeds/image/random/${numberEntry}`)
            .then(response => response.json())
            .then(responseJson => displayResults(responseJson))
            .catch(error => alert('Something went wrong. Try again later.'));


    }
}

function displayResults(responseJson) {
    //display the results section
    $('#display-numbered-dog').removeClass('hidden');
    console.log(responseJson);
    let imageArray = responseJson.message;
    let display = getImages(imageArray);
    $('.dog-pics').html(display);
}

function getImages(imageArray) {
    let valueToReturn = '';
    for (let i = 0; i < imageArray.length; i++) {
        valueToReturn += `<img src="${imageArray[i]}" class="dog-pics">`
    }
    return valueToReturn;
}

function watchForm() {
    $('#dog-number-form').submit(event => {
        event.preventDefault();
        console.log('angela')
        let numberEntry = $('#dog-number').val();
        getDogImage(numberEntry);
        $('#dog-number').val('');

    });
}


//REQUIREMENT 3 - BREED ENTRY

function getDogBreedImage(breedEntry) {
    fetch(`https://dog.ceo/api/breed/${breedEntry}/images/random`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(responseJson => displayBreedResults(responseJson))
        .catch(error => alert("Something went wrong."));
}


function displayBreedResults(responseJson) {
    console.log(responseJson)
    $('#display-numbered-dog').removeClass('hidden');
    $('.dog-pics').html(`<img src="${responseJson.message}">`)
}


function watchBreedForm() {
    $('#dog-breed-form').submit(event => {
        event.preventDefault();
        let breedEntry = $('#dog-breed').val();
        getDogBreedImage(breedEntry);
        $('#dog-breed').val('');

    });
}


$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
    watchBreedForm();
});
