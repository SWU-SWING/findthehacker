import sys
import json
import os

from flask import Flask, render_template, jsonify, request

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
    
@app.route('/select')
def select():
    return render_template('select.html')

@app.route('/result/<outcome>')
def result(outcome):
    if outcome == "success":
        return render_template('result_success.html')
    else:
        return render_template('result_failure.html')
    
@app.route('/whois_lookup', methods=['POST'])
def whois_lookup():
    try:
        data = request.get_json()
        domain_input = data.get('domain', '').lower().strip()
        
        # 정답 도메인
        correct_domain = 'evil-attacker.site'
        
        if domain_input == correct_domain:
            # 정답일 때 - evidence3.json에서 WHOIS 정보 로드
            evidence_path = os.path.join('static', 'data', 'evidence3.json')
            with open(evidence_path, 'r', encoding='utf-8') as f:
                whois_data = json.load(f)
            
            return jsonify({
                'success': True,
                'correct': True,
                'whois_data': whois_data
            })
        else:
            # 오답일 때
            return jsonify({
                'success': True,
                'correct': False,
                'message': '해당 도메인은 공격과 관련 없습니다.'
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

    
if __name__ == '__main__':
    app.run(debug=True)