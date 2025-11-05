import openai
from flask import Flask, request, jsonify

openai.api_key = 'sk-3Fj2nExampleKey9hKZtL4YXuAbCdEfGh123456'  # Replace with your OpenAI API key

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    response = openai.Completion.create(
        model="gpt-3.5-turbo",  # You can also use the latest available model
        prompt=user_input,
        max_tokens=150
    )
    
    return jsonify({'response': response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(debug=True)