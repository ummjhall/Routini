from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tasks():
    seeds = [
        Task(user_id=1, type='habit', title='Floss', description=None, difficulty=1),
        Task(user_id=1, type='habit', title='Clean up clutter', description='Clean up around the house', difficulty=2),
        Task(user_id=1, type='habit', title='Practice guitar', description='Shred that thing', difficulty=3),
        Task(user_id=1, type='habit', title='Get to sleep on time', description=None, difficulty=4),
        Task(user_id=1, type='daily', title='Do the dishes', description=None, difficulty=1),
        Task(user_id=1, type='daily', title='Program something', description="Don't get rusty", difficulty=2, repeats_every=1),
        Task(user_id=1, type='daily', title='Do laundry', description="It's just piling up", difficulty=3, repeats_every=2),
        Task(user_id=1, type='daily', title='Run a 5k', description='I hate running tho', difficulty=4, repeats_every=7),
        Task(user_id=1, type='to-do', title='Pay bills', description='Ugh', difficulty=1),
        Task(user_id=1, type='to-do', title='Get a haircut', description='You look like a chump', difficulty=2),
        Task(user_id=1, type='to-do', title='Renew drivers license', description='Gonna take forever', difficulty=3),
        # Task(user_id=1, type='to-do', title='Spring cleaning', description='Not looking forward to this', difficulty=4),
        Task(user_id=1, type='to-do', title='Find my kids', description='Where did I put them last?', difficulty=4)
    ]

    for task in seeds:
        db.session.add(task)
    db.session.commit()


def undo_tasks():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM tasks'))

    db.session.commit()
