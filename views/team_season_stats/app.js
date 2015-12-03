$(function () {

    // start loading bar
    //
    // ajax request for data
    //
    // create thead from data
    //
    // create datatable

    $.ajax({
        url: '/api/nfl/v2/JSON/TeamSeasonStats/2015'
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

        $('.loading').hide();
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
