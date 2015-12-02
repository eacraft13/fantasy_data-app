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
        var columns = _.map(_.keys(data[0]), function(val, key) {
            return {
                field: val,
                title: val.replace(/([a-z](?=[A-Z]))/g, '$1 '),
                sortable: true,
            };
        });

        $('#table').bootstrapTable({
            columns: columns,
            data: data,
            height: '600',
            striped: true,
            search: true,
            showExport: true,
            reorderableColumns: true,
            reorderableRows: true,
            pagination: true,
        });
    })
    .error(function(err) {
        console.log('Err', err);
    });


});
