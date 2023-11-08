const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe('Message Class', function() {
    it('throws error if a name is NOT passed into the constructor as the first parameter', function() {
      expect(function() { new Message();}).toThrow(new Error('Name is required.')); // just copied how command.spec did it :)
    });
  
    // expecting name of message class to be some test message
    it('constructor sets name', function() {
      let message = new Message('Test Message');
      expect(message.name).toBe('Test Message');
    });
  
    // initialize commands as array and add the new command within the array, expect commands to be commands in array 
    it('contains a commands array passed into the constructor as the 2nd argument', function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test Message', commands);
      expect(message.commands).toEqual(commands);
    });
  });
