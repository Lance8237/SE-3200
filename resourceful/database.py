import sqlite3

class GameDatabase:
    def __init__(self):
        self.connection = sqlite3.connect("games.db", check_same_thread=False)
        self.connection.row_factory = sqlite3.Row
        self.create_table()

    def create_table(self):
        cursor = self.connection.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        platform TEXT NOT NULL,
        genre TEXT NOT NULL,
        release_year INTEGER NOT NULL,
        hours_played INTEGER NOT NULL
        )
    """)

        self.connection.commit()

    def get_all_games(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM games")
        games = cursor.fetchall()
        return [dict(game) for game in games]

    def get_game(self, game_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM games WHERE id = ?", (game_id,))

        game = cursor.fetchone()

        if game:
            return dict(game)

        return None

    def create_game(self, title, platform, genre, release_year, hours_played):
        cursor = self.connection.cursor()

        cursor.execute("""
                INSERT INTO games (title, platform, genre, release_year, hours_played)
                VALUES (?, ?, ?, ?, ?)
                """, (title, platform, genre, release_year, hours_played))

        self.connection.commit()
        return cursor.lastrowid

    def update_game(self, game_id, title, platform, genre, release_year, hours_played):
        cursor = self.connection.cursor()

        cursor.execute("""
                UPDATE games
                SET title = ?, platform = ?, genre = ?, release_year = ?, hours_played = ?
                WHERE id = ? """,
                (title, platform, genre, release_year, hours_played, game_id))

        self.connection.commit()
        return cursor.rowcount > 0

    def delete_game(self, game_id):
        cursor = self.connection.cursor()

        cursor.execute("DELETE FROM games WHERE id = ?", (game_id,))
        self.connection.commit()

        return cursor.rowcount > 0