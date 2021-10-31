from api import app

@app.route('/api/hello')
def hello():
    return {
        'msg': 'hello, world'
    }