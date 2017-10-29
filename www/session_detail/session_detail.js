var title_element = document.getElementById('title');
var description_element = document.getElementById('description');
var spk_title_element = document.getElementById('spk_title');
var ul_element = document.getElementById('speakers');
var current_id = localStorage.getItem('current_session');

var sessionsforage = localforage.createInstance({
    Name: "sessions",
    storeName: "sessions"
});

var speakersforage = localforage.createInstance({
    Name: "speakers",
    storeName: "speakers"
});

sessionsforage.getItem(current_id)
.then(function(currentItem)
{
    title_element.innerHTML = currentItem.title;
    if (currentItem.description) {
        description_element.innerHTML = currentItem.description;
    }
    speakers_list = currentItem.speakers;
    if(speakers_list) {
        spk_title_element.innerHTML = 'Présentateur(s) :';
        speakers_list.forEach(function(spk_id) {
            li = document.createElement('li');
            a = document.createElement('a');
            li.appendChild(a);
            ul_element.appendChild(li);
            speakersforage.getItem(String(spk_id)).then(function(item){
                a.innerHTML = item.name;
            });
            a.setAttribute('onClick', 'setPresentateurId('+String(spk_id)+')');
        })
    }
});

function setPresentateurId(id) {
    localStorage.setItem('current_speaker', id);
    window.location.replace("../speaker_detail/speaker_detail.html");
}