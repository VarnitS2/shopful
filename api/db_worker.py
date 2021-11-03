import os
from dotenv import load_dotenv

import mysql.connector
from mysql.connector.constants import ClientFlag

class Worker:
    def __init__(self) -> None:
        load_dotenv()

        self._config = {
            'user': os.getenv('DB_USER'),
            'password': os.getenv('DB_PASS'),
            'host': os.getenv('DB_HOST'),
            'database': 'Shopful',
            'client_flags': [ClientFlag.SSL],
            'ssl_ca': 'ssl/server-ca.pem',
            'ssl_cert': 'ssl/client-cert.pem',
            'ssl_key': 'ssl/client-key.pem'
        }

        self._con = mysql.connector.connect(**self._config)
        self._cur = self._con.cursor()

    def show_tables(self) -> list:
        self._cur.execute('''SHOW TABLES;''')
        return self._cur.fetchall()

    def select_all_items(self) -> list:
        self._cur.execute('''SELECT * FROM Items;''')
        return self._cur.fetchall()

    def select_all_markets(self) -> list:
        self._cur.execute('''SELECT * FROM Markets;''')
        return self._cur.fetchall()

    def select_all_orders(self) -> list:
        self._cur.execute('''SELECT * FROM Orders;''')
        return self._cur.fetchall()

    def select_all_purchases(self) -> list:
        self._cur.execute('''SELECT * FROM Purchases;''')
        return self._cur.fetchall()
    
    def select_all_users(self) -> list:
        self._cur.execute('''SELECT * FROM Users;''')
        return self._cur.fetchall()

    def select_from_user(self, id) -> list:
        self._cur.execute('''SELECT * FROM Users
                            WHERE user_id = {}'''.format(id))
        return self._cur.fetchall()

    def close_connection(self) -> None:
        self._con.close()