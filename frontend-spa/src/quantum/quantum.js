export var qs = {
    init : (initialState) => {
        window.quantum = { state : Object.assign({}, initialState) };
        const wqs = window.quantum.state;
        for (let i in wqs) {
            wqs[i].$subscribers = [];
            wqs[i].$connexions = [];
        }
            
    },
    subscribe : (key, element, onChange, onSubscribe) => {
        const wqs = window.quantum.state;
        if (wqs.hasOwnProperty(key)) {
            element.quantum = wqs[key].$subscribers.length;
            wqs[key].$subscribers.push( { element: element, onchange: onChange } );
        }
        if (onSubscribe)
            onSubscribe( element, wqs[key] );
    },
    connect : (key, component, mapState) => {
        const wqs = window.quantum.state;
        if ( wqs.hasOwnProperty(key) ) {
            wqs[key].$connexions.push( { component: component, mapState: mapState } );
        }
    },    
    unsubscribe : (key, element) => {
        const wqs = window.quantum.state;
        if ( wqs.hasOwnProperty(key) && wqs[key].$subscribers.length > 0 ) {
            const indexOf = wqs[key].$subscribers.findIndex( (e) => e.element.quantum === element.quantum );
            wqs[key].$subscribers.splice(indexOf, 1);
        }
    },   
    get : (key) => {
        const wqs = window.quantum.state;
        if ( wqs.hasOwnProperty(key) ) 
            return wqs[key];
        return null;
    },
    set : (key, newState) => {
        const wqs = window.quantum.state;
        if ( wqs.hasOwnProperty(key) ) {
            wqs[key] = Object.assign(wqs[key], newState);
            if ( wqs[key].$subscribers.length > 0 ) {
                for (let i in wqs[key].$subscribers) {
                    wqs[key].$subscribers[i].onchange(
                        wqs[key].$subscribers[i].element,
                        wqs[key]);
                }
            }
            if ( wqs[key].$connexions.length > 0 ) {
                for (let i in wqs[key].$connexions) {
                    const component = wqs[key].$connexions[i].component;
                    console.log(component.state);
                    component.setState( wqs[key].$connexions[i].mapState(wqs[key]) );
                }
            }            
        }
    } 
};
