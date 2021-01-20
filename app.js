nextPaneId = 0;

function search(paneId){
    searchCriteria = document.querySelector(`div.scripture-pane[paneid="${paneId}"] div.card input`).value;
    document.querySelector(`div.scripture-pane[paneid="${paneId}"] div.card div.pane-content`).innerHTML = '<i class="bi bi-arrow-clockwise"></i>';

    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            updatePane(paneId, JSON.parse(this.responseText));
        }
    };
    req.open("GET", `https://bible-api.com/${searchCriteria}`, true);
    req.send();
}

function deletePane(paneId){
    paneToDelete = document.querySelector(`div.scripture-pane[paneid="${paneId}"]`);
    paneToDelete.parentElement.removeChild(paneToDelete);

    if(document.querySelector(`div.scripture-pane`) == null){
        newPane();
    }
}

function updatePane(paneId, response){
    pane = document.querySelector(`div.scripture-pane[paneid="${paneId}"] div.card div.pane-content`);
    pane.innerHTML = `
    <h3 class='card-title px-2'>${response.reference}</h3>
    <div class='card-text px-3'>${response.text}</div>`;
}

function newPane(){
    removePlus();

    paneElement = document.createElement('div');
    paneElement.classList.add(...['scripture-pane','col-3','px-2','my-2']);
    paneElement.setAttribute('paneid', nextPaneId);

    paneElement.innerHTML = `
    <div class="card p-2">
        <input class="form-control">
        <div class="row">
            <div class="col-6 my-2">
                <button class="btn btn-primary bi-search" onclick="search(${nextPaneId})"></button>
            </div>
            <div class="col-6 my-2">
                <button class="btn btn-danger bi-trash" onclick="deletePane(${nextPaneId})"></button>
            </div>
        </div>
        <div class="pane-content"></div>
    </div>`;

    document.querySelector('div#main').appendChild(paneElement);

    nextPaneId++;
    addPlus();
}

function removePlus(){
    plusButton = document.querySelector('button#btn-add-pane');
    if(plusButton){
        plusButton.parentElement.removeChild(plusButton);
    }
}

function addPlus(){
    plusButton = document.createElement('button');
    plusButton.id = 'btn-add-pane';
    plusButton.setAttribute('onclick', 'newPane()');
    plusButton.classList.add(...['btn','btn-secondary','m-2']);
    plusButton.innerHTML = `<i class='bi bi-plus'></i>`;

    document.querySelector('div#main').appendChild(plusButton);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    newPane();
});
