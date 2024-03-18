from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Check if user exists
    credential = field.data

    user = User.query.filter(User.username == credential).first()
    if not user:
        user = User.query.filter(User.email == credential).first()
    if not user:
        raise ValidationError('Invalid credentials')


def password_matches(form, field):
    # Check if password matches
    password = field.data
    credential = form.data['credential']

    user = User.query.filter(User.username == credential).first()
    if not user:
        user = User.query.filter(User.email == credential).first()
    if not user or not user.check_password(password):
        raise ValidationError('Invalid credentials')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
