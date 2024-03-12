from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    imageable_type = db.Column(db.Enum('avatar', 'equipment', name='imageable_types'), nullable=False)
    imageable_id = db.Column(db.Integer, nullable=False)

    avatar = db.relationship('Avatar', primaryjoin='and_(Image.imageable_type=="avatar", foreign(Image.imageable_id)==Avatar.id)', uselist=False)
    equipment = db.relationship('Equipment', primaryjoin='and_(Image.imageable_type=="equipment", foreign(Image.imageable_id)==Equipment.id)', uselist=False)

    def parent(self):
        if self.imageable_type == 'avatar':
            return self.avatar.to_dict()
        elif self.imageable_type == 'equipment':
            return self.equipment.to_dict()
        else:
            return 'Invalid imageable_type'

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'imageable_type': self.imageable_type,
            'imageable_id': self.imageable_id,
            'parent': self.parent()
        }
