var id = localStorage.getItem('current_session');

var notesforage = localforage.createInstance({
    Name: "notes",
    storeName: "notes"
});

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById('take').onclick = takePicture;
        document.getElementById('get').onclick = getPicture;
    }
};

app.initialize();

function takePicture() {
    navigator.camera.getPicture(data => {
        var div = document.getElementById('pics');
        var image = document.createElement('img');
        image.setAttribute("src", data);
        div.appendChild(image);
    }, error => {
        console.log('Error', error);
    }, {
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.CAMERA,
            quality: 100,
            targetHeight: 200,
            targetWidth: 200
        }
    )
}

function getPicture() {
    navigator.camera.getPicture(data => {
        var div = document.getElementById('pics');
        var image = document.createElement('img');
        image.setAttribute("src", data);
        div.appendChild(image);
    }, error => {
        console.log('Error', error);
    }, {
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            targetHeight: 200,
            targetWidth: 200
        }
    )
}


notesforage.getItem(id).then(function(item){
    if(item){
        note = document.getElementById('note');
        note.innerHTML = item;
    }
});

function saveNote() {
    note = document.getElementById('note').value;
    notesforage.setItem(id, note);
}