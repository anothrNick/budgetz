
/*****GLOBAL VARIABLES(not safe)******/
var T_INCOME = 0;
var T_EXPENSE = 0;
var T_MORTGAGE = 0;

/******FUNCTIONS******/
function addExpense()
{
	var desc = $("#expensedesc").val();
	var amt = $("#expenseamt").val();
	T_EXPENSE += parseFloat(amt);
	
	$("#expenses").append(
			"<tr><td>"+desc+"</td><td>$"+amt+"</td><td><button class='close' onclick='removeLine(this)'>&times;</button></td></tr>"
		);
		
	$("#expensedesc").val('');
	$("#expenseamt").val('');
	$("#expensedesc").focus();
	
	updateTotal();
}

function addIncome()
{
	var desc = $("#incomedesc").val();
	var amt = $("#incomeamt").val();
	T_INCOME += parseFloat(amt);
	
	$("#income").append(
			"<tr><td>"+desc+"</td><td>$"+amt+"</td><td><button class='close' onclick='removeLine(this)'>&times;</button></td></tr>"
		);
	$("#incomedesc").val('');
	$("#incomeamt").val('');
	$("#incomedesc").focus();
	
	updateTotal();
}

function removeLine(src)
{
	var row = $(src).parent().parent();
	var budge = $(row).parent().parent().attr('id');
	$(row).remove();
	
	var amount = $($(row).find("td")[1]).text().replace("$","")
	console.log(amount);
	console.log(budge);
	if(budge==="expenses")
		T_EXPENSE -= parseFloat(amount);
	else if(budge==="income")
		T_INCOME -= parseFloat(amount);
	
	updateTotal();
}

function updateTotal()
{
	$("#tincome").text("$" + parseFloat(T_INCOME));
	$("#texpense").text("$" + parseFloat(T_EXPENSE));
	$("#tmortgage").text("$" + parseFloat(T_MORTGAGE));
	$("#total").text("$" + parseFloat(T_INCOME-T_EXPENSE-T_MORTGAGE));
}

/******EVENTS******/
$("#hprice").change(function(){
	var price = $(this).val();
	var down = $("#hdown").val();
	//console.log("Down: " + down);
	if(down!==""){
		var val = price * (down/100);
		$("#hmortgage").val(price-val);
		$("#hdollardown").val(val);
	}
});

$("#hdown").change(function(){
	var price = $("#hprice").val();
	var down = $(this).val();

	if(price!==""){
		var val = price * (down/100);
		$("#hmortgage").val(price-val);
		$("#hdollardown").val(val);
	}
});

window.onbeforeunload = function(e){
     return 'You will lose all your data!';
};

function createPDF()
{
	//budget pdf
	var doc = new jsPDF();

	doc.setFontSize(16);
	doc.setFillColor(230,230,230);
	doc.rect(8, 8, 194, 7, 'F');
	doc.text(10,13.2,"Monthly Budget");
	
	doc.setFontSize(14);
	doc.text(10,26,"Income");
	doc.line(10, 28, 200, 28); // horizontal line

	//INCOME
	doc.setFontSize(11);
	//every row,add 6
	var rows = $("#income").find("tr");
	console.log(rows);
	var yPos = 32;//+= 6
	for(var i = 1; i<rows.length; i++)
	{
		var row = rows[i];
		console.log(row);
		var cols = $(row).find("td");
		doc.setFillColor(230,230,230);
		doc.rect(12, yPos, 60, 5, 'F');
		doc.rect(73, yPos, 60, 5, 'F');
		doc.text(20,yPos+4,$(cols[0]).text());
		doc.text(80,yPos+4,$(cols[1]).text());
		yPos += 6;
	}

	//EXPENSES
	yPos += 10;
	doc.setFontSize(14);
	doc.text(10,yPos,"Expenses");
	doc.line(10,yPos+2, 200, yPos+2); // horizontal line

	rows = $("#expenses").find("tr");
	yPos += 6;
	doc.setFontSize(11);
	for(var i = 1; i<rows.length; i++)
	{
		var row = rows[i];
		var cols = $(row).find("td");
		doc.setFillColor(230,230,230);
		doc.rect(12, yPos, 60, 5, 'F');
		doc.rect(73, yPos, 60, 5, 'F');
		doc.text(20,yPos+4,$(cols[0]).text());
		doc.text(80,yPos+4,$(cols[1]).text());
		yPos += 6;
	}
	doc.setFillColor(230,230,230);
	//every row,add 6
	
	yPos += 10;
	doc.setFontSize(14);
	doc.text(10, yPos,"Mortgage");
	doc.line(10, yPos+2, 200, yPos+2); // horizontal line
	yPos += 10;
	doc.setFontSize(11);
	//House Price	% Down	% rate
	//Mortgage		$Down	taxes
	doc.setFillColor(230,230,230);
	//every row,add 6
	doc.text(12,yPos,"House Price");
	yPos += 6;
	doc.text(12,yPos,"Mortgage");
	yPos -= 6;
	doc.text(80,yPos,"% Down");
	yPos += 6;
	doc.text(80,yPos,"$  Down");
	yPos -= 6;
	doc.text(138,yPos,"Rate");
	yPos += 6;
	doc.text(138,yPos,"Taxes");
	
	yPos -= 10;
	doc.setFillColor(230,230,230);
	doc.rect(42, yPos, 30, 5, 'F');
	yPos += 6;
	doc.rect(42, yPos, 30, 5, 'F');
	yPos -= 6;
	doc.rect(100, yPos, 30, 5, 'F');
	yPos += 6;
	doc.rect(100, yPos, 30, 5, 'F');
	yPos -= 6;	
	doc.rect(158, yPos, 30, 5, 'F');
	yPos += 6;
	doc.rect(158, yPos, 30, 5, 'F');
	//86
	yPos += 14;
	doc.setFontSize(14);
	doc.text(10,yPos,"Break Down");
	doc.line(10, yPos+2, 200, yPos+2); // horizontal line

	yPos += 10;
	doc.setFontSize(11); 
	doc.text(12,yPos,"Total Income");
	yPos+=6;
	doc.text(12,yPos,"Total Expense");
	yPos+=6;
	doc.text(12,yPos,"Mortgage Payment");
	yPos+=6;
	doc.text(12,yPos,"Total Savings");
	
	doc.setFillColor(230,230,230);
	yPos -= 4;
	doc.rect(47, yPos, 30, 5, 'F');
	yPos -= 6;
	doc.rect(47, yPos, 30, 5, 'F');
	yPos -= 6;
	doc.rect(47, yPos, 30, 5, 'F');
	yPos -= 6;
	doc.rect(47, yPos, 30, 5, 'F');
	
	//data
	yPos += 4;
	doc.text(48,yPos,"$" + parseFloat(T_INCOME));
	yPos += 6;
	doc.text(48,yPos,"$" + parseFloat(T_EXPENSE));
	yPos += 6;
	doc.text(48,yPos,"$" + parseFloat(T_MORTGAGE));
	yPos += 6;
	doc.text(48,yPos,"$" + parseFloat(T_INCOME-T_EXPENSE-T_MORTGAGE));
	
	doc.save("budget.pdf");
}