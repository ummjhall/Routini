from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String(5), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    difficulty = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date)
    repeats_every = db.Column(db.Integer)
    due_date = db.Column(db.Date)

    user = db.relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'title': self.title,
            'description': self.description,
            'difficulty': self.difficulty,
            'start_date': self.start_date,
            'repeats_every': self.repeats_every,
            'due_date': self.due_date
        }
