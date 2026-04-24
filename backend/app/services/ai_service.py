import os
import logging
from typing import List, Dict, Any, Optional
from cerebras.cloud.sdk import Cerebras

logger = logging.getLogger(__name__)

class AIService:
    """
    Service for interacting with Cerebras Cloud AI.
    Replaced Gemini implementation with Cerebras Llama-3.1.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("CEREBRAS_API_KEY")
        if not self.api_key:
            logger.warning("CEREBRAS_API_KEY not found in environment")
            self.client = None
        else:
            self.client = Cerebras(api_key=self.api_key)
        
        # Consistent model selection
        self.model = "llama3.1-8b"

    async def generate_response(self, prompt: str, history: List[Dict[str, str]] = None) -> str:
        """
        Generate a text response from the AI model.
        Keep interface identical to previous Gemini implementation.
        """
        if not self.client:
            return "AI Service is not configured. Please check your API key."

        try:
            messages = history or []
            messages.append({"role": "user", "content": prompt})
            
            response = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=0.7,
                max_tokens=1024
            )
            
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error generating response from Cerebras: {e}")
            return f"I encountered an error while processing your request: {str(e)}"

    def get_tool_calls(self, prompt: str) -> List[Dict[str, Any]]:
        """
        Mock tool calling behavior using Cerebras.
        In a real scenario, this would use Cerebras' tool calling features if available.
        """
        # Placeholder for future tool-calling integration
        return []
