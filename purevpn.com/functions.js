// Main JS File

// Start Wrapper
jQuery(document).ready(function ($) {
    $(window).load(function () {

// Mobile Nav Menu
        $(function htMenuToggle() {

            $("#ht-nav-toggle").click(function () {
                $("#nav-primary-menu").animate({
                    height: "toggle",
                    opacity: "toggle"
                }, 400);
            });

        });

// HT fade in #ht-to-top
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#ht-to-top').fadeIn('1000');
                } else {
                    $('#ht-to-top').fadeOut('1000');
                }
            });

            // scroll body to 0px on click
            $('#ht-to-top').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        });


// Responsive Images
        $(function(){
            $('picture').picture();
        });




    });


    $('.fetch_api').click(function(){
        var that = $(this);
        var parent = $(that).parent();
        var response = $(that).parent().find(".response");
        $(this).slideUp();
        var post_id = $(this).data('postid');
        var url = $(this).data('url');
        $(response).html("  <span class='loading'>Loading</span>");

        $.ajax({
            url: url,
            type: "POST",

            data: {
                post_id: post_id
            },
            success: function( data, textStatus, jQxhr ){

                var obj = JSON.parse(data);
                //console.log(obj);

                if(obj.success) {
                    $(response).html("Success");
                    $(parent).slideUp();
                }
                if(obj.error) {
                    $(response).html("Error while fetching data !");
                }
                if(obj.image_exist){
                    $(response).html("Image already fetched !");
                    $(parent).slideUp();
                }

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
                $(response).html("No images found !");
            }
        })

    });


    /* Post Heading Tabas Start */
    function scrollToAnchor(aid) {

        if (typeof(aid) != "undefined" && aid !== null) {

            var aTag = $(aid);

            if (aTag.length == 0) {
                return;
            }
            var scrollToPosition = aTag.offset().top;
            if (scrollToPosition < 0) { scrollToPosition = 0 } // make sure it is not negative

            $('html, body').animate({ scrollTop: scrollToPosition },'fast');
        }
    }


    $(".tab_content").click(function () {
        var link_to = $(this).data("id");
        scrollToAnchor("#target_"+link_to);
        return false;

    });
});



//  End Wrapper
