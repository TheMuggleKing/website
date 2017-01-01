//Check off todo
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Delete todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){ // Fades li
		$(this).remove(); //Remove li
	});
	event.stopPropagation(); //Prevents li event listener from firing
});

$("input").keypress(function(event){
	if(event.which===13){ //enter key
		var todoText = $(this).val()
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " +todoText+" </li>")
	}
});

$(".toggleInput").on("click", function(){
	$("input").fadeToggle();
	$(this).toggleClass("fa-minus fa-plus");
})