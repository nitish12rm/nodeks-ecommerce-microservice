
const amqp = require("amqplib");

class MessageBroker {
  constructor() {
    this.channel = null;
  }

  async connect() {
    console.log("Connecting to RabbitMQ...");

   
      try {
        const connection = await amqp.connect("amqps://hvbdwimr:WTWiGNgPFFf-IjIOi_3NsZJXmecA-YQc@lionfish.rmq.cloudamqp.com/hvbdwimr");
        this.channel = await connection.createChannel();
        await this.channel.assertQueue("productQueue", {
            durable: false
        });
        console.log("RabbitMQ connected");
      } catch (err) {
        console.error("Failed to connect to RabbitMQ:", err.message);
      }
  }

  async publishMessage(queue, message) {
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      return;
    }

    try {
      await this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async consumeMessage(queue, callback) {
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      return;
    }

    try {
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);
        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new MessageBroker();