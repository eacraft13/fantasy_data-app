$(function () {

    // start loading bar
    //
    // ajax request for data
    //
    // create thead from data
    //
    // create datatable

    $.ajax({
        url: 'https://api.fantasydata.net/nfl/v2/JSON/PlayerSeasonStats/2015REG',
        headers: {
            'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b'
        },
        crossDomain: true
    })
    .success(function(results) {
        console.log('Success', results);
    })
    .error(function(err) {
        console.log('Err', err);
    })
    .always(function() {
        console.log('complete');
    });


    $('#datatable').DataTable();
});
