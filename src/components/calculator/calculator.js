import React, { Component } from 'react';
import './calculator.css';

export default class calculator extends Component {

  constructor(props){
    super(props);
    this.state = {
      numbersAndActions: [],
      currentNumStr: '',
      currentActionStr: '',
      panel: ''
    }

    this.numberButtonClick = this.numberButtonClick.bind(this);
    this.actionButtonClick = this.actionButtonClick.bind(this);
    this.clearButtonClick = this.clearButtonClick.bind(this);
    this.updatePanel = this.updatePanel.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.dotButtonClick = this.dotButtonClick.bind(this);
    this.plusMinusButtonClick = this.plusMinusButtonClick.bind(this);
    this.sqrtButtonClick = this.sqrtButtonClick.bind(this);
    this.memoryRecall = this.memoryRecall.bind(this);
    this.memoryAdd = this.memoryAdd.bind(this);
    this.memoryClear = this.memoryClear.bind(this);
    this.memoryRemove = this.memoryRemove.bind(this);
    this.memoryStore = this.memoryStore.bind(this);

    localStorage.setItem("memory","0");
  }


/*
* This method clear all the data of the calculator.
*/
  clearButtonClick(){
    this.setState({
      numbersAndActions: [],
      currentNumStr: '',
      currentActionStr: '',
      panel: ''
    });
  }

  /*
  * This method called when a user click on a number button.
  */
  numberButtonClick(event){
    if(this.state.currentNumStr){
      let currentNumStr = this.state.currentNumStr;
      if( Number(this.state.currentNumStr) === 0){
        currentNumStr = event.target.value;
      }else{
        currentNumStr = currentNumStr + event.target.value;
      }
      this.setState({ currentNumStr },() => this.updatePanel());
    }else{
      if(this.state.currentActionStr){
        let numbersAndActions = this.state.numbersAndActions;
        numbersAndActions.push(this.state.currentActionStr);
        let currentNumStr = event.target.value;
        let currentActionStr = '';

        this.setState({numbersAndActions,currentNumStr,currentActionStr}, () => this.updatePanel());
      }else{
        let currentNumStr = event.target.value;
        this.setState({currentNumStr},() => this.updatePanel());
      }
    } 
  }// End numberButtonClick Method.


  /*
  * This method called when a user click on a action button.
  */
  actionButtonClick(event){
    if(this.state.numbersAndActions.length === 0 && !this.state.currentNumStr ) { 
      return; 
    }
    let numbersAndActions = this.state.numbersAndActions;
    let currentActionStr = this.state.currentActionStr;
    let currentNumStr = this.state.currentNumStr;
    if(currentActionStr){
      currentActionStr = event.target.value;
      this.setState({currentActionStr,currentNumStr,numbersAndActions},() => this.updatePanel());
    }else{
      currentActionStr = event.target.value;
      numbersAndActions.push(Number(this.state.currentNumStr));
      currentNumStr = '';
      this.setState({currentActionStr,currentNumStr,numbersAndActions}, () => this.updatePanel());
    }
  }// end actionButtionClick method.



/*
* This method called when a user click on the dot button.
*/
  dotButtonClick(){
    let currentNumStr = this.state.currentNumStr;
    if(!currentNumStr) { 
      return; 
    }
    currentNumStr +='.';
    this.setState({currentNumStr},() => this.updatePanel());
  }

/*
* This method is called when a user click on the plus/minus button.
*/
  plusMinusButtonClick(){
    let currentNumStr = this.state.currentNumStr;
    if(Number(currentNumStr) > 0){
      currentNumStr = "-"+currentNumStr;
      this.setState({currentNumStr},() => this.updatePanel());
    }
    else if(Number(currentNumStr)<0){
       currentNumStr = currentNumStr.slice(1,currentNumStr.length);
       this.setState({currentNumStr},() => this.updatePanel());
    }
  }

/*
* This method is called when a user click on the sqrt button.
*/
  sqrtButtonClick(event){
    let currentNumStr = this.state.currentNumStr;
    let currentActionStr = this.state.currentActionStr;
    let numbersAndActions = this.state.numbersAndActions;
    if(currentActionStr || currentNumStr || numbersAndActions.length > 0){
      return;
    }

    currentActionStr = event.target.value;
    this.setState({currentActionStr},() => this.updatePanel());
  }


  /*
  * This method clear the memory data.
  */
  memoryClear(){
    let memory = "0";
    localStorage.setItem('memory',memory);
  }

  /*
  * This method store new data to the memory.
  */
  memoryStore(){
    if(!this.state.currentNumStr){
      return;
    }
    localStorage.setItem('memory',this.state.currentNumStr);
  }

  /*
  * This method add the the value of currentNumStr to the memory data.
  */
  memoryAdd(){
    if(!this.state.currentNumStr){
      return;
    }
    let memory = Number(localStorage.getItem('memory'));
    memory = memory + Number(this.state.currentNumStr);
    localStorage.setItem('memory',memory);
  }

  /*
  * This method substract the the value of currentNumStr from the memory data.
  */
  memoryRemove(){
    if(!this.state.currentNumStr){
      return;
    }
    let memory = Number(localStorage.getItem('memory'));
    memory = memory - Number(this.state.currentNumStr);
    localStorage.setItem('memory',memory);
  }

  /*
  * This method puts the memory data number on the panel.
  */
  memoryRecall(){
    let numbersAndActions = this.state.numbersAndActions;
    let currentActionStr = this.state.currentActionStr;
    if(this.state.currentNumStr){
      return;
    }
    if(currentActionStr){
      numbersAndActions.push(currentActionStr);
      currentActionStr = '';
    }
    let memory = localStorage.getItem('memory');
    this.setState({
      numbersAndActions,
      currentActionStr,
      currentNumStr: memory
    },() => this.updatePanel());
      
  }

/*
*  This method update the panel of the calculator.
*/  
  updatePanel(){
    let numbersAndActions = this.state.numbersAndActions;
    let str = '';
    for(let i = 0; i<numbersAndActions.length; i++){
      str = `${str} ${numbersAndActions[i]}`;
    }
    if(this.state.currentNumStr){
      str = `${str} ${this.state.currentNumStr}`;
    }
    if(this.state.currentActionStr){
      str = `${str} ${this.state.currentActionStr}`;
    }
    this.setState({panel:str},() => console.log(this.state));
  }


  /*
  * This method calculate the result of the equation.
  */
  calculateResult(){
    let isSqrt = false;
    let finalResult = 0;
    let numbersAndActions = this.state.numbersAndActions;
    let result = [];

    for(let i = 0 ;i< numbersAndActions.length;i++){
      result[i] = numbersAndActions[i];
    }
    if(this.state.currentNumStr){
      result.push(Number(this.state.currentNumStr));
    }

    // checking for sqrt root.
    if(result[0] === '√'){
      isSqrt = true;
      result.splice(0,1);
    }

    // calculating  (* ,/) operations.
    for(let i = 0 ; i< result.length ;i++){
      if(result[i] === 'x'){
        let temp = result[i-1]*result[i+1];
        result[i-1] = temp;
        result.splice(i,2);
        i = i-1;
      }
      if(result[i] === '/'){
        let temp = result[i-1] / result[i+1];
        result[i-1] = temp;
        result.splice(i,2);
        i = i-1;
      }    
    }

    //calculating (+,-) operations.
    for(let i = 0 ; i< result.length;i++){ 
      if(result[i] ==='+'){
        let temp = result[i-1] + result[i+1];
        result[i-1] = temp;
        result.splice(i,2);
        i = i-1;
      }
      if(result[i] === '-'){
        let temp = result[i-1] - result[i+1];
        result[i-1] = temp;
        result.splice(i,2);
        i = i-1;
      }   
    }

    if(isSqrt){
      finalResult = Math.sqrt(result[0]);
    }else{
      finalResult = result[0];
    }

    this.setState({
      numbersAndActions: [],
      currentNumStr: ''+finalResult,
      currentActionStr: ''
    },() => this.updatePanel());
 }// end calculateResult method.



  render() {
    return (
      <div className="calc">
        <div className="panel">
          <label 
            type="text" 
            className="form-control calc-panel">
            {this.state.panel}
          </label>
          <label 
            type="text" 
            className="form-control num-panel">
            {this.state.currentNumStr.substr(0,9)}
          </label>
        </div>
        <div className="buttons">
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.memoryClear}>MC
          </button>
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.memoryRecall}>MR
          </button>
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.memoryStore}>MS
          </button>
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.memoryAdd}>M+
          </button>
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.memoryRemove}>M-
          </button>
          <button 
            className="btn btn-info"
            value = "7"
            onClick={this.numberButtonClick}>7
          </button>
          <button 
            className="btn btn-info"
            value = "8"
            onClick={this.numberButtonClick}>8
          </button>
          <button 
            className="btn btn-info"
            value = "9"
            onClick={this.numberButtonClick}>9
          </button>
          <button 
            className="btn btn-info"
            value = "/"
            onClick={this.actionButtonClick}
            >/
          </button>
          <button 
            className="btn btn-primary"
            value = "/"
            onClick={this.clearButtonClick}
            >Clear
          </button>
          <button 
            className="btn btn-info"
            value = "4"
            onClick={this.numberButtonClick}>4
          </button>
          <button 
            className="btn btn-info"
            value = "5"
            onClick={this.numberButtonClick}>5
          </button>
          <button 
            className="btn btn-info"
            value = "6"
            onClick={this.numberButtonClick}>6
          </button>
          <button 
            className="btn btn-info"
            value = "x"
            onClick={this.actionButtonClick}
            >X
          </button>
          <button 
            className="btn btn-primary"
            value = "/"
            onClick={this.plusMinusButtonClick}
            >+/-
          </button>
          <button 
            className="btn btn-info"
            value = "1"
            onClick={this.numberButtonClick}>1
          </button>
          <button 
            className="btn btn-info"
            value = "2"
            onClick={this.numberButtonClick}>2
          </button>
          <button 
            className="btn btn-info"
            value = "3"
            onClick={this.numberButtonClick}>3
          </button>
          <button 
            className="btn btn-info"
            value = "-"
            onClick={this.actionButtonClick}
            >-
          </button>
          <button 
            className="btn btn-primary"
            value = "√"
            onClick={this.sqrtButtonClick}
            >√
          </button>
          <button 
            className="btn btn-info"
            value = "0"
            onClick={this.numberButtonClick}>0
          </button>
          <button 
            className="btn btn-info"
            value = "."
            onClick = {this.dotButtonClick}
            >.
          </button>
          <button 
            className="btn btn-info"
            value = "="
            onClick={this.calculateResult}>=
          </button>
          <button 
            className="btn btn-info"
            value = "+"
            onClick={this.actionButtonClick}
            >+
          </button>
          <button 
            className="btn btn-primary"
            value = "/"
            >
          </button>
        </div>
      </div>
    )
  }
}


