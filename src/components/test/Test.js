import React from 'react';
import './Test.scss';

class Test extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Test">
                To jest komponent Test
            </div>
        );
    }
}

export default Test;