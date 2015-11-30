$(function () {

    // start loading bar
    //
    // ajax request for data
    //
    // create thead from data
    //
    // create datatable

    $.ajax({
        url: 'http://10.10.10.11:8000/nfl/v2/JSON/PlayerSeasonStats/2015REG'
    })
    .success(function(results) {
        var data = JSON.parse(results);
        var columns = _.keys(data[0]);

        // var $thead = $('#datatable > thead');
        // var $theadRow = $('<tr></tr>');
        //
        // _.each(columns, function(column) {
        //     $theadRow.append('<th>' + column + '</th>');
        // });
        //
        // $thead.append($theadRow);

        $('#datatable').DataTable({
            data: data,
            columns: _.map(columns, function(c) {
                return { data: c };
            })
        });
    })
    .error(function(err) {
        console.log('Err', err);
    });


});
