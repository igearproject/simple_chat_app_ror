class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(message)
    puts "send message server"
    puts message
    puts "send message"
    @message = Message.new(body: message['message'])
    if @message.save
      # Menyiarkan pesan baru ke semua klien yang terhubung
      ActionCable.server.broadcast("chat_channel", {message: @message['body']})
    else
      puts "Failed to save message: #{@message.errors.full_messages.join(", ")}"
    end
  end
end
