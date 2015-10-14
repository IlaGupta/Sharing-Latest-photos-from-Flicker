


	


$(document).ready(function () 
	{
      $('form').submit(function (evt) 
	    {
		   evt.preventDefault();
		   var $searchField = $("#search");                //selecting the id =search
		  

		    var $submitButton = $("#submit");                 //disabling "search box" and "submit button" till the time its searching.its friendly for user to see thats seacrhing is going on
            $searchField.prop("disabled" , true);		   
            $submitButton.attr("disabled" , true).val("searching...");		   



           
           var flickerUrl = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";    // "?jsoncallback=?" this is used for JSON padding, it lets you get around security limitation
           
           var animal = $searchField.val();
           var flickerOptions = {
           	tags : animal,                         // in flicker website (tags) is the parameter to filter what you need to search. (check -- https://www.flickr.com/services/feeds/docs/photos_public/)
           	format : "json"                        // this tells the flicker that in which format we want the data in. "json" format not "xml"
           };

           function displayPhotos (response)                           //response is the "javascript"data received from server. it is automatically converted to javascript because we are using "Jquery"
            {
                var photosHtml = "<ul>";
                $.each(response.items , function(i , photos)
                 {                 //$.each(array or object , function(i , value));
                 photosHtml += "<li class='grid-25 tablet-grid-50'>";          // response.items = response is the data received, which is "Object", so we have used {Object.propertyname(response.items)}. Check URL forreference
                 photosHtml += '<a href="' + photos.link + '" class="image">';    // "photos" is the value of the index[i] . (photos.propertname)
                 photosHtml += '<img src="' + photos.media.m +'"></a></li>';
                                                                 
                 });// end .each 
                  photosHtml += "</ul>"
                  $('#photos').html(photosHtml);

            $searchField.prop("disabled" , false);	 // enabling the "search box" and "submit button" for next search
            $submitButton.attr("disabled" , false);		   

                                          
            }

           $.getJSON(flickerUrl , flickerOptions , displayPhotos);
      	});//end submit

	});//end ready

