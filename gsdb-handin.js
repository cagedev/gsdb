jQuery( document ).ready(function( $ ) {

	// setup:
	// append invisible in modal? form to page under activecode
	// call form "foo"
//	console.log( $(".activecode") );
	console.log( $("[lang=python]") );

var handinButton = " \
<div class='ac_actions col-md-12'> \
<button class='btn btn-success' type='button' id='handin'>Inleveren</button> \
</div>";

var modalHTML = " \
<div class='modal fade' id='handinModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'> \
  <form id='handinForm'> \
	  <div class='modal-dialog' role='document'> \
	    <div class='modal-content'> \
	      <div class='modal-header'> \
	        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button> \
	        <h4 class='modal-title' id='myModalLabel'>Inleveren</h4> \
	      </div> \
	      <div class='modal-body'> \
	        <p> \
	          <label for='StudentName'>Naam:</label> \
	          <input id='StudentName' name='StudentName' type='text'/> \
	        </p> \
	        <input id='AssignmentId' name='AssignmentId' type='text' value='' /> \
	        <p> \
	          <label for='AssignmentData'>Code:</label><br/> \
	          <textarea id='AssignmentData' name='AssignmentData' cols='60' rows='10'></textarea> \
          </p> \
	      </div> \
	      <div class='modal-footer'> \
	        <p id='result'></p> \
	        <button type='button' class='btn btn-primary' id='submitDataButton'>Inleveren</button> \
	      </div> \
	    </div> \
	  </div> \
  </form> \
</div>";

//$("[lang=python]").append(" hello ");
$("[lang=python]").append(handinButton);
$("#main-content").prepend(modalHTML);


	// bind filling and showing modal to button
	$("#handin").click( function(){
	  console.log( $("[lang=python]").attr("id") );
		console.log( $("textarea") );
		$("#AssignmentId").val( $("[lang=python]").attr("id") );



		$('#handinModal').modal('show');
	});



	// variable to hold request
	var request;
	// bind to the submit event of our form
	$("#submitDataButton").click(function(event){
		// abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
//		var $form = $(this);
		var $form = $("#handinForm")
		console.log( $form );
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();

		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
		$inputs.prop("disabled", true);
		$('#result').text('Sending data...');

		// fire off the request to /form.php
		request = $.ajax({
      // exec: https://script.google.com/macros/s/AKfycbyDO5guqhXy4z71shpAIw0a5Nr58zB5k5kVdEBpGkQikOOsZNI/exec
      // dev:  https://script.google.com/macros/s/AKfycbwEPiif2fiRMXEL_iMaEYe6jhnP0_sjtFDWh93UPXA/dev
			url: "https://script.google.com/macros/s/AKfycbyDO5guqhXy4z71shpAIw0a5Nr58zB5k5kVdEBpGkQikOOsZNI/exec",
			type: "post",
			data: serializedData
		});

		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// log a message to the console
			$('#result').html('Gelukt! Ga nu door met de volgende opdracht.');
			console.log("Hooray, it worked!");
		});

		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			$('#result').html(errorThrown + ': Er is iets misgegeaan. Sluit dit venster niet en vraag om hulp.');
			// log the error to the console
			console.error(
				"De volgende fout is opgetreden: "+
				textStatus, errorThrown
			);
		});

		// callback handler that will be called regardless
		// if the request failed or succeeded
		request.always(function () {
			// reenable the inputs
			$inputs.prop("disabled", false);
		});

		// prevent default posting of form
		event.preventDefault();
	});
});
