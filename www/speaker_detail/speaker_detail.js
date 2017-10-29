var name_element = document.getElementById('name');
var biographie_element = document.getElementById('biographie');
var img_element = document.getElementById('image');
var ul_element = document.getElementById('presentation');
var current_id = localStorage.getItem('current_speaker');
var speaker;

var sessionsforage = localforage.createInstance({
    Name: "sessions",
    storeName: "sessions"
});

var speakersforage = localforage.createInstance({
    Name: "speakers",
    storeName: "speakers"
});

speakersforage.getItem(current_id)
.then(function(currentItem)
{
    name_element.innerHTML = currentItem.name;
    img_element.setAttribute('src', 'https://devfest.gdgnantes.com/'+currentItem.photoUrl);
    biographie_element.innerHTML = currentItem.bio;

    sessionsforage.iterate(function(value, key, iterationNumber) {
        if (value.speakers && my_contains(value.speakers, current_id)) {
            li = document.createElement('li');
            a = document.createElement('a');
            li.appendChild(a);
            ul_element.appendChild(li);
            a.innerHTML = value.title;
            a.setAttribute('onClick', 'setSessionId('+key+')');
        }
    })

    contactCheckbox = document.getElementById("contact-chk");
    console.log(contactCheckbox.value);
    console.log(currentItem);
    speaker = currentItem;
    contactCheckbox.setAttribute('onClick', 'manageContact("'+contactCheckbox.value+'")');
});

function manageContact(action) {
    console.log(action);
    console.log(speaker);

    speaker.name
    speaker.company
    speaker.shortBio
    speaker.socials

    var contact = navigator.contacts.create({
        //id: speaker.id,
        "displayName": speaker.name,
        "name": speaker.name,
        "note": speaker.shortBio,
        "urls": speaker.socials,
        "organizations": [speaker.company]
    });

    console.log(contact);
    try {
        contact.save();
    } catch (e) {
        console.log(e.message);
    }
}

function setSessionId(id) {
    localStorage.setItem('current_session', id);
    window.location.replace("../session_detail/session_detail.html");
}

function my_contains(list, att) {
    for (spk in list) {
        if (list[spk] == att) return true;
    }
    return false;
}