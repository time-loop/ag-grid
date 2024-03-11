import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/styles/ag-grid.css';
import "@ag-grid-community/styles/ag-theme-quartz.css";
import SimpleCellRenderer from './simpleCellRendererVue.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { getData } from './data.js';

ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const VueExample = {
    template: `
        <div style="height: 100%">
                <ag-grid-vue                
                style="width: 100%; height: 100%;"
                :class="themeClass"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :groupDisplayType="groupDisplayType"
                :suppressRowClickSelection="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowSelection="rowSelection"
                :groupSelectsChildren="true"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        SimpleCellRenderer
    },
    data: function () {
        return {
            columnDefs: [{
                headerName: "Country Group - No Renderer",
                showRowGroup: "country",
                minWidth: 250
            }, {
                headerName: "All Groups - No Renderer",
                showRowGroup: true,
                minWidth: 240
            }, {
                headerName: "Group Renderer A",
                showRowGroup: true,
                cellRenderer: "agGroupCellRenderer",
                minWidth: 220
            }, {
                headerName: "Group Renderer B",
                field: "city",
                showRowGroup: true,
                cellRenderer: "agGroupCellRenderer",
                minWidth: 220
            }, {
                headerName: "Group Renderer C",
                field: "city",
                minWidth: 240,
                showRowGroup: true,
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: {
                    "suppressCount": true,
                    "checkbox": true,
                    "innerRenderer": 'SimpleCellRenderer',
                    "suppressDoubleClickExpand": true,
                    "suppressEnterExpand": true
                }
            }, {
                headerName: "Type",
                field: "type",
                rowGroup: true
            }, {
                headerName: "Country",
                field: "country",
                rowGroup: true
            }, {
                headerName: "City",
                field: "city"
            }],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 120,
            },
            rowData: null,
            groupDisplayType: null,
            groupDefaultExpanded: null,
            rowSelection: null,
            themeClass: /** DARK MODE START **/document.documentElement.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/,
        }
    },
    created() {
        this.rowData = getData();
        this.groupDisplayType = 'custom';
        this.groupDefaultExpanded = 1;
        this.rowSelection = 'multiple'
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;

        },
    }
}


new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
