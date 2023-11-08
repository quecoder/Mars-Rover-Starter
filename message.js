class Message {
   constructor(name, commands) {
    this.name = name;
     if (!name) {
       throw new Error('Name is required.');
     }
     this.commands = commands;
   }
 }

module.exports = Message;