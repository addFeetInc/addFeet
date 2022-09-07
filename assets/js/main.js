(function($) {
	$('tr').on('click', 'td', function() {
		var $this = $(this);

		if($this.context.parentElement.parentElement.parentElement.id === 'input' && $this.context.id.includes('input')) {
			var $input = $('<input>', {
				value: $this.text(),
				type: 'text',
				blur: function() {
				   $this.text(this.value);
				   calculateSum();
				},
				keyup: function(e) {
					console.log(e);
				   if (e.which === 13) $input.blur();
				}}).appendTo( $this.empty() ).focus();
		}
	});

	$('tr').on('keyup', 'td', function(event) {
		// if(event.shiftKey && event.keyCode == 9) { 
		// // if(event.key === "Tab" && lastEvent?.key === "Shift" ) {
		// 	console.log('back tab');
		// 	var test = $(this);
		// 	$test = $(test.context.previousElementSibling);
		// 	console.log($test);

		// 	event.preventDefault();

		// 	if($test.context.parentElement.parentElement.parentElement.id === 'input' && $test.context.id.includes('input')) {
		// 		var $input = $('<input>', {
		// 			value: $test.text(),
		// 			type: 'text',
		// 			blur: function() {
		// 				$test.text(this.value);
		// 				calculateSum();
		// 			},
		// 			keyup: function(e) {
		// 				if (e.which === 13) $input.blur();
		// 			}}).appendTo( $test.empty() ).focus();
		// 	}
		// }
		// else 
		if (event.key === "Tab") {
			event.preventDefault();
			var $this = $(this);

			if($this.context.parentElement.parentElement.parentElement.id === 'input' && $this.context.id.includes('input')) {
				var $input = $('<input>', {
					value: $this.text(),
					type: 'text',
					blur: function() {
						$this.text(this.value);
						calculateSum();
					},
					keyup: function(e) {
						if (e.which === 13) $input.blur();
					}}).appendTo( $this.empty() ).focus();
			}
		}
		lastEvent = event;
	});
})(jQuery);

var lastEvent;

function calculateSum() {
	var feetInputElements = document.querySelectorAll('[id^="input_feet"]');
	var inchesInputElements = document.querySelectorAll('[id^="input_inches"]');
	var sumInchesElements = document.querySelectorAll('[id^="sum_inches"]');

	var sumTableFeetElem = document.getElementById('sumtbl_feet');
	var sumTableInchesElem = document.getElementById('sumtbl_inches');
	var sumTableTotalElem = document.getElementById('sumtbl_total');
	
	var sumTableFeet = 0;
	var sumTableInches = 0;

	for (let i = 0; i < sumInchesElements.length; i++) {
		var feetConv = parseInt((feetInputElements[i].textContent || 0) * 12, 10);
		var inchConv = parseInt(inchesInputElements[i].textContent || 0, 10);

		sumInchesElements[i].innerHTML = feetConv + inchConv;
	}

	feetInputElements.forEach(function(elem) {
		sumTableFeet = parseInt(elem.textContent || 0, 10) + sumTableFeet;
	});

	inchesInputElements.forEach(function(elem) {
		sumTableInches = parseInt(elem.textContent || 0, 10) + sumTableInches;
	});

	sumTableFeetElem.innerHTML = sumTableFeet;
	sumTableInchesElem.innerHTML = sumTableInches;
	sumTableTotalElem.innerHTML = (sumTableFeet * 12)  + sumTableInches;
}

window.addEventListener("input",function(e){
    e.target.value=parseFloat(e.target.value)||0;
});

// input.addEventListener("keypress", function(event) {
// 	if (event.key === "Enter") {
// 		event.preventDefault();
// 		console.log(event);
		
// 	}
// });