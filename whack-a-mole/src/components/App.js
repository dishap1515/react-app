import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import TopBar from './TopBar';
import Counter from './Counter';
import * as utils from '../utils';
import './App.css';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      score: 0,
      duration: 15,
      remainingTime: 15,
      minSpeed: 200,
      holes: utils.generateHoles({ amount: 6 })
    }

    this.lastHole = null;
    this.timeUp = false;
    this.timeout = null;
    this.remainingInterval = null;
  }

  getRandomHole = () => {
    const { holes } = this.state;
    const currentHole = holes[utils.generateRandomIndex(holes)];
    if (currentHole === this.lastHole) {
      return this.getRandomHole(holes);
    }
    this.lastHole = currentHole;
    return currentHole;
  }

    showMole = () => {
    const { minSpeed, maxSpeed } = this.state;
    const time = utils.generateRandomTime(minSpeed, maxSpeed);
    const { id: randomId } = this.getRandomHole();
    this.setState(prevState => ({ 
      holes: prevState.holes.map((hole) => 
        hole.id === randomId ? { ...hole, isActive: true } : hole
      )
    }));

    setTimeout(() => {
      this.setState(prevState => ({
        holes: prevState.holes.map(hole =>
          hole.id === randomId ? { ...hole, isActive: false } : hole
        )
      }));
      !this.timeUp && this.showMole();
    }, time);
  }

   onMoleClick = id => {
    this.setState(prevState => ({
      holes: prevState.holes.map(hole =>
        hole.id === id ? { ...hole, isActive: false } : hole
      ),
      score: prevState.score + 1
    }));
  }

  start = e => {
    this.remainingTime = this.state.duration;
    this.reset();
    this.timeUp = false;
    this.showMole();
    this.timeout = setTimeout(() =>
      this.onEnd(), this.state.duration * 1000
      );
      this.setState({ hasStarted: true });
      this.remainingInterval = setInterval(() => {
        this.setState({ remainingTime: this.state.remainingTime - 1 });
        (this.state.remainingTime === 0) && clearInterval(this.remainingInterval);
      }, 1000)
  }

  reset = e => {
        this.setState(prevState => ({
      holes: prevState.holes.map(
        hole => ({ ...hole, isActive: false }) 
      ),
      score: 0,
      hasStarted: false,
      remainingTime: this.state.duration
    }));
        this.timeUp = true;
    clearInterval(this.remainingInterval);
    clearTimeout(this.timeout);
  }

  onEnd = () => {
    this.timeUp = true;
    this.setState({ hasStarted: false });
  }


  render() {
    const {
      state: {
        score,
        holes,
        hasStarted,
        remainingTime
      },
      start,
      reset,
      onMoleClick
   } = this;

    return (
      <div className="game">
        <TopBar
          onStart={start}
          onReset={reset}
        />  
         <ScoreBoard 
          title="Whack-a-mole!" 
          score={score} 
        />
        <Counter
          className="game__counter"
          isVisible={hasStarted}
          time={remainingTime}
        />
        <HolesList 
          items={holes} 
          onMoleClick={onMoleClick} 
        />
      </div>
    );
  }
}