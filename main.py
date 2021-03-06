#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function
from __future__ import unicode_literals
from __future__ import division

import subprocess

from datetime import datetime

import json
from flask import Flask, request, Response, render_template


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/health')
def health():
    headers = {
        'Content-Type': 'text/xml'
    }

    context = decrypt_result('XBUbJac69zPSRCMflRqg6g==')
    context.update({
        'time': datetime.utcnow(),
    })
    return render_template('health.xml', **context), 200, headers


@app.route('/decrypt')
def decrypt():
    d = request.args.get('d', '')
    jsonp = request.args.get('jsonp', False)
    response = json.dumps(decrypt_result(d))

    if jsonp:
        return Response('{0}({1});'.format(jsonp, response),
                        mimetype='application/javascript')
    else:
        return Response(response, mimetype='application/json')


def decrypt_result(value):
    res = subprocess.Popen(
        ['hasher_console.exe', value],
        stdout=subprocess.PIPE
    )
    lines = [line.rstrip() for line in res.stdout]
    return {
        'original': str(value),
        'decrypted': str(lines[0]),
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5679)
