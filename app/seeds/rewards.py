from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text


def seed_rewards():
    seeds = [
        Reward(user_id=1, title='reward 1 name', description='reward 1 description', cost=1),
        Reward(user_id=1, title='reward 2 name', description='reward 2 description', cost=5),
        Reward(user_id=1, title='reward 3 name', description='reward 3 description', cost=10),
        Reward(user_id=1, title='reward 4 name', description='reward 4 description', cost=20)
    ]

    for reward in seeds:
        db.session.add(reward)
    db.session.commit()


def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
