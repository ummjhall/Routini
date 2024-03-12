from .db import db, environment, SCHEMA, add_prefix_for_prod

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(30), nullable=False)
    bio = db.Column(db.String(255))
    level = db.Column(db.Integer, nullable=False)
    health = db.Column(db.Integer, nullable=False)
    exp = db.Column(db.Integer, nullable=False)
    gold = db.Column(db.Integer, nullable=False)
    gems = db.Column(db.Integer, nullable=False)
    equip_head_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('equipment.id')))
    equip_main_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('equipment.id')))
    equip_armor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('equipment.id')))

    user = db.relationship('User', back_populates='avatar')
    images = db.relationship('Image', back_populates='avatar', cascade='all, delete-orphan')

    # @property
    # def password(self):
    #     return self.hashed_password

    # @password.setter
    # def password(self, password):
    #     self.hashed_password = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
