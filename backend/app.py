from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd
import os

app = Flask(__name__)
proxy_port = os.environ.get('FLASK_APP_PROXY')
host_ip = os.environ.get('FLASK_APP_HOST_IP')
host_name = os.environ.get('FLASK_APP_HOST_NAME')

CORS(app, resources={r"/*": {"origins": [f"http://localhost:{proxy_port}", 
f"https://localhost:{proxy_port}", f"http://{host_name}:{proxy_port}", 
f"https://{host_name}:{proxy_port}",f"http://{host_ip}:{proxy_port}", 
f"https://{host_ip}:{proxy_port}", "https://localhost:643"]}})

# CORS(app, resources={r"/*": {"origins": ["*"]}})
app.config["DEBUG"] = True if os.environ.get("FLASK_APP_PRODUCTION") == "false" else False

surveys = {
    "riskassessment": {
        "traits": ["extraversion", "imagination", "emotion", "conscientiousness", "agree"],
        "sentiments": ["positive", "negative"],
        "min":1,
        "max":5,
        "questions": [ 
            { 
            "question": "I am the life of the party",
            "type": "extraversion",
            "sentiment": "positive", 
            },
            {
                "question": "Feel little concern for others",
                "type": "agree",
                "sentiment": "negative", 
            },
            {
                "question": "I am always prepared",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "Get stressed out easily",
                "type": "emotion",
                "sentiment": "negative", 
            },
            {
                "question": "Have a rich vocabularly",
                "type": "imagination",
                "sentiment": "positive", 
            },
            { 
                "question": "Dont talk a lot",
                "type": "extraversion",
                "sentiment": "negative", 
            },
            {
                "question": "I am interested in people",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "Leave my belongings around",
                "type": "conscientiousness",
                "sentiment": "negative", 
            },
            {
                "question": "I am relaxed most of the time",
                "type": "emotion",
                "sentiment": "positive", 
            },
            {
                "question": "Have difficulty understanding abstract ideas",
                "type": "imagination",
                "sentiment": "negative", 
            },
                    { 
                "question": "Feel comfortable around people",
                "type": "extraversion",
                "sentiment": "positive", 
            },
            {
                "question": "Insult people",
                "type": "agree",
                "sentiment": "negative", 
            },
            {
                "question": "Pay attention to details",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "Worry about things",
                "type": "emotion",
                "sentiment": "negative", 
            },
            {
                "question": "Have a vivid imagination",
                "type": "imagination",
                "sentiment": "positive", 
            },
            { 
                "question": "Keep in the background",
                "type": "extraversion",
                "sentiment": "negative", 
            },
            {
                "question": "Symathize with others feelings",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "Make a mess of things",
                "type": "conscientiousness",
                "sentiment": "negative", 
            },
            {
                "question": "Seldom feel blue",
                "type": "emotion",
                "sentiment": "positive", 
            },
            {
                "question": "I am not interested in abstract ideas",
                "type": "imagination",
                "sentiment": "negative", 
            },
            { 
                "question": "Start conversations",
                "type": "extraversion",
                "sentiment": "positive", 
            },
            {
                "question": "I am not interested in other people's problems",
                "type": "agree",
                "sentiment": "negative", 
            },
            {
                "question": "Get chores done right away",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "I am easily disturbed",
                "type": "emotion",
                "sentiment": "negative", 
            },
            {
                "question": "Have excellent ideas",
                "type": "imagination",
                "sentiment": "positive", 
            },
            { 
                "question": "Have little to say",
                "type": "extraversion",
                "sentiment": "negative", 
            },
            {
                "question": "Have a soft heart",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "Often forget to put things back in their proper place",
                "type": "conscientiousness",
                "sentiment": "negative", 
            },
            {
                "question": "Get upset easily",
                "type": "emotion",
                "sentiment": "negative", 
            },
            { 
                "question": "Do not have a good imagination",
                "type": "imagination",
                "sentiment": "negative", 
            },
            {
                "question": "Talk to a lot of different people at parties",
                "type": "extraversion",
                "sentiment": "positive", 
            },
            {
                "question": "I am not really interested in others",
                "type": "agree",
                "sentiment": "negative", 
            },
            {
                "question": "Like order",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "Change my mood a lot",
                "type": "emotion",
                "sentiment": "negative", 
            },
            { 
                "question": "I am quick to understand things",
                "type": "imagination",
                "sentiment": "positive", 
            },
            {
                "question": "Dont like to draw attention to myself",
                "type": "extraversion",
                "sentiment": "negative", 
            },
            {
                "question": "Take time out for others",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "Shirk my duties",
                "type": "conscientiousness",
                "sentiment": "negative", 
            },
            {
                "question": "Have frequent mood swings",
                "type": "emotion",
                "sentiment": "negative", 
            },
            { 
                "question": "Use difficult words",
                "type": "imagination",
                "sentiment": "positive", 
            },
            {
                "question": "Don't mind being the center of attention",
                "type": "extraversion",
                "sentiment": "positive", 
            },
            {
                "question": "Feel others' emotions",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "Follow a schedule",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "Get irritated easily",
                "type": "emotion",
                "sentiment": "negative", 
            },
            { 
                "question": "Spend time reflecting on things",
                "type": "imagination",
                "sentiment": "positive", 
            },
            {
                "question": "I am quiet around strangers",
                "type": "extraversion",
                "sentiment": "negative", 
            },
            {
                "question": "Make people feel at ease",
                "type": "agree",
                "sentiment": "positive", 
            },
            {
                "question": "I am exacting in my work",
                "type": "conscientiousness",
                "sentiment": "positive", 
            },
            {
                "question": "Often feel blue",
                "type": "emotion",
                "sentiment": "negative", 
            },
            {
                "question": "I am full of ideas",
                "type": "imagination",
                "sentiment": "positive", 
            },
        ]
    }
}

def intialize():
    # gives default value for questions
    global surveys
    for val in surveys.values():
        min = val["min"]
        max = val["max"]
        for item in val["questions"]:
            item["value"] = (min + max)//2


@app.route("/")
def home():
    return "<h1>Questions</h1>"

@app.route("/api")
def api_home():
    return "<h1>API Home</h1>"

@app.route("/api/survey/<type>", methods=["GET", "POST"])
def survey(type):
    global stuff
    stuff = request.headers
    if request.method == "GET":
        if type not in surveys:
            return jsonify([]), 404
        return jsonify(surveys[type])
    elif request.method == "POST":
        data = request.get_json()
        scores = {}
        personality_traits = data["traits"]
        sentiments = data["sentiments"] # currently not being used
        min = data["min"]
        max = data["max"]
        question_data = pd.DataFrame(data["questions"])
        for trait in personality_traits:
            df_trait = question_data[question_data["type"] == trait]
            num_questions = len(df_trait)
            df_positive = df_trait[df_trait["sentiment"] == "positive"]
            df_negative = df_trait[df_trait["sentiment"] == "negative"]
            invert_negative = max - df_negative["value"] + min
            col_score = (df_positive["value"].sum() + invert_negative.sum()) / num_questions
            scores[trait] = col_score
        return jsonify(scores)

intialize()
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('FLASK_APP_PORT'))

