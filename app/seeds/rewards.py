from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text


def seed_rewards():
    seeds = [
        Reward(user_id=1, type='custom', title='Break', description='Take a relaxing break', cost=1),
        Reward(user_id=1, type='custom', title='Ice cream', description='Eat a giant tub of ice cream', cost=5),
        Reward(user_id=1, type='custom', title='Binge watching', description='Have a TV or movie marathon', cost=10),
        Reward(user_id=1, type='custom', title='Impulse buy', description='Buy something you want', cost=20)
    ]

    for reward in seeds:
        db.session.add(reward)
    db.session.commit()


def undo_rewards():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM rewards'))

    db.session.commit()
