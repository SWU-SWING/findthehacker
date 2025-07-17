import sys

from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/desc')
def description():
    return render_template('desc.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/round<int:round_num>')
def round_page(round_num):
    return render_template(f'round{round_num}.html')

@app.route('/evidence/<round_name>')
def get_evidence(round_name):
    with open(f'static/data/{round_name}.json', encoding='utf-8') as f:
        return jsonify(json.load(f))

@app.route('/result/<outcome>')
def result(outcome):
    if outcome == "success":
        return render_template('result_success.html')
    else:
        return render_template('result_failure.html')