function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Send email capture form to GetSiteControl
function registerNewsletterToWidget() {
	var analyticsID = readCookie("analytics_id");
	var emailAddress = document.forms["newsletterForm"].elements["email"].value;
	var location = window.location.href;
	var data = '{"form_info":{"form_uid":"fbfbec69-c00d-4b01-9e3c-10a08a168d75","form_page":1,"form_pages":1},"form":{"email":[{"value":"'+emailAddress+'"}]},"user":{"analytics_id":"'+analyticsID+'"},"widget":379802,"location":"'+location+'"}'; 

	if (/\S+@\S+\.\S+/.test(emailAddress)) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://app.getsitecontrol.com/api/v1/submit?ts=1549994397112", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	// Add analytics_id to GetSiteControl widget data submitted
	var analyticsID = readCookie("analytics_id");
	_gscq.push(['user','analytics_id', analyticsID]);
	
	// Override the Salesforce email capture form
	if (typeof document.forms['newsletterForm'] != 'undefined') {
	    document.forms['newsletterForm'].onsubmit = registerNewsletterToWidget;
	}
	
	// Adapt the loan duration for low amounts (<5000 EUR)
		/*
	var loanTenureUpdate = function(element) {
		var target = element.currentTarget;
		var loanAmount = target.value;
		if (window.location.href.indexOf("/pret-personnel") > -1 || window.location.href.indexOf("/persoonlijke-lening") > -1 ) {
		if (loanAmount <= 5000) $('#loan-tenure').val(24);
		else if (loanAmount > 5000) $('#loan-tenure').val(36);
	    }
	    document.getElementById("loan-tenure").dispatchEvent(new Event('change'));
	};
	$("#loan-amount").change(loanTenureUpdate);
	$("#loan-slider").change(loanTenureUpdate);
	*/
	// Change logos on the front page
	if (window.location.pathname == "/fr" || window.location.pathname == "/nl" ) {
	    $(".cc-provider__list").find("img").eq(4).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/kbc.png");
	    $(".cc-provider__list").find("img").eq(8).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/bpostBank.png");
	    $(".cc-provider__list a[href='/fr/fournisseurs/bnp-paribas-fortis']").attr("href", "/fr/fournisseurs/kbc");
	    $(".cc-provider__list a[href='/fr/fournisseurs/elantis']").attr("href", "/fr/fournisseurs/bpost-bank");
	    $(".cc-provider__list a[href='/nl/aanbieders/bnp-paribas-fortis']").attr("href", "/nl/aanbieders/kbc");
	    $(".cc-provider__list a[href='/nl/aanbieders/elantis']").attr("href", "/nl/aanbieders/bpost-bank");
	    $(".cc-provider__list").find("img").eq(4).prop("alt", "KBC");
	    $(".cc-provider__list").find("img").eq(8).prop("alt", "bpost bank");
	}
	
}, false);
