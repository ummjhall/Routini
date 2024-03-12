from .db import db, environment, SCHEMA, add_prefix_for_prod


class Equipment(db.Model):
    __tablename__ = "equipment"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.ENUM("head", "main", "armor", name="types"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Integer, nullable=False)

    image = db.relationship(
        "Image", back_populates="equipment", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "description": self.description,
            "cost": self.cost,
        }
