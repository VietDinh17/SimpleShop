import React from 'react';
import PauseOnHover from './slick/PauseOnHover';
import ADC from './adc/ADC';

class HomePage extends React.Component{
    render(){
        return(
            <div >
                <div>
                    <ADC />
                </div>
                <div>
                    <PauseOnHover />
                </div>
            </div>
        )
    }
}

export default HomePage;
