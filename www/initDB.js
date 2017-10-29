var sessionsforage = localforage.createInstance({
    Name: "sessions",
    storeName: "sessions"
});

var speakersforage = localforage.createInstance({
    Name: "speakers",
    storeName: "speakers"
});

fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
.then(function(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
})
.then(function(JSONresponse){
    for(key in JSONresponse) {
        element = JSONresponse[key];
        speakersforage.setItem(String(element.id), element).then(function(elem){});
    }
})
.catch(function(error){
    console.log('casse...', error);
});

fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    })
    .then(function(JSONresponse){
        for(key in JSONresponse) {
            element = JSONresponse[key];
            sessionsforage.setItem(String(element.id), element).then(function(elem){});
        }
    })
    .catch(function(error){
        console.log('casse...', error);
    });