var body_element = document.getElementById('body');

var sessionsforage = localforage.createInstance({
    Name: "sessions",
    storeName: "sessions"
});

sessionsforage.length().then(function(length) {
    if(length > 0) {
        sessionsforage.iterate(function(value, key, iterationNumber) {
            appendTitle(key, value.title);
        })
    }
})

function appendTitle(id, title) {
    var div = document.createElement('div');
    div.setAttribute("class", "list-element");
    var elem = document.createElement('a');
    div.setAttribute('onClick', 'setSessionId('+id+')');
    elem.innerHTML = title;
    div.appendChild(elem);
    body_element.appendChild(div);
}

function setSessionId(id) {
    localStorage.setItem('current_session', id);
    window.location.replace('../session_detail/session_detail.html');
}

function refresh() {
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
        location.reload();
    })
    .catch(function(error){
        console.log('casse...', error);
    });
}