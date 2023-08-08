(function ($) {
  $("tr").on("click", "td", function () {
    var $this = $(this);

    if (
      $this.context.parentElement.parentElement.parentElement.id === "input" &&
      $this.context.id.includes("input")
    ) {
      var $input = $("<input>", {
        value: $this.text(),
        type: "text",
        blur: function () {
          $this.text(cleanValue(this.value));
          calculateSum();
        },
        keyup: function (e) {
          if (e.which === 13) $input.blur();
        },
      })
        .appendTo($this.empty())
        .focus();
    }
  });

  $("tr").on("keyup", "td", function (event) {
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

      if (
        $this.context.parentElement.parentElement.parentElement.id ===
          "input" &&
        $this.context.id.includes("input")
      ) {
        var $input = $("<input>", {
          value: $this.text(),
          type: "text",
          blur: function () {
            $this.text(cleanValue(this.value));
            calculateSum();
          },
          keyup: function (e) {
            if (e.which === 13) $input.blur();
          },
        })
          .appendTo($this.empty())
          .focus();
      }
    }
    lastEvent = event;
  });
})(jQuery);

var lastEvent;

function calculateSum() {
  var feetInputElem = document.querySelectorAll('[id^="input_feet"]');
  var inchesInputElem = document.querySelectorAll('[id^="input_inches"]');
  var sumInchesElem = document.querySelectorAll('[id^="sum_inches"]');

  var sumTableFeetElem = document.getElementById("sumtbl_feet");
  var sumTableInchesElem = document.getElementById("sumtbl_inches");
  var sumTableTotalElem = document.getElementById("sumtbl_total");

  var sumTableFeet = 0;
  var sumTableInches = 0;

  for (let i = 0; i < sumInchesElem.length; i++) {
    var feetConv = parseFloat((feetInputElem[i].textContent || 0) * 12).toFixed(
      3
    );
    var inchConv = parseFloat(inchesInputElem[i].textContent || 0).toFixed(3);
    sumInchesElem[i].innerHTML = (
      parseFloat(feetConv) + parseFloat(inchConv)
    ).toFixed(3);
  }

  feetInputElem.forEach(function (elem) {
    sumTableFeet = parseFloat(elem.textContent || 0, 10) + sumTableFeet;
  });

  inchesInputElem.forEach(function (elem) {
    sumTableInches = parseFloat(elem.textContent || 0, 10) + sumTableInches;
  });

  sumTableFeetElem.innerHTML = sumTableFeet.toFixed(3);
  sumTableInchesElem.innerHTML = sumTableInches.toFixed(3);
  sumTableTotalElem.innerHTML = (
    parseFloat(sumTableFeet) * 12 +
    parseFloat(sumTableInches)
  ).toFixed(3);
}

// OLD regex just incase -->    /^\d*\.?\d*$/
window.addEventListener("input", function (e) {
  var testReg = /^-?\d*\.?\d*$/.test(e.target.value);
  e.target.value = testReg ? e.target.value : 0;
});

function cleanValue(value) {
  return !!value && /^-?\d*\.?\d*$/.test(value)
    ? parseFloat(value).toFixed(3)
    : !value
    ? ""
    : 0;
}
