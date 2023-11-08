
class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   // receiveMessage takes a message object as a parameter 
   // iterates through the commands array in the message, calling the executeCommand method for each command and storing the results in an empty array
   // then returns an object that contains the message name and the results array
   receiveMessage(message) {
     const results = []; // Make this permenant so no confusion with 'result' below
     for (let command of message.commands) {
       let result = this.executeCommand(command);
       results.push(result);
     }
     return {
       message: message.name,
       results: results,
     };
   }
 
   // executeCommand method takes a command object as a parameter
   // checks the commandType property of the command object to determine an action to carry out
   // if the command is move, checks if the rover's mode is in low power 
   // if it is, returns an object with completed false, move cannot happen 
   // else, it will update the rover's position and return completed true
   executeCommand(command) {
     if (command.commandType === 'MOVE') {
       if (this.mode === 'LOW_POWER') {
         return {completed: false};
       }
       this.position = command.value;
       return {completed: true};

      } else if (command.commandType === 'STATUS_CHECK') {
       return {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}};
    
      } else if (command.commandType === 'MODE_CHANGE') {
       this.mode = command.value;
       return { completed: true };
     }
   }
 }
 
 module.exports = Rover;
 