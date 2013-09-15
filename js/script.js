function addExpense()
{
	var desc = $("#desc").val();
	var amt = $("#amt").val();
	
	$("#expenses").append(
			"<div class='span6'>"+desc+":  $"+amt+"&nbsp;<i class='remove icon-remove-circle'></i></div><br/>"
		);
}

$("#expenses" ).on( "hover", ".remove", function() {
	$(this).toggleClass("icon-remove-circle");
	$(this).toggleClass("icon-remove-sign");
});