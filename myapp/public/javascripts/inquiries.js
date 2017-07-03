function edit_row(row, inquiry) {
	var issue = inquiry.issue;
	var solution = inquiry.solution;
	var notes = inquiry.notes;
	var order_num = inquiry.order_num;


}

$(document).ready(function() {
	//https://stackoverflow.com/questions/18014009/jquery-unable-to-submit-dynamically-created-form
	$(".note-cell").bind("click", cellClick);
	//$(".update-btn").on("click", updateRow);
	$(".status-cell").bind("dblclick", statusClick)
});

$(document).on('click', '.update-btn', updateRow)




function cellClick(e) {

	if (e.currentTarget.contentEditable != null) {
		$(e.currentTarget).attr("contentEditable", true);
	} 
	else {
		$(e.currentTarget).append("<input type='text'>");
	}
}

function statusClick(e) {
	console.log(e.currentTarget.innerHTML);
	if (e.currentTarget.innerHTML == 'unresolved'){
		$(e.currentTarget).html('resolved');
	} 
	else {
		$(e.currentTarget).html('unresolved');
	}
}

function updateRow(e) {
	var form = $(e.currentTarget).parent()[0];
	var row = $(e.currentTarget).parent().parent().parent();
	var inquiryId = row.attr("id");
	var note_cells = $(".note-cell");
	var status_cells = $(".status-cell");

	var notes_value = $(row).find(note_cells).html();
	var status_value = $(row).find(status_cells).html();

	$(form).append("<input name='notes' type='hidden' value= '"+notes_value+"'>");
	$(form).append("<input name='status' type='hidden' value= '"+status_value+"'>");

	$(form).submit();
}
