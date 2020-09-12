import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import TopBar from './TopBar';
import * as utils from '../utils';
import './App.css';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      duration: 10,
      minSpeed: 200,
      holes: utils.generateHoles({ amount: 6 })
    }

    this.lastHole = null;
    this.timeUp = false;
  }

  reset = e => {
    this.setState(prevState => ({
      holes: prevState.holes.map(hole => ({...hole, isActive: false})),
      score: 0
    }));
    this.timeUp = false;
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
      holes: prevState.holes.map((hole) => {
        if (hole.id === randomId) {
          return { ...hole, isActive: true }
        } else {
          return hole
        }
      })
    }));

    setTimeout(() => {
      this.setState(prevState =>
        ({
          holes: prevState.holes.map((hole, index) => {
            if (hole.id === randomId) {
              return { ...hole, isActive: false }
            } else {
              return hole
            }
          })
        }));
        console.log(this.timeUp)
      !this.timeUp && this.showMole();
    }, time)
  }

  start = e => {
    const { duration } = this.state;
    this.reset();
    this.showMole();
    setTimeout(
    () => {
        this.timeUp = true
      },
      duration * 1000);
  }

  onMoleClick = id => {
    this.setState(prevState => 
      ({
        holes: prevState.holes.map(hole => {
          if (hole.id === id) { 
            return { ...hole, isActive: false }
          } else {
            return hole
          }
        }),
        score: prevState.score + 1
      }));
  }


  render() {
    const {
      state: {
        score,
        holes
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
        <ScoreBoard  title="Whack-a-mole!" score={score} />
        <HolesList items={holes}  onMoleClick={onMoleClick} />
      </div>
    );
  }
}