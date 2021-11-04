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
                            WHERE user_id = {};'''.format(id))
        return self._cur.fetchall()

    # Delete rows from the database 
    def delete_from_users(self, user_id):
        self._cur.execute('''DELETE FROM Users
                            WHERE user_id = {};'''.format(user_id))

    def delete_all_orders_for_user(self, user_id):
        self._cur.execute('''DELETE FROM Orders
                            WHERE user_id = {};'''.format(user_id))

    def delete_order_for_user_and_date(self, user_id, purchase_date):
        self._cur.execute('''DELETE FROM Orders
                            WHERE user_id = {} 
                            AND purchase_date = {};'''.format(user_id, purchase_date))

    # Integrate into your application both of the advanced SQL queries you developed in stage 3
    def get_freq_of_item_bought(self) -> list:
        self._cur.execute('''SELECT P.item_id, COUNT(P.item_id) as quantity, O.user_id
                            FROM Purchases AS P JOIN Orders AS O ON P.order_id = O.order_id
                            GROUP BY O.user_id, P.item_id
                            ORDER BY quantity DESC
                            LIMIT 15;''')
        return self._cur.fetchall()

    def get_max_price_per_user(self) -> list:
        self._cur.execute('''SELECT P.price, P.item_id, U.user_id
                            FROM Purchases AS P JOIN Orders AS O ON P.order_id = O.order_id JOIN Users AS U ON O.user_id = U.user_id
                            GROUP BY P.price, P.item_id, U.user_id
                            HAVING P.price = ANY ( SELECT MAX(price)
                            FROM Purchases
                            GROUP BY item_id)
                            ORDER BY P.price DESC
                            LIMIT 15;''')
        return self._cur.fetchall()

    def close_connection(self) -> None:
        self._con.close()