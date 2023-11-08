const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.



describe('Rover Class', function() {
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  
  it('response returned by receiveMessage contains the name of the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe('Test Message');
  });

  
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  
  it('responds correctly to the status check command', function() {
    let command = new Command('STATUS_CHECK');
    let message = new Message('Test Message', [command]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });

  
  it('responds correctly to the mode change command', function() {
    let command = new Command('MODE_CHANGE', 'LOW_POWER');
    let message = new Message('Test Message', [command]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let moveCommand = new Command('MOVE', 10000);
    let modeChangeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    let message = new Message('Test Message', [modeChangeCommand, moveCommand]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
  });


  it('responds with the position for the move command', function() {
    let moveCommand = new Command('MOVE', 10000);
    let message = new Message('Test Message', [moveCommand]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
  });
});
