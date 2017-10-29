var body_element = document.getElementById('body');

var speakersforage = localforage.createInstance({
    Name: "speakers",
    storeName: "speakers"
});

speakersforage.length().then(function(length) {
    if(length > 0) {
        speakersforage.iterate(function(value, key, iterationNumber) {
            appendName(key, value.name);
        })
    }
})

function appendName(id, name) {
    var div = document.createElement('div');
    div.setAttribute("class", "list-element");
    var elem = document.createElement('a');
    div.setAttribute('onClick', 'setPresentateurId('+id+')');
    elem.innerHTML = name;
    div.appendChild(elem);
    body_element.appendChild(div);
}

function setPresentateurId(id) {
    localStorage.setItem('current_speaker', id);
    window.location.replace('../speaker_detail/speaker_detail.html');
}

function refresh() {
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
        location.reload();
    })
    .catch(function(error){
        console.log('casse...', error);
    });
}