import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioButtonIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';

const _pad = (num) => (num < 10 ? '0' : '') + num

/*
 * Time line component
 */
class TimeLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.value ? props.value : null,
            rangeDelta: 0,
            countShownPoints: this.getShownPointsCount()
        };
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        return `${ _pad(day) }.${ _pad(month) }.${ year } ` +
            `${ _pad(hours) }:${ _pad(minutes) }:${ _pad(seconds) }`;
    }

    getShownPointsCount() {
        let w = window, d = document, e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;

        if (!x || x < 768) return 7;
        return 11;
    }

    handleValueChanged(currentValue) {
        const { onChange } = this.props;
        this.setState({ currentValue }, () => onChange(currentValue));
    }

    render() {
        const { classes, range } = this.props;
        const { currentValue, rangeDelta, countShownPoints } = this.state;

        let content = null;
        let buttonLeft = null;
        let buttonRight = null;

        if (range && range.length)
        {
            let endIndex = range.length - rangeDelta;
            let startIndex = endIndex - countShownPoints;
            if (startIndex < 0) startIndex = 0;
            let visiblePoints = range.slice(startIndex, endIndex);

            content = visiblePoints.map((point, idx) => (
                <Tooltip title={ this.formatDate(point) } key={ idx } placement="top">
                    <Radio
                        icon={ <RadioButtonIcon fontSize="small" /> }
                        checkedIcon={ <RadioButtonCheckedIcon fontSize="small" /> }
                        color="primary"
                        checked={ currentValue === point }
                        onChange={ () => this.handleValueChanged(point) }
                        className={ classes.point } />
                </Tooltip>
            ));

            if (countShownPoints < range.length)
            {
                buttonLeft = (
                    <IconButton className={ classes.button }>
                        <BackIcon />
                    </IconButton>
                );

                buttonRight = (
                    <IconButton className={ classes.button }>
                        <ForwardIcon />
                    </IconButton>
                );
            }
        }

        return (
            <div className={ classes.warpper }>
                <div className={ classes.upper }>
                    { buttonLeft }
                    <div className={ classes.pointsWrapper }>
                        <div className={ classes.points }>{ content }</div>
                    </div>
                    { buttonRight }
                </div>
                <div className={ classes.value }>{ this.formatDate(currentValue) }</div>
            </div>
        );
    }

}

/*
 * Styles
 */
const styles = theme => ({
    warpper: {
        margin: '0 auto',
        backgroundColor: 'white',
        border: '2px solid #666',
        borderRadius: 12,
        width: '590px',
        [theme.breakpoints.down(768)]: {
            width: '290px'
        }
    },
    upper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '40px',
        margin: '2px 2px 0 2px'
    },
    pointsWrapper: {
        position: 'relative',        
        overflow: 'hidden',
        width: '517px',
        [theme.breakpoints.down(768)]: {
            width: '210px'
        }
    },
    points: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    point: {
        padding: 9,
        [theme.breakpoints.down(768)]: {
            padding: 4
        }
    },
    value: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 500,
        color: '#333',
        margin: '0 0 10px 0'
    },
    button: {
        padding: 4
    }
});

/*
 * Properties
 */
TimeLine.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.object,
    range: PropTypes.array,
    onChange: PropTypes.func
};

/*
 * exporting
 */
export default withStyles(styles)(TimeLine);