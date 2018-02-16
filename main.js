var menuShow = false; 																	//Boolean to se if menu is showing or is hidden
var styleList;
style();									 										
	
window.onload = function(){																//Function that runs after page has loaded.
	styleList = document.querySelector("select");
	document.querySelector("select").addEventListener("change", changeStyle, false); 	//Adds listener to style dropdown	
	styleList.value = localStorage.getItem("style");
	document.querySelector("#menubutton").addEventListener("click", showMenu, false);
	style();
}


function changeStyle(){																	//Function that runs when style dropdown has been changed by user
	document.querySelector("#style").setAttribute("href","style"+styleList.value+".css");
	localStorage.setItem("style", styleList.value);											//Saves selected value in locakStorage
}	

function style(){
	if(localStorage.getItem("style") != null){ 												//Find stored color style in localStorage and overides it in HTML file.
		document.querySelector("#style").setAttribute("href","style"+localStorage.getItem("style")+".css");
		styleList.value = localStorage.getItem("style");
	}else {
		document.querySelector("#style").setAttribute("href","stylegrey.css");
		styleList.value = "grey";
	}
}

function showMenu(){																	//Function that runs when menu button is pressed in mobile view
	var menuItems = document.querySelectorAll(".menu");									//Saves all elements in nav (with class name "menu") in an array
	if(menuShow==true){
		menuShow=false;
		for(var i = 0; i < menuItems.length; i++){										//Runs through all elements in nav (exept menu element) 
			menuItems[i].setAttribute("style", "display: none");						//Change attribute in CSS file to display: none for selected element
		}
	} else {
		menuShow=true;
		for(var i = 0; i < menuItems.length; i++){										//Runs through all elements in nav (exept menu element)
			menuItems[i].setAttribute("style", "display: inline");						//Change attribute in CSS file to display: inline for selected element
		}
	}
}

window.onresize = function(event){
	var menuItems = document.querySelectorAll(".menu");
	if(document.documentElement.clientWidth >480){
		for(var i = 0; i < menuItems.length; i++){
			menuItems[i].setAttribute("style", "display: inline");
		}
	}else{
		for(var i = 0; i < menuItems.length; i++){										
			menuItems[i].setAttribute("style", "display: none");						
		}
	}
}