import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioButtonIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Tooltip from '@material-ui/core/Tooltip';

const SHOWN_POINTS_COUNT = 10;
const _pad = (num) => (num < 10 ? '0' : '') + num

/*
 * Time line component
 */
class TimeLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.value ? props.value : null,
            rangeDelta: 0
        };

        this.formatDate = (date) => {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            return `${ _pad(day) }.${ _pad(month) }.${ year } ` +
                `${ _pad(hours) }:${ _pad(minutes) }:${ _pad(seconds) }`;
        };
    }

    handleValueChanged(currentValue) {
        const { onChange } = this.props;
        this.setState({ currentValue }, () => onChange(currentValue));
    }

    render() {
        const { classes, range } = this.props;
        const { currentValue, rangeDelta } = this.state;

        let content = null;
        if (range && range.length)
        {
            let endIndex = range.length - rangeDelta;
            let startIndex = endIndex - SHOWN_POINTS_COUNT;
            if (startIndex < 0) startIndex = 0;
            let visiblePoints = range.slice(startIndex, endIndex);

            content = visiblePoints.map((point, idx) => (
                <Tooltip title={ this.formatDate(point) } key={ idx } placement="top">
                        <Radio
                            icon={ <RadioButtonIcon fontSize="small" /> }
                            checkedIcon={ <RadioButtonCheckedIcon fontSize="small" /> }
                            color="primary"
                            checked={ currentValue === point }
                            onChange={ () => this.handleValueChanged(point) } />
                </Tooltip>
            ));
        }

        return (
            <div className={ classes.warpper }>
                <div className={ classes.points }>
                    { content }
                </div>
                <div className={ classes.value }>
                    { this.formatDate(currentValue) }
                </div>
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
        minWidth: '590px',
        [theme.breakpoints.down(768)]: {
            minWidth: '290px'
        }
    },
    points: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '40px',
        margin: '10px 10px 0 10px'
    },
    value: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 500,
        color: '#666',
        margin: '0 10px 10px 10px'
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