from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Task


def task_form(FlaskForm):
    # Checking if user exists
    type = StringField('type', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    difficulty = IntegerField('difficulty', validators=[DataRequired()])
    start_date = DateField('start_date')
    repeats_every = IntegerField('repeats_every')
    due_date = DateField('due_date')
    if not user:
        raise ValidationError('Email provided not found.')
