/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/ComputerIcons.css');

var ComputerIcons = React.createClass({
    render: function () {
        var text = this.props.numOpponents + " BOT";
        var text = text + ((this.props.numOpponents > 1) ? "S" : "");
        return (
            <svg className="computer-icons"
                 height="50px" 
                 width="112px">
                <text textAnchor="middle" x="56" y="12">
                    {text}
                </text>
                {this.generateComputerIcon(0)}
                {this.generateComputerIcon(1)}
                {this.generateComputerIcon(2)}
            </svg>
        );
    },
    generateComputerIcon: function(num) {
        // if (num === 2 && this.props.numOpponents === 1) return;

        var isActivated = this.props.numOpponents > num;
        var translate = (38 * num) + " 18";

        var plusOrEx = (
            <polygon
                fill={num === 0 ? "none" : isActivated ? "red" : "black"}
                transform={isActivated ? "" : "rotate(45 23 23)"}
                points="19,25 21,27 23,25 25,27 27,25 25,23 27,21 25,19 23,21 21,19 19,21 21,23  "/>
        )
        return (
                <g transform={"translate(" + translate + ")"}>
                    <path fill={isActivated ? "black" : "#ddd"} d="M30.766,27.531C31.545,26.2,31.999,24.654,32,23c-0.001-3.121-1.589-5.868-4-7.482V2H4v18h10.522   c-0.226,0.638-0.387,1.306-0.464,2H4l-4,8h17.349c1.545,1.248,3.51,1.999,5.651,2c2.142-0.001,4.104-0.752,5.649-2H32   L30.766,27.531z M6,18V4h20v10.523C25.061,14.19,24.054,14,23,14c-3.122,0-5.869,1.588-7.483,4H6z M16.115,23   c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.883,6.885c-0.009,3.799-3.084,6.874-6.883,6.883   C19.199,29.874,16.124,26.799,16.115,23z"/>
                    {plusOrEx}
                    <circle className="computer-icon-selector" 
                            onClick={isActivated ? this.props.removeBot : this.props.addBot}
                            fill={num === 0 ? "none" : "white"}
                            opacity="0" stroke="none" r="9" cx="23" cy="23" />
                </g>
        )          
    }
});

module.exports = ComputerIcons;
