from flask import Blueprint, request
from app.models import Avatar, db
from flask_login import current_user, login_required


avatar_routes = Blueprint("avatars", __name__, url_prefix="/api/avatars")


@avatar_routes.route("/current", methods=["GET"])
@login_required
def get_users_avatar():
    formatted_avatar = {}

    current_avatar = current_user.avatar

    if not current_avatar:
        return {"message": "Avatar couldn't be found"}, 404

    if current_avatar.image:
        avatar_image = current_avatar.image.to_dict()["url"]
        formatted_avatar["image_url"] = avatar_image
    else:
        static_avatar_url = "https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg"
        formatted_avatar["image_url"] = static_avatar_url

    formatted_avatar.update(current_avatar.to_dict())

    return formatted_avatar, 200


@avatar_routes.route("/current", methods=["POST"])
@login_required
def create_avatar():
    avatar_data = request.json
    name = avatar_data.get("name")

    if not avatar_data:
        return {"message": "Bad Request"}, 400

    if not name:
        return {"message": "Bad Request", "errors": {"name": "Name is required"}}, 400

    current_avatar = current_user.avatar

    if not current_avatar:
        new_avatar = Avatar(
            user_id=current_user.id,
            name=avatar_data.get("name"),
            bio=avatar_data.get("bio"),
            level=avatar_data.get("level", 0),
            health=avatar_data.get("health", 50),
            exp=avatar_data.get("exp", 0),
            gold=avatar_data.get("gold", 0),
            gems=avatar_data.get("gems", 0),
            equip_head_id=avatar_data.get("equip_head_id", None),
            equip_main_id=avatar_data.get("equip_main_id", None),
            equip_armor_id=avatar_data.get("equip_armor_id", None),
        )
        new_avatar.image_url = "https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg"
        db.session.add(new_avatar)
        db.session.commit()

        return {**new_avatar.to_dict(), "image_url": new_avatar.image_url}, 201
    else:
        return {"message": "Bad Request", "errors": {"name": "Name is required"}}, 400


@avatar_routes.route("/current", methods=["PUT", "PATCH"])
@login_required
def update_avatar():
    avatar_data = request.json
    current_avatar = current_user.avatar

    if not current_avatar:
        return {"message": "Avatar not found"}, 404

    current_avatar.name = avatar_data.get("name", current_avatar.name)
    current_avatar.bio = avatar_data.get("bio", current_avatar.bio)
    current_avatar.level = avatar_data.get("level", current_avatar.level)
    current_avatar.health = avatar_data.get("health", current_avatar.health)
    current_avatar.exp = avatar_data.get("exp", current_avatar.exp)
    current_avatar.gold = avatar_data.get("gold", current_avatar.gold)
    current_avatar.gems = avatar_data.get("gems", current_avatar.gems)
    current_avatar.equip_head_id = avatar_data.get(
        "equip_head_id", current_avatar.equip_head_id
    )
    current_avatar.equip_main_id = avatar_data.get(
        "equip_main_id", current_avatar.equip_main_id
    )
    current_avatar.equip_armor_id = avatar_data.get(
        "equip_armor_id", current_avatar.equip_armor_id
    )

    db.session.commit()

    formatted_avatar = current_avatar.to_dict()

    if current_avatar.image:
        avatar_image = current_avatar.image.to_dict()["url"]
        formatted_avatar["image_url"] = avatar_image
    else:
        static_avatar_url = "https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg"
        formatted_avatar["image_url"] = static_avatar_url

    return formatted_avatar, 200


@avatar_routes.route("/current", methods=["DELETE"])
@login_required
def delete_avatar():
    current_avatar = current_user.avatar

    if not current_avatar:
        return {"message": "Avatar couldn't be found"}, 404

    db.session.delete(current_avatar)
    db.session.commit()

    return {"message": "Successfully deleted"}, 200
