/*
@licstart  The following is the entire license notice for the 
JavaScript code in this page.

Copyright (C) 2013  Markus Benz

The JavaScript code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.

@licend  The above is the entire license notice
for the JavaScript code in this page.
*/

(function( $ ) {
  $.fn.accordionMenu = function() {
	var $this = this;
	$("ul:first", $this).addClass('acdnTop');
	$("ul:first li", $this).each(function(lfdnr, id) {
		$(id).contents().each(function(lfdnr, ele) { 
			if(ele.nodeType === 3 && $(ele).text().replace(/^\s+|\s+$/g, '') != "")
			{
				$(id).prepend($('<div class="acdnHeading"><div class="acdnArrowImage"></div>' + $(ele).text() + '</div>'));
				$(ele).remove();
			}
		});
	});
	$("ul:first > li", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnSeparator');
	});
	$("ul:first > li:last", $this).removeClass('acdnSeparator');
	$("ul:first > li > ul", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnSub');
	});
	$("a", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnLink').css('display', 'block');
	});
	$("ul:first > li div.acdnHeading", $this).click(function(obj) {
		if(!$(obj.target).hasClass('acdnCurrent')){
			$("ul", $(obj.target).parents("ul:first")).slideUp();
			$(".acdnCurrent", $(obj.target).parents("ul:first")).each(function(lfdnr, ele) {
				if(obj.target != ele)
					$(ele).removeClass('acdnCurrent');
			});
		}
		$(obj.target).toggleClass('acdnCurrent');
		$(this).nextAll('ul:first').slideToggle();
	});
	$('a', $this).each(function(lfdnr, ele) {
		if(window.location.href.indexOf($(ele).attr('href')) != -1) {
			$(ele).parents("ul:not(.acdnTop)").slideDown();
			$(ele).parents("ul > li", $this).each(function(lfdnr2, ele2) {
				$("div.acdnHeading",ele2).addClass('acdnCurrent');
			});
		}
	});

  };
})( jQuery );