const amqp = require("amqplib");
// const config = require("../config");
// const OrderService = require("../services/orderService");

class MessageBroker {
  static async connect() {
    try {
      const connection = await amqp.connect("amqps://fcrsntub:FtmAzk84uKJmKLaYXDjpPqnNiK_lv8Qz@lionfish.rmq.cloudamqp.com/fcrsntub");
      const channel = await connection.createChannel();

      // Declare the order queue
      await channel.assertQueue("orderQueue", { durable: true });

      // Consume messages from the order queue on buy
      channel.consume("orderQueue", async (message) => {
        try {
          const order = JSON.parse(message.content.toString());
          channel.ack(message);
        } catch (error) {
          console.error(error);
          channel.reject(message, false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MessageBroker;