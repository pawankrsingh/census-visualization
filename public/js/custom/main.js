function counter()
{
    var myURL = "/counter";
    $.ajax({
        type: 'GET',
        url: myURL,
        async: false,
        dataType: 'json',
        crossDomain: true,
        success: function( response , textStatus, xhr) {
            console.log(response.counter);
            var element = document.getElementById("site-visit-counter");
            element.innerHTML = response.counter;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown); }
     });


}
