var id = localStorage.getItem('current_session');

var notesforage = localforage.createInstance({
    Name: "notes",
    storeName: "notes"
});

var sessionsforage = localforage.createInstance({
    Name: "sessions",
    storeName: "sessions"
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
        image.setAttribute("id", data);
        image.setAttribute("onClick", "displayModale('"+data+"')");
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
        image.setAttribute("id", data);
        image.setAttribute("onClick", "displayModale('"+data+"')");
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

var current_image;

function displayModale(image_id) {
    current_image = image_id;
    document.getElementById("image-action").style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
}

function deleteImage() {
    document.getElementById(current_image).remove();
    document.getElementById("image-action").style.visibility = "hidden";
    document.getElementById("background").style.visibility = "hidden";
}

function shareImage() {
    sessionsforage.getItem(localStorage.getItem('current_session'))
    .then(function(currentItem)
    {
        window.plugins.socialsharing.shareViaEmail(
            document.getElementById("note").value,
            'Notes about ' + currentItem.title,
            null,
            null,
            null,
            [document.getElementById(current_image).src],
            onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
            onError // called when sh*t hits the fan
        );
        document.getElementById("image-action").style.visibility = "hidden";
        document.getElementById("background").style.visibility = "hidden";
    });
}

function onSuccess(success) {
    console.log('SUCCESS');
}
function onError(error) {
    console.log('ERROR');
}

function cancelAction() {
    document.getElementById("image-action").style.visibility = "hidden";
    document.getElementById("background").style.visibility = "hidden";
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