from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tasks():
    seeds = [
        Task(user_id=1, type='habit', title='task 1 name', description='task 1 description', difficulty=1),
        Task(user_id=1, type='habit', title='task 2 name', description='task 2 description', difficulty=2),
        Task(user_id=1, type='habit', title='task 3 name', description='task 3 description', difficulty=3),
        Task(user_id=1, type='habit', title='task 4 name', description='task 4 description', difficulty=4),
        Task(user_id=1, type='daily', title='daily 1 name', description='daily 1 description', difficulty=1),
        Task(user_id=1, type='daily', title='daily 2 name', description='daily 2 description', difficulty=2),
        Task(user_id=1, type='daily', title='daily 3 name', description='daily 3 description', difficulty=3),
        Task(user_id=1, type='daily', title='daily 4 name', description='daily 4 description', difficulty=4),
        Task(user_id=1, type='to-do', title='to-do 1 name', description='to-do 1 description', difficulty=1),
        Task(user_id=1, type='to-do', title='to-do 2 name', description='to-do 2 description', difficulty=2),
        Task(user_id=1, type='to-do', title='to-do 3 name', description='to-do 3 description', difficulty=3),
        Task(user_id=1, type='to-do', title='to-do 4 name', description='to-do 4 description', difficulty=4)
    ]

    for task in seeds:
        db.session.add(task)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
