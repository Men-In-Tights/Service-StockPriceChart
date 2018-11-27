import React from 'react';
import styles from './style.css';

const moment = require('moment');

const Chart = (props) => {
  const viewBoxWidth = 630;
  const viewBoxHeight = 200;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  const totalXPoints = (18 - 9) * 60 / 5;
  const xInterval = (viewBoxWidth - 120) / totalXPoints; // 130 check line 20

  function convertToYAxis(input) {
    const digits = Math.floor(props.state.priceData[0].price).toString().length;
    const base = Math.pow(10, digits);
    return (viewBoxHeight - 17) - (input / base * viewBoxHeight) * 0.83;
  }

  let renderThis = '';
  let xAxis = 20; //  20
  const coordinates = [];

  props.state.priceData.forEach((ele, i) => {
    let circleObj = {};
    if (i !== 0) {
      xAxis += Math.round(xInterval * 1000) / 1000;
    }
    const xAxisStr = xAxis.toString();
    const yAxis = convertToYAxis(ele.price);
    circleObj.cx = xAxis;
    circleObj.cy = yAxis;
    circleObj.date = ele.date;
    circleObj.price = ele.price;
    coordinates.push(circleObj);
    renderThis += `${xAxisStr},${yAxis.toString()} `;
  });

  function handleMouseEnter(e) {
    const coorX = e.target.getAttribute('x');
    const circleElement = document.getElementById(coorX);
    props.handlePriceChange(circleElement.getAttribute('data-price'));
  }

  const barEventListener = coordinates.map((ele) => {
    return (
      <g key={ele.cx}>
        <rect className={styles.rectangle} width={xInterval} height="100%" x={ele.cx} onMouseEnter={(e) => handleMouseEnter(e)} />
        <circle id={ele.cx} stroke="#FFFFFF" strokeWidth="2" className={styles.circle} cx={ele.cx} cy={ele.cy} data-price={ele.price} r="4" />
        <text className={styles.tooltip} x={ele.cx - 20} y="10">
          {moment(ele.date).format('h:mm A')} ET
        </text>
        <line className={styles.timeLine} x1={ele.cx} y1="15" x2={ele.cx} y2={viewBoxHeight - 10} />
      </g>
    );
  });

  return (
    <div>
      <svg viewBox={viewBox} className={styles.chart}>
        <polyline fill="none" stroke="#cea774" strokeWidth="1" points={renderThis} />
        {barEventListener}
      </svg>
    </div>
  );
};

export default Chart;
