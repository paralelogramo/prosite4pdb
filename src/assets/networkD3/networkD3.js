//networkD3.js


import * as d3 from 'd3';

function networkD3() {
    let data;
    let svg;
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    let width = 960;
    let height = 500;
    let chartWidth;
    let chartHeight;

    function exports(_selection) {
        _selection.each(function(_data) {
            data = _data;
            chartHeight = height - margin.top - margin.bottom;
            chartWidth = width - margin.left - margin.right;

            buildSVG(this);
        });
    };

    function buildSVG(container) {
        if (!svg) {
            svg = d3.select(container)
                .append('svg')
                    .classed('network-graph', true);
        }

        svg
            .attr('width', width)
            .attr('height', height);
    };

    return exports;
};

export default networkD3;