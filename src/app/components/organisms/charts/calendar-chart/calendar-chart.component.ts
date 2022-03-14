import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
    selector: 'nwn-calendar-chart',
    templateUrl: './calendar-chart.component.html',
    styleUrls: ['./calendar-chart.component.css'],
})
export class CalendarChartComponent implements OnInit {
    @Input() 
    baselineCalendarData: any[];
    @Input() 
    baselineDropdownFilter: string | 'roi' | 'lift' | 'si' = 'roi';

    @Input() 
    currency 

    private svg: any;
    private numberOfWeeks = 48;
    private margin = { top: 100, right: 50, bottom: 50, left: 50 };
    private boundingWidth = 700 - this.margin.left - this.margin.right;
    private boundingHeight = 450 - this.margin.top - this.margin.bottom;

    constructor() { 
        // Initialization inside the constructor
        this.baselineCalendarData = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log(this.baselineDropdownFilter)
        for (let property in changes) {
            if (property === 'baselineCalendarData') {
              this.baselineCalendarData = changes[property].currentValue
              this.createSvg()
              this.drawBars(this.baselineCalendarData);
            }
            else if(property === 'baselineDropdownFilter'){
                this.createSvg()
                this.drawBars(this.baselineCalendarData);
            } 
        }
    }

    ngOnInit(): void {
        this.createSvg();
        this.drawBars(this.baselineCalendarData);
        //console.log(this.baselineCalendarData);
    }

    private createSvg(): void {
        d3.select('#baseCalendarSVG').remove();
        this.svg = d3
            .select('#calendarBaseChart')
            .append('svg').attr("id","baseCalendarSVG")
            // Wrapper
            .attr('width', this.boundingWidth + this.margin.left + this.margin.right)
            .attr('height', this.boundingHeight + this.margin.top + this.margin.bottom)
            // Bounds starting at 0X0 from margin left and top
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    private drawBars(data: any[]): void {
        var key = ''
        var label = ''
        if(this.baselineDropdownFilter == 'roi'){
            key = 'roi'
            label = 'ROI'
        }
        else if(this.baselineDropdownFilter == 'lift'){
            key = 'lift'
            label = 'Lift %'
        }
        else if(this.baselineDropdownFilter == 'asp'){
            key = 'asp'
            label = 'ASP'
        }
        // else if(this.baselineDropdownFilter == 'si'){
        //     key = 'si'
        //     label = 'Seasonality Index'
        // }
        const boundingHeight = this.boundingHeight;
        // Maxim value in the data to find the maximum bound dynamically
        const maximumDiscountInData = getMaxDiscount();
        function getMaxDiscount() {
            return Math.max(...data.map((d) => d.discount));
        }
        // Maxim value in the data to find the maximum bound dynamically
        const maximumROIInData = getMaxROI();
        function getMaxROI() {
            return Math.max(...data.map((d) => d[key]));
        }
        function getMinmumData(){
            var z = Math.min(...data.map((d) => d.roi))
            if(z > 0){
                return 0
            }
            else {
                return z - 2
            }
         }
 
         const minYaxisValue = getMinmumData()

        // List of groups
        const groups = data.map((d) => d.timePeriod);

        // List of unique months
        const months = data.map((d) => d.month);

        // Add X Axis - Time Period
        const xScale = d3
            .scaleBand()
            .domain(groups)
            .range([0, this.boundingWidth])
            .paddingInner(0.25)
            .paddingOuter(0.25);

        // Add X Axis - Months
        const xMonthScale = d3
            .scaleBand()
            .domain(months)
            .range([0, this.boundingWidth])
            .paddingInner(0.25)
            .paddingOuter(0.25);
        const xAxisGenerator = d3.axisBottom(xMonthScale);
        this.svg
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${this.boundingHeight})`)
            .call(xAxisGenerator)
            .call(d3.axisBottom(xMonthScale).tickSizeOuter(0));
        // X Axis Year
        this.svg
            .append('g')
            .selectAll('g')
            .data(data.filter((d, i) => !(i % 4)))
            .join('g')
            .append('text')
            .attr('class', 'label')
            .attr('x', (d: any) => (xMonthScale(d.month) ?? 0) + 6)
            .attr('y', this.boundingHeight + 32)
            .attr('text-anchor', 'start')
            .text((d: any) => d.year);

        // Add Y Axis - Discount Value
        const yScale = d3
            .scaleLinear()
            .domain([0, maximumDiscountInData + maximumDiscountInData / 10])
            .range([this.boundingHeight, 0])
            // To make sure the axis starts and ends on round numbers
            .nice();
        const yAxisGenerator = d3.axisLeft(yScale);
        this.svg
            .append('g')
            .attr('class', 'yAxis')
            .call(yAxisGenerator)
            .call(d3.axisLeft(yScale).tickFormat(d3.format('.0%')));

        // Add Y Right Axis - ROI
        const yRightScale = d3
            .scaleLinear()
            .domain([0, maximumROIInData + maximumROIInData / 10])
            .range([this.boundingHeight, 0])
            // To make sure the axis starts and ends on round numbers
            .nice();
        const yRightAxisGenerator = d3.axisRight(yRightScale);
        this.svg
            .append('g')
            .attr('class', 'yRightAxis')
            .attr('transform', 'translate(' + this.boundingWidth + ',0)')
            .call(yRightAxisGenerator)
            .call(d3.axisRight(yRightScale).tickFormat(d3.format('.1f')));

        // Show the bars
        this.svg
            .append('g')
            .attr('class', 'barChart')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d: any) => xScale(d.timePeriod))
            .attr('y', (d: any) => yScale(d.discount))
            .attr('yRoi', (d: any) => yRightScale(d[key]))
            .attr('name', (d: any) => d.name)
            .attr('width', xScale.bandwidth())
            .attr('height', (d: any) => this.boundingHeight - yScale(d.discount))
            .attr('fill', (d: any) =>
                d.seasonality === 'high'
                    ? '#0284C7'
                    : d.seasonality === 'med'
                    ? '#7DD3FC'
                    : d.seasonality === 'low'
                    ? '#E0F2FE'
                    : '#ffffff',
            )
            .attr('style', (d: any) => (d.holiday ? 'stroke:#075985;stroke-width:1' : ''))
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);

        // Show the line
        const line = d3
            .line()
            .x((d) => d[0])
            .y((d) => d[1]);

        const points: [number, number][] = data.map((d) => [
            (xScale(d.timePeriod) ?? 0) + xScale.bandwidth() / 2,
            yRightScale(d[key]),
        ]);
        // Line
        this.svg
            .append('g')
            .append('path')
            .data(data)
            .attr('fill', 'none')
            .attr('stroke', '#FFDC00')
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', 4)
            .attr('d', line(points));
        // Line points
        this.svg
            .append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => (xScale(d.timePeriod) ?? 0) + xScale.bandwidth() / 2)
            .attr('cy', (d: any) => yRightScale(d[key]))
            .attr('r', '6')
            .attr('fill', '#FFDC00')
            .attr('opacity', 0.1)
            .attr('yRoi', (d: any) => yRightScale(d[key]))
            .attr('yDiscount', (d: any) => yScale(d.discount))
            .attr('name', (d: any) => d.name)
            .attr('discount', (d: any) =>
                d.seasonality === 'high'
                    ? '#0284C7'
                    : d.seasonality === 'med'
                    ? '#7DD3FC'
                    : d.seasonality === 'low'
                    ? '#E0F2FE'
                    : '#ffffff',
            )
            .on('mouseover', mouseoverPoint)
            .on('mouseleave', mouseleavePoint);

        // Discount Depth axis label
        this.svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -50)
            .attr('y', -25)
            .attr('text-anchor', 'start')
            .text('Discount depth');

        // ROI axis label
        if(label.length >= 10){
            this.svg
            .append('text')
            .attr('class', 'label')
            .attr('id', 'rightAxisLabel')
            .attr('x', this.boundingWidth - 65)
            .attr('y', -25)
            .attr('text-anchor', 'start')
            .text(label);
        }
        else{
            this.svg
            .append('text')
            .attr('class', 'label')
            .attr('id', 'rightAxisLabel')
            .attr('x', this.boundingWidth)
            .attr('y', -25)
            .attr('text-anchor', 'start')
            .text(label);
        }


        const chart = this.svg;

        // Event handlers
        function mouseover(datum: any, index: any, nodes: any) {
            const xSubGroupPosition = parseFloat(d3.select(datum.target).attr('x'));
            const midPoint = xScale.bandwidth() / 2;

            // Calculate optimal co-ordinates for Indicator
            const xPositionForIndicator = xSubGroupPosition + midPoint;

            // Calculate optimal co-ordinates for tooltip
            const yBar = parseFloat(d3.select(datum.target).attr('y'));
            const yLine = parseFloat(d3.select(datum.target).attr('yRoi'));
            const xPositionForTooltip = xSubGroupPosition + midPoint - 72;
            const yPositionForTooltip = (yBar < yLine ? yBar : yLine) - 30;

            // Create a line
            chart
                .append('line')
                .attr('id', 'indicatorLine')
                .attr('x1', xPositionForIndicator)
                .attr('x2', xPositionForIndicator)
                .attr('y1', '0')
                .attr('y2', boundingHeight);

            // Create a blip for bar
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('y')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');
            // Create a blip for line
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('yRoi')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Update the tooltip
            d3.select('#calendarBase-tooltip')
                .style('opacity', '1')
                .style('left', xPositionForTooltip + 'px')
                .style('top', yPositionForTooltip + 'px');
            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarBase-tooltip')
                    .select('#base')
                    .text('Discount: ' + d3.format('.0%')(index.discount));
                d3.select('#calendarBase-tooltip')
                    .select('#baseColor')
                    .style('background-color', d3.select(datum.target).attr('fill'));
            } else {
                d3.select('#calendarBase-tooltip').select('#base').attr('class', 'hidden');
            }

            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarBase-tooltip')
                    .select('#si')
                    .text('Seasonality: ' + index.si + ' ('+ index.seasonality.toUpperCase() +')');
                d3.select('#calendarBase-tooltip')
                    .select('#seasonColor')
                    .style('background-color', d3.select(datum.target).attr('fill'));
            } else {
                d3.select('#calendarBase-tooltip').select('#si').attr('class', 'hidden');
            }

            if (index.holiday) {
                //console.log(index.holidayNames)
                d3.select('#calendarBase-tooltip')
                    .select('#holiday')
                    .attr('class', 'flex flex-row items-center space-x-2');
                d3.select('#calendarBase-tooltip')
                    .select('#holidayName')
                    .text('Holiday : ' + index.holidayNames);
            } else {
                d3.select('#calendarBase-tooltip').select('#holiday').attr('class', 'hidden');
            }
            d3.select('#calendarBase-tooltip')
                .select('#week')
                .text(index.name + ' - ' + index.timePeriod);
            d3.select('#calendarBase-tooltip')
                .select('#roi')
                .text(label+' : ' + index[key]);
        }

        function mouseleave(datum: any, index: any, nodes: any) {
            // Update the tooltip
            d3.select('#calendarBase-tooltip').style('opacity', '0');
            chart.selectAll('#indicatorLine').remove();
            chart.selectAll('#indicatorBlip').remove();
        }
        function mouseoverPoint(datum: any, index: any, nodes: any) {
            //console.log({ datum, index });
            const xPointPosition = parseFloat(d3.select(datum.target).attr('cx'));

            // Calculate optimal co-ordinates for Indicator
            const xPositionForIndicator = xPointPosition;

            // Calculate optimal co-ordinates for tooltip
            const yBar = parseFloat(d3.select(datum.target).attr('yDiscount'));
            const yLine = parseFloat(d3.select(datum.target).attr('cy'));
            const xPositionForTooltip = xPointPosition - 72;
            const yPositionForTooltip = (yBar < yLine ? yBar : yLine) - 30;

            // Create a line
            chart
                .append('line')
                .attr('id', 'indicatorLine')
                .attr('x1', xPositionForIndicator)
                .attr('x2', xPositionForIndicator)
                .attr('y1', '0')
                .attr('y2', boundingHeight);

            // Create a blip for line
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('cy')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Create a blip for bar
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('yDiscount')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Update the tooltip
            d3.select('#calendarBase-tooltip')
                .style('opacity', '1')
                .style('left', xPositionForTooltip + 'px')
                .style('top', yPositionForTooltip + 'px');
            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarBase-tooltip')
                    .select('#base')
                    .text('Discount: ' + d3.format('.0%')(index.discount));
                d3.select('#calendarBase-tooltip')
                    .select('#baseColor')
                    .style('background-color', d3.select(datum.target).attr('discount'));
            } else {
                d3.select('#calendarBase-tooltip').select('#base').attr('class', 'hidden');
            }

            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarBase-tooltip')
                    .select('#si')
                    .text('Seasonality: ' + index.si + ' ('+ index.seasonality.toUpperCase() +')');
                d3.select('#calendarBase-tooltip')
                    .select('#seasonColor')
                    .style('background-color', d3.select(datum.target).attr('discount'));
            } else {
                d3.select('#calendarBase-tooltip').select('#si').attr('class', 'hidden');
            }

            if (index.holiday) {
                d3.select('#calendarBase-tooltip')
                    .select('#holiday')
                    .attr('class', 'flex flex-row items-center space-x-2');
                d3.select('#calendarBase-tooltip')
                    .select('#holidayName')
                    .text('Holiday : ' + index.holidayNames);
            } else {
                d3.select('#calendarBase-tooltip').select('#holiday').attr('class', 'hidden');
            }
            d3.select('#calendarBase-tooltip')
                .select('#week')
                .text(index.name + ' - ' + index.timePeriod);
            d3.select('#calendarBase-tooltip')
                .select('#roi')
                .text(label+' : ' + index[key]);
        }

        function mouseleavePoint(datum: any, index: any, nodes: any) {
            // Update the tooltip
            d3.select('#calendarBase-tooltip').style('opacity', '0');
            chart.selectAll('#indicatorLine').remove();
            chart.selectAll('#indicatorBlip').remove();
        }
    }
}
