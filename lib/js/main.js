// firebase messages
//Set database object
var database = firebase.database().ref();
//button executes this function
function sendMessage(){
	var name = $("#username").val();
	if(name.length<1){
		name = "me";
	}
	var message = $("#message").val();
	if(message.length<1){
		throw new Error("No text in message to be sent");
	}
	//clearing data
	$("#message").val("");

	var style = getStyle();
    //Update database here
    var value = {
        NAME: name,
		MESSAGE: message,
		STYLE: style
    } 
    database.push(value);
}

database.on("child_added", function(rowData){
    var row = rowData.val();
    var name = row.NAME;
	var message = row.MESSAGE;
	var style = row.STYLE;
	addMessage(name, message, style);
})

let getStyle = function(){
	// gets style from <select> inputs and returns string of the values
	let output = "";
	$("select").each((key, val)=>{
		output+=$(val).val();
	});
	return output;
}

let addMessage = function(_username, _message, style){
	// adds message to board
	let div = $("<div />");
	let username = $("<p/>").text(_username+":");
	username.addClass("message_username");
	div.append(username);
	
	let message = $("<p/>").text(_message);
	message.addClass("message_message");
	
	let styles = style.split("");
	styles.forEach(x=>{
		switch(x){
			case "A":
				message.css("font-family", "ariel");
				break;
			case "B":
				message.css("font-family", "comic sans");
				break;
			case "C":
				message.css("font-family", "sans-serif");
				break;
			case "D":
				message.css("font-family", "pix");
				break;
			case "E":
				message.css("color", "black");
				break;
			case "F":
				message.css("color", "red");
				break;
			case "G":
				message.css("color", "blue");
				break;
			case "H":
				message.css("color", "green");
				break;
			case "I":
				break;
			case "J":
				message.css("font-weight", "bold");
				break;
			case "K":
				message.css("font-style", "italic");
				break;
			case "L":
				message.css("text-decoration", "underline");
				break;
			default:
				console.log("Error with parsing style");
		}

	});

	div.append(message);

	$(".chatroom-container").append(div);
}

// tabbed content
// https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_tabulators_active

$( document ).ready(function() {
    // setting random visitor number
    $("#number").text(myRandom(200,5000));

    // Variables
	var clickedTab = $(".tabs > .active");
	var tabWrapper = $(".tab__content");
	var activeTab = tabWrapper.find(".active");
	var activeTabHeight = activeTab.outerHeight();
	
	// Show tab on page load
	activeTab.show();
	
	// Set height of wrapper on page load
	tabWrapper.height(activeTabHeight+20);
	
	$(".tabs > li").on("click", function() {
		
		// Remove class from active tab
		$(".tabs > li").removeClass("active");
		
		// Add class active to clicked tab
		$(this).addClass("active");
		
		// Update clickedTab variable
		clickedTab = $(".tabs .active");
		
		// fade out active tab
		activeTab.fadeOut(250, function() {
			
			// Remove active class all tabs
			$(".tab__content > li").removeClass("active");
			
			// Get index of clicked tab
			var clickedTabIndex = clickedTab.index();

			// Add class active to corresponding tab
			$(".tab__content > li").eq(clickedTabIndex).addClass("active");
			
			// update new active tab
			activeTab = $(".tab__content > .active");
			
			// Update variable
			activeTabHeight = activeTab.outerHeight();
			
			// Animate height of wrapper to new tab height
			tabWrapper.stop().delay(50).animate({
				height: activeTabHeight
			}, 500, function() {
				
				// Fade in active tab
				activeTab.delay(50).fadeIn(250);
				
			});
		});
	});
});