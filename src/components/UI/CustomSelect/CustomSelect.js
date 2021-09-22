import React, { Component } from 'react';
import classes from './CustomSelect.css';

class CustomSelect extends Component {

    state = {
        showOptions: false
    }

    toggleOptionsHandler = () => {
        this.setState(prevState => {
            return {showOptions: !prevState.showOptions}
        });
    }

    optionsCloseHandler = () => {
        this.setState({ showOptions: false });
    }

    optionsClickedHandler = (event, optionValue) => {
        this.props.clicked(event, optionValue);
        this.optionsCloseHandler();
    }

    render() {

        const selectClassNames = [classes.Select];
        if(this.state.showOptions){
            selectClassNames.push(classes.OptionsOpen);
        }

        let options = null;
        if (this.state.showOptions) {
            options = this.props.options.map(option => {
                return <div
                    className={classes.Option}
                    key={option.value}
                    onClick={(event) => this.optionsClickedHandler(event, option.value)} >{option.displayValue}</div>
            });
        }

        return (
            <React.Fragment>                
                <div className={selectClassNames.join(' ')} onClick={this.toggleOptionsHandler} >
                    {this.props.selectDisplayValue}
                    <div className={classes.Triangle} ></div>
                </div>
                <div className={classes.Options} >
                    {options}
                </div>
            </React.Fragment>
        );

    }
}

export default CustomSelect;