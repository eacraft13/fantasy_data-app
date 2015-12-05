$(function () {

    $.ajax({
        url: '/api/nfl/v2/JSON/LastCompletedWeek'
    })
    .success(function(lastCompletedWeek) {

        $('p.lead').html('Defense Projection Game Stats - Week ' + lastCompletedWeek);

        async.parallel(
            _.map(_.range(lastCompletedWeek), function(week) {
                return function(callback) {
                    $.ajax({ url: '/api/nfl/v2/JSON/FantasyDefenseProjectionsByGame/2015/' + (week + 1) })
                    .success(function(results) {
                        callback(null, JSON.parse(results));
                    })
                    .error(function(err) {
                        callback(err);
                    });
                };
            }),
            function(err, results) {
                var blacklist = ['ScoringDetails', 'GameKey', 'SeasonType', 'IsGameOver', 'PlayerID', 'TeamGameID'];
                var data = [].concat.apply([], results);
                var columns = _.map(_.keys(data[0]), function(val, key) {
                    return {
                        field: val,
                        title: val.replace(/([a-z](?=[A-Z\d]))/g, '$1 '),
                        sortable: true,
                        visible: _.includes(blacklist, val) ? false : true
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
                    pagination: true
                });
            }
        );

    });

});
