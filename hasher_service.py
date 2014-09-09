from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World (Flask)!"

@app.route("/decrypt")
def decrypt():
    d = request.args.get('d', '')
    jsonp = request.args.get('jsonp', False)
    json = decrypt_result(d)
    if jsonp:
        return "{0}({1});".format(jsonp, json)
    else:
        return jsonify(json)

def decrypt_result(value):
    res = subprocess.Popen(
        ['/var/projects/HasherConsole/hasher_console.exe', value],
        stdout=subprocess.PIPE
    )
    lines = [line.rstrip() for line in res.stdout]
    return dict(original=str(value), decrypted=str(lines[0]))

if __name__ == "__main__":
    app.run(port=5678)
