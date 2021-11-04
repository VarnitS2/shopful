from api import app
from api.db_worker import Worker

_db_worker = Worker()

@app.route('/api/hello')
def hello():
    return {
        'msg': 'hello, world'
    }

@app.route('/api/get/user')
def get_user(): 
    return {
        'msg': _db_worker.select_from_user(500)[0]
    }