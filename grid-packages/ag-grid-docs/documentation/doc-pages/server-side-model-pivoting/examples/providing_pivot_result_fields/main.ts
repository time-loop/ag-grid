import { Grid, GridOptions, IServerSideDatasource } from '@ag-grid-community/core'
declare var FakeServer: any;
const gridOptions: GridOptions<IOlympicData> = {
    columnDefs: [
        { field: 'country', rowGroup: true },
        { field: 'year', pivot: true }, // pivot on 'year'
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: true,
    },
    autoGroupColumnDef: {
        minWidth: 200,
    },

    // use the server-side row model
    rowModelType: 'serverSide',

    // enable pivoting
    pivotMode: true,

    // specify the field separator, e.g. '2000_gold' should be '_' which is also the default
    serverSidePivotResultFieldSeparator: '_',

    suppressAggFuncInHeader: true,
    animateRows: true,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    new Grid(gridDiv, gridOptions)

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => {
            // setup the fake server with entire dataset
            const fakeServer = new FakeServer(data)

            // create datasource with a reference to the fake server
            const datasource = getServerSideDatasource(fakeServer)

            // register the datasource with the grid
            gridOptions.api!.setServerSideDatasource(datasource)
        })
})

function getServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: (params) => {
            console.log('[Datasource] - rows requested by grid: ', params.request)

            // get data for request from our fake server
            const response = server.getData(params.request)
            // simulating real server call with a 500ms delay
            setTimeout( () => {
                if (response.success) {
                    // supply data to grid
                    console.log('[Datasource] - pivotResultFields to be set in grid: ', response.pivotFields);
                    params.success({
                        rowData: response.rows,
                        rowCount: response.lastRow,
                        pivotResultFields: response.pivotFields,
                    })
                } else {
                    params.fail()
                }
            }, 500)
        },
    }
}