package src.pages;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier origen
public class ChatBotController {

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String userMessage = request.getMessage();
        String botReply = "Echo: " + userMessage;
        return new ChatResponse(botReply);
    }

    public static class ChatRequest {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class ChatResponse {
        private String reply;

        public ChatResponse(String reply) {
            this.reply = reply;
        }

        public String getReply() {
            return reply;
        }

        public void setReply(String reply) {
            this.reply = reply;
        }
    }
}
