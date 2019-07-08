import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

/*
 * Time line component
 */
class TimeLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentValue: null
        };
    }

    handleValueChanged(currentValue) {
        const { onChange } = this.props;
        this.setState({ currentValue }, () => onChange(currentValue));
    }

    render() {
        const { classes, range } = this.props;

        let content = null;
        if (range && range.length)
        {

        }

        return (
            <div className={ classes.warpper }>
                <div className={ classes.component }>{ content }</div>
            </div>
        );
    }

}

/*
 * Styles
 */
const styles = theme => ({
    warpper: {
        height: '40px',
        margin: '0 auto',
        minWidth: '590px',
        [theme.breakpoints.down(768)]: {
            minWidth: '290px'
        }
    },
    component: {
        backgroundColor: 'white',
        borderRadius: 6,
        height: '30px',
        margin: '5px'
    }    
});

/*
 * Properties
 */
TimeLine.propTypes = {
    classes: PropTypes.object.isRequired,
    range: PropTypes.array,
    onChange: PropTypes.func
};

/*
 * exporting
 */
export default withStyles(styles)(TimeLine);