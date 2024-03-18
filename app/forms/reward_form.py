from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class RewardForm(FlaskForm):
    type = StringField("type", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    cost = StringField("cost", validators=[DataRequired()])
