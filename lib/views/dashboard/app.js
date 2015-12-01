$(function () {

    // start loading bar
    //
    // ajax request for data
    //
    // create thead from data
    //
    // create datatable

    $.ajax({
        url: 'http://10.10.10.11/nfl/v2/JSON/PlayerGameStatsByTeam/2015REG/5/NE'
    })
    .success(function(results) {
        var data = JSON.parse(results);
        var columns = _.keys(data[0]);

        var $thead = $('#datatable > thead');
        var $theadRow = $('<tr></tr>');

        _.each(columns, function(column) {
            $theadRow.append('<th>' + column + '</th>');
        });

        $thead.append($theadRow);

        $('#datatable').DataTable({
            data: data,
            columns: _.map(columns, function(c) {
                return { data: c };
            }),
            scrollX: true,
            scrollY: '300px',
            processing: true,
            stateSave: true
        });
    })
    .error(function(err) {
        console.log('Err', err);
    });


});
