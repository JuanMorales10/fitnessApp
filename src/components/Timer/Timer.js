// import React, { useState, useEffect } from 'react';
// import './Timer.css';

// function formatTime(unitOfTime) {
//     return unitOfTime <= 9 ? `0${unitOfTime}` : unitOfTime;
// }

// const Timer = () => {
//     const [currentTime, setCurrentTime] = useState({ hour: 0, min: 0, sec: 0 });
//     const [prevTime, setPrevTime] = useState({ pvHour: 0, pvMin: 0, pvSec: 0 });
//     const [timerRunning, setTimerRunning] = useState(false);
//     const [intervalID, setIntervalID] = useState(null);
//     const [exerciseCount, setExerciseCount] = useState(0);
//     const [setCount, setSetCount] = useState(0);

//     useEffect(() => {
//         if (intervalID === null && timerRunning) {
//             setIntervalID(setInterval(tick, 1000));
//         } else if (intervalID !== null && !timerRunning) {
//             clearInterval(intervalID);
//             setIntervalID(null);
//         }
//         return () => clearInterval(intervalID);
//     }, [timerRunning]);

//     const tick = () => {
//         setCurrentTime(prevTime => {
//             const newState = { ...prevTime, sec: prevTime.sec + 1 };

//             if (newState.sec > 59) {
//                 newState.sec = 0;
//                 newState.min += 1;
//             }

//             if (newState.min > 59) {
//                 newState.min = 0;
//                 newState.hour += 1;
//             }

//             return newState;
//         });
//     };

//     const toggleTimer = () => setTimerRunning(!timerRunning);

//     const stopTimer = () => {
//         setPrevTime(currentTime);
//         setCurrentTime({ hour: 0, min: 0, sec: 0 });
//         setTimerRunning(false);
//         clearInterval(intervalID);
//     };

//     const incrementExerciseCount = () => setExerciseCount(exerciseCount + 1);
//     const decrementExerciseCount = () => setExerciseCount(Math.max(0, exerciseCount - 1));

//     const incrementSetCount = () => setSetCount(setCount + 1);
//     const decrementSetCount = () => setSetCount(Math.max(0, setCount - 1));

//     const { hour, min, sec } = currentTime;
//     const { pvHour, pvMin, pvSec } = prevTime;

//     return (
//         <div className="workout-clock">
//             <header>
//                 <div className="header-item -left">
//                     <i className="fa fa-fw fa-bars" aria-hidden="true" />
//                 </div>
//                 <div className="header-item -center">
//                     <h3>TIME TRACK</h3>
//                 </div>
//                 <div className="header-item -right">
//                     <i className="fa fa-fw fa-clock-o" />
//                 </div>
//             </header>
//             <div className="clock-display">
//                 <div className="current-time">
//                     <h2 className="time-font">
//                         {formatTime(hour)}:{formatTime(min)}:{formatTime(sec)}
//                     </h2>
//                 </div>
//                 <div className="previous-set">
//                     <span>Previous Set: </span>
//                     <span id="previous-time" className="time-font">
//                         {formatTime(pvHour)}:{formatTime(pvMin)}:{formatTime(pvSec)}
//                     </span>
//                 </div>
//             </div>
//             <div className="clock-controls">
//                 <div className="control-row">
//                     <button className="btn-transparent" onClick={incrementExerciseCount}>
//                         <i className="fa fa-fw fa-plus" />
//                     </button>
//                     <span className="action-text">Exercise</span>
//                     <button className="btn-transparent" onClick={decrementExerciseCount}>
//                         <i className="fa fa-fw fa-minus" />
//                     </button>
//                     <span id="exercise-total" className="total-count">
//                         {exerciseCount}
//                     </span>
//                 </div>
//                 <div className="control-row">
//                     <button className="btn-transparent" onClick={incrementSetCount}>
//                         <i className="fa fa-fw fa-plus" />
//                     </button>
//                     <span className="action-text">Set</span>
//                     <button className="btn-transparent" onClick={decrementSetCount}>
//                         <i className="fa fa-fw fa-minus" />
//                     </button>
//                     <span id="set-total" className="total-count">
//                         {setCount}
//                     </span>
//                 </div>
//             </div>
//             <div className="clock-controls">
//                 <div className="clock-buttons">
//                     <button className="btn-action" onClick={toggleTimer}>
//                         {timerRunning ? "Pause" : "Start"}
//                     </button>
//                     <button className="btn-inactive" onClick={stopTimer}>
//                         Stop
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Timer;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Timer.css'

const formatTime = (unitOfTime) => {
    if (unitOfTime <= 9) {
        unitOfTime = `0${unitOfTime}`;
    }
    return unitOfTime;
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: {
                hour: 0,
                min: 0,
                sec: 0
            },
            prevTime: {
                pvHour: 0,
                pvMin: 0,
                pvSec: 0
            },
            exerciseCount: 0,
            setCount: 0,
            timerRunning: false,
            intervalID: null
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.tick = this.tick.bind(this);
        this.incrementExerciseCount = this.incrementExerciseCount.bind(this);
        this.decrementExerciseCount = this.decrementExerciseCount.bind(this);
        this.incrementSetCount = this.incrementSetCount.bind(this);
        this.decrementSetCount = this.decrementSetCount.bind(this);
    }

    toggleTimer() {
        this.setState({
            timerRunning: !this.state.timerRunning
        });
    }

    stopTimer() {
        let { hour, min, sec } = this.state.currentTime;
        clearInterval(this.state.intervalID);
        this.setState({
            prevTime: {
                pvHour: hour,
                pvMin: min,
                pvSec: sec
            },
            currentTime: {
                hour: 0,
                min: 0,
                sec: 0
            },
            timerRunning: false,
            intervalID: null
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.intervalID === null && this.state.timerRunning) {
            this.setState({ intervalID: setInterval(this.tick, 1000) });
        } else if (this.state.intervalID !== null && !this.state.timerRunning) {
            clearInterval(this.state.intervalID);
            this.setState({ intervalID: null });
        }
    }

    tick() {
        const newState = {
            sec: this.state.currentTime.sec + 1,
            min: this.state.currentTime.min,
            hour: this.state.currentTime.hour
        };

        if (newState.sec > 59) {
            newState.sec = 0;
            newState.min += 1;
        }

        if (newState.min > 59) {
            newState.min = 0;
            newState.hour += 1;
        }

        this.setState({ currentTime: newState });
    }

    incrementExerciseCount() {
        this.setState((prevState) => ({
            exerciseCount: prevState.exerciseCount + 1
        }));
    }

    decrementExerciseCount() {
        this.setState((prevState) => ({
            exerciseCount: Math.max(0, prevState.exerciseCount - 1)
        }));
    }

    incrementSetCount() {
        this.setState((prevState) => ({
            setCount: prevState.setCount + 1
        }));
    }

    decrementSetCount() {
        this.setState((prevState) => ({
            setCount: Math.max(0, prevState.setCount - 1)
        }));
    }

    render() {
        const { hour, min, sec } = this.state.currentTime;
        const { pvHour, pvMin, pvSec } = this.state.prevTime;

        return (
            <div className="workout-clock">
                <header className='headertimer'>
                    <div className="header-item -left">
                        <i className="fa fa-fw fa-bars" aria-hidden="true" />
                    </div>
                    <div className="header-item -center">
                        <h3>TIME TRACK</h3>
                    </div>
                    <div className="header-item -right">
                        <i className="fa fa-fw fa-clock-o" />
                    </div>
                </header>

                <div className="clock-display">
                    <div className="current-time">
                        <h2 className="time-font">
                            <span className="hour">{formatTime(hour)}:</span>
                            <span className="min">{formatTime(min)}:</span>
                            <span className="sec">{formatTime(sec)}</span>
                        </h2>
                    </div>
                    <div className="previous-set">
                        <span>Previous Set: </span>
                        <span id="previous-time" className="time-font">
                            <span className="hour">{formatTime(pvHour)}:</span>
                            <span className="min">{formatTime(pvMin)}:</span>
                            <span className="sec">{formatTime(pvSec)}</span>
                        </span>
                    </div>
                </div>

                <div className="clock-controls">
                    <div className="control-row">
                        <button className="btn-transparent" onClick={this.incrementExerciseCount}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="action-text">Exercise</span>
                        <button className="btn-transparent" onClick={this.decrementExerciseCount}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span id="exercise-total" className="total-count">
                            {this.state.exerciseCount}
                        </span>
                    </div>

                    <div className="control-row">
                        <button className="btn-transparent" onClick={this.incrementSetCount}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="action-text">Set</span>
                        <button className="btn-transparent" onClick={this.decrementSetCount}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span id="set-total" className="total-count">
                            {this.state.setCount}
                        </span>
                    </div>
                </div>

                <div className="timer-controls-wrapper">
                    <div className="clock-buttons">
                        <button className="btn-action" onClick={this.toggleTimer}>
                            {this.state.timerRunning ? "Pause" : "Start"}
                        </button>
                        <button className="btn-inactive" onClick={this.stopTimer}>
                            Stop
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Timer;
