import React, { Component } from 'react';
import classes from './Spinner.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';



class Spinner extends Component{
    render(){
        return(
            <Aux> 
                 <div className={classes.Loader}>Loading...</div>
            </Aux>
            );
    }

}

   
export default Spinner;