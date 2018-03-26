console.log("Hej");

var htmlElement = document.querySelector("#message-box");

var successButton = document.querySelector("#success");
successButton.addEventListener("click", buttonFunction);

var errorButton = document.querySelector("#error");
errorButton.addEventListener("click", buttonFunction);

var infoButton = document.querySelector("#info");
infoButton.addEventListener("click", buttonFunction);

function buttonFunction(){
	console.log("Button pressed");
	htmlElement.className=this.id;
}

//Uppgift 2-----------------------------------------------------------------------------------------
var addItemButton = document.querySelector("#add-item");
addItemButton.addEventListener("click",promt);

function promt(){	
	// Skapar ett <li>-element
	var li = document.createElement("li");
	// Skapar en text-nod, alltså det som ska stå i paragrafen.	Texten skrivs in av användaren
	var input = window.prompt("Skriv in en text");
	if(input != null ){
		var textNode = document.createTextNode(input);
		// Lägg till text-noden till list-paragrafen
		li.appendChild(textNode)
		// Lägger till paragrafen som ett barn till elementet <ul id=items>
		document.querySelector("#items").appendChild(li);
	}
}

//Uppgift 3------------------------------------------------------------------------------------------

var removeItemButton = document.querySelector("#remove-item");
removeItemButton.addEventListener("click", removeListItem);

function removeListItem(){
	var d = document.getElementById("items");
	if(d.childElementCount > 0){
		d.removeChild(d.lastElementChild);
	}
}

//Uppgift 4-------------------------------------------------------------------------------------------------------

