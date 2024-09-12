import consumer from "channels/consumer"

export default consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log('Received data:', data);
    // Called when there's incoming data on the websocket for this channel
    // Temukan elemen dengan id 'dummy_message'
    const dummyMessage = document.getElementById('dummy_message');

    // Clone elemen tersebut (dengan true untuk meng-clone seluruh subtree)
    const clonedMessage = dummyMessage.cloneNode(true);

    // Set teks dari elemen yang dicloning dengan data yang diterima
    clonedMessage.textContent = data['message'];

    // Temukan elemen dengan id 'messages' dan append cloned element ke dalamnya
    document.getElementById('messages').appendChild(clonedMessage);
  },

  send_message: function(message) {
    console.log("send message")
    this.perform('send_message', { message: message });
  }
});
